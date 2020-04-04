import React from 'react'
import notfound from '../assets/404.gif';
import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div className="flex-center">
            <img src={notfound} alt="404 Error Occurred"/>
            <h4>
                The Page you are looking for doesn't exist. Go Back to <Link to="/" className="links">Home</Link> or <Link to="/search" className="links">Search</Link>
            </h4>
        </div>
    )
}
