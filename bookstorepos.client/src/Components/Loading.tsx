import { Spinner } from "react-bootstrap"


export const Loading = () => {
    return (
        <div style={{ display: "flex", placeItems: 'center', justifyContent: 'center', minHeight: "100vh" }}>
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div> 
    )
}