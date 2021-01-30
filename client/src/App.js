import { BrowserRouter as Router, Route } from "react-router-dom";
//React Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// Theme
import {ThemeProvider} from 'styled-components';
import LightTheme from './themes/light';
import DarkTheme from './themes/dark';
import React, {useState} from 'react';

//Pages
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

//Components
import StickyFooter from "./components/StickyFooter";

//Include HOCS
import PublicRoute from "./hocs/PublicRoute";
import PrivateRoute from "./hocs/PrivateRoute";

function App() {
  const [theme, setTheme] = useState(LightTheme);

return (
  <ThemeProvider theme={{...theme, setTheme: () => {
    setTheme(s => s.id === 'light' ? DarkTheme : LightTheme);
  }}}>
    <Router>
      <Route exact path="/" component={Home}/>
      <PrivateRoute exact path="/dashboard/:chatroomName/:chatroomID" component={Dashboard}/>
      <PrivateRoute exact path="/dashboard" component={Dashboard}/>
      <PublicRoute exact path="/login" component={Login}/>
      <PublicRoute exact path="/register" component={Register}/>
      <StickyFooter />
    </Router>
    </ThemeProvider>
  );
}

export default App;
