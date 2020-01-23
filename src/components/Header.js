import React, { useContext } from 'react';

import { AuthContext } from '../contexts/AuthProvider';

export default function Header() {
  const {
    state: { isSignedIn, userProfile },
    actions: { handleSignOut, handleSignIn }
  } = useContext(AuthContext);

  const renderUserProfile = () => {
    if (isSignedIn && userProfile) {
      return (
        <div>
          <p>{userProfile.getName()}</p>
          <img src={userProfile.getImageUrl()} alt='current user avatar' />
        </div>
      );
    }
  };

  const renderAuthButton = () => {
    if (isSignedIn) return <button onClick={handleSignOut}>Sign Out</button>;

    return <button onClick={handleSignIn}>Sign in with Google</button>;
  };

  return (
    <header>
      <h1>Header</h1>
      {renderAuthButton()}
      {renderUserProfile()}
    </header>
  );
}
