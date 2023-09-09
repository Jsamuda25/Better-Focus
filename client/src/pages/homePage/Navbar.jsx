import React from 'react';
import '../../styles/homePage/nav.css';
import {Link} from 'react-router-dom';

function Navbar({user}){
    console.log(user.username);
    return(
        <div className="nav">
            <ul>
                <li>
                <Link to="/flashcards"
                    state={{user: user}}
                >Flashcards</Link>
                </li>
                <li>
                <Link to="/notes"
                    state={{user: user}}
                    >Notes</Link>
                </li>
                <li>
                <Link to="/todo"
                    state={{user: user}}
                    >Todo List</Link> 
                </li>
            </ul>
        </div>
    )

}

export default Navbar;