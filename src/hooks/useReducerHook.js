import { useReducer } from "react";

export const initialState = {
  documentVerificationData: {
    isLoading: false,
    isVerifyDocument: null,
    integrantId: null,
    OrganizationExhibitId: null,
    documentHashId: null,
    message: "",
    blockchainProofApiFlag: false,
  },
  exhibitBlockchainProofData: {
    isLoading: false,
    result: null,
    data: null,
    blockAddress: null,
  },
  orgExhibitBlockchainProofData: {
    isLoading: false,
    result: null,
    data: null,
    blockAddress: null,
  },
  documentHashBlockchainProofData: {
    isLoading: false,
    result: null,
    data: null,
    blockAddress: null,
  },
  labDocumentHashBlockchainProofData: {
    isLoading: false,
    result: null,
    data: null,
    blockAddress: null,
  },
  verifyCoaDocumentData: {
    loading: false,
  },
  activeOrgDocuments: [],
};

const updateCoaData = (data, payload, i) => {
  return {
    ...data,
    govEntity: (data?.govEntity || [])?.map((org) => {
      if (payload.activeOrgDocuments[i] === org?.id) {
        if (payload.activeOrgDocuments?.length - 1 === i) {
          return {
            ...org,
            documentInfo: {
              ...(org?.documentInfo || {}),
              ...payload,
            },
          };
        } else {
          return {
            ...org,
            documentInfo: updateCoaData(
              org?.documentInfo || {},
              payload,
              i + 1
            ),
          };
        }
      }
      return org;
    }),
  };
};

export const useReducerHook = () =>
  useReducer((state = {}, { type = "", payload = {} }) => {
    switch (type) {
      case "documentVerificationData":
        return {
          ...state,
          documentVerificationData: {
            ...state.documentVerificationData,
            isLoading: !state.documentVerificationData.isLoading,
            message:
              !state.documentVerificationData.isLoading === false
                ? payload?.isVerifyDocument
                  ? "Verified match on the blockchain."
                  : "Not a verified match on the blockchain."
                : null,
            blockchainProofApiFlag:
              !state.documentVerificationData.isLoading === false
                ? true
                : false,
            ...payload,
          },
        };
      case "updateDocumentVerificationData": {
        return {
          ...state,
          documentVerificationData: {
            ...state?.documentVerificationData,
            ...payload,
          },
        };
      }
      case "exhibitBlockchainProofData":
        return {
          ...state,
          exhibitBlockchainProofData: {
            ...state.exhibitBlockchainProofData,
            isLoading: !state.exhibitBlockchainProofData.isLoading,
            ...payload,
          },
        };
      case "orgExhibitBlockchainProofData":
        return {
          ...state,
          orgExhibitBlockchainProofData: {
            ...state.orgExhibitBlockchainProofData,
            isLoading: !state.orgExhibitBlockchainProofData.isLoading,
            ...payload,
          },
        };
      case "documentHashBlockchainProofData":
        return {
          ...state,
          documentHashBlockchainProofData: {
            ...state.documentHashBlockchainProofData,
            isLoading: !state.documentHashBlockchainProofData.isLoading,
            ...payload,
          },
        };
      case "labDocumentHashBlockchainProofData":
        return {
          ...state,
          labDocumentHashBlockchainProofData: {
            ...state.labDocumentHashBlockchainProofData,
            isLoading: !state.labDocumentHashBlockchainProofData.isLoading,
            ...payload,
          },
        };
      case "VERIFY_COA_DOCUMENT_LOADING": {
        return {
          ...state,
          activeOrgDocuments: payload?.activeOrgDocuments || [],
          verifyCoaDocumentData: !payload?.activeOrgDocuments?.length
            ? {
                loading: payload?.loading,
              }
            : updateCoaData(state.verifyCoaDocumentData, payload, 0),
        };
      }
      case "VERIFY_COA_DOCUMENT_SUCCESS": {
        return {
          ...state,
          activeOrgDocuments: payload?.activeOrgDocuments || [],
          verifyCoaDocumentData: payload?.isOrganizationDoc
            ? updateCoaData(state.verifyCoaDocumentData, payload, 0)
            : payload,
        };
      }
      case "setInitialState":
        return initialState;
      default:
        return state || initialState;
    }
  }, initialState);
