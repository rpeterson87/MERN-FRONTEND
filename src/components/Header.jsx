import React from 'react'
import {Link} from 'react-router-dom'

const Header = (props) => {
    return (
        <header style={{ height: "480px", overflow: 'hidden' }}>
            <nav className="nav">
                <Link to="/">
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy1uZTBlxjOfVEiZsIt9FSo_bkxgEb6_OslQ&usqp=CAU"
                    />
                </Link>
                <div>He's so cute</div>
            </nav>
           
        </header>
    )
}


export default Header