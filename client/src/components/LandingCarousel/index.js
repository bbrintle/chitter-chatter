import Carousel from 'react-bootstrap/Carousel'
import { useState } from "react";

const LandingCarousel = () => {
    return (
        <Carousel indicators={false}>
            <Carousel.Item interval={5000}>
                <div className="landing-item">
                    <h1 className="text-center landing-quote">Placeholder inspiring landing page stuff</h1>
                </div>
            </Carousel.Item>
            <Carousel.Item interval={5000}>
                <div className="landing-item">
                    <h1 className="text-center landing-quote">Another placeholder inspiring landing page thing</h1>
                </div>
            </Carousel.Item>
            <Carousel.Item interval={5000}>
                <div className="landing-item">
                    <h1 className="text-center landing-quote">Final placeholder for landing page.</h1>
                </div>
            </Carousel.Item>
            </Carousel>
    )
}

export default LandingCarousel;