import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { Box, Typography } from "@mui/material";
import { BlockchainProofIcon } from "./assets";
import BlockchainProofDialog from "./components/BlockchainProofDialog";
import "./App.css";

const useStyle = makeStyles((theme) => ({
  blockChainProofBtn: {
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
  return (
    <Box>
      <Box
        className={classes.blockChainProofBtn}
        display="flex"
        alignItems={"center"}
        justifyContent="flex-start"
        onClick={() => setOpenBlockchainProofDialog(true)}
      >
        <Typography variant="body1">Blockchain Proof</Typography>
        <BlockchainProofIcon />
      </Box>
      <BlockchainProofDialog
        {...props}
        open={openBlockchainProofDialog}
        handleClose={() => setOpenBlockchainProofDialog(false)}
      />
    </Box>
  );
}
