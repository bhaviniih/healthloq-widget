export const verifyDocument = async (params) => {
  try {
    const data = await fetch(
      process.env.REACT_APP_API_URL + "/client-app/verify-document",
      params
    );
    return await data?.json();
  } catch (error) {
    return null;
  }
};

export const getBlockchainProof = async (params) => {
  try {
    const data = await fetch(
      process.env.REACT_APP_API_URL + "/client-app/verify",
      params
    );
    return await data?.json();
  } catch (error) {
    return null;
  }
};
