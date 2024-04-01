import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Link,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { getBlockchainProof, verifyDocument, verifyCoaDocument } from "../apis";
import { useReducerHook } from "../hooks/useReducerHook";
import BlockchainProof from "./BlockchainProof";
import VerifiedDocumentInfo from "./common/VerifiedDocumentInfo";
import VerifiedOrganizationInfo from "./common/VerifiedOrganizationInfo";
import HashNotVerifiedErrorMsg from "./common/HashNotVerifiedErrorMsg";
import ExpiredDocument from "./common/ExpiredDocument";

const UploadIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="#fff"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.2975 10.5489L19.1727 10.4207V10.4205C18.7596 10.028 18.2348 9.77344 17.6708 9.69211C17.89 8.09653 17.4281 6.48262 16.3977 5.2449C16.3111 5.14085 16.2175 5.0368 16.1236 4.93614C16.0299 4.83548 15.9363 4.73506 15.8356 4.64118V4.64142C14.3918 3.22103 12.3043 2.67083 10.3479 3.1947C8.29893 3.7193 6.65956 5.25387 6.00139 7.26392C5.98615 7.27239 5.96776 7.27239 5.95276 7.26392C5.20799 6.86152 4.35452 6.70714 3.51609 6.82305C2.67742 6.93919 1.89803 7.31957 1.29041 7.909C1.2246 7.97143 1.15854 8.04088 1.09611 8.11008V8.11032C1.03005 8.17735 0.967625 8.24801 0.908827 8.32181C0.424158 8.91077 0.118535 9.62649 0.0280336 10.3839C-0.0622201 11.1415 0.0665067 11.909 0.398978 12.5955C0.732173 13.3127 1.26354 13.9193 1.93044 14.3442C2.59734 14.7689 3.37208 14.9939 4.16287 14.9925H7.22574C7.5132 14.9925 7.74622 14.7594 7.74622 14.4722C7.74622 14.1848 7.5132 13.9517 7.22574 13.9517H4.16962C3.57196 13.9583 2.98518 13.7911 2.48063 13.4702C1.97637 13.1494 1.57612 12.6887 1.32858 12.1445C1.07742 11.6371 0.978937 11.0677 1.04548 10.5054C1.11202 9.94302 1.34044 9.41216 1.70315 8.97755C1.75178 8.92214 1.79679 8.86648 1.84882 8.81107L2.0015 8.655V8.65476C2.45689 8.21389 3.04223 7.93149 3.6706 7.84898C4.29922 7.76647 4.93756 7.88842 5.49122 8.19694C5.78038 8.34624 6.12058 8.36003 6.42089 8.23517C6.71102 8.11733 6.93266 7.87536 7.02461 7.57602C7.5676 5.91125 8.92725 4.64212 10.6252 4.21452C12.2326 3.78405 13.9477 4.23508 15.1348 5.40088C15.218 5.48074 15.3013 5.56397 15.3811 5.6506C15.461 5.73722 15.5372 5.82748 15.6137 5.91773C16.4574 6.93282 16.8352 8.25615 16.6542 9.5635C16.615 9.84709 16.6921 10.1346 16.8678 10.3605C17.0435 10.5865 17.3029 10.732 17.5874 10.7639C17.918 10.7983 18.2265 10.9454 18.4617 11.1801L18.5449 11.2667L18.6248 11.3534L18.6245 11.3536C18.8142 11.5813 18.9333 11.8593 18.9679 12.1538C19.0022 12.448 18.9505 12.7461 18.8188 13.0116C18.6867 13.295 18.4764 13.5345 18.2129 13.7022C17.9492 13.8699 17.6431 13.9589 17.3307 13.9587H13.2895C13.0021 13.9587 12.7691 14.1917 12.7691 14.4789C12.7691 14.7664 13.0021 14.9994 13.2895 14.9994H17.317C17.827 15.0016 18.327 14.8571 18.7574 14.5834C19.1876 14.31 19.5305 13.9185 19.7451 13.4556C19.96 13.0087 20.0416 12.5093 19.9801 12.0171C19.9186 11.5249 19.7166 11.0607 19.3981 10.6807L19.2975 10.5489Z" />
    <path d="M10.2823 17.5387C10.5698 17.5387 10.8028 17.3057 10.8028 17.0182V10.2018L12.9222 12.3595C13.019 12.4582 13.1516 12.5131 13.29 12.5121C13.4993 12.5119 13.6883 12.3863 13.7694 12.1932C13.8504 12.0001 13.8076 11.777 13.661 11.6275L10.7193 8.65798L10.7196 8.65823C10.6257 8.50699 10.4604 8.41504 10.2823 8.41528H10.2477C10.2015 8.41746 10.1558 8.4269 10.1125 8.44311C10.0304 8.46465 9.95543 8.50651 9.89397 8.56458L6.9073 11.5374H6.90706C6.80349 11.633 6.743 11.7668 6.73986 11.9081C6.73695 12.0492 6.79115 12.1854 6.89061 12.2859C6.98982 12.386 7.12556 12.4417 7.26687 12.4398C7.40794 12.4381 7.54223 12.379 7.63902 12.2762L9.76206 10.1636V17.032C9.76956 17.3139 10.0004 17.5385 10.2823 17.5385L10.2823 17.5387Z" />
  </svg>
);

const useStyle = makeStyles((theme) => ({
  healthloqWidgetBlockchainProofContainer: {
    "&>div:not(:last-child)": {
      marginBottom: 100,
      position: "relative",
      "&::before": {
        position: "absolute",
        content: "' '",
        width: 2,
        height: 100,
        backgroundColor: theme.palette.primary.main,
        top: "calc(100% + 2px)",
        left: " 50%",
        transform: "translateX(-50%)",
      },
      "&::after": {
        position: "absolute",
        content: "' '",
        width: 50,
        height: 50,
        top: "calc(100% + 25px)",
        backgroundColor: theme.palette.primary.main,
        outline: `2px solid ${theme.palette.common.white}`,
        borderRadius: "50%",
        left: "50%",
        transform: "translateX(-50%) scaleX(-1)",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath d='M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6zm9 14H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z' fill='white' /%3E%3C/svg%3E")`,
      },
    },
    "& .blockchain-proof-expired": {
      "&:not(:last-child)": {
        "&::before": {
          backgroundColor: "#FFAA1D",
        },
        "&::after": {
          backgroundColor: "#FFAA1D",
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath d='M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h2c0-1.66 1.34-3 3-3s3 1.34 3 3v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm0 12H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z' fill='white' /%3E%3C/svg%3E")`,
        },
      },
    },
    "& .blockchain-proof-error-msg": {
      "&:not(:last-child)": {
        "&::before": {
          backgroundColor: theme.palette.error.main,
        },
        "&::after": {
          backgroundColor: theme.palette.error.main,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' %3E%3Cpath d='M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6h2c0-1.66 1.34-3 3-3s3 1.34 3 3v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm0 12H6V10h12v10zm-6-3c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z' fill='white' /%3E%3C/svg%3E")`,
        },
      },
    },
  },
}));

export default function BlockchainProofDialog({
  open = false,
  handleClose = () => {},
  domElement,
}) {
  const [
    {
      documentVerificationData,
      exhibitBlockchainProofData,
      orgExhibitBlockchainProofData,
      documentHashBlockchainProofData,
      labDocumentHashBlockchainProofData,
      verifyCoaDocumentData,
      activeOrgDocuments,
    },
    dispatch,
  ] = useReducerHook();
  const classes = useStyle();
  const [documentFile, setDocumentFile] = useState(null);

  const handleVerifyDocument = async () => {
    const organizationId = domElement.getAttribute("data-organization-id");
    // dispatch({
    //   type: "setInitialState",
    // });
    // const productId = domElement.getAttribute("data-product-id");
    // const formData = new FormData();
    // formData.append("id", productId);
    // formData.append("organization_id", organizationId);
    // formData.append("type", "exhibit");
    // formData.append("files[]", documentFile);
    // const params = {
    //   method: "POST",
    //   body: formData,
    // };
    // dispatch({
    //   type: "documentVerificationData",
    // });
    // const response = await verifyDocument(params);
    // dispatch({
    //   type: "documentVerificationData",
    //   payload: response,
    // });
    const formData = new FormData();
    formData.append("coaFile", documentFile);
    if (organizationId) {
      formData.append("organization_id", organizationId);
    }
    dispatch({
      type: "VERIFY_COA_DOCUMENT_LOADING",
      payload: {
        loading: true,
        activeOrgDocuments: [],
      },
    });
    const response = await verifyCoaDocument(formData);
    if (response?.status === "1") {
      dispatch({
        type: "VERIFY_COA_DOCUMENT_SUCCESS",
        payload: {
          ...response,
          loading: false,
          activeOrgDocuments: [],
        },
      });
    } else {
      dispatch({
        type: "VERIFY_COA_DOCUMENT_LOADING",
        payload: {
          loading: false,
          activeOrgDocuments: [],
        },
      });
    }
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (documentVerificationData?.integrantId) {
  //       dispatch({
  //         type: "exhibitBlockchainProofData",
  //       });
  //       const productType = domElement.getAttribute("data-type");
  //       const response = await getBlockchainProof({
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({
  //           id: documentVerificationData?.integrantId,
  //           type: productType,
  //         }),
  //       });
  //       dispatch({
  //         type: "exhibitBlockchainProofData",
  //         payload: response,
  //       });
  //     }
  //     if (documentVerificationData?.OrganizationExhibitId) {
  //       dispatch({
  //         type: "orgExhibitBlockchainProofData",
  //       });
  //       const response = await getBlockchainProof({
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({
  //           id: documentVerificationData?.OrganizationExhibitId,
  //           type: "organization_exhibit",
  //         }),
  //       });
  //       dispatch({
  //         type: "orgExhibitBlockchainProofData",
  //         payload: response,
  //       });
  //     }
  //     if (documentVerificationData?.documentHashId) {
  //       dispatch({
  //         type: "documentHashBlockchainProofData",
  //       });
  //       const response = await getBlockchainProof({
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({
  //           id: documentVerificationData?.documentHashId,
  //           type: "document_hash",
  //         }),
  //       });
  //       dispatch({
  //         type: "documentHashBlockchainProofData",
  //         payload: response,
  //       });
  //     }
  //     if (documentVerificationData?.labDocumentHashId) {
  //       dispatch({
  //         type: "labDocumentHashBlockchainProofData",
  //       });
  //       const response = await getBlockchainProof({
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({
  //           id: documentVerificationData?.labDocumentHashId,
  //           type: "document_hash",
  //         }),
  //       });
  //       dispatch({
  //         type: "labDocumentHashBlockchainProofData",
  //         payload: response,
  //       });
  //     }
  //     dispatch({
  //       type: "updateDocumentVerificationData",
  //       payload: {
  //         blockchainProofApiFlag: false,
  //       },
  //     });
  //   };
  //   if (
  //     !documentVerificationData?.isLoading &&
  //     documentVerificationData?.blockchainProofApiFlag
  //   ) {
  //     fetchData();
  //   }
  // }, [documentVerificationData?.blockchainProofApiFlag]);

  // useEffect(() => {
  //   if (documentVerificationData?.message) {
  //     setTimeout(() => {
  //       dispatch({
  //         type: "documentVerificationData",
  //         payload: {
  //           message: "",
  //           isLoading: false,
  //         },
  //       });
  //     }, 15000);
  //   }
  // }, [documentVerificationData?.message]);

  useEffect(() => {
    if (open) {
      // dispatch({
      //   type: "setInitialState",
      // });
      setDocumentFile(null);
    }
  }, [open]);

  const verifyOrganizationDocument = async (data, i) => {
    let arr = [...activeOrgDocuments];
    if (arr[i]) {
      arr = arr.map((a, index) => (index === i ? data?.id : a));
    } else {
      arr = arr.concat(data?.id);
    }
    if (!data?.documentInfo || Object.keys(data?.documentInfo).length < 2) {
      dispatch({
        type: "VERIFY_COA_DOCUMENT_LOADING",
        payload: {
          loading: true,
          activeOrgDocuments: arr,
        },
      });
      let formData = new FormData();
      formData.append("document_id", data?.document_id);
      const response = await verifyCoaDocument(formData);
      if (response?.status === "1") {
        dispatch({
          type: "VERIFY_COA_DOCUMENT_SUCCESS",
          payload: {
            ...response,
            loading: false,
            activeOrgDocuments: arr,
          },
        });
      } else {
        dispatch({
          type: "VERIFY_COA_DOCUMENT_LOADING",
          payload: {
            loading: false,
            activeOrgDocuments: arr?.slice(0, arr?.length - 1),
          },
        });
      }
    }
  };

  const getBlockchainProofs = (data, i = 0) => {
    if (!data) return <></>;
    return (
      <>
        {data?.loading && (
          <Typography
            variant="body2"
            display="flex"
            alignItems={"center"}
            justifyContent="center"
          >
            Please wait while we are verifying the document...
            <CircularProgress size={20} sx={{ ml: 0.5 }} />
          </Typography>
        )}
        {data?.status === "1" &&
          !data?.loading &&
          (data?.isVerifyDocument ? (
            <>
              {data?.is_expired ? (
                <ExpiredDocument {...data} />
              ) : (
                <VerifiedDocumentInfo {...data} />
              )}
              {data?.govEntity?.length ? (
                <>
                  <VerifiedOrganizationInfo
                    {...data}
                    onOrganizationClick={(a) =>
                      verifyOrganizationDocument(a, i)
                    }
                  />
                  {getBlockchainProofs(
                    data?.govEntity?.filter(
                      (a) => a?.id === activeOrgDocuments[i]
                    )?.[0]?.documentInfo || null,
                    i + 1
                  )}
                </>
              ) : (
                <HashNotVerifiedErrorMsg hashType="Organization" {...data} />
              )}
            </>
          ) : (
            <HashNotVerifiedErrorMsg
              hashType={data?.isOrganizationDoc ? "Organization" : "Document"}
              {...data}
            />
          ))}
      </>
    );
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth={"md"}>
      <DialogTitle
        display="flex"
        alignItems={"center"}
        justifyContent="flex-start"
      >
        <Link
          target="_blank"
          href={`${process.env.REACT_APP_CLIENT_URL_UI}`}
          sx={{ mr: 1.5 }}
        >
          <img
            src={`${process.env.REACT_APP_CLIENT_URL_UI}/assets/images/logo/healthloq.png`}
            alt="healthloq-logo"
            width={50}
            height={50}
          />
        </Link>
        Blockchain Proof
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1">Document to be verified:</Typography>
        {documentFile && (
          <Typography
            variant="body2"
            color="lightgray"
            fontWeight="fontWeightLight"
          >
            {documentFile?.name}
          </Typography>
        )}
        <Box
          display="flex"
          alignItems={"center"}
          justifyContent="flex-start"
          sx={{ my: 2 }}
        >
          <Button
            variant="contained"
            component="label"
            startIcon={<UploadIcon />}
            sx={{ typography: "body1" }}
            disabled={verifyCoaDocumentData?.loading}
            onDrop={(event) => {
              event.preventDefault();
              event.stopPropagation();
              setDocumentFile(event.dataTransfer.files[0]);
            }}
            onDragEnter={(event) => {
              event.preventDefault();
              event.stopPropagation();
            }}
            onDragOver={(event) => {
              event.preventDefault();
              event.stopPropagation();
            }}
          >
            Upload
            <input
              type="file"
              hidden
              onClick={(e) => (e.target.value = null)}
              onChange={(e) => {
                if (e.target?.files[0]) {
                  // dispatch({
                  //   type: "setInitialState",
                  // });
                  setDocumentFile(e.target.files[0]);
                }
              }}
            />
          </Button>
          {documentFile && (
            <Button
              sx={{ ml: 1, typography: "body1" }}
              variant="contained"
              onClick={handleVerifyDocument}
              endIcon={
                verifyCoaDocumentData?.loading && (
                  <CircularProgress size={20} color="inherit" />
                )
              }
              disabled={verifyCoaDocumentData?.loading}
            >
              {verifyCoaDocumentData?.loading ? "Verifying..." : "Verify"}
            </Button>
          )}
        </Box>
        {/* {documentVerificationData?.message &&
          !documentVerificationData?.isLoading && (
            <Box sx={{ my: 2 }}>
              <Typography
                variant="body1"
                color={
                  documentVerificationData?.isVerifyDocument
                    ? "primary"
                    : "error"
                }
                display="flex"
                alignItems={"center"}
                sx={{
                  "&>img": {
                    marginLeft: 0.5,
                  },
                }}
              >
                {documentVerificationData?.message}
                {documentVerificationData?.isVerifyDocument ? (
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
            </Box>
          )} */}
        {/* {exhibitBlockchainProofData?.isLoading && (
          <Typography
            variant="body1"
            display="flex"
            alignItems={"center"}
            justifyContent="center"
          >
            Please wait while we are fetching the product detail...
            <CircularProgress size={20} sx={{ ml: 0.5 }} />
          </Typography>
        )} */}
        <Box className={classes.healthloqWidgetBlockchainProofContainer}>
          {!verifyCoaDocumentData?.loading &&
            getBlockchainProofs(verifyCoaDocumentData, 0)}
          {documentVerificationData?.integrantId &&
            !exhibitBlockchainProofData?.isLoading &&
            typeof exhibitBlockchainProofData?.result === "boolean" && (
              <BlockchainProof blockchainProof={exhibitBlockchainProofData} />
            )}
          {orgExhibitBlockchainProofData?.isLoading &&
            !exhibitBlockchainProofData?.isLoading && (
              <Typography
                variant="body1"
                display="flex"
                alignItems={"center"}
                justifyContent="center"
              >
                Please wait while we are fetching the organization document
                detail...
                <CircularProgress size={20} sx={{ ml: 0.5 }} />
              </Typography>
            )}
          {!orgExhibitBlockchainProofData?.isLoading &&
            typeof orgExhibitBlockchainProofData?.result === "boolean" && (
              <BlockchainProof
                blockchainProof={orgExhibitBlockchainProofData}
              />
            )}
          {documentHashBlockchainProofData?.isLoading &&
            !orgExhibitBlockchainProofData?.isLoading &&
            !exhibitBlockchainProofData?.isLoading && (
              <Typography
                variant="body1"
                display="flex"
                alignItems={"center"}
                justifyContent="center"
              >
                Please wait while we are fetching the document detail...
                <CircularProgress size={20} sx={{ ml: 0.5 }} />
              </Typography>
            )}
          {!documentHashBlockchainProofData?.isLoading &&
            typeof documentHashBlockchainProofData?.result === "boolean" && (
              <BlockchainProof
                blockchainProof={documentHashBlockchainProofData}
              />
            )}
          {labDocumentHashBlockchainProofData?.isLoading &&
            !documentHashBlockchainProofData?.isLoading &&
            !orgExhibitBlockchainProofData?.isLoading &&
            !exhibitBlockchainProofData?.isLoading && (
              <Typography
                variant="body1"
                display="flex"
                alignItems={"center"}
                justifyContent="center"
              >
                Please wait while we are fetching the lab document detail...
                <CircularProgress size={20} sx={{ ml: 0.5 }} />
              </Typography>
            )}
          {!labDocumentHashBlockchainProofData?.isLoading &&
            typeof labDocumentHashBlockchainProofData?.result === "boolean" && (
              <BlockchainProof
                blockchainProof={labDocumentHashBlockchainProofData}
              />
            )}
        </Box>
      </DialogContent>
      <DialogActions justifycontent="space-between">
        <Typography variant="body1">
          Verified By
          <Link
            sx={{ ml: 0.5 }}
            href={`${process.env.REACT_APP_CLIENT_URL_UI}`}
            target={"_blank"}
          >
            HealthLOQ
          </Link>
        </Typography>
        <Button
          variant="contained"
          color="lightBlackColor"
          onClick={handleClose}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
