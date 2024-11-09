'use client'

import { useState } from "react";

export default function Counter() {

    const [count, setCount] = useState(0)

    function handleClick() {
        setCount(count + 1)
    }

    return (<div>
        <h1>{count}</h1>
        <button onClick={handleClick} type="button">Click Me!</button>
    </div>)
}