import { Box, Typography } from "@mui/material";
import React from "react";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import clsx from "clsx";
import { makeStyles } from "@mui/styles";

const useStyle = makeStyles((theme) => ({
  root: {
    width: "100%",
    borderRadius: 10,
    border: `2px solid ${theme.palette.error.main}`,
    maxWidth: 700,
    margin: "0 auto",
    "&>div": {
      "&:first-child": {
        display: "flex",
        alignItems: "center",
        padding: "5px 20px",
        borderBottom: `2px solid ${theme.palette.error.main}`,
        background: "#D6513F30",
        "&>h5": {
          textAlign: "center",
          fontWeight: 700,
          width: "calc(100% - 65px)",
        },
        "&>svg": {
          width: 50,
          height: 50,
          color: theme.palette.error.main,
          marginLeft: 15,
        },
      },
      "&:last-child": {
        padding: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        "&>p": {
          width: "100%",
          textAlign: "center",
          "&>span": {
            fontWeight: 700,
          },
        },
      },
    },
  },
}));

export default function HashNotVerifiedErrorMsg({
  hashType = "",
  organization_name = "",
  is_expired = false,
}) {
  const classes = useStyle();
  return (
    <Box
      className={clsx(
        classes.root,
        is_expired && "blockchain-proof-expired",
        "blockchain-proof-error-msg"
      )}
    >
      <Box>
        <Typography variant="h5">{hashType} Status: Not Verified</Typography>
        <CancelOutlinedIcon />
      </Box>
      <Box>
        <Typography variant="body1">
          {hashType === "Document" && (
            <>
              This document is <span>not verified</span> as authentic or
              digitally signed by a participating organization.
            </>
          )}
          {hashType === "Organization" && (
            <>
              <span>{organization_name}</span> has not published verifiable
              certifications.
            </>
          )}
        </Typography>
      </Box>
    </Box>
  );
}
