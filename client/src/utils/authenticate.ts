export const setSessionToken = (sessionToken: string): void => {
  localStorage.setItem('VENOTES_SESSION_TOKEN', sessionToken);
};

export const getSessionToken = () => {
  return localStorage.getItem('VENOTES_SESSION_TOKEN');
};
