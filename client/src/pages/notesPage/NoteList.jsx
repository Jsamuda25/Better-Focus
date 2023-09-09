import React from 'react';
import Note from './Note';
import {useState} from 'react';
import {v4 as uuid} from 'uuid';
import '../../styles/notePage/noteList.css'

function NoteList({notes, username}){
    const [id, setId] = useState(0);

    return(
        <div className='note-grid'>
            {notes.map(note=>{return <Note note={note} username={username} key={uuid().slice(0,8)}/>})}
    
        </div>
    )
}

export default NoteList;