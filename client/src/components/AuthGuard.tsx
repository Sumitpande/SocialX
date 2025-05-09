import type { FC, ReactNode } from "react";
import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuthContext } from "@/context/AuthContext";

import { APP_PATH } from "@/utils";

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard: FC<AuthGuardProps> = (props) => {
  const { children } = props;
  const { authUser } = useAuthContext();
  const location = useLocation();
  const [requestedLocation, setRequestedLocation] = useState<string | null>();
  console.log("authUserauthUser", authUser);
  if (!authUser._id) {
    if (location.pathname !== requestedLocation) {
      setRequestedLocation(location.pathname);
    }
    return <Navigate to={APP_PATH.login} />;
  }
  // This is done so that in case the route changes by any chance through other
  // means between the moment of request and the render we navigate to the initially
  // requested route.
  if (requestedLocation && location.pathname !== requestedLocation) {
    setRequestedLocation(null);
    console.log("requestedLocation", requestedLocation);
    return <Navigate to={requestedLocation} />;
  }

  return <>{children}</>;
};

AuthGuard.propTypes = {
  children: PropTypes.node,
};

export default AuthGuard;
