import React from 'react'
import { useState, useEffect, useRef } from 'react'


function Stopwatch() {
    const [time, setTime] = useState(0);
    const [isRunning, setisRunning] = useState(false);
    const intervelRef = useRef(null);
    const startTimerRef = useRef(0);

    useEffect(() => {
        if (isRunning) {
            intervelRef.current = setInterval(() => {
                setTime(Date.now() - startTimerRef.current);
            }, 10);
        }

        return () => clearInterval(intervelRef.current);
    }, [isRunning]);

    const handleStart = () => {
        setisRunning(true);
        startTimerRef.current = Date.now() - time;
        console.log(startTimerRef.current);
    }

    const handleStop = () => {
        setisRunning(false);
    }

    const handleReset = () => {
        setTime(0);
        setisRunning(false);
    }

    function formatTime() {
        let hours = Math.floor(time / (1000 * 60 * 60));
        let minutes = Math.floor((time / (1000 * 60)) % 60);
        let seconds = Math.floor((time / 1000) % 60);
        let milliseconds = Math.floor((time % 1000) / 10);

        hours = String(hours).padStart(2, "0");
        minutes = String(minutes).padStart(2, "0");
        seconds = String(seconds).padStart(2, "0");
        milliseconds = String(milliseconds).padStart(2, "0");

        return ` ${minutes} : ${seconds} : ${milliseconds}`;
    }
    return (
        <div className="m-10 my-10 p-5 text-center shadow-md">
             <h1 className='font-bold'>Stop watch</h1>
            <h1 className='font-bold text-center text-4xl'>{formatTime()}</h1>

            <button onClick={handleStart} className='bg-green-500 m-3 p-2 px-3 font-bold  rounded-xl shadow-sm hover:bg-green-800 text-white'>start</button>
            <button onClick={handleStop} className='bg-red-500 m-3 p-2 px-3 font-bold rounded-xl shadow-sm hover:bg-red-800 text-white'>stop</button>
            <button onClick={handleReset} className='bg-blue-200 m-3 p-2 px-3 font-bold rounded-xl shadow-sm hover:bg-blue-800 text-white'>reset</button>

        </div>
    )
}

export default Stopwatch