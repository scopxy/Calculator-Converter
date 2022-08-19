import React from "react";
import './Animation.css';
import { useState } from "react";
import { useTransition, animated } from "react-spring";

const Animation = () => {
    const[isVisible, setIsVisible] = useState(false);
    const transition = useTransition(isVisible, {
        from: {x:-100, y: 800, opacity: 0},
        enter: {x:0, y: 0, opacity: 1},
        leave: {x:200, y: 800, opacity: 0},
    });
    return (
        <div className="app">
            <button onClick={() => {
                setIsVisible(v =>!v);

            }}>{isVisible ? 'Hide' : 'Convert'}</button>
            <div className="container">
                {transition((style, item) =>
                item ? <animated.div style={style} className="item"/> : ''
                )}
            </div>
        </div>
    )
}

export default Animation;