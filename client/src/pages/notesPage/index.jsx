import React from 'react';
import { useLocation } from 'react-router-dom'
import {useEffect, useState} from 'react';
import NoteForm from './addNote';
import NoteList from './NoteList';
import axios from 'axios';
import '../../styles/notePage/index.css'
import { set } from 'mongoose';

const getNotes = async() => {
    const username = getUsername();

}

const getUsername = () => {
    const location = useLocation();
    const username = location.state.user.username;
    return username;
}

function Notes(){
    
    const [notes, setNotes] = useState([]);
    const username = getUsername();
    console.log(username);

    useEffect(() => {
        axios.get('http://localhost:3000/notes/'+ username,{
            params: {
                username: username
            }
        })
        .then(function (response) {
            console.log(response.data.notes);
            setNotes(response.data.notes);
            return response.data.notes;
        })
    }, []);

    console.log(notes);
    return(
        <>
            <div className='note-page-container'>                 
                <h1>{username}'s Notes</h1>      
                <div className="notes-section">
                    <NoteList notes={notes} username={username} />
                    <div className="note-form-container">
                        <NoteForm username={username} />   
                    </div>
                </div>  
            </div>
        </>
    )
}

export default Notes;