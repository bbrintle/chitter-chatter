import Carousel from 'react-bootstrap/Carousel'

const LandingCarousel = () => {
    return (
        <Carousel indicators={false}>
            <Carousel.Item interval={5000}>
                <div className="landing-item">
                    <h1 className="text-center landing-quote">Don't be Busy.  Be Productive.</h1>
                </div>
            </Carousel.Item>
            <Carousel.Item interval={5000}>
                <div className="landing-item">
                    <h1 className="text-center landing-quote">Teamwork makes the Dream work!</h1>
                </div>
            </Carousel.Item>
            <Carousel.Item interval={5000}>
                <div className="landing-item">
                    <h1 className="text-center landing-quote">BE AWESOME TODAY.</h1>
                </div>
            </Carousel.Item>
            </Carousel>
    )
}

export default LandingCarousel;