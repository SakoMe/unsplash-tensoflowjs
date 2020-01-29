import React, { useReducer, useEffect } from 'react';
import history from '../history';

export const AuthContext = React.createContext();

const initialState = {
  auth: null,
  isSignedIn: false,
  userProfile: null
};

function authReducer(state, action) {
  switch (action.type) {
    case 'AUTH_SUCCESS': {
      return {
        ...state,
        auth: action.payload
      };
    }
    case 'SIGN_IN_SUCCESS': {
      return {
        ...state,
        isSignedIn: action.payload
      };
    }
    case 'USER_PROFILE_SUCCESS': {
      return {
        ...state,
        userProfile: action.payload
      };
    }
    default:
      throw new Error();
  }
}

export default function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const handleAuthStateChange = () =>
    dispatch({
      type: 'SIGN_IN_SUCCESS',
      payload: window.gapi.auth2.getAuthInstance().isSignedIn.get()
    });
  const handleSignIn = () => state.auth.signIn();
  const handleSignOut = () => {
    state.auth.signOut();
    history.push('/');
  };

  useEffect(() => {
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId: process.env.REACT_APP_CLIENT_ID,
          scope: 'email'
        })
        .then(() => {
          dispatch({
            type: 'AUTH_SUCCESS',
            payload: window.gapi.auth2.getAuthInstance()
          });
          handleAuthStateChange();
          window.gapi.auth2
            .getAuthInstance()
            .isSignedIn.listen(handleAuthStateChange);
        });
    });
  }, []);

  useEffect(() => {
    const getUserProfile = () => {
      state.auth &&
        state.isSignedIn &&
        dispatch({
          type: 'USER_PROFILE_SUCCESS',
          payload: state.auth.currentUser.get().getBasicProfile()
        });
    };
    getUserProfile();
  }, [state.auth, state.isSignedIn]);

  const store = {
    authState: {
      ...state
    },
    authActions: {
      handleSignIn,
      handleSignOut
    }
  };

  return <AuthContext.Provider value={store}>{children}</AuthContext.Provider>;
}
