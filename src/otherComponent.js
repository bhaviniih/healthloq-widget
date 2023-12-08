import React, { useState, useEffect, useRef } from "react";
import BlockchainProofDialog from "./components/BlockchainProofDialog";
import "./App.css";

export default function OtherComponentRender(props) {
  // local state
  const [openBlockchainProofDialog, setOpenBlockchainProofDialog] =
    useState(false);

  // refrence for element
  const domElementRef = useRef(null);

  useEffect(() => {
    // set cureent element refrence
    domElementRef.current = props.domElement;

    // onclick function
    const handleClick = (e) => {
      if (e.target === domElementRef.current) {
        setOpenBlockchainProofDialog(true);
      }
    };

    if (domElementRef.current) {
      domElementRef.current.addEventListener("click", handleClick);
    }

    // cleanup function
    return () => {
      if (domElementRef.current) {
        domElementRef.current.removeEventListener("click", handleClick);
      }
    };
  }, []);

  return (
    <>
      {props.domElement.ariaLabel}
      <BlockchainProofDialog
        {...props}
        open={openBlockchainProofDialog}
        handleClose={() => setOpenBlockchainProofDialog(false)}
      />
    </>
  );
}
