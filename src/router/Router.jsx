import { Navigate, Route, Routes } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

//Components
// import DeleteCategory from "../components/templates/DCategory";
import Loader from "../components/modules/Loader";

//Pages
import HomePage from "../pages/HomePage";
import DetailsPage from "../pages/DetailsPage";
import DashboardPage from "../pages/DashboardPage";
import AdminPage from "../pages/AdminPage";
import AuthPage from "../pages/AuthPage";
import PageNotFound from "../pages/404";
import ProfilePage from "../pages/ProfilePage";

//Function
import { getProfile } from "../services/user";

function Router() {
  const { data, isLoading, error } = useQuery(["profile"], getProfile);
  // console.log({ data, isLoading, error });

  if (isLoading) return <Loader />;
  return (
    <Routes>
      <Route index element={<Navigate to="/products" replace />} />
      <Route path="/products" element={<HomePage />} />
      <Route path="/products/:id" element={<DetailsPage />} />
      <Route
        path="/dashboard"
        element={data ? <DashboardPage /> : <Navigate to="/auth" />}
      />
      <Route
        path="/auth"
        element={data ? <Navigate to="/dashboard" /> : <AuthPage />}
      />
      <Route
        path="/admin"
        element={
          data && data.data.role === "ADMIN" ? (
            <AdminPage />
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route path="/profile" element={<ProfilePage />} />

      <Route path="*" element={<PageNotFound />} />
      {/* <Route path="/deletecategorybyid" element={<DeleteCategory />} /> */}
    </Routes>
  );
}

export default Router;
