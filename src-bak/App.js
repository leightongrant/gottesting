//import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

function App() {
    let [counter, setCount] = useState(0);
    let errorMessage = '';

    function handleInc() {
        setCount((counter += 1));
    }

    function handleDec() {
        if (counter !== 0) {
            setCount((counter -= 1));
        } else {
            errorMessage =
                'The counter was already zero and you clicked decrement. What. Are. You. Trying. To. Do to me???!?!?';
        }
    }
    const counterVal = counter;

    return (
        <div className='App'>
            <div className='App'>
                <div data-test='count'>{counterVal}</div>
                <div data-test='error-message'>{errorMessage}</div>
                <button data-test='decrement-button' onClick={handleDec}>
                    Count Down!
                </button>
                <button data-test='increment-button' onClick={handleInc}>
                    Count Up!
                </button>
            </div>
        </div>
    );
}

export default App;
