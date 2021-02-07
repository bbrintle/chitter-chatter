import { BrowserRouter as Router, Route } from "react-router-dom";
//React Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// Theme
import styled, {ThemeProvider} from 'styled-components';
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

const HeaderWrapper = styled.nav`
    background-color: ${p => p.theme.bodyBackgroundColor};
    color: ${p => p.theme.bodyFontColor};
`;

function App() {
  const [theme, setTheme] = useState(LightTheme);

return (
  <ThemeProvider theme={{...theme, setTheme: () => {
    setTheme(s => s.id === 'light' ? DarkTheme : LightTheme);
  }}}>
    <HeaderWrapper>
        <Router>
          <Route exact path="/" component={Home}/>
          <PrivateRoute exact path="/dashboard/:chatroomID" component={Dashboard}/>
          <PrivateRoute exact path="/dashboard" component={Dashboard}/>
          <PublicRoute exact path="/login" component={Login}/>
          <PublicRoute exact path="/register" component={Register}/>
          <StickyFooter />
        </Router>
    </HeaderWrapper>
    </ThemeProvider>
  );
}

export default App;
