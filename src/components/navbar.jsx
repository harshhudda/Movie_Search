import React from "react";

export default function Navbar() {
    return (
        <div className="nav-bar">
            <img src={import.meta.env.BASE_URL + "/search.png"} alt="search" className="search-img"/>
            <h3>Movies Search</h3>
        </div>
    )
}