import "@mui/material";
import "react-icons";
import "react-icons/bi";
import "react-icons/md";
import "react-icons/bs";
import "react-router-dom";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import {
  BrowserRouter,
  Route,
  Routes,
  useParams,
  useSearchParams,
} from "react-router-dom";
import theme from "./theme";

import PostView from "./components/views/PostView";
import CreatePostView from "./components/views/CreatePostView";
import ProfileView from "./components/views/ProfileView";
import LoginView from "./components/views/LoginView";
import SignupView from "./components/views/SignupView";
import ExploreView from "./components/views/ExploreView";
import PrivateRoute from "./components/PrivateRoute";
import SearchView from "./components/views/SearchView";
import MessengerView from "./components/views/MessengerView";
import { initiateSocketConnection, socket } from "./helpers/socketHelper";
import { useEffect } from "react";
import { BASE_URL } from "./config";
import { io } from "socket.io-client";

import "./index.css";
import Layout from "./components/util/Layout";
import HomePageView from "./components/views/HomePageView";
import "./global.scss";
import EmailConfirmView from "./components/views/EmailConfirmView";

function App() {
  initiateSocketConnection();

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <CssBaseline />
        <Layout>
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <ExploreView />
                </PrivateRoute>
              }
            />
            <Route path="/home" element={<HomePageView />} />
            <Route
              path="/posts/:id"
              element={
                <PrivateRoute>
                  <PostView />
                </PrivateRoute>
              }
            />
            <Route
              path="/posts/create"
              element={
                <PrivateRoute>
                  <CreatePostView />
                </PrivateRoute>
              }
            />
            <Route
              path="/messenger"
              element={
                <PrivateRoute>
                  <MessengerView />
                </PrivateRoute>
              }
            />
            <Route
              path="/confirmEmail/:emailConfirmToken"
              element={<EmailConfirmView />}
            />
            <Route
              path="/search"
              element={
                <PrivateRoute>
                  <SearchView />
                </PrivateRoute>
              }
            />
            <Route
              path="/users/:id"
              element={
                <PrivateRoute>
                  <ProfileView />
                </PrivateRoute>
              }
            />
            <Route path="/login" element={<LoginView />} />
            <Route path="/signup" element={<SignupView />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
