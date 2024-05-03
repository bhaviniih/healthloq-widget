import { Box, Typography } from "@mui/material";
import React from "react";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import moment from "moment";
import clsx from "clsx";
import { makeStyles } from "@mui/styles";
import { getValidUrl } from "../../utils";

const useStyle = makeStyles((theme) => ({
  root: {
    width: "100%",
    borderRadius: 10,
    border: `2px solid ${theme.palette.primary.main}`,
    maxWidth: 700,
    margin: "0 auto",
    "&>div": {
      "&:first-child": {
        display: "flex",
        alignItems: "center",
        padding: "5px 20px",
        borderBottom: `2px solid ${theme.palette.primary.main}`,
        background: "#28A74530",
        "&>h5": {
          textAlign: "center",
          fontWeight: 700,
          width: "calc(100% - 65px)",
        },
        "&>svg": {
          width: 50,
          height: 50,
          color: theme.palette.primary.main,
          marginLeft: 15,
        },
      },
      "&:nth-child(2)": {
        padding: "10px 20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        "&>p": {
          "&:nth-child(1)": {
            marginBottom: 10,
          },
          "&:nth-child(2)": {
            "&>span": {
              fontWeight: 700,
              "&:nth-child(2)": {
                fontStyle: "italic",
                "&>a": {
                  color: theme.palette.primary.main,
                },
              },
            },
          },
          "&:nth-child(4)": {
            fontWeight: 700,
          },
        },
      },
      "&:last-child": {
        padding: "10px 20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        borderTop: `2px solid ${theme.palette.borderColor}`,
        "&>div": {
          "&:not(:last-child)": {
            marginBottom: 20,
          },
          "&>p": {
            textAlign: "center",
            "&:first-child": {
              fontWeight: 700,
            },
          },
        },
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
      "&:last-child": {
        borderTop: `2px solid ${theme.palette.borderColor}`,
      },
    },
  },
}));

export default function VerifiedDocumentInfo({
  organization_name = "",
  domain_name = "",
  verified_at = null,
  document_id = "",
  organization_id = "",
  batch_id = "",
  govEntity = [],
  is_expired = false,
}) {
  const classes = useStyle();
  return (
    <Box
      className={clsx(
        classes.root,
        is_expired && classes.expiredDoc,
        is_expired && "blockchain-proof-expired",
        !govEntity?.length && "blockchain-proof-error-msg"
      )}
    >
      <Box>
        <Typography variant="h5">Document Status: Verified</Typography>
        <CheckCircleOutlinedIcon />
      </Box>
      <Box>
        <Typography variant="body1">
          This document is verified as the original, unaltered document as
          submitted by:
        </Typography>
        <Typography variant="body1">
          <span>{organization_name}</span>&nbsp;
          {Boolean(domain_name) ? (
            <>
              from&nbsp;
              <span>
                <a href={getValidUrl(domain_name)} target="_blank">
                  {domain_name}
                </a>
              </span>
            </>
          ) : null}
        </Typography>
        <Typography variant="body2">on</Typography>
        <Typography variant="body1">
          {moment(verified_at).format("MM/DD/YYYY")}
        </Typography>
      </Box>
      <Box>
        <Box>
          <Typography variant="body1">Document Information</Typography>
          <Typography variant="body1">Document ID: {document_id}</Typography>
        </Box>
        <Box>
          <Typography variant="body1">Digitally Signed By</Typography>
          <Typography variant="body1">
            Organization Name: {organization_name}
          </Typography>
          <Typography variant="body1">
            Organization ID: {organization_id}
          </Typography>
        </Box>
        <Box>
          <Typography variant="body1">Block Location</Typography>
          <Typography variant="body1" style={{lineBreak : "anywhere"}}>Block ID: {batch_id?.IonText}</Typography>
        </Box>
      </Box>
    </Box>
  );
}
