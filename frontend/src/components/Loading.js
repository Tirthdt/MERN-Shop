import React from 'react';
import { Spinner } from "react-bootstrap";

const Loading = () => {
    return (
        <Spinner style={{ display: 'block', margin: "auto" }} size='lg' animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    )
}

export default Loading
