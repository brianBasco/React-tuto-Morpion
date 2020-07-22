import React from "react"

export default function Square(props) {

    let style;

    if (props.winner) {
        style = { background: "aliceblue", transform: "scale(1.2)" }
    }

    return <button style={style} className="square" onClick={props.onclick}>
        {props.value}
    </button>

}