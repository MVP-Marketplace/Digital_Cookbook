import React from 'react'
import { NavLink } from "react-router-dom"
const PageNotFound = () => {
    return (
        <div>
            <h1>404 Error</h1>
            <p> Sorry, this page is not found. </p>
            <NavLink to="/"> Go Back </NavLink>
        </div>
    )
}

export default PageNotFound
