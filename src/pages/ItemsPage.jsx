import React, {useEffect, useState} from 'react';

import Message from '../components/message';
// const hostname = 'https://osrsflask.joelgilger.com'
const hostname = 'http://127.0.0.1:5000'
function ItemsPage() {
    
    const [isCorrect, setisCorrect] = useState(undefined)
    const [img, setImg] = useState();
    const [encName, setencName] = useState();
    const [count, setCount] = useState();
    const fetchImage = async () => {
      const res = await fetch(hostname+'/item');
      const item = await res.json()
      
      setImg("data:image/png;base64,"+item.img);
      setencName(item.name)
    };

    useEffect(()=> {
      fetchImage();
    }, []);

    async function newItem(e) {
      e.preventDefault();
      setisCorrect(undefined)
      fetchImage();
    }

    async function handleSubmit(e) {
      e.preventDefault();
      const form = e.target;
      const formData = new FormData(form);
      const formJson = {
        ...Object.fromEntries(formData.entries()),
        name: encName,
      };
      console.log(JSON.stringify(formJson));
      const data = await fetch(hostname+'/guesscheck', {method: 'POST',
      headers: {'Accept': 'application/json',
      'Content-Type': 'application/json'},
      body: JSON.stringify(formJson)});
      console.log(data)
      const correct = await data.json()
      
      console.log(correct.correct)
      console.log(correct.count)
      setisCorrect(correct.correct)
      setCount(correct.count)
      form.reset();
    }
    
    return (
        <>
        <h1>Guess Old School Runescape Items</h1>
        <button onClick={newItem}>New Item</button>
      <div className="card">
        
        <img className='item_image' src={img} />
        
        <form method='POST' onSubmit={handleSubmit}>
          <label for="guess" >Guess: </label>
          <input type='text' name="guess" id='guess'  rows="1" placeholder='...'
          
          />
          <button type='submit' disabled={isCorrect}>Enter</button>
        </form>
        
      {isCorrect !== undefined && <Message isCorrect={isCorrect} count = {count}/>}
      </div>
      
        </>
    )
}

export default ItemsPage;