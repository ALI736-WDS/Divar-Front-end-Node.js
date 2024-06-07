const setCookie = (tokens) => {
  const oneDay = 1 * 24 * 60 * 60;
  document.cookie = `accessToken=${tokens.accessToken}; max-age=${1 * oneDay}`;
  document.cookie = `refreshToken=${tokens.refreshToken}; max-age=${
    30 * oneDay
  }`;
};

const getCookie = (cookieName) => {
  // console.log(document.cookie);
  return document.cookie
    .split(";")
    .find((token) => token.trim().split("=")[0] === cookieName) //clg inja : accessToken=...
    ?.split("=")[1]; //clg inja refreshToken
};

const deleteCookie = () => {
  const accessToken = getCookie("accessToken");
  const refreshToken = getCookie("refreshToken");
  document.cookie = `accessToken=${accessToken}; max-age=${1}`;
  document.cookie = `refreshToken=${refreshToken}; max-age=${1}`;
  refetch();
  // console.log({ accessToken, refreshToken });
  // window.onload();
};

export { setCookie, getCookie, deleteCookie };
