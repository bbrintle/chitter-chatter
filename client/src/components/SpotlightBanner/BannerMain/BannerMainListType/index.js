import "./style.css";

const BannerMainListType = (props) => {
    return (
        <div className="banner-main-list-type px-3 px-md-4 py-3 py-xl-4 mt-3 mt-sm-0">
            <div className="heading-title">
                <div className="mb-1">{props.headingTitle}</div>
            </div>
            <div className="heading-items">
                <ul className="mt-2">
                    {props.headingItems ? props.headingItems.map((item, index) => {
                        return <li key={index}>{item}</li>
                    }) : null}
                </ul>
            </div>
        </div>
    )
}

export default BannerMainListType;