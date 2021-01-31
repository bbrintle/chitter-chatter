import "./style.css";

const BannerMainHeadingType = (props) => {
    return (
        <div className="banner-main-heading-type px-3 px-md-4 py-3 py-xl-4 mt-3 mt-sm-0">
            <div className="heading-title">
                <div className="mb-1">{props.headingTitle}</div>
            </div>
            <div className="heading-message">
                <div className="mt-2">
                    <i>{props.headingText}</i>
                </div>
            </div>
        </div>
    )
}

export default BannerMainHeadingType;