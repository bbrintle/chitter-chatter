import { BrowserRouter as Router, Route } from "react-router-dom";
//React Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

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

//Include HOCS
import PublicRoute from "./hocs/PublicRoute";
import PrivateRoute from "./hocs/PrivateRoute";

function App() {
  return (
    <Router>
      <Route exact path="/" component={Home}/>
      <PrivateRoute exact path="/dashboard" component={Dashboard}/>
      <PublicRoute exact path="/login" component={Login}/>
      <PublicRoute exact path="/register" component={Register}/>
    </Router>
  );
}

export default App;
