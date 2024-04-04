import React, { useContext } from "react";
import AuthContext from "../../Authentication";
import NotFound from "../Pages/Not Found/NotFound";

const Profile = () => {
  const { authenticated, setAuthenticated } = useContext(AuthContext);
  return <>{authenticated ? <div>Profile</div> : <NotFound />}</>;
};

export default Profile;
