import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Navbar from "./utilities/NavBar";
import ItemsPage from "./pages/ItemsPage";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import CssBaseline from '@mui/material/CssBaseline';

function App() {
  const theme = createTheme({
    palette: {
      mode: 'dark',
    }
  })
  return (
    <>
    <ThemeProvider theme = {theme}>
    <CssBaseline />
      <Paper>
      <Router>
        <div className="App">
          <Navbar />
          <div id="page-body">
            <Routes>
              <Route path="/" element={<ItemsPage/>} exact />
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
