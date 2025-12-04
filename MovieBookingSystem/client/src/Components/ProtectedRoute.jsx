import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const stored = localStorage.getItem("mobook_user");

  let user = null;
  try {
    user = stored ? JSON.parse(stored) : null;
  } catch {
    user = null;
  }

  if (!user) return <Navigate to="/" replace />;

  return <Outlet />;
};

export default ProtectedRoute;
