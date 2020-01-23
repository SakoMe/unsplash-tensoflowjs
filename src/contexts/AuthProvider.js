import React, { useState, useEffect } from 'react';

export const AuthContext = React.createContext();

export default function AuthProvider({ children }) {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [auth, setAuth] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  const handleAuthChange = () => {
    setIsSignedIn(window.gapi.auth2.getAuthInstance().isSignedIn.get());
  };

  const handleSignIn = () => auth.signIn();

  const handleSignOut = () => auth.signOut();

  useEffect(() => {
    window.gapi.load('client:auth2', () => {
      window.gapi.client
        .init({
          clientId: process.env.REACT_APP_CLIENT_ID,
          scope: 'email'
        })
        .then(() => {
          setAuth(window.gapi.auth2.getAuthInstance());
          handleAuthChange();
          window.gapi.auth2
            .getAuthInstance()
            .isSignedIn.listen(handleAuthChange);
        });
    });
  }, []);

  useEffect(() => {
    const getUserProfile = () => {
      auth &&
        isSignedIn &&
        setUserProfile(auth.currentUser.get().getBasicProfile());
    };
    getUserProfile();
  }, [isSignedIn, auth]);

  const store = {
    isSignedIn,
    userProfile,
    handleSignIn,
    handleSignOut
  };

  return <AuthContext.Provider value={store}>{children}</AuthContext.Provider>;
}
