import Navbar from "react-bootstrap/Navbar";
import styled from 'styled-components';

const LogoWrapper = styled.header`
    background-color: white;
`;

const NavbarBrand = (props) => {
    return (
        <Navbar.Brand href="/" className={`${props.isLanding ? 'landing-brand mt-5' : ''}`}>
                <div className="navbar-brand-box">
                    <div className="ml-3 ">
                    <LogoWrapper>
                        <span className="navbar-brand-word">
                            <span className="chit-chat">
                                <span className="yellow pl-2">CHIT</span>
                            </span>
                            <span className="pink dark-grey pl-2">T</span>
                            <span className="green dark-grey pl-2">E</span>
                            <span className="blue dark-grey pl-2">R</span>
                        </span>
                    </LogoWrapper>
                    </div>
                    <div className="ml-3">
                    <LogoWrapper>
                        <span className="navbar-brand-word">
                            <span className="chit-chat">
                                <span className="yellow pl-2">CHAT</span>
                            </span>
                            <span className="pink dark-grey pl-2">T</span>
                            <span className="green dark-grey pl-2">E</span>
                            <span className="blue dark-grey pl-2">R</span>
                        </span>
                    </LogoWrapper>
                    </div>
                </div>
        </Navbar.Brand>
    );
}

export default NavbarBrand;