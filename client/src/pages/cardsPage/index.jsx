import React, {useState, useEffect, useRef} from 'react';
import FlashcardList from './FlashcardList';
import '../../styles/flashcards/cards.css'
import axios from 'axios';

function Cards(){
    const [flashcards, setFlashcards] = useState([]);
    const [categories, setCategories] = useState([])
    const typeEl = useRef()
    const amountEl = useRef()

    useEffect(() => {
        axios
            .get('https://opentdb.com/api_category.php')
            .then(res => {
                setCategories(res.data.trivia_categories)
            })
    }, [])



    function decodeString(str){
        const textArea = document.createElement('textarea')
        textArea.innerHTML = str
        return textArea.value
    }

    function handleSubmit(e){
        e.preventDefault()
        axios
            .get('https://opentdb.com/api.php?amount=10',{
                params:{
                    amount: amountEl.current.value,
                    category: typeEl.current.value
                }
            })
            .then(res => {
                setFlashcards(res.data.results.map((questionItem, index) => {
                    const answer = decodeString(questionItem.correct_answer)
                    const options = [...questionItem.incorrect_answers.map(a=>decodeString(a)), answer]
                    return {
                        id:`${index}-${Date.now()}`,
                        question: decodeString(questionItem.question),
                        answer: answer,
                        options: options.sort(()=> Math.random()-.5)
                    }
                }))
            })

    }

    return(
        <>
            <h2 id="flash-title"> Flaschards </h2>
            <form className='header' onSubmit ={handleSubmit}>
                <div className='form-group'>
                    <label htmlFor='type'>Category</label>
                    <select id='type' ref={typeEl}> 
                        {categories.map(category => {
                            return <option value={category.id} key={category.id}>{category.name}</option>
                        })}
                    </select>
                </div>
                <div className='form-group'>
                        <label htmlFor='amount'>Number of Questions</label>
                        <input type="number" id="amount" min="1" step="1" defaultValue={10} ref={amountEl}/>
                </div>
                <div className='form-group'>
                        <button className="final-btn">Generate</button>
                </div>
            </form>
            <div className='container'>
                <FlashcardList flashcards={flashcards} />
            </div>
        </>
        
    );
}


export default Cards;