import React from 'react'

export const CaretUp = ({style, color, size})=>{
    return (
        <div 
            style={{
                ...style,
                width:0, height:0,
                borderLeft: `${size}px solid transparent`,
                borderRight: `${size}px solid transparent`,
                borderBottom: `${size}px solid ${color}`,
            }}
        />
    )
}

export const CaretDown = ({style, color, size})=>{
    return (
        <div 
            style={{
                ...style,
                width:0, height:0,
                borderLeft: `${size}px solid transparent`,
                borderRight: `${size}px solid transparent`,
                borderTop: `${size}px solid ${color}`,
            }}
        />
    )
}

export const CaretLeft = ({style, color, size})=>{
    return (
        <div 
            style={{
                ...style,
                width:0, height:0,
                borderTop: `${size}px solid transparent`,
                borderBottom: `${size}px solid transparent`,
                borderRight: `${size}px solid ${color}`
            }}
        />
    )
}

export const CaretRight = ({style, color, size})=>{
    return (
        <div 
            style={{
                ...style,
                width:0, height:0,
                borderTop: `${size}px solid transparent`,
                borderBottom: `${size}px solid transparent`,
                borderLeft: `${size}px solid ${color}`
            }}
        />
    )
}

export const Caret = ({direction, ...restProps})=>(
    direction == "UP"?
        <CaretUp {...restProps}/>
        :
    direction == "DOWN"?
        <CaretDown {...restProps} />
        :
    direction == "LEFT"?
        <CaretLeft {...restProps} />
        :
    direction == "RIGHT"?
        <CaretRight {...restProps} />
        : 
        null
)