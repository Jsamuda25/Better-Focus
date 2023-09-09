import React, {useState} from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import '../../styles/notePage/addNote.css'
import {v4 as uuid} from 'uuid';

function NoteForm({username}){
    let options = ['Gym', 'Work', 'School', 'Personal', 'Other'];
    const defaultOption = options[0];
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Personal');
    const [content, setContent] = useState('');

    const changeTitle = (e) => {
        setTitle(e.target.value);
    }

    const changeCategory = (e) => {
        setCategory(e.target.value);
    }

    const changeContent = (e) => {
        setContent(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const note = {title: title, category: category, content: content, username: username, id: uuid().slice(0,6)};
        console.log(note);

        const noteRes = await fetch('http://localhost:3000/notes/add', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(note)
        });
        const noteData = await noteRes.json();
        console.log(noteData);

        if(noteData.message === 'Note added'){
            window.location.reload();
            console.log('Note added');
        }
        else{
            console.log('Note not added');
        }


    }

    console.log(title, category, content)
    return(
        <div className="submit-container">
            <form className="note-form" id='note-form' onSubmit={handleSubmit}>
                <h4>Add a new note</h4>
                <input 
                    required
                    type="text" 
                    placeholder="Title"
                    onChange={changeTitle} 
                />
                <label htmlFor="category">Entry category:</label>
                <select className="category" onChange={changeCategory}>
                    <option value="Personal">Personal</option>
                    <option value="Gym">Gym</option>
                    <option value="Work">Work</option>
                    <option value="School">School</option>
                    <option value="Other">Other</option>
                </select>
                <textarea 
                    required
                    placeholder="Take a note..." 
                    rows="12" 
                    id='note-form' 
                    onChange={changeContent}
                    />
                <button type="submit" id="add">Add</button>
            </form>
        </div>
    );


}

export default NoteForm;