import { BrowserRouter as Router, Route } from "react-router-dom";
//React Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

//Pages
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";

//Components
import Header from "./components/Header";
import Container from "./components/Container";
import ContainerFluid from "./components/ContainerFluid";
import Row from "./components/Row";
import Col from "./components/Col";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <Router>
      <Header/>
      <Route exact path="/" component={Dashboard}/>
    </Router>
  );
}

export default App;
