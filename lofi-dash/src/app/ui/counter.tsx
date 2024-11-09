'use client'

import {useEffect, useState} from "react";

export default function Counter() {

    const [count, setCount] = useState(0)
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const savedCount = localStorage.getItem("userCounter");
        if (savedCount !== null) {
            setCount(parseInt(savedCount));
        }
        setIsLoading(false);
    }, []);

    function handleClick() {
        const newCount = count + 1
        setCount(newCount)
        localStorage.setItem("userCounter", newCount.toString())
    }

    if (isLoading) {
        return null
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div
                onClick={handleClick}
                className="flex items-center justify-center w-48 h-48 rounded-full
                 bg-green-200 cursor-pointer select-none
                 hover:bg-green-300 hover:scale-110 hover:shadow-lg
                 transition-all duration-300 ease-in-out
                 transform active:scale-95 active:bg-green-400"
            >
        <span className="text-2xl font-bold text-gray-700">
          {count}
        </span>
            </div>
        </div>
    )
}
