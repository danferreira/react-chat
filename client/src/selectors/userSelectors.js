// export const getIsUserAuthenticating = (state) => state.user.isAuthenticating === undefined || state.user.isAuthenticating
export const getIsUserAuthenticated = (state) => !!state.user;
export const getErrorMessage = (state) => state.user.error;