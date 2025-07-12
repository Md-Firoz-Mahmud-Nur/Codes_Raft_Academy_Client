import { Navigate, useLocation } from "react-router-dom";
import { useContext, useEffect } from "react";
import PropTypes from "prop-types";
import AuthContext from "./AuthContext";

const PrivateRoute = ({ children }) => {
  const location = useLocation();
  const { user, loading, setIsModalOpen } = useContext(AuthContext);

  useEffect(() => {
    if (!loading && !user) {
      setIsModalOpen(true);
    }
  }, [loading, user, setIsModalOpen]);

  if (loading) {
    return (
      <div className="flex justify-center">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  if (user) {
    return children;
  }

  return <Navigate state={location.pathname} to="/" />;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
