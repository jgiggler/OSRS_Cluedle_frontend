import React from 'react';

function Message({isCorrect, count}){
    if (isCorrect){
        return <>
        <p className='message1'> Nice Job!</p>
            <p>This item has been guessed correctly {count} times!</p>
            
            </>
            
    }
    return <>
    <p className='message2'> Sorry, Try Again! </p>
        <p>This item has been guessed correctly {count} times!</p>
        </>

}

export default Message;