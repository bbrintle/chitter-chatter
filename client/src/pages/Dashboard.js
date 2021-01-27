import Header from "../components/Header";
//Import grid components
import ContainerFluid from "../components/ContainerFluid";
import Row from "../components/Row";
import Col from "../components/Col";

//Import dashboard components
import Sidebar from "../components/Sidebar";
import ChatBox from "../components/ChatBox";
import "./style.css";
import Profile from "../components/Profile/Profile"
import { useParams } from "react-router-dom"


const Dashboard = () => {
    const { chatroomID, chatroomName } = useParams();

    return (
        <>
            <Header/>
            <ContainerFluid>
                <Row>
                    <Col size={"col-sm-4 col-md-3 col-lg-2"}>
                        <Sidebar/>
                    </Col>

                    <Col size={"col-sm-8 col-md-9 col-lg-10"}>
                        {chatroomID ? <ChatBox chatroomID={chatroomID} chatroomName={chatroomName}/> :
                        <Profile /> } 
                    </Col>
                </Row>
            </ContainerFluid>
        </>
    );
};

export default Dashboard;