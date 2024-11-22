// import { useState } from 'react'
// import Layout from "@/pages/Layout";
import "./App.css";
import { APP_PATH } from "@/utils/path";
import { Route, Routes } from "react-router-dom";
import Loadable from "@/components/Loadable";
import Layout from "@/pages/Layout";
import NotFound from "@/pages/NotFound";
import { lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import AuthGuard from "./components/AuthGuard";
import GuestGuard from "./components/GuestGuard";
function App() {
  // const [count, setCount] = useState(0)
  //  * HOME PAGE
  const Home = Loadable(lazy(() => import("@/pages/Home")));

  const Message = Loadable(lazy(() => import("@/pages/Message")));
  const Login = Loadable(lazy(() => import("@/pages/authentication/Login")));
  const Register = Loadable(
    lazy(() => import("@/pages/authentication/Register"))
  );

  return (
    <>
      <Routes>
        <Route
          path={"/" + APP_PATH.root}
          element={
            <AuthGuard>
              <Layout />
            </AuthGuard>
          }
        >
          <Route index element={<Home />} />
          <Route path={APP_PATH.general.messages} element={<Message />} />

          <Route path="*" element={<NotFound />}></Route>
        </Route>
        <Route
          path={APP_PATH.login}
          element={
            <GuestGuard>
              <Login />
            </GuestGuard>
          }
        ></Route>
        <Route
          path={APP_PATH.register}
          element={
            <GuestGuard>
              <Register />
            </GuestGuard>
          }
        ></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
