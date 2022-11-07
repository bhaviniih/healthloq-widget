import React, { useState } from "react";
import "./App.css";
import moment from "moment";
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

const getIcon = (icon) => {
  switch (icon) {
    case "blockchain-proof":
      return (
        <svg
          width="505"
          height="492"
          viewBox="0 0 505 492"
          fill="black"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M153.431 55.563L249.505 0.66504C251.056 -0.22168 252.954 -0.22168 254.505 0.66504L350.579 55.563L252.001 111.895L153.431 55.563Z" />
          <path d="M235.201 258.441L136.939 202.289C135.369 201.395 134.4 199.727 134.4 197.918V83.3979L235.2 141L235.201 258.441Z" />
          <path d="M369.601 83.3911V197.911C369.601 199.72 368.632 201.388 367.066 202.286L268.8 258.442V140.992L369.601 83.3911Z" />
          <path d="M19.0312 288.511L115.105 233.613C116.656 232.726 118.554 232.726 120.105 233.613L216.179 288.511L117.605 344.835L19.0312 288.511Z" />
          <path d="M100.801 491.381L2.53519 435.229C0.968794 434.334 0 432.667 0 430.858V316.338L100.8 373.94L100.801 491.381Z" />
          <path d="M235.201 316.331V430.851C235.201 432.66 234.232 434.328 232.666 435.226L134.4 491.382V373.932L235.201 316.331Z" />
          <path d="M386.401 344.831L287.831 288.507L383.905 233.609C385.456 232.722 387.354 232.722 388.905 233.609L484.979 288.507L386.401 344.831Z" />
          <path d="M403.201 373.931L504.001 316.329V430.849C504.001 432.658 503.032 434.326 501.466 435.224L403.2 491.38L403.201 373.931Z" />
          <path d="M369.601 373.931V491.381L271.335 435.229C269.769 434.334 268.8 432.667 268.8 430.858V316.338L369.601 373.931Z" />
        </svg>
      );
    case "upload":
      return (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="#fff"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M19.2975 10.5489L19.1727 10.4207V10.4205C18.7596 10.028 18.2348 9.77344 17.6708 9.69211C17.89 8.09653 17.4281 6.48262 16.3977 5.2449C16.3111 5.14085 16.2175 5.0368 16.1236 4.93614C16.0299 4.83548 15.9363 4.73506 15.8356 4.64118V4.64142C14.3918 3.22103 12.3043 2.67083 10.3479 3.1947C8.29893 3.7193 6.65956 5.25387 6.00139 7.26392C5.98615 7.27239 5.96776 7.27239 5.95276 7.26392C5.20799 6.86152 4.35452 6.70714 3.51609 6.82305C2.67742 6.93919 1.89803 7.31957 1.29041 7.909C1.2246 7.97143 1.15854 8.04088 1.09611 8.11008V8.11032C1.03005 8.17735 0.967625 8.24801 0.908827 8.32181C0.424158 8.91077 0.118535 9.62649 0.0280336 10.3839C-0.0622201 11.1415 0.0665067 11.909 0.398978 12.5955C0.732173 13.3127 1.26354 13.9193 1.93044 14.3442C2.59734 14.7689 3.37208 14.9939 4.16287 14.9925H7.22574C7.5132 14.9925 7.74622 14.7594 7.74622 14.4722C7.74622 14.1848 7.5132 13.9517 7.22574 13.9517H4.16962C3.57196 13.9583 2.98518 13.7911 2.48063 13.4702C1.97637 13.1494 1.57612 12.6887 1.32858 12.1445C1.07742 11.6371 0.978937 11.0677 1.04548 10.5054C1.11202 9.94302 1.34044 9.41216 1.70315 8.97755C1.75178 8.92214 1.79679 8.86648 1.84882 8.81107L2.0015 8.655V8.65476C2.45689 8.21389 3.04223 7.93149 3.6706 7.84898C4.29922 7.76647 4.93756 7.88842 5.49122 8.19694C5.78038 8.34624 6.12058 8.36003 6.42089 8.23517C6.71102 8.11733 6.93266 7.87536 7.02461 7.57602C7.5676 5.91125 8.92725 4.64212 10.6252 4.21452C12.2326 3.78405 13.9477 4.23508 15.1348 5.40088C15.218 5.48074 15.3013 5.56397 15.3811 5.6506C15.461 5.73722 15.5372 5.82748 15.6137 5.91773C16.4574 6.93282 16.8352 8.25615 16.6542 9.5635C16.615 9.84709 16.6921 10.1346 16.8678 10.3605C17.0435 10.5865 17.3029 10.732 17.5874 10.7639C17.918 10.7983 18.2265 10.9454 18.4617 11.1801L18.5449 11.2667L18.6248 11.3534L18.6245 11.3536C18.8142 11.5813 18.9333 11.8593 18.9679 12.1538C19.0022 12.448 18.9505 12.7461 18.8188 13.0116C18.6867 13.295 18.4764 13.5345 18.2129 13.7022C17.9492 13.8699 17.6431 13.9589 17.3307 13.9587H13.2895C13.0021 13.9587 12.7691 14.1917 12.7691 14.4789C12.7691 14.7664 13.0021 14.9994 13.2895 14.9994H17.317C17.827 15.0016 18.327 14.8571 18.7574 14.5834C19.1876 14.31 19.5305 13.9185 19.7451 13.4556C19.96 13.0087 20.0416 12.5093 19.9801 12.0171C19.9186 11.5249 19.7166 11.0607 19.3981 10.6807L19.2975 10.5489Z" />
          <path d="M10.2823 17.5387C10.5698 17.5387 10.8028 17.3057 10.8028 17.0182V10.2018L12.9222 12.3595C13.019 12.4582 13.1516 12.5131 13.29 12.5121C13.4993 12.5119 13.6883 12.3863 13.7694 12.1932C13.8504 12.0001 13.8076 11.777 13.661 11.6275L10.7193 8.65798L10.7196 8.65823C10.6257 8.50699 10.4604 8.41504 10.2823 8.41528H10.2477C10.2015 8.41746 10.1558 8.4269 10.1125 8.44311C10.0304 8.46465 9.95543 8.50651 9.89397 8.56458L6.9073 11.5374H6.90706C6.80349 11.633 6.743 11.7668 6.73986 11.9081C6.73695 12.0492 6.79115 12.1854 6.89061 12.2859C6.98982 12.386 7.12556 12.4417 7.26687 12.4398C7.40794 12.4381 7.54223 12.379 7.63902 12.2762L9.76206 10.1636V17.032C9.76956 17.3139 10.0004 17.5385 10.2823 17.5385L10.2823 17.5387Z" />
        </svg>
      );
    default:
      return "";
  }
};

function App({ domElement }) {
  const [documentVerificationResponse, setDocumentVerificationResponse] =
    useState(null);
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
    setDocumentVerificationResponse(null);
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
          setDocumentVerificationResponse(data);
          if (data.isVerifyDocument === true) {
            messageHandler("Verified match on the blockchain.", "success");
            if (data.integrantId) {
              setProductDetailLoading(true);
              const productType = domElement.getAttribute("data-type");
              const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  id: data.integrantId,
                  type: productType,
                }),
              };
              fetch(
                process.env.REACT_APP_API_URL + "/client-app/verify",
                requestOptions
              )
                .then((response) => response.json())
                .then((data) => {
                  setProductDetailLoading(false);
                  if (!data?.data?.IntegrantId) {
                    setBlockchainProofData([]);
                    messageHandler("Blockchain data not found!");
                  } else {
                    setBlockchainProofData(data);
                  }
                })
                .catch((e) => {
                  console.log(e);
                  setProductDetailLoading(false);
                  setBlockchainProofData([]);
                  messageHandler(
                    "Something went wrong! Please try after sometime."
                  );
                });
            } else {
              setBlockchainProofData([]);
            }
          } else {
            setBlockchainProofData([]);
            messageHandler("Not a verified match on the blockchain.");
          }
        })
        .catch((e) => {
          console.log(e);
          setDocumentLoading(false);
          setBlockchainProofData([]);
          messageHandler("Something went wrong! Please try after sometime.");
        });
    }
  }

  return (
    <Box>
      <Box className="healthloq-widget-blockchain-button" onClick={handleOpen}>
        <Typography variant="body1">Blockchain Proof</Typography>
        {getIcon("blockchain-proof")}
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
                startIcon={getIcon("upload")}
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
                      setDocumentVerificationResponse(null);
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
            {!Boolean(documentVerificationResponse?.integrantId) &&
              documentVerificationResponse?.isVerifyDocument && (
                <div className="healthloq-widget-document-hash-detail">
                  <h4>Document Submitted By:</h4>
                  <div>
                    <div>
                      <img
                        src={
                          documentVerificationResponse?.data?.organization
                            ?.logo_url
                        }
                        alt="Organization Logo"
                      />
                    </div>
                    <div>
                      <h6>Organization Name:</h6>
                      <p>
                        {documentVerificationResponse?.data?.organization?.name}
                      </p>
                    </div>
                  </div>
                  <p>
                    Document Submitted At:&nbsp;
                    <span>
                      {moment(
                        documentVerificationResponse?.data?.created_on
                      ).format("MM/DD/YYYY hh:mm A")}
                    </span>
                  </p>
                </div>
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
