import { Navigate } from "react-router-dom";

export default function AuthGuard({ isLoggedIn, children }) {
  if (isLoggedIn === undefined) {
    return <div>Cargando...</div>;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
