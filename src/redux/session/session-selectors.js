const getIsAuth = state => state.session.isAuth;

const getIsLoading = state => state.session.isLoading;

const getToken = state => state.session.token;

const getUserName = state => state.session.user.name;

const getUser = state => state.session.user;

const getUserBalance = state => state.session.user.name;

const sessionSelectors = {
  getIsAuth,
  getToken,
  getIsLoading,
  getUserName,
  getUser,
  getUserBalance,
};

export default sessionSelectors;
