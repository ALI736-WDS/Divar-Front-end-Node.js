const defaultOptions = {
  queries: {
    refetchOnWindowFocus: false,
    retryOnMount: false,
    retry: 1, //vaghti darkhast error dad, 2 ya 3 bar darkhast nafreste
    staleTime: 60 * 1000,
  },
};

export default defaultOptions;
