import { Box, Typography } from "@mui/material";
import React from "react";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import clsx from "clsx";
import moment from "moment";
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
        padding: "10px 20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        "&>p": {
          textAlign: "center",
          "&:nth-child(1)": {
            marginBottom: 10,
          },
          "&:nth-child(2)": {
            "&>span": {
              "&:nth-child(2)": {
                fontStyle: "italic",
              },
            },
          },
          "&:nth-child(4)": {
            fontWeight: 700,
          },
          "& span": {
            fontWeight: 700,
          },
        },
      },
    },
  },
  expiredDoc: {
    border: `2px solid #FFAA1D`,
    "&>div": {
      "&:first-child": {
        borderBottom: `2px solid #FFAA1D`,
        background: "#FFAA1D30",
        "&>svg": {
          color: "#FFAA1D",
        },
      },
    },
  },
}));

export default function ExpiredDocument({
  effective_date = null,
  organization_name = "",
  organization_domain = "",
  verified_at = null,
}) {
  const classes = useStyle();
  return (
    <Box
      className={clsx(
        classes.root,
        classes.expiredDoc,
        "blockchain-proof-expired"
      )}
    >
      <Box>
        <Typography variant="h5">Document Status: Expired</Typography>
        <CancelOutlinedIcon />
      </Box>
      <Box>
        <Typography variant="body1">
          This document was expired at&nbsp;
          <span>{moment(effective_date).format("MM/DD/YYYY")}</span>, unaltered
          document as submitted by:
        </Typography>
        <Typography variant="body1">
          <span>{organization_name}</span>&nbsp;
          {Boolean(organization_domain)
            ? `from <span>${organization_domain}</span>`
            : null}
        </Typography>
        <Typography variant="body2">on</Typography>
        <Typography variant="body1">
          {moment(verified_at).format("MM/DD/YYYY")}
        </Typography>
      </Box>
    </Box>
  );
}
