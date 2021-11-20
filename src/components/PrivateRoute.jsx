import { Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export function PrivateRoute({ path, ...props }) {
  const token = useSelector((state) => state.auth.token);

  return (
    <>
      {token ? (
        <Route path={path} {...props} />
      ) : (
        <Navigate to="/login" replace={true} state={{ from: path }} />
      )}
    </>
  );
}
