import React, { useReducer, useEffect } from 'react';

export const AuthContext = React.createContext();

const initialState = {
  isSignedIn: false,
  auth: null,
  userProfile: null
};

function authReducer(state, action) {
  switch (action.type) {
    case 'auth': {
      return {
        ...state,
        auth: window.gapi.auth2.getAuthInstance()
      };
    }
    case 'isSignedIn': {
      return {
        ...state,
        isSignedIn: window.gapi.auth2.getAuthInstance().isSignedIn.get()
      };
    }
    case 'setUserProfile': {
      return {
        ...state,
        userProfile: state.auth.currentUser.get().getBasicProfile()
      };
    }
    default:
      throw new Error();
  }
}

export default function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const handleAuthChange = () => {
    dispatch({ type: 'isSignedIn' });
  };

  const handleSignIn = () => state.auth.signIn();

  const handleSignOut = () => state.auth.signOut();

  useEffect(() => {
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId: process.env.REACT_APP_CLIENT_ID,
          scope: 'email'
        })
        .then(() => {
          dispatch({ type: 'auth' });
          handleAuthChange();
          window.gapi.auth2
            .getAuthInstance()
            .isSignedIn.listen(handleAuthChange);
        });
    });
  }, []);

  useEffect(() => {
    const getUserProfile = () => {
      state.auth && state.isSignedIn && dispatch({ type: 'setUserProfile' });
    };
    getUserProfile();
  }, [state.auth, state.isSignedIn]);

  const store = {
    state: {
      ...state
    },
    actions: {
      handleSignIn,
      handleSignOut
    }
  };

  return <AuthContext.Provider value={store}>{children}</AuthContext.Provider>;
}
