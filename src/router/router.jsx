import { Routes, Route } from "react-router-dom";
import Directory from "../Layout/Directory";
import Profile from "../Layout/Profile";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Directory />} path="/" exact />
      <Route element={<Profile />} path="/Profile/:userId" exact />
    </Routes>
  );
};

export default AppRoutes;
