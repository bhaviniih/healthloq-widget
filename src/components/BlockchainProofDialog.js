import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Link,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { getBlockchainProof, verifyDocument } from "../apis";
import { UploadIcon } from "../assets";
import { useReducerHook } from "../hooks/useReducerHook";
import BlockchainProof from "./BlockchainProof";
import lockIcon from "../assets/svg/lock-icon.svg";

const useStyle = makeStyles((theme) => ({
  dialogContent: {},
  dialogActions: {},
  blockchainProofContainer: {
    "&>*:not(:last-child)": {
      marginBottom: 100,
      position: "relative",
      "&::before": {
        position: "absolute",
        content: "' '",
        width: 2,
        height: 100,
        backgroundColor: theme.palette.primary.main,
        top: "calc(100% + 2px)",
        left: " 50%",
        transform: "translateX(-50%)",
      },
      "&::after": {
        position: "absolute",
        content: "' '",
        width: 50,
        height: 50,
        top: "calc(100% + 25px)",
        backgroundColor: theme.palette.primary.main,
        outline: `2px solid ${theme.palette.common.white}`,
        borderRadius: "50%",
        left: "50%",
        transform: "translateX(-50%) scaleX(-1)",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundImage: `url(${lockIcon})`,
      },
    },
  },
}));

export default function BlockchainProofDialog({
  open = false,
  handleClose = () => {},
  domElement,
}) {
  const [
    {
      documentVerificationData,
      exhibitBlockchainProofData,
      orgExhibitBlockchainProofData,
      documentHashBlockchainProofData,
    },
    dispatch,
  ] = useReducerHook();
  const classes = useStyle({ lockIcon });
  const [documentFile, setDocumentFile] = useState(null);

  const handleVerifyDocument = async () => {
    dispatch({
      type: "setInitialState",
    });
    const productId = domElement.getAttribute("data-product-id");
    const organizationId = domElement.getAttribute("data-organization-id");
    const formData = new FormData();
    formData.append("id", productId);
    formData.append("organization_id", organizationId);
    formData.append("type", "exhibit");
    formData.append("files[]", documentFile);
    const params = {
      method: "POST",
      body: formData,
    };
    dispatch({
      type: "documentVerificationData",
    });
    const response = await verifyDocument(params);
    dispatch({
      type: "documentVerificationData",
      payload: response,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      if (documentVerificationData?.integrantId) {
        dispatch({
          type: "exhibitBlockchainProofData",
        });
        const productType = domElement.getAttribute("data-type");
        const response = await getBlockchainProof({
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: documentVerificationData?.integrantId,
            type: productType,
          }),
        });
        dispatch({
          type: "exhibitBlockchainProofData",
          payload: response,
        });
      }
      if (
        documentVerificationData?.documentData?.type === "orgExhibitDocument"
      ) {
        dispatch({
          type: "orgExhibitBlockchainProofData",
        });
        const response = await getBlockchainProof({
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: documentVerificationData?.documentData?.OrganizationExhibitId,
            type: "organization_exhibit",
          }),
        });
        dispatch({
          type: "orgExhibitBlockchainProofData",
          payload: response,
        });
      }
      if (
        documentVerificationData?.documentData?.type === "docToolDocument" ||
        documentVerificationData?.documentData?.documentHash?.documentHashId
      ) {
        dispatch({
          type: "documentHashBlockchainProofData",
        });
        const response = await getBlockchainProof({
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id:
              documentVerificationData?.documentData?.documentHashId ||
              documentVerificationData?.documentData?.documentHash
                ?.documentHashId,
            type: "document_hash",
          }),
        });
        dispatch({
          type: "documentHashBlockchainProofData",
          payload: response,
        });
      }
      dispatch({
        type: "updateDocumentVerificationData",
        payload: {
          blockchainProofApiFlag: false,
        },
      });
    };
    if (
      !documentVerificationData?.isLoading &&
      documentVerificationData?.blockchainProofApiFlag
    ) {
      fetchData();
    }
  }, [documentVerificationData?.blockchainProofApiFlag]);

  useEffect(() => {
    if (documentVerificationData?.message) {
      setTimeout(() => {
        dispatch({
          type: "documentVerificationData",
          payload: {
            message: "",
            isLoading: false,
          },
        });
      }, 15000);
    }
  }, [documentVerificationData?.message]);

  useEffect(() => {
    if (open) {
      dispatch({
        type: "setInitialState",
      });
      setDocumentFile(null);
    }
  }, [open]);
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
            disabled={documentVerificationData?.isLoading}
          >
            Upload
            <input
              type="file"
              hidden
              onClick={(e) => (e.target.value = null)}
              onChange={(e) => {
                if (e.target?.files[0]) {
                  dispatch({
                    type: "setInitialState",
                  });
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
                documentVerificationData?.isLoading && (
                  <CircularProgress size={20} color="inherit" />
                )
              }
              disabled={documentVerificationData?.isLoading}
            >
              {documentVerificationData?.isLoading ? "Verifying..." : "Verify"}
            </Button>
          )}
        </Box>
        {documentVerificationData?.message &&
          !documentVerificationData?.isLoading && (
            <Box sx={{ my: 2 }}>
              <Typography
                variant="body1"
                color={
                  documentVerificationData?.isVerifyDocument
                    ? "primary"
                    : "error"
                }
                display="flex"
                alignItems={"center"}
              >
                {documentVerificationData?.message}&nbsp;
                {documentVerificationData?.isVerifyDocument ? (
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
        {exhibitBlockchainProofData?.isLoading && (
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
        <Box className={classes.blockchainProofContainer}>
          {documentVerificationData?.integrantId &&
            !exhibitBlockchainProofData?.isLoading &&
            typeof exhibitBlockchainProofData?.result === "boolean" && (
              <BlockchainProof blockchainProof={exhibitBlockchainProofData} />
            )}
          {orgExhibitBlockchainProofData?.isLoading && (
            <Typography
              variant="body1"
              display="flex"
              alignItems={"center"}
              justifyContent="center"
            >
              Please wait while we are fetching the document detail...&nbsp;
              <CircularProgress size={20} />
            </Typography>
          )}
          {!orgExhibitBlockchainProofData?.isLoading &&
            typeof orgExhibitBlockchainProofData?.result === "boolean" && (
              <BlockchainProof
                blockchainProof={orgExhibitBlockchainProofData}
              />
            )}
          {documentHashBlockchainProofData?.isLoading && (
            <Typography
              variant="body1"
              display="flex"
              alignItems={"center"}
              justifyContent="center"
            >
              Please wait while we are fetching the document detail...&nbsp;
              <CircularProgress size={20} />
            </Typography>
          )}
          {!documentHashBlockchainProofData?.isLoading &&
            typeof documentHashBlockchainProofData?.result === "boolean" && (
              <BlockchainProof
                blockchainProof={documentHashBlockchainProofData}
              />
            )}
        </Box>
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
