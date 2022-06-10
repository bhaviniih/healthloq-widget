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
              <DialogTitle id="alert-dialog-title">
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
                    <input type="file" name="blockchain_proof" id="blockchain_proof" onChange={(e) => {setblockchainProofDocument(e.target.files[0]); setviewMessage(""); setBlockchainDataNotFound("");}} />
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
              <DialogActions>
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