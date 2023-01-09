import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";

export default function ProductBlockchainProof({ blockchainProof }) {
  const [openShowProofDialog, setOpenShowProofDialog] = useState(false);
  return (
    <Box className="healthloq-widget-product-detail">
      <Grid item sx={{ mb: 1 }}>
        <Typography variant="h5" className="healthloq-widget-h5">
          Block Location
        </Typography>
        <Typography variant="body1" className="healthloq-widget-body1">
          <span>Block ID:</span>
          {blockchainProof?.blockAddress?.IonText}
        </Typography>
      </Grid>
      <Grid item sx={{ mb: 1 }}>
        <Typography
          variant="h5"
          className="healthloq-widget-h5 healthloq-widget-verified-icon"
        >
          Status: Verified
          {blockchainProof?.result ? (
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
          <Typography variant="body1" className="healthloq-widget-body1">
            <span>Product Name:</span>
            {blockchainProof?.data?.Title}
          </Typography>
          <Typography variant="body1" className="healthloq-widget-body1">
            <span>Batch ID:</span>
            {blockchainProof?.data?.ExternalId}
          </Typography>
          <Typography
            variant="h5"
            sx={{ mt: 2 }}
            className="healthloq-widget-h5"
          >
            Digitally Signed By
          </Typography>
          <Typography variant="body1" className="healthloq-widget-body1">
            <span>Organization Name:</span>
            {blockchainProof?.data?.OrganizationName}
          </Typography>
          <Typography variant="body1" className="healthloq-widget-body1">
            <span>Organization Id:</span>
            {blockchainProof?.data?.OrganizationId}
          </Typography>
        </Grid>
        <Grid item className="healthloq-widget-product-image">
          <img
            src={blockchainProof?.data?.IntegrantTypeImageUrl}
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
                    {blockchainProof?.data?.IntegrantId}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Title</TableCell>
                  <TableCell component="th">
                    {blockchainProof?.data?.Title}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Description</TableCell>
                  <TableCell component="th">
                    {blockchainProof?.data?.Description}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Buy Again Url</TableCell>
                  <TableCell component="th">
                    {blockchainProof?.data?.BuyAgainUrl}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">External Id</TableCell>
                  <TableCell component="th">
                    {blockchainProof?.data?.ExternalId}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">External Id Slug</TableCell>
                  <TableCell component="th">
                    {blockchainProof?.data?.ExternalIdSlug}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Facets</TableCell>
                  <TableCell component="th">
                    {blockchainProof?.data?.Facets}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Other Facets</TableCell>
                  <TableCell component="th">
                    {blockchainProof?.data?.OtherFacets}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Qr Url</TableCell>
                  <TableCell component="th">
                    {blockchainProof?.data?.QrUrl}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Integrant Type Id</TableCell>
                  <TableCell component="th">
                    {blockchainProof?.data?.IntegrantTypeId}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Integrant Type Title</TableCell>
                  <TableCell component="th">
                    {blockchainProof?.data?.IntegrantTypeTitle}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Member Type Directions</TableCell>
                  <TableCell component="th">
                    {blockchainProof?.data?.IntegrantTypeDirections}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Integrant Type Warnings</TableCell>
                  <TableCell component="th">
                    {blockchainProof?.data?.IntegrantTypeWarnings}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Member Type Image Url</TableCell>
                  <TableCell component="th">
                    {blockchainProof?.data?.IntegrantTypeImageUrl}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">
                    Integrant Type Current Integrant Id
                  </TableCell>
                  <TableCell component="th">
                    {blockchainProof?.data?.IntegrantTypeCurrentIntegrantId}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Member Type External Id</TableCell>
                  <TableCell component="th">
                    {blockchainProof?.data?.IntegrantTypeExternalId}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Organization Id</TableCell>
                  <TableCell component="th">
                    {blockchainProof?.data?.OrganizationId}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Organization Name</TableCell>
                  <TableCell component="th">
                    {blockchainProof?.data?.OrganizationName}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Location Id</TableCell>
                  <TableCell component="th">
                    {blockchainProof?.data?.LocationId}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Location Line1</TableCell>
                  <TableCell component="th">
                    {blockchainProof?.data?.LocationLine1}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Location Line2</TableCell>
                  <TableCell component="th">
                    {blockchainProof?.data?.LocationLine2}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Location City</TableCell>
                  <TableCell component="th">
                    {blockchainProof?.data?.LocationCity}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Location State</TableCell>
                  <TableCell component="th">
                    {blockchainProof?.data?.LocationState}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Location Zip</TableCell>
                  <TableCell component="th">
                    {blockchainProof?.data?.LocationZip}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Location Coordinates</TableCell>
                  <TableCell component="th">
                    {blockchainProof?.data?.LocationCoordinates}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Location Country</TableCell>
                  <TableCell component="th">
                    {blockchainProof?.data?.LocationCountry}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Created By</TableCell>
                  <TableCell component="th">
                    {blockchainProof?.data?.CreatedBy}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Updated By</TableCell>
                  <TableCell component="th">
                    {blockchainProof?.data?.UpdatedBy}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Is Published</TableCell>
                  <TableCell component="th">
                    {blockchainProof?.data?.IsPublished}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Created On</TableCell>
                  <TableCell component="th">
                    {blockchainProof?.data?.CreatedOn}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th">Updated On</TableCell>
                  <TableCell component="th">
                    {blockchainProof?.data?.UpdatedOn}
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
