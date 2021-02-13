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
import SpotlightBanner from "../components/SpotlightBanner";
import Recognition from "../components/Recognition"
import { useParams } from "react-router-dom"


const Dashboard = () => {
    const { chatroomID, userID } = useParams();

    return (
        <div className='body'>
            <Header/>
            <ContainerFluid>
                <Row>
                    <Col size={"col-sm-4 col-md-3 col-lg-2"}>
                        <Sidebar/>
                    </Col>

                    <Col size={"col-sm-8 col-md-9 col-lg-10"}>
                        {chatroomID ? <ChatBox  /> :
                        userID ?
                            <>
                                <Profile /> 
                            </>
                            :
                            <>
                                <SpotlightBanner/>
                                <Recognition />
                            </>
                        } 
                    </Col>
                </Row>
            </ContainerFluid>
        </div>
    );
};

export default Dashboard;