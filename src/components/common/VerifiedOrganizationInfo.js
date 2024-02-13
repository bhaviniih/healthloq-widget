import { Box, Typography } from "@mui/material";
import React from "react";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import moment from "moment";
import { makeStyles } from "@mui/styles";

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
          marginBottom: 10,
          textAlign: "center",
          "&>span": {
            fontWeight: 700,
          },
        },
      },
      "&:last-child": {
        padding: "10px 20px",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        "&>div": {
          padding: 20,
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          maxWidth: 200,
          "&>img": {
            width: 60,
            height: 60,
            objectFit: "contain",
            marginBottom: 5,
          },
          "&>p": {
            textAlign: "center",
            "&:nth-child(2)": {
              fontWeight: 700,
            },
          },
          "&:hover": {
            boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
          },
        },
      },
    },
  },
}));

export default function VerifiedOrganizationInfo({
  organization_name = "",
  govEntity = [],
  onOrganizationClick = () => {},
}) {
  const classes = useStyle();
  return (
    <Box className={classes.root}>
      <Box>
        <Typography variant="h5">Organization Status: Verified</Typography>
        <CheckCircleOutlinedIcon />
      </Box>
      <Box>
        <Typography variant="body1">
          The following organizations have issued certifications
          validating&nbsp;<span>{organization_name}</span>.
        </Typography>
        <Typography variant="body1">
          Original, verified accreditation issued directly from, and digitally
          signed by the issuing organization.
        </Typography>
      </Box>
      <Box>
        {govEntity?.map((item, key) => {
          return (
            <Box key={key} onClick={() => onOrganizationClick(item)}>
              <img
                src={`${process.env.REACT_APP_CLIENT_URL_UI}/assets/images/logo/certificateLogo.jpg`}
                alt="Organization Logo"
              />
              <Typography variant="body1">{item?.name}</Typography>
              {Boolean(item?.domain) && (
                <Typography variant="body2" fontWeight={700}>
                  {item?.domain}
                </Typography>
              )}
              <Typography variant="body2">
                {moment(item?.verified_at).format("MM/DD/YYYY")}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
