import React, { useEffect, useState } from 'react';
import './App.css';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import CircularProgress from '@mui/material/CircularProgress';
const uploadIcon = "/assets/upload-icon.svg";


function App({ domElement }) {
  const productId = domElement.getAttribute("data-product-id")
  const organizationId = domElement.getAttribute("data-organization-id")
  const productType = domElement.getAttribute("data-type")
  const [loading, setLoading] = useState();
  const [popupLoading, setPopupLoading] = useState();
  const [error, setError] = useState('');
  const [blockchainProofData, setblockchainProofData] = useState([]);
  const [viewMessage, setviewMessage] = useState("");
  const [blockchainDataNotFound, setBlockchainDataNotFound] = useState("");

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
    setblockchainProofData([]);
    setBlockchainDataNotFound("");
    // setLoading(true)
    // const requestOptions = {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ id: productId, type: productType })
    // };
    // // fetch("https://healthloqserviceapi-dev.azurewebsites.net/client-app/verify", requestOptions)
    // fetch(process.env.REACT_APP_API_URL+"/client-app/verify", requestOptions)
    // .then((response) => response.json())
    // .then((data) => {
    //   setblockchainProofData();
    //   setLoading(false);
    //   setblockchainProofData(data);
    //   setviewMessage("");
    //   setOpen(true);
    // })
    // .catch((e) => {
    //   setblockchainProofData();
    //   console.log(e)
    //   setLoading(false);
    //   setviewMessage('Error fetching from verify');
    // });
  }
  const [blockchainProofDocument, setblockchainProofDocument] = useState(null)
  const handleClose = () => {
    setOpen(false);
    setblockchainProofDocument(null);
    setviewMessage('');
    setblockchainProofData([]);
    setBlockchainDataNotFound("");
  };

  function handleSubmit(event) {
    event.preventDefault();
    setblockchainProofData([]);
    setBlockchainDataNotFound("");
    if (!blockchainProofDocument) {
      // alert('Please select file!');
      setviewMessage('Please select document!');
    } else {
      setPopupLoading(true);
      setviewMessage('');
      const formData = new FormData();
      formData.append('id', productId);
      formData.append('organization_id', organizationId);
      formData.append('type', "integrant");
      formData.append('files[]', blockchainProofDocument);
      const requestOptions = {
          method: 'POST',
          body: formData
      };
      // fetch("http://localhost:3005/client-app/verify-document", requestOptions)
      fetch(process.env.REACT_APP_API_URL+"/client-app/verify-document", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.isVerifyDocument == true) {
          setviewMessage('Verified match on the blockchain.');
          // setPopupLoading(true)
          const requestOptions = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ id: data.integrantId, type: productType })
          };
          // fetch("https://healthloqserviceapi-dev.azurewebsites.net/client-app/verify", requestOptions)
          fetch(process.env.REACT_APP_API_URL+"/client-app/verify", requestOptions)
          .then((response) => response.json())
          .then((data) => {
            setblockchainProofData();
            setPopupLoading(false);
            setblockchainProofData(data);
            setOpen(true);
            if(!data?.data?.IntegrantId){
              setBlockchainDataNotFound("Blockchain data not found!");
            }
          })
          .catch((e) => {
            setBlockchainDataNotFound("");
            setblockchainProofData();
            console.log(e)
            setPopupLoading(false);
            setviewMessage('Error fetching from verify');
          });
        } else {
          setBlockchainDataNotFound("");
          setPopupLoading(false);
          setviewMessage('Verified not match on the blockchain.');
        }
        // setblockchainProofData(data);
        // setOpen(true);
      })
      .catch((e) => {
        setviewMessage(e);
        console.log(e)
        setPopupLoading(false);
        setBlockchainDataNotFound("");
        setviewMessage('Error fetching from document verify!');
        // setError('error fetching from document verify');
      });
    }
  }  

  return (
    <div>
      <div className="healthloq-widget-svg-icon" onClick={handleOpen} title="Blockchain Proof">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="#fff" xmlns="http://www.w3.org/2000/svg" >
          <path d="M6.86524 7.89342V8.92019C6.86524 9.24867 7.13138 9.51496 7.45986 9.51496C7.78834 9.51496 8.05463 9.24868 8.05463 8.92019V7.32703L9.24399 6.76061V9.81226C9.24399 10.1406 9.51013 10.4069 9.83861 10.4069C10.1671 10.4069 10.4332 10.1406 10.4332 9.81226V6.76061L11.6226 7.32703V8.92019C11.6226 9.24867 11.8889 9.51496 12.2174 9.51496C12.5458 9.51496 12.812 9.24868 12.812 8.92019V7.89342L16.0468 9.43383L9.83847 12.423L3.6301 9.43383L6.86524 7.89342ZM9.24399 20L3.33891 17.188C3.13187 17.0894 3 16.8805 3 16.6511V10.4503L9.24411 13.4568L9.24399 20ZM16.6774 10.4501V16.6508C16.6774 16.8803 16.5455 17.0892 16.3385 17.1878L10.4334 19.9998V13.4564L16.6774 10.4501ZM12.8119 7.89335L11.6226 7.32692V6.54134C11.6226 6.3161 11.7499 6.1102 11.9514 6.0095L14.0013 4.98443V4.16259C14.0013 4.12197 14.0054 4.08234 14.0132 4.04398C13.4817 3.81733 13.1094 3.29013 13.1094 2.6759C13.1094 1.85478 13.775 1.18921 14.5961 1.18921C15.4171 1.18921 16.0828 1.85478 16.0828 2.6759C16.0828 3.29013 15.7103 3.8173 15.1789 4.04398C15.1866 4.08234 15.1907 4.12197 15.1907 4.16259V5.35194C15.1907 5.57718 15.0635 5.78308 14.862 5.88393L12.812 6.90886L12.8119 7.89335ZM8.05467 7.32692L6.86531 7.89335V6.90889L4.81534 5.88396C4.6138 5.78312 4.48658 5.5772 4.48658 5.35198V4.16263C4.48658 4.12201 4.49067 4.08237 4.49843 4.04401C3.96699 3.81737 3.59453 3.29016 3.59453 2.67593C3.59453 1.85482 4.26024 1.18925 5.08121 1.18925C5.90233 1.18925 6.5679 1.85482 6.5679 2.67593C6.5679 3.29016 6.19558 3.81734 5.66414 4.04401C5.67189 4.08237 5.67599 4.12201 5.67599 4.16263V4.98446L7.72595 6.00954C7.92736 6.11024 8.05471 6.31615 8.05471 6.54137L8.05467 7.32692ZM10.4333 6.7605L10.0944 6.59915C9.93259 6.52214 9.74473 6.52214 9.58296 6.59915L9.24405 6.7605V2.97338C9.24405 2.93276 9.248 2.89313 9.25575 2.85476C8.72446 2.62812 8.35199 2.10091 8.35199 1.48669C8.35199 0.665571 9.01756 0 9.83868 0C10.6598 0 11.3254 0.665571 11.3254 1.48669C11.3254 2.10091 10.9529 2.62809 10.4216 2.85476C10.4294 2.89313 10.4333 2.93276 10.4333 2.97338L10.4333 6.7605Z" />
        </svg>
      </div>
        { !loading
          ?
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              className={blockchainProofData?.data?.Title ? "healthloq-widget-dialog_contact" : "healthloq-widget-dialog_contact_no_data" }
            >
              <DialogTitle id="alert-dialog-title" className="healthloq-widget-header">
                <a href={`${process.env.REACT_APP_CLIENT_URL_UI}`} target="_blank" className="healthloq">
                  <img src={`${process.env.REACT_APP_CLIENT_URL_UI}/assets/images/logo/healthloq.png`} alt="Healthloq" title="Healthloq" className="healthloq" />
                </a>
                Blockchain Proof
              </DialogTitle>
              <DialogContent className="healthloq-widget-dialog-actions">

                { /*!popupLoading &&
                  <div className="healthloq-widget-circular-progress">
                    <CircularProgress sx={{color:"rgba(0,121,55,.7098039215686275)"}} size={100} />
                  </div>
                */}

                <DialogContentText id="alert-dialog-description">
                  <form method="POST" onSubmit={handleSubmit} enctype="multipart/form-data">
                    <b>Document to be verified:</b>
                    <br/><br/>
                    <label></label>


                    <div className="healthloq-widget-headerBlockchainVerifyProofBox mb20">
                      <input
                        type="file"
                        id="blockchain_proof" 
                        onChange={(e) => {setblockchainProofDocument(e.target.files[0]); setviewMessage(""); setBlockchainDataNotFound("");}}
                        style={{ display: "none" }}
                      />
                      <label for="blockchain_proof">
                        <div className="healthloq-widget-upload-btn">
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="#fff" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.2975 10.5489L19.1727 10.4207V10.4205C18.7596 10.028 18.2348 9.77344 17.6708 9.69211C17.89 8.09653 17.4281 6.48262 16.3977 5.2449C16.3111 5.14085 16.2175 5.0368 16.1236 4.93614C16.0299 4.83548 15.9363 4.73506 15.8356 4.64118V4.64142C14.3918 3.22103 12.3043 2.67083 10.3479 3.1947C8.29893 3.7193 6.65956 5.25387 6.00139 7.26392C5.98615 7.27239 5.96776 7.27239 5.95276 7.26392C5.20799 6.86152 4.35452 6.70714 3.51609 6.82305C2.67742 6.93919 1.89803 7.31957 1.29041 7.909C1.2246 7.97143 1.15854 8.04088 1.09611 8.11008V8.11032C1.03005 8.17735 0.967625 8.24801 0.908827 8.32181C0.424158 8.91077 0.118535 9.62649 0.0280336 10.3839C-0.0622201 11.1415 0.0665067 11.909 0.398978 12.5955C0.732173 13.3127 1.26354 13.9193 1.93044 14.3442C2.59734 14.7689 3.37208 14.9939 4.16287 14.9925H7.22574C7.5132 14.9925 7.74622 14.7594 7.74622 14.4722C7.74622 14.1848 7.5132 13.9517 7.22574 13.9517H4.16962C3.57196 13.9583 2.98518 13.7911 2.48063 13.4702C1.97637 13.1494 1.57612 12.6887 1.32858 12.1445C1.07742 11.6371 0.978937 11.0677 1.04548 10.5054C1.11202 9.94302 1.34044 9.41216 1.70315 8.97755C1.75178 8.92214 1.79679 8.86648 1.84882 8.81107L2.0015 8.655V8.65476C2.45689 8.21389 3.04223 7.93149 3.6706 7.84898C4.29922 7.76647 4.93756 7.88842 5.49122 8.19694C5.78038 8.34624 6.12058 8.36003 6.42089 8.23517C6.71102 8.11733 6.93266 7.87536 7.02461 7.57602C7.5676 5.91125 8.92725 4.64212 10.6252 4.21452C12.2326 3.78405 13.9477 4.23508 15.1348 5.40088C15.218 5.48074 15.3013 5.56397 15.3811 5.6506C15.461 5.73722 15.5372 5.82748 15.6137 5.91773C16.4574 6.93282 16.8352 8.25615 16.6542 9.5635C16.615 9.84709 16.6921 10.1346 16.8678 10.3605C17.0435 10.5865 17.3029 10.732 17.5874 10.7639C17.918 10.7983 18.2265 10.9454 18.4617 11.1801L18.5449 11.2667L18.6248 11.3534L18.6245 11.3536C18.8142 11.5813 18.9333 11.8593 18.9679 12.1538C19.0022 12.448 18.9505 12.7461 18.8188 13.0116C18.6867 13.295 18.4764 13.5345 18.2129 13.7022C17.9492 13.8699 17.6431 13.9589 17.3307 13.9587H13.2895C13.0021 13.9587 12.7691 14.1917 12.7691 14.4789C12.7691 14.7664 13.0021 14.9994 13.2895 14.9994H17.317C17.827 15.0016 18.327 14.8571 18.7574 14.5834C19.1876 14.31 19.5305 13.9185 19.7451 13.4556C19.96 13.0087 20.0416 12.5093 19.9801 12.0171C19.9186 11.5249 19.7166 11.0607 19.3981 10.6807L19.2975 10.5489Z"/>
                            <path d="M10.2823 17.5387C10.5698 17.5387 10.8028 17.3057 10.8028 17.0182V10.2018L12.9222 12.3595C13.019 12.4582 13.1516 12.5131 13.29 12.5121C13.4993 12.5119 13.6883 12.3863 13.7694 12.1932C13.8504 12.0001 13.8076 11.777 13.661 11.6275L10.7193 8.65798L10.7196 8.65823C10.6257 8.50699 10.4604 8.41504 10.2823 8.41528H10.2477C10.2015 8.41746 10.1558 8.4269 10.1125 8.44311C10.0304 8.46465 9.95543 8.50651 9.89397 8.56458L6.9073 11.5374H6.90706C6.80349 11.633 6.743 11.7668 6.73986 11.9081C6.73695 12.0492 6.79115 12.1854 6.89061 12.2859C6.98982 12.386 7.12556 12.4417 7.26687 12.4398C7.40794 12.4381 7.54223 12.379 7.63902 12.2762L9.76206 10.1636V17.032C9.76956 17.3139 10.0004 17.5385 10.2823 17.5385L10.2823 17.5387Z"/>
                          </svg>
                          Upload
                        </div>
                      </label>
                      {blockchainProofDocument && (
                        <p className="healthloq-widget-uploadedImageName">{blockchainProofDocument?.name}</p>
                      )}
                    </div>


                    { viewMessage
                      ?
                        <p style={{ color:"green" }}>{viewMessage}</p>
                      :
                        <>
                          <br/><br/>
                        </>
                    }
                    <div className="healthloq-widget-btn-loader">
                      <Button type="submit" className="healthloq-widget-btn-ui" disabled={popupLoading}>Verify  { popupLoading && <CircularProgress sx={{color:"#fff", marginLeft: "10px",}} size={20} /> }</Button>
                    </div>
                  </form>
                </DialogContentText>
                <br/><br/>
                { blockchainDataNotFound
                  ?
                    <>
                      <DialogContentText id="alert-dialog-description">
                        {loading ? "Loading…" : blockchainDataNotFound }
                      </DialogContentText>
                      <br /><br />
                    </>
                  : ""
                }
                { blockchainProofData?.data?.Title 
                  ?
                    <>
                      <DialogContentText id="alert-dialog-description">
                        Block Location <br />
                        Block ID: {blockchainProofData?.blockAddress?.IonText}
                      </DialogContentText>
                      <br />
                      <DialogContentText id="alert-dialog-description" className="healthloq-widget-verified-status">
                        Status: Verified { blockchainProofData?.result ? <img src={`${process.env.REACT_APP_CLIENT_URL_UI}/assets/images/icon/icon-correct.png`} /> : <img src={`${process.env.REACT_APP_CLIENT_URL_UI}/assets/images/icon/icon-wrong.png`} /> }
                      </DialogContentText>
                      <div className="healthloq-widget-main-content-section">
                        <div className="healthloq-widget-sub-content-section">
                          <DialogContentText id="alert-dialog-description">
                            <b>Product Information</b> <br />
                            Product Name: {blockchainProofData?.data?.Title} <br />
                            Batch ID: {blockchainProofData?.data?.ExternalId}
                          </DialogContentText>
                          <br />
                          <DialogContentText id="alert-dialog-description">
                            <b>Digitally Signed By</b> <br />
                            Organization Name: {blockchainProofData?.data?.OrganizationName} <br />
                            Organization Id: {blockchainProofData?.data?.OrganizationId}
                          </DialogContentText>
                        </div>
                        <div>
                          <img src={blockchainProofData?.data?.IntegrantTypeImageUrl} />
                        </div>
                      </div>

                      <br /><br />
                      <Accordion className="healthloq-widget-accordion-tab">
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <Typography>Show Proof</Typography>
                        </AccordionSummary>
                        <AccordionDetails className="healthloq-widget-accordion-details">
                          <Typography>                
                            <DialogContentText id="alert-dialog-description">
                              <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                  <TableBody>
                                    <TableRow
                                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                      <TableCell component="th" scope="row">
                                        Integrant Id
                                      </TableCell>
                                      <TableCell component="th" scope="row">
                                        {blockchainProofData?.data?.IntegrantId}
                                      </TableCell>
                                    </TableRow>
                                    <TableRow
                                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                      <TableCell component="th" scope="row">
                                        Title
                                      </TableCell>
                                      <TableCell component="th" scope="row">
                                        {blockchainProofData?.data?.Title}
                                      </TableCell>
                                    </TableRow>
                                    <TableRow
                                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                      <TableCell component="th" scope="row">
                                        Description
                                      </TableCell>
                                      <TableCell component="th" scope="row">
                                        {blockchainProofData?.data?.Description}
                                      </TableCell>
                                    </TableRow>
                                    <TableRow
                                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                      <TableCell component="th" scope="row">
                                        Buy Again Url
                                      </TableCell>
                                      <TableCell component="th" scope="row">
                                        {blockchainProofData?.data?.BuyAgainUrl}
                                      </TableCell>
                                    </TableRow>
                                    <TableRow
                                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                      <TableCell component="th" scope="row">
                                        External Id
                                      </TableCell>
                                      <TableCell component="th" scope="row">
                                        {blockchainProofData?.data?.ExternalId}
                                      </TableCell>
                                    </TableRow>
                                    <TableRow
                                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                      <TableCell component="th" scope="row">
                                        External Id Slug
                                      </TableCell>
                                      <TableCell component="th" scope="row">
                                        {blockchainProofData?.data?.ExternalIdSlug}
                                      </TableCell>
                                    </TableRow>
                                    <TableRow
                                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                      <TableCell component="th" scope="row">
                                        Facets
                                      </TableCell>
                                      <TableCell component="th" scope="row">
                                        {blockchainProofData?.data?.Facets}
                                      </TableCell>
                                    </TableRow>
                                    <TableRow
                                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                      <TableCell component="th" scope="row">
                                        Other Facets
                                      </TableCell>
                                      <TableCell component="th" scope="row">
                                        {blockchainProofData?.data?.OtherFacets}
                                      </TableCell>
                                    </TableRow>
                                    <TableRow
                                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                      <TableCell component="th" scope="row">
                                        Qr Url
                                      </TableCell>
                                      <TableCell component="th" scope="row">
                                        {blockchainProofData?.data?.QrUrl}
                                      </TableCell>
                                    </TableRow>
                                    <TableRow
                                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                      <TableCell component="th" scope="row">
                                        Integrant Type Id
                                      </TableCell>
                                      <TableCell component="th" scope="row">
                                        {blockchainProofData?.data?.IntegrantTypeId}
                                      </TableCell>
                                    </TableRow>
                                    <TableRow
                                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                      <TableCell component="th" scope="row">
                                        Integrant Type Title
                                      </TableCell>
                                      <TableCell component="th" scope="row">
                                        {blockchainProofData?.data?.IntegrantTypeTitle}
                                      </TableCell>
                                    </TableRow>
                                    <TableRow
                                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                      <TableCell component="th" scope="row">
                                        Member Type Directions
                                      </TableCell>
                                      <TableCell component="th" scope="row">
                                        {blockchainProofData?.data?.IntegrantTypeDirections}
                                      </TableCell>
                                    </TableRow>
                                    <TableRow
                                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                      <TableCell component="th" scope="row">
                                        Integrant Type Warnings
                                      </TableCell>
                                      <TableCell component="th" scope="row">
                                        {blockchainProofData?.data?.IntegrantTypeWarnings}
                                      </TableCell>
                                    </TableRow>
                                    <TableRow
                                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                      <TableCell component="th" scope="row">
                                        Member Type Image Url
                                      </TableCell>
                                      <TableCell component="th" scope="row">
                                        {blockchainProofData?.data?.IntegrantTypeImageUrl}
                                      </TableCell>
                                    </TableRow>
                                    <TableRow
                                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                      <TableCell component="th" scope="row">
                                        Integrant Type Current Integrant Id
                                      </TableCell>
                                      <TableCell component="th" scope="row">
                                        {blockchainProofData?.data?.IntegrantTypeCurrentIntegrantId}
                                      </TableCell>
                                    </TableRow>
                                    <TableRow
                                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                      <TableCell component="th" scope="row">
                                        Member Type External Id
                                      </TableCell>
                                      <TableCell component="th" scope="row">
                                        {blockchainProofData?.data?.IntegrantTypeExternalId}
                                      </TableCell>
                                    </TableRow>
                                    <TableRow
                                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                      <TableCell component="th" scope="row">
                                        Organization Id
                                      </TableCell>
                                      <TableCell component="th" scope="row">
                                        {blockchainProofData?.data?.OrganizationId}
                                      </TableCell>
                                    </TableRow>
                                    <TableRow
                                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                      <TableCell component="th" scope="row">
                                        Organization Name
                                      </TableCell>
                                      <TableCell component="th" scope="row">
                                        {blockchainProofData?.data?.OrganizationName}
                                      </TableCell>
                                    </TableRow>
                                    <TableRow
                                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                      <TableCell component="th" scope="row">
                                        Location Id
                                      </TableCell>
                                      <TableCell component="th" scope="row">
                                        {blockchainProofData?.data?.LocationId}
                                      </TableCell>
                                    </TableRow>
                                    <TableRow
                                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                      <TableCell component="th" scope="row">
                                        Location Line1
                                      </TableCell>
                                      <TableCell component="th" scope="row">
                                        {blockchainProofData?.data?.LocationLine1}
                                      </TableCell>
                                    </TableRow>
                                    <TableRow
                                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                      <TableCell component="th" scope="row">
                                        Location Line2
                                      </TableCell>
                                      <TableCell component="th" scope="row">
                                        {blockchainProofData?.data?.LocationLine2}
                                      </TableCell>
                                    </TableRow>
                                    <TableRow
                                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                      <TableCell component="th" scope="row">
                                        Location City
                                      </TableCell>
                                      <TableCell component="th" scope="row">
                                        {blockchainProofData?.data?.LocationCity}
                                      </TableCell>
                                    </TableRow>
                                    <TableRow
                                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                      <TableCell component="th" scope="row">
                                        Location State
                                      </TableCell>
                                      <TableCell component="th" scope="row">
                                        {blockchainProofData?.data?.LocationState}
                                      </TableCell>
                                    </TableRow>
                                    <TableRow
                                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                      <TableCell component="th" scope="row">
                                        Location Zip
                                      </TableCell>
                                      <TableCell component="th" scope="row">
                                        {blockchainProofData?.data?.LocationZip}
                                      </TableCell>
                                    </TableRow>
                                    <TableRow
                                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                      <TableCell component="th" scope="row">
                                        Location Coordinates
                                      </TableCell>
                                      <TableCell component="th" scope="row">
                                        {blockchainProofData?.data?.LocationCoordinates}
                                      </TableCell>
                                    </TableRow>
                                    <TableRow
                                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                      <TableCell component="th" scope="row">
                                        Location Country
                                      </TableCell>
                                      <TableCell component="th" scope="row">
                                        {blockchainProofData?.data?.LocationCountry}
                                      </TableCell>
                                    </TableRow>
                                    <TableRow
                                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                      <TableCell component="th" scope="row">
                                        Created By
                                      </TableCell>
                                      <TableCell component="th" scope="row">
                                        {blockchainProofData?.data?.CreatedBy}
                                      </TableCell>
                                    </TableRow>
                                    <TableRow
                                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                      <TableCell component="th" scope="row">
                                        Updated By
                                      </TableCell>
                                      <TableCell component="th" scope="row">
                                        {blockchainProofData?.data?.UpdatedBy}
                                      </TableCell>
                                    </TableRow>
                                    <TableRow
                                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                      <TableCell component="th" scope="row">
                                        Is Published
                                      </TableCell>
                                      <TableCell component="th" scope="row">
                                        {blockchainProofData?.data?.IsPublished}
                                      </TableCell>
                                    </TableRow>
                                    <TableRow
                                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                      <TableCell component="th" scope="row">
                                        Created On
                                      </TableCell>
                                      <TableCell component="th" scope="row">
                                        {blockchainProofData?.data?.CreatedOn}
                                      </TableCell>
                                    </TableRow>
                                    <TableRow
                                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                      <TableCell component="th" scope="row">
                                        Updated On
                                      </TableCell>
                                      <TableCell component="th" scope="row">
                                        {blockchainProofData?.data?.UpdatedOn}
                                      </TableCell>
                                    </TableRow>
                                  </TableBody>
                                </Table>
                              </TableContainer>
                            </DialogContentText>
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    </>
                  :
                    ""
                }

              </DialogContent>
              <DialogActions className="healthloq-widget-footer">
                <p className="healthloq-widget-verified-by">
                  Verified By <a href={`${process.env.REACT_APP_CLIENT_URL_UI}`} target="_blank">HealthLoq</a>
                </p>
                <Button className="healthloq-widget-btn-ui" onClick={handleClose} autoFocus>Close</Button>
              </DialogActions>
            </Dialog>
          :
          <div className="healthloq-widget-circular-progress">
            <CircularProgress sx={{color:"rgba(0,121,55,.7098039215686275)"}} size={100} />
          </div>
        }
    </div>
  );
}

export default App;