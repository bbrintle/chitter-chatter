import { BrowserRouter as Router, Route } from "react-router-dom";
import { useEffect, useState} from "react";
//React Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import Pusher from "pusher-js"

//Pages
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

//Components
import Header from "./components/Header";
import Container from "./components/Container";
import ContainerFluid from "./components/ContainerFluid";
import Row from "./components/Row";
import Col from "./components/Col";
import Sidebar from "./components/Sidebar";
import StickyFooter from "./components/StickyFooter";

//Include HOCS
import PublicRoute from "./hocs/PublicRoute";
import PrivateRoute from "./hocs/PrivateRoute";

function App() {

return (
    <Router>
      <Route exact path="/" component={Home}/>
      <PrivateRoute path="/dashboard/:chatroomID" component={Dashboard}/>
      <PrivateRoute exact path="/dashboard" component={Dashboard}/>
      <PublicRoute exact path="/login" component={Login}/>
      <PublicRoute exact path="/register" component={Register}/>
      <StickyFooter />
    </Router>
  );
}

export default App;
