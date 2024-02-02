import React from 'react';

function Message2({isCorrect, count}){
    if (isCorrect){
        return <>
        <p className='message1'> Nice Job!</p>
            <p>This NPC has been guessed correctly {count} times!</p>
            
            </>
            
    }
    return <>
    <p className='message2'> Sorry, Try Again! </p>
        <p>This NPC has been guessed correctly {count} times!</p>
        </>

}

export default Message2;