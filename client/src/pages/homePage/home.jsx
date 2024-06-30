import React from 'react';
import Navbar from './Navbar';
import {useLocation} from 'react-router-dom';
import '../../styles/homePage/index.css';

const viewUser = () => {
    const location = useLocation();
    const user = location.state.user;
    return user;
}

function Home (){   
    const user = viewUser();
    console.log(user);

    return(
    <>
        <Navbar user={user}/>
        <div className='home-container'>
            <h1>Welcome, {user.username}!</h1>
            <p>This is StudyPal, your personal productivity and organization hub!</p>
            <p>Here you can study flashcards, take notes, and manage your todo list.</p>
            <img src="../../../icons/checklist.svg" id="notepad"></img>
        </div>
    </>
    )

}


export default Home;