import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = props => (
    <div className="w-100 text-center mt-2">
        <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
        </Spinner>
    </div>
)

export default Loader