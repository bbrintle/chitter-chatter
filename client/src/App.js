import { BrowserRouter as Router, Route } from "react-router-dom";
//React Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

//Pages
import Home from "./pages/Home";

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
      <Route exact path="/" component={Home}/>

      <ContainerFluid>
        <Row>
          <Col size={"col-4 col-md-3 col-lg-2"}>
            <Sidebar/>
          </Col>

          <Col size={"col-8 col-md-9 col-lg-10"}>
              <Row>
                <Col size={"col-md-6"}>
                  LEFT
                </Col>
                <Col size={"col-md-6"}>
                  RIGHT
                </Col>
              </Row>
          </Col>
        </Row>
      </ContainerFluid>

    </Router>
  );
}

export default App;
