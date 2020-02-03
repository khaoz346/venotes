export const getGraphQLErrorMsg = (e: any) => {
  return e.message.split(':')[1];
};
