import "./App.css";
import { APP_PATH } from "@/utils";
import { Route, Routes } from "react-router-dom";
import Loadable from "@/components/Loadable";
import Layout from "@/pages/layout";
import NotFound from "@/pages/NotFound";
import { lazy } from "react";
import { Toaster } from "@/components/ui/sonner";
import AuthGuard from "@/components/AuthGuard";
import GuestGuard from "@/components/GuestGuard";
import PostDetails from "./components/post/PostDetails";
import Messages from "./pages/Messages";

function App() {
  // const [count, setCount] = useState(0)
  //  * HOME PAGE
  const Home = Loadable(lazy(() => import("@/pages/home")));

  // const Message = Loadable(lazy(() => import("@/pages/Message")));
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
          <Route path={APP_PATH.general.messages} element={<Messages />} />
          <Route path="/post/:username/:postId" element={<PostDetails />} />

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
