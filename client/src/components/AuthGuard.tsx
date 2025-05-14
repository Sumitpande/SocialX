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
  const { authUser, loading } = useAuthContext();
  const location = useLocation();
  const [requestedLocation, setRequestedLocation] = useState<string | null>();
  console.log("authUserauthUser", authUser);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!authUser._id) {
    console.log("N o  U S E R");

    if (location.pathname !== requestedLocation) {
      setRequestedLocation(location.pathname);
    }
    return <Navigate to={APP_PATH.login} />;
  }

  // ✅ Authenticated → redirect back to requested route if needed
  if (requestedLocation && location.pathname !== requestedLocation) {
    const redirectTo = requestedLocation;
    setRequestedLocation(null);
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};

AuthGuard.propTypes = {
  children: PropTypes.node,
};

export default AuthGuard;
