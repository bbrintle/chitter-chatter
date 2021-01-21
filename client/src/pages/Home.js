import { Link } from "react-router-dom";

import NavbarBrand from "../components/NavbarBrand";
import LandingCarousel from "../components/LandingCarousel";
import Jumbotron from "../components/Jumbotron";

import "./style.css";

const Home = () => {
    return (
        <div>
            <div className="text-center">
                <NavbarBrand isLanding={true}/>
            </div>
            <Jumbotron>
                <LandingCarousel/>
            </Jumbotron>
            
            <div className="landing-buttons text-center">
                <div className="mx-5 mb-5">
                    <Link to={"register"}>
                        <button className="btn btn-lg btn-block pink-button" type="submit">
                            G<span className="slightly-smaller">ET </span> 
                            S<span className="slightly-smaller">TARTED! </span>
                            C<span className="slightly-smaller">REATE </span>
                            A<span className="slightly-smaller">CCOUNT! </span>
                            <i className="far fa-running ml-2"></i>
                        </button>
                    </Link>
                    <Link to={"login"}>
                        <button className="btn btn-lg btn-block blue-button mt-2" type="submit">
                            L<span className="slightly-smaller">OG </span> 
                            I<span className="slightly-smaller">NTO </span> 
                            E<span className="slightly-smaller">XISTING </span>
                            A<span className="slightly-smaller">CCOUNT</span>
                            <i className="fas fa-sign-in-alt ml-2"></i>
                        </button>
                    </Link>
                </div>
                <hr className="mb-5"/>
            </div>
        </div>
    );
};

export default Home;