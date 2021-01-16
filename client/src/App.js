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

//Include HOCS
import PublicRoute from "./hocs/PublicRoute";
import PrivateRoute from "./hocs/PrivateRoute";

function App() {

  // const [chatMessages, setChatMessages] = useState([])

  useEffect(()=> {
    const pusher = new Pusher('dbb02b01af6775b08146', {
      cluster: 'us3'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (data) => {
      alert(JSON.stringify(data));
    });
  },[]);

  return (
    <Router>
      <Header/>
      <Route exact path="/" component={Home}/>
      <PrivateRoute exact path="/dashboard" component={Dashboard}/>
      <PublicRoute exact path="/login" component={Login}/>
      <PublicRoute exact path="/register" component={Register}/>
    </Router>
  );
}

export default App;
