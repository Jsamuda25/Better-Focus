import React, {useState} from 'react';

function NewTodoForm({onSubmit}){
    
    const [newItem, setNewItem] = useState('');
    function handleSubmit(e){
        e.preventDefault();
        if (newItem === '') return;
        onSubmit(newItem);
        setNewItem('');
    }
    return(
        <form onSubmit={handleSubmit} className="new-item-form">
            <div className = "form-row">
                <label htmlFor='item'></label>
                <input required value={newItem} onChange={e=> setNewItem(e.target.value)} type="text" id="item" placeholder='Insert new todo item'/>
            </div>
            <button className='btn'> Add Item</button>
        </form>
    )

}

export default NewTodoForm;