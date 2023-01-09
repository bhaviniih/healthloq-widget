import { Box, Button, Link, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import moment from "moment";
import React from "react";
import { BlockchainProofIcon } from "../assets";

const useStyle = makeStyles((theme) => ({
  orgExhibitBox: {
    border: `2px solid ${theme.palette.primary.main}`,
    borderRadius: 10,
    padding: 20,
    "&>*:not(:last-child)": {
      marginBottom: 15,
    },
  },
}));

export default function OrgExhibitBlockchainProof({ organizationExhibitData }) {
  const classes = useStyle();
  return (
    <Box display="flex" flexDirection={"column"}>
      <Typography
        variant="h4"
        textAlign={"center"}
        textTransform="capitalize"
        sx={{ my: 1 }}
        highlight="true"
      >
        <span>
          <Link
            href={`${process.env.REACT_APP_CLIENT_URL_UI}/organization-detail/${organizationExhibitData?.orgDetail?.id}`}
            target={"_blank"}
          >
            {organizationExhibitData?.orgDetail?.name}
          </Link>
        </span>
        &nbsp;Organization Document
      </Typography>
      <Box
        className={classes.orgExhibitBox}
        display="flex"
        flexDirection={"column"}
      >
        <Box display={"flex"} flexDirection="column">
          <Typography variant="h6">Title</Typography>
          <Typography variant="body1">
            {organizationExhibitData?.title}
          </Typography>
        </Box>
        <Box display={"flex"} flexDirection="column">
          <Typography variant="h6">Description</Typography>
          <Typography variant="body1">
            {organizationExhibitData?.description}
          </Typography>
        </Box>
        <Box display={"flex"} flexDirection="column">
          <Typography variant="h6">Effective Date</Typography>
          <Typography variant="body1">
            {moment(organizationExhibitData?.effective_date).format(
              "MM/DD/YYYY hh:mm A"
            )}
          </Typography>
        </Box>
        <Box display={"flex"} alignItems="center" justifyContent={"flex-start"}>
          <Button
            variant="contained"
            startIcon={<BlockchainProofIcon fill="#fff" />}
            title="Verify to check the document on the blockchain "
          >
            Blockchain Proof
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
