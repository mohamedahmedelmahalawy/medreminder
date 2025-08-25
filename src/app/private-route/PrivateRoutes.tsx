import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children, requiredRole }: PropsWithChildren) {
  // Get auth from localStorage
  const getAuthFromStorage = () => {
    try {
      const auth = JSON.parse(localStorage.getItem("auth"));
      return auth;
    } catch (error) {
      return null;
    }
  };

  const auth = getAuthFromStorage();
  const isAuthenticated =
    auth && auth.role && (auth.isLoggedIn || auth.status === "succeeded");
  const profileRole = auth?.role;

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // If specific role required, check it
  if (requiredRole && profileRole !== requiredRole) {
    // Redirect based on user's role
    if (profileRole === "medical") {
      return <Navigate to="/dashboard" />;
    } else if (profileRole === "patient") {
      return <Navigate to="/profile" />;
    } else {
      return <Navigate to="/login" />;
    }
  }

  return children;
}

export default PrivateRoute;
