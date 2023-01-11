import { Box, Button, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import ProductInfoDialog from "./ProductInfoDialog";

const useStyle = makeStyles((theme) => ({
  healthloqWidgetBlockchainProofBox: {
    border: `2px solid ${theme.palette.primary.main}`,
    borderRadius: 10,
    padding: 20,
    "& img": {
      marginLeft: 5,
    },
  },
  healthloqWidgetpPoductInfoDiv: {
    "&>div": {
      "&:first-child": {
        "&>*:not(:last-child)": {
          marginBottom: 20,
        },
      },
      "&>img": {
        width: "100%",
        height: "100%",
        maxWidth: 200,
        maxHeight: 200,
      },
    },
  },
}));

export default function BlockchainProof({ blockchainProof }) {
  const classes = useStyle();
  const [openShowProofDialog, setOpenShowProofDialog] = useState(false);
  return (
    <Box
      className={classes.healthloqWidgetBlockchainProofBox}
      display="flex"
      flexDirection={"column"}
    >
      <Typography variant="h6">Block Location</Typography>
      <Typography variant="body1" keyfontweight={700}>
        <span>Block ID:</span>
        {blockchainProof?.blockAddress?.IonText}
      </Typography>
      <Typography
        variant="h5"
        display={"flex"}
        alignItems="center"
        justifyContent={"flex-start"}
        sx={{ mt: 2, mb: 0.5 }}
      >
        Status: {blockchainProof?.result ? "Verified" : "Not Verified"}
        {blockchainProof?.result ? (
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
      <Grid
        container
        spacing={1}
        className={classes.healthloqWidgetpPoductInfoDiv}
      >
        <Grid
          item
          xs={12}
          sm={blockchainProof?.data?.IntegrantTypeImageUrl ? 8 : 12}
          sx={{ my: "auto" }}
        >
          {blockchainProof?.data?.type === "organization_exhibit" ? (
            <Box>
              <Typography variant="h6">Document Information</Typography>
              <Typography variant="body1" keyfontweight={700}>
                <span>Document Name:</span>
                {blockchainProof?.data?.title}
              </Typography>
              <Typography variant="body1" keyfontweight={700}>
                <span>Document ID:</span>
                {blockchainProof?.data?.id}
              </Typography>
            </Box>
          ) : blockchainProof?.data?.type === "document_hash" ? (
            <Box>
              <Typography variant="h6">Document Information</Typography>
              <Typography variant="body1" keyfontweight={700}>
                <span>Document ID:</span>
                {blockchainProof?.data?.id}
              </Typography>
            </Box>
          ) : (
            <Box>
              <Typography variant="h6">Product Information</Typography>
              <Typography variant="body1" keyfontweight={700}>
                <span>Product Name:</span>
                {blockchainProof?.data?.Title}
              </Typography>
              <Typography variant="body1" keyfontweight={700}>
                <span>Batch ID:</span>
                {blockchainProof?.data?.ExternalId}
              </Typography>
            </Box>
          )}
          <Box>
            <Typography variant="h6">Digitally Signed By</Typography>
            <Typography variant="body1" keyfontweight={700}>
              <span>Organization Name:</span>
              {blockchainProof?.data?.OrganizationName ||
                blockchainProof?.data?.organization_name}
            </Typography>
            <Typography variant="body1" keyfontweight={700}>
              <span>Organization Id:</span>
              {blockchainProof?.data?.OrganizationId ||
                blockchainProof?.data?.organization_id}
            </Typography>
          </Box>
        </Grid>
        {blockchainProof?.data?.IntegrantTypeImageUrl && (
          <Grid
            item
            xs={12}
            sm={4}
            display="flex"
            alignItems={"center"}
            justifyContent="center"
          >
            <img
              src={blockchainProof?.data?.IntegrantTypeImageUrl}
              alt="product-img"
            />
          </Grid>
        )}
      </Grid>
      <Box
        display={"flex"}
        alignItems="center"
        justifyContent={"flex-start"}
        sx={{ mt: 1 }}
      >
        <Button
          variant="contained"
          onClick={() => setOpenShowProofDialog(true)}
        >
          View More
        </Button>
      </Box>
      <ProductInfoDialog
        open={openShowProofDialog}
        handleClose={() => setOpenShowProofDialog(false)}
        data={blockchainProof?.data}
      />
    </Box>
  );
}
