import React, { useState, useEffect, useRef } from 'react';
import useRandomItem from './hook';

function SpeedTest() {
    const [word, regenerateWord] = useRandomItem(['devmentor.pl', 'abc', 'JavaScript']);
    const [inputText, setInputText] = useState('');
    const [totalCharacters, setTotalCharacters] = useState(0);
    const [time, setTime] = useState(0);
    const intervalRef = useRef(null);

    useEffect(() => {
        regenerateWord();
    }, []);

    useEffect(() => {
        if (inputText === word) {
            setTotalCharacters((prev) => prev + word.length);
            setInputText('');
            regenerateWord();
        }
    }, [inputText, word, regenerateWord]);

    const handleFocus = () => {
        if (!intervalRef.current) {
            intervalRef.current = setInterval(() => {
                setTime((prev) => prev + 1);
            }, 1000);
        }
    };

    const handleBlur = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    return (
        <div>
            <h1>Type the word:</h1>
            <h2>{word}</h2>
            <input
                type='text'
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
            <div>
                <p>Total characters typed: {totalCharacters}</p>
                <p>Time elapsed: {time} seconds</p>
            </div>
        </div>
    );
}

export default SpeedTest;
