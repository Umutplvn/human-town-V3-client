import { Route, Routes } from "react-router";
import Home from "../pages/Home";
import Register from "../pages/Register";
import PrivateRouter from "../pages/PrivateRouter";
import Login from "../pages/Login";
import Profile from "../pages/Profile"; // Private route örneği

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login/>} />

      <Route path="/" element={<PrivateRouter />}>
        <Route path="/profile" element={<Profile/>} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
