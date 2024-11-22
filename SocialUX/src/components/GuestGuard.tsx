import type { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuthContext } from "@/context/AuthContext";
import { APP_PATH } from "@/utils/path";

interface GuestGuardProps {
  children: ReactNode;
}

const GuestGuard: FC<GuestGuardProps> = ({ children }) => {
  const { authUser } = useAuthContext();
  console.log("authUser", authUser);
  if (authUser._id) {
    return <Navigate to={APP_PATH.root} />;
  }

  return <>{children}</>;
};

GuestGuard.propTypes = {
  children: PropTypes.node
};

export default GuestGuard;
