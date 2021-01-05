function Col({ size, children }) {
    return <div className={`${size} column`}>{children}</div>
}

export default Col;