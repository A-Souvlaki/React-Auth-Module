import React from "react";
import jwt from "jwt-decode";
import { Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";

const Profile = () => {
  const { user: currentUser } = useSelector((state) => state.auth);

  const decoded = jwt(currentUser.accessToken);
  

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.userUsername}</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
        {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
      </p>
      <p>
        <strong>Id:</strong> {currentUser.userId}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.userEmail}
      </p>
      <strong>Authorities:</strong>
      <ul>
        {decoded.role}
      </ul>
    </div>
  );
};

export default Profile;
