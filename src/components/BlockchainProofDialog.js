import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Link,
  Typography,
  Box,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { getBlockchainProof, verifyDocument } from "../apis";
import { UploadIcon } from "../assets";
import OrgExhibitBlockchainProof from "./OrgExhibitBlockchainProof";
import ProductBlockchainProof from "./ProductBlockchainProof";

const useStyle = makeStyles((theme) => ({
  dialogContent: {},
  dialogActions: {},
}));

export default function BlockchainProofDialog({
  open = false,
  handleClose = () => {},
  domElement,
}) {
  const classes = useStyle();
  const [documentFile, setDocumentFile] = useState(null);
  const [documentVerificationLoading, setDocumentVerificationLoading] =
    useState(false);
  const [documentVerificationRes, setDocumentVerificationRes] = useState(null);
  const [blockchainProofApiParams, setBlockchainProofApiParams] = useState({
    id: "",
    type: "",
  });
  const [blockchainProofLoading, setBlockchainProofLoading] = useState(false);
  const [msg, setMsg] = useState({
    type: "",
    msg: "",
  });
  const [blockchainProof, setBlockchainProof] = useState(null);

  const setDefaultStates = () => {
    setBlockchainProof(null);
    setMsg({
      type: "",
      msg: "",
    });
    setBlockchainProofLoading(false);
    setBlockchainProofApiParams({
      id: "",
      type: "",
    });
    setDocumentVerificationRes(null);
    setDocumentVerificationLoading(false);
    setDocumentFile(null);
  };

  const handleVerifyDocument = async () => {
    const productId = domElement.getAttribute("data-product-id");
    const organizationId = domElement.getAttribute("data-organization-id");
    const formData = new FormData();
    formData.append("id", productId);
    formData.append("organization_id", organizationId);
    formData.append("type", "integrant");
    formData.append("files[]", documentFile);
    const params = {
      method: "POST",
      body: formData,
    };
    setDocumentVerificationLoading((pre) => !pre);
    const response = await verifyDocument(params);
    setDocumentVerificationRes(response);
    setDocumentVerificationLoading((pre) => !pre);
    if (response?.isVerifyDocument) {
      setMsg({
        type: "success",
        msg: "Verified match on the blockchain.",
      });
      if (response?.integrantId) {
        const productType = domElement.getAttribute("data-type");
        setBlockchainProofApiParams({
          id: response?.integrantId,
          type: productType,
        });
      } else {
        setBlockchainProof(response?.documentData);
      }
    } else {
      setMsg({
        type: "error",
        msg: "Not a verified match on the blockchain.",
      });
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      setBlockchainProofLoading((pre) => !pre);
      const response = await getBlockchainProof({
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blockchainProofApiParams),
      });
      setBlockchainProof(response);
      setBlockchainProofLoading((pre) => !pre);
      setBlockchainProofApiParams({
        id: "",
        type: "",
      });
    };
    if (blockchainProofApiParams?.id) {
      fetchData();
    }
  }, [blockchainProofApiParams?.id]);

  useEffect(() => {
    if (msg?.type || msg?.msg) {
      setTimeout(() => {
        setMsg({
          type: "",
          msg: "",
        });
      }, 10000);
    }
  }, [msg?.type]);

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth={"md"}>
      <DialogTitle
        display="flex"
        alignItems={"center"}
        justifyContent="flex-start"
      >
        <Link
          target="_blank"
          href={`${process.env.REACT_APP_CLIENT_URL_UI}`}
          sx={{ mr: 1.5 }}
        >
          <img
            src={`${process.env.REACT_APP_CLIENT_URL_UI}/assets/images/logo/healthloq.png`}
            alt="healthloq-logo"
            width={50}
            height={50}
          />
        </Link>
        Blockchain Proof
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <Typography variant="body1">Document to be verified:</Typography>
        {documentFile && (
          <Typography
            variant="body2"
            color="lightgray"
            fontWeight="fontWeightLight"
          >
            {documentFile?.name}
          </Typography>
        )}
        <Box
          display="flex"
          alignItems={"center"}
          justifyContent="flex-start"
          sx={{ my: 2 }}
        >
          <Button
            variant="contained"
            component="label"
            startIcon={<UploadIcon />}
            sx={{ typography: "body1" }}
            disabled={documentVerificationLoading}
          >
            Upload
            <input
              type="file"
              hidden
              onClick={(e) => (e.target.value = null)}
              onChange={(e) => {
                if (e.target?.files[0]) {
                  setDefaultStates();
                  setDocumentFile(e.target.files[0]);
                }
              }}
            />
          </Button>
          {documentFile && (
            <Button
              sx={{ ml: 1, typography: "body1" }}
              variant="contained"
              onClick={handleVerifyDocument}
              endIcon={
                documentVerificationLoading && (
                  <CircularProgress size={20} color="inherit" />
                )
              }
            >
              {documentVerificationLoading ? "Verifying..." : "Verify"}
            </Button>
          )}
        </Box>
        {msg?.type && (
          <Box sx={{ my: 2 }}>
            <Typography
              variant="body1"
              color={msg?.type === "success" ? "primary" : "error"}
              display="flex"
              alignItems={"center"}
            >
              {msg?.msg}&nbsp;
              {msg?.type === "success" ? (
                <img
                  src={`${process.env.REACT_APP_CLIENT_URL_UI}/assets/images/icon/icon-correct.png`}
                  alt="currect-icon"
                />
              ) : (
                <img
                  src={`${process.env.REACT_APP_CLIENT_URL_UI}/assets/images/icon/icon-wrong.png`}
                  alt="wrong-icon"
                />
              )}
            </Typography>
          </Box>
        )}
        {blockchainProofLoading && (
          <Typography
            variant="body1"
            display="flex"
            alignItems={"center"}
            justifyContent="center"
          >
            Please wait while we are fetching the product detail...&nbsp;
            <CircularProgress size={20} />
          </Typography>
        )}
        {documentVerificationRes?.integrantId && blockchainProof && (
          <ProductBlockchainProof blockchainProof={blockchainProof} />
        )}
        {documentVerificationRes?.documentData?.type === "orgExhibitDocument" &&
          blockchainProof && (
            <OrgExhibitBlockchainProof
              organizationExhibitData={blockchainProof}
            />
          )}
      </DialogContent>
      <DialogActions
        className={classes.dialogActions}
        justifycontent="space-between"
      >
        <Typography variant="body1">
          Verified By&nbsp;
          <Link
            href={`${process.env.REACT_APP_CLIENT_URL_UI}`}
            target={"_blank"}
          >
            HealthLOQ
          </Link>
        </Typography>
        <Button
          variant="contained"
          color="lightBlackColor"
          onClick={handleClose}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
