import React from 'react';
import {useState, useEffect, useRef} from 'react';
import '../../styles/notePage/note.css'

function Note({note, username}){
    const [height, setHeight] = useState('initial');

    const textRef = useRef();

    function setMaxHeight(){
        const cardHeight = textRef.current.getBoundingClientRect().height;
        setHeight(Math.max(cardHeight,100));
    }

    useEffect(setMaxHeight, [note.title, note.category, note.content]);
    useEffect(()=>{
        window.addEventListener('resize', setMaxHeight);
        return () => window.removeEventListener('resize', setMaxHeight);
    },[])

    function deleteNote(){
        fetch('http://localhost:3000/notes/delete/'+ username + "/" + note.id, {
            method: 'DELETE'
        }).then((res) => {
            console.log(res);
            window.location.reload();
        })
    }

    return(
        <div className='card' ref={textRef}>
            <h3>{note.title} - {note.category}</h3>
            <p id='paragraph'>{note.content}</p>
            <button onClick={deleteNote}>Delete</button>
        </div>
    )

}

export default Note;