import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Box, Typography } from "@mui/material";
import BlockchainProofDialog from "./components/BlockchainProofDialog";
import "./App.css";
const BlockchainProofIcon = () => (
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

const useStyle = makeStyles((theme) => ({
  healthloqWidgetBlockChainProofBtn: {
    padding: 10,
    borderRadius: "0 5px 5px 0",
    cursor: "pointer",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    position: "fixed",
    bottom: 30,
    left: 0,
    "&>svg": {
      fill: theme.palette.common.white,
      width: 20,
      height: 20,
    },
    "&>p": {
      transition: "all 0.2s",
      fontSize: 0,
    },
    "&:hover": {
      "&>p": {
        fontSize: "initial",
        marginRight: 10,
      },
    },
  },
}));

export default function App(props) {
  const classes = useStyle();
  const [openBlockchainProofDialog, setOpenBlockchainProofDialog] =
    useState(false);
  let title =
    props.domElement.getAttribute("data-icon-title") || "Blockchain Proof";
  let customWidgetClassName = props.domElement.getAttribute(
    "data-custom-icon-classname"
  );
  useEffect(() => {
    if (Boolean(customWidgetClassName)) {
      let el = document.querySelectorAll(`.${customWidgetClassName}`);
      if (el?.length) {
        el.forEach((element) => {
          if (element) {
            element.addEventListener("click", () => {
              if (!openBlockchainProofDialog) {
                setOpenBlockchainProofDialog(true);
              }
            });
          }
        });
      }
    }
  }, [customWidgetClassName]);
  return (
    <Box>
      {!Boolean(customWidgetClassName) && (
        <Box
          className={classes.healthloqWidgetBlockChainProofBtn}
          display="flex"
          alignItems={"center"}
          justifyContent="flex-start"
          onClick={() => setOpenBlockchainProofDialog(true)}
        >
          <Typography variant="body1">{title}</Typography>
          <BlockchainProofIcon />
        </Box>
      )}
      <BlockchainProofDialog
        {...props}
        open={openBlockchainProofDialog}
        handleClose={() => setOpenBlockchainProofDialog(false)}
      />
    </Box>
  );
}
