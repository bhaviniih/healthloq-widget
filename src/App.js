import React, { useState } from "react";
import "./App.css";
import { BlockchainProofIcon, UploadIcon } from "./assets/icons";
import {
  Box,
  Grid,
  CircularProgress,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";

function App({ domElement }) {
  const [document, setDocument] = useState(null);
  const [documentLoading, setDocumentLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [productDetailLoading, setProductDetailLoading] = useState(false);
  const [blockchainProofData, setBlockchainProofData] = useState([]);
  const [open, setOpen] = useState(false);
  const [openShowProofDialog, setOpenShowProofDialog] = useState(false);

  const handleClose = () => {
    setDocument(null);
    setDocumentLoading(false);
    setErrorMsg("");
    setSuccessMsg("");
    setProductDetailLoading(false);
    setBlockchainProofData([]);
    setOpen(false);
    setOpenShowProofDialog(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const messageHandler = (msg, type = "error") => {
    if (type === "error") {
      setErrorMsg(msg);
      setTimeout(() => {
        setErrorMsg("");
      }, 10000);
    } else {
      setSuccessMsg(msg);
      setTimeout(() => {
        setSuccessMsg("");
      }, 10000);
    }
  };

  function handleSubmit(e) {
    if (!document) {
      messageHandler("Please select document!");
    } else {
      setDocumentLoading(true);
      const productId = domElement.getAttribute("data-product-id");
      const organizationId = domElement.getAttribute("data-organization-id");
      const formData = new FormData();
      formData.append("id", productId);
      formData.append("organization_id", organizationId);
      formData.append("type", "integrant");
      formData.append("files[]", document);
      const requestOptions = {
        method: "POST",
        body: formData,
      };
      fetch(
        process.env.REACT_APP_API_URL + "/client-app/verify-document",
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => {
          setDocumentLoading(false);
          if (data.isVerifyDocument === true) {
            messageHandler("Verified match on the blockchain.", "success");
            setProductDetailLoading(true);
            const productType = domElement.getAttribute("data-type");
            const requestOptions = {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ id: data.integrantId, type: productType }),
            };
            fetch(
              process.env.REACT_APP_API_URL + "/client-app/verify",
              requestOptions
            )
              .then((response) => response.json())
              .then((data) => {
                setProductDetailLoading(false);
                if (!data?.data?.IntegrantId) {
                  messageHandler("Blockchain data not found!");
                } else {
                  setBlockchainProofData(data);
                }
              })
              .catch((e) => {
                console.log(e);
                setProductDetailLoading(false);
                messageHandler(
                  "Something went wrong! Please try after sometime."
                );
              });
          } else {
            messageHandler("Not a verified match on the blockchain.");
          }
        })
        .catch((e) => {
          console.log(e);
          setDocumentLoading(false);
          messageHandler("Something went wrong! Please try after sometime.");
        });
    }
  }

  return (
    <Box>
      <Box className="healthloq-widget-blockchain-button" onClick={handleOpen}>
        <Typography variant="body1">Blockchain Proof</Typography>
        <BlockchainProofIcon />
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth={"sm"}
        className="healthloq-widget-dialog-root"
      >
        <DialogTitle className="healthloq-widget-dialog-title">
          <a
            href={process.env.REACT_APP_CLIENT_URL_UI}
            target="_blank"
            className="healthloq-widget-dialog-title-link"
            rel="noreferrer"
          >
            <img
              src={`${process.env.REACT_APP_CLIENT_URL_UI}/assets/images/logo/healthloq.png`}
              alt="healthloq-logo"
            />
          </a>
          Blockchain Proof
        </DialogTitle>
        <DialogContent className="healthloq-widget-dialog-content">
          <Grid container flexDirection="column">
            <Grid item sx={{ mb: 1 }}>
              <Typography variant="body1">Document to be verified:</Typography>
            </Grid>
            {document && (
              <Grid item sx={{ mb: 1, opacity: 0.4 }}>
                <Typography variant="body2">{document?.name}</Typography>
              </Grid>
            )}
            <Grid item sx={{ mb: 1 }}>
              <Button
                component="label"
                startIcon={<UploadIcon />}
                className="healthloq-widget-btn healthloq-widget-fixwidth-btn"
                sx={{ mr: 1 }}
              >
                Upload
                <input
                  hidden
                  type={"file"}
                  onClick={(e) => (e.target.value = null)}
                  onChange={(e) => {
                    if (e?.target?.files?.length) {
                      setDocument(e.target.files[0]);
                    }
                  }}
                />
              </Button>
              {document && (
                <Button
                  component="button"
                  startIcon={
                    documentLoading && (
                      <CircularProgress size={20} color="inherit" />
                    )
                  }
                  className="healthloq-widget-btn healthloq-widget-fixwidth-btn"
                  onClick={handleSubmit}
                  disabled={documentLoading}
                >
                  Verify
                </Button>
              )}
            </Grid>
            {errorMsg && (
              <Grid item sx={{ mb: 1 }}>
                <Typography
                  variant="body1"
                  className="healthloq-widget-error-msg"
                >
                  <img
                    src={`${process.env.REACT_APP_CLIENT_URL_UI}/assets/images/icon/icon-wrong.png`}
                    alt="wrong-icon"
                  />
                  {errorMsg}
                </Typography>
              </Grid>
            )}
            {successMsg && (
              <Grid item sx={{ mb: 1 }}>
                <Typography
                  variant="body1"
                  className="healthloq-widget-success-msg"
                >
                  <img
                    src={`${process.env.REACT_APP_CLIENT_URL_UI}/assets/images/icon/icon-correct.png`}
                    alt="currect-icon"
                  />
                  {successMsg}
                </Typography>
              </Grid>
            )}
            {productDetailLoading && (
              <Grid item sx={{ mb: 1 }}>
                <Typography
                  variant="body1"
                  className="healthloq-widget-product-loading"
                >
                  Please wait while we are fetching the product detail...
                  <CircularProgress size={20} />
                </Typography>
              </Grid>
            )}
            {blockchainProofData?.data?.Title && (
              <Box className="healthloq-widget-product-detail">
                <Grid item sx={{ mb: 1 }}>
                  <Typography variant="h5" className="healthloq-widget-h5">
                    Block Location
                  </Typography>
                  <Typography
                    variant="body1"
                    className="healthloq-widget-body1"
                  >
                    <span>Block ID:</span>
                    {blockchainProofData?.blockAddress?.IonText}
                  </Typography>
                </Grid>
                <Grid item sx={{ mb: 1 }}>
                  <Typography
                    variant="h5"
                    className="healthloq-widget-h5 healthloq-widget-verified-icon"
                  >
                    Status: Verified
                    {blockchainProofData?.result ? (
                      <img
                        src={`${process.env.REACT_APP_CLIENT_URL_UI}/assets/images/icon/icon-correct.png`}
                        alt="correct-icon"
                      />
                    ) : (
                      <img
                        src={`${process.env.REACT_APP_CLIENT_URL_UI}/assets/images/icon/icon-wrong.png`}
                        alt="wrong-icon"
                      />
                    )}
                  </Typography>
                </Grid>
                <Grid
                  contaier
                  sx={{ mb: 1 }}
                  className="healthloq-widget-product-image-root"
                >
                  <Grid item>
                    <Typography variant="h5" className="healthloq-widget-h5">
                      Product Information
                    </Typography>
                    <Typography
                      variant="body1"
                      className="healthloq-widget-body1"
                    >
                      <span>Product Name:</span>
                      {blockchainProofData?.data?.Title}
                    </Typography>
                    <Typography
                      variant="body1"
                      className="healthloq-widget-body1"
                    >
                      <span>Batch ID:</span>
                      {blockchainProofData?.data?.ExternalId}
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{ mt: 2 }}
                      className="healthloq-widget-h5"
                    >
                      Digitally Signed By
                    </Typography>
                    <Typography
                      variant="body1"
                      className="healthloq-widget-body1"
                    >
                      <span>Organization Name:</span>
                      {blockchainProofData?.data?.OrganizationName}
                    </Typography>
                    <Typography
                      variant="body1"
                      className="healthloq-widget-body1"
                    >
                      <span>Organization Id:</span>
                      {blockchainProofData?.data?.OrganizationId}
                    </Typography>
                  </Grid>
                  <Grid item className="healthloq-widget-product-image">
                    <img
                      src={blockchainProofData?.data?.IntegrantTypeImageUrl}
                      alt="product-pic"
                    />
                  </Grid>
                </Grid>
                <Grid item>
                  <Button
                    type="button"
                    onClick={() => setOpenShowProofDialog(true)}
                    className="healthloq-widget-btn"
                  >
                    Show Proof
                  </Button>
                </Grid>
              </Box>
            )}
          </Grid>
        </DialogContent>
        <DialogActions className="healthloq-widget-dialog-actions">
          <Box>
            <Typography>
              Verified By
              <a
                href={process.env.REACT_APP_CLIENT_URL_UI}
                target="_blank"
                rel="noreferrer"
              >
                HealthLoq
              </a>
            </Typography>
            <Button className="healthloq-widget-btn" onClick={handleClose}>
              Close
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openShowProofDialog}
        onClose={() => setOpenShowProofDialog(false)}
        className="healthloq-widget-dialog-root"
      >
        <DialogTitle className="healthloq-widget-dialog-title">
          Show Proof
        </DialogTitle>
        <DialogContent className="healthloq-widget-dialog-content">
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell component="th">Integrant Id</TableCell>
                  <TableCell component="th">
                    {blockchainProofData?.data?.IntegrantId}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Title</TableCell>
                  <TableCell component="th">
                    {blockchainProofData?.data?.Title}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Description</TableCell>
                  <TableCell component="th">
                    {blockchainProofData?.data?.Description}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Buy Again Url</TableCell>
                  <TableCell component="th">
                    {blockchainProofData?.data?.BuyAgainUrl}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">External Id</TableCell>
                  <TableCell component="th">
                    {blockchainProofData?.data?.ExternalId}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">External Id Slug</TableCell>
                  <TableCell component="th">
                    {blockchainProofData?.data?.ExternalIdSlug}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Facets</TableCell>
                  <TableCell component="th">
                    {blockchainProofData?.data?.Facets}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Other Facets</TableCell>
                  <TableCell component="th">
                    {blockchainProofData?.data?.OtherFacets}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Qr Url</TableCell>
                  <TableCell component="th">
                    {blockchainProofData?.data?.QrUrl}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Integrant Type Id</TableCell>
                  <TableCell component="th">
                    {blockchainProofData?.data?.IntegrantTypeId}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Integrant Type Title</TableCell>
                  <TableCell component="th">
                    {blockchainProofData?.data?.IntegrantTypeTitle}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Member Type Directions</TableCell>
                  <TableCell component="th">
                    {blockchainProofData?.data?.IntegrantTypeDirections}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Integrant Type Warnings</TableCell>
                  <TableCell component="th">
                    {blockchainProofData?.data?.IntegrantTypeWarnings}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Member Type Image Url</TableCell>
                  <TableCell component="th">
                    {blockchainProofData?.data?.IntegrantTypeImageUrl}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">
                    Integrant Type Current Integrant Id
                  </TableCell>
                  <TableCell component="th">
                    {blockchainProofData?.data?.IntegrantTypeCurrentIntegrantId}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Member Type External Id</TableCell>
                  <TableCell component="th">
                    {blockchainProofData?.data?.IntegrantTypeExternalId}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Organization Id</TableCell>
                  <TableCell component="th">
                    {blockchainProofData?.data?.OrganizationId}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Organization Name</TableCell>
                  <TableCell component="th">
                    {blockchainProofData?.data?.OrganizationName}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Location Id</TableCell>
                  <TableCell component="th">
                    {blockchainProofData?.data?.LocationId}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Location Line1</TableCell>
                  <TableCell component="th">
                    {blockchainProofData?.data?.LocationLine1}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Location Line2</TableCell>
                  <TableCell component="th">
                    {blockchainProofData?.data?.LocationLine2}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Location City</TableCell>
                  <TableCell component="th">
                    {blockchainProofData?.data?.LocationCity}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Location State</TableCell>
                  <TableCell component="th">
                    {blockchainProofData?.data?.LocationState}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Location Zip</TableCell>
                  <TableCell component="th">
                    {blockchainProofData?.data?.LocationZip}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Location Coordinates</TableCell>
                  <TableCell component="th">
                    {blockchainProofData?.data?.LocationCoordinates}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Location Country</TableCell>
                  <TableCell component="th">
                    {blockchainProofData?.data?.LocationCountry}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Created By</TableCell>
                  <TableCell component="th">
                    {blockchainProofData?.data?.CreatedBy}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Updated By</TableCell>
                  <TableCell component="th">
                    {blockchainProofData?.data?.UpdatedBy}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Is Published</TableCell>
                  <TableCell component="th">
                    {blockchainProofData?.data?.IsPublished}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Created On</TableCell>
                  <TableCell component="th">
                    {blockchainProofData?.data?.CreatedOn}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Updated On</TableCell>
                  <TableCell component="th">
                    {blockchainProofData?.data?.UpdatedOn}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions className="healthloq-widget-dialog-actions">
          <Button
            className="healthloq-widget-btn"
            onClick={() => setOpenShowProofDialog(false)}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default App;
