import React, {useEffect, useState} from 'react';

import Message from '../components/message2';
const hostname = 'https://osrsflask.joelgilger.com'
// const hostname = 'http://127.0.0.1:5000'

function MonstersPage() {
    
    const [isCorrect, setisCorrect] = useState(undefined)
    const [img, setImg] = useState();
    const [encName, setencName] = useState();
    const [count, setCount] = useState();
    const fetchImage = async () => {
      const res = await fetch(hostname+'/monster');
      const monster = await res.json()
      
      setImg(monster.img);
      setencName(monster.name)
    };

    useEffect(()=> {
      fetchImage();
    }, []);

    async function newMonster(e) {
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
      const data = await fetch(hostname+'/guesscheckmonster', {method: 'POST',
      headers: {'Accept': 'application/json',
      'Content-Type': 'application/json'},
      body: JSON.stringify(formJson)});
      
      const correct = await data.json()
      
      console.log(correct.correct)
      console.log(correct.count)
      setisCorrect(correct.correct)
      setCount(correct.count)
      form.reset();
    }
    
    return (
        <>
        <h1>Guess Old School Runescape Monsters</h1>
        <p className='card'>You can guess random Monsters and NPC's in the game based on their examine text. Beware some characters have the same examine text so be sure to guess all variations. <p>For example:
            Dark Ankou and Ankou</p>
        </p>
        <button className='new' onClick={newMonster}>New Monster</button>
      <div className="card">
        
        <p className='monster_image'>{img}</p>
        
        <form method='POST' onSubmit={handleSubmit}>
          <label htmlFor="guess" >Guess: </label>
          <input type='text' name="guess" id='guess'  rows="1" placeholder='...'
          
          />
          <button type='submit' disabled={isCorrect}>Enter</button>
        </form>
        
      {isCorrect !== undefined && <Message isCorrect={isCorrect} count = {count}/>}
      </div>
      
        </>
    )
}

export default MonstersPage;