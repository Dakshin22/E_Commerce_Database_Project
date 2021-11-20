import React, { Fragment, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import "./App.css";
import Navbar from "./utilities/NavBar";
import ItemsPage from "./pages/ItemsPage";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import CssBaseline from "@mui/material/CssBaseline";

function App() {
  const [userInfo, setUserInfo] = useState({
    isLoggedIn: false,
    userName: null,
  });

  const theme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Paper>
          <Router>
            <div className="App">
              <Navbar />
              <div id="page-body">
                <Routes>
                  <Route
                    path="/"
                    element={<Login setUser={setUserInfo} />}
                  />
                  <Route path="/register" element={<Register />} />
                  <Route exact path="/itemsPage">
                    {userInfo.isLoggedIn ? (
                      <ItemsPage userInfo={userInfo} />
                    ) : (
                      <Login setUser={setUserInfo}/>
                    )}
                  </Route>
                </Routes>
              </div>
            </div>
          </Router>
        </Paper>
      </ThemeProvider>
    </>
  );
}

export default App;
