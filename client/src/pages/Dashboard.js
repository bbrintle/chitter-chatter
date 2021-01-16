
//Import grid components
import ContainerFluid from "../components/ContainerFluid";
import Row from "../components/Row";
import Col from "../components/Col";

//Import dashboard components
import Sidebar from "../components/Sidebar";
import ChatBox from "../components/ChatBox";

import "./style.css";


const Dashboard = () => {

    
    return (
        <ContainerFluid>
            <Row>
                <Col size={"col-4 col-md-3 col-lg-2"}>
                    <Sidebar/>
                </Col>

                <Col size={"col-8 col-md-9 col-lg-10"}>
                    <ChatBox />
                </Col>
            </Row>
        </ContainerFluid>
    );
};

export default Dashboard;