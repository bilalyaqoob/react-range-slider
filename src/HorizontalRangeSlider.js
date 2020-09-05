import React from 'react';
import ReactDOM from "react-dom";
import { Caret } from './RangeSliderIcons';

/**
 * Displays a horizontal or vertical track for the slider 
 * component depending on its configured orientation
 */
const Track = ({length, size, color})=>(
    <div 
        style={{
            width: length, 
            height:  size, 
            backgroundColor: color, 
            position: "absolute", 
            top: 8,
            left: 0
        }}>
    </div>
)

/**
 * Renders a track item (vertical or horizontal bars) for the slider component alongside the value of the track.
 */
const TrackMark = ({value, position, color})=>(
    <div style={{
        position:"absolute", 
        height: 16, 
        width: 1, 
        backgroundColor: color, 
        display:"inline-block", 
        left: position,
        top: 0,
        transition: "all .2s"
    }}>
        <span style={{
            position:"absolute", 
            left: 0,
            top: -20, 
            fontSize:12,
            color: color,
            transform: "translateX(-50%)"
        }}>
            {value}
        </span>
    </div>
)

/**
 * Renders the custom component for the selected track value.
 */
const SliderThumb = ({refVal, onMouseDown, value, position, thumbColor, thumbTextColor, thumbSize})=>{
    return (
        <div 
            onMouseDown={onMouseDown} 
            ref={refVal}
            style={{
                position: "absolute",
                width: thumbSize || 40,
                height: thumbSize || 40,
                left: position, 
                top: -1 * thumbSize / 3, 
                transform: "translateX(-50%)", 
                zIndex:2,
                cursor:"grab",
                transition: "top 0.1s, left 0.1s"
            }}
        >   
            <div 
                onMouseDown={onMouseDown} 
                ref={refVal}
                style={{
                    position: "absolute", 
                    height: "100%", 
                    width: "100%", 
                    backgroundColor: thumbColor, 
                    flexDirection: "row",
                    display: "flex", alignItems:"center", justifyContent:"center", 
                    borderRadius: "50%",
                    boxShadow: "0 0 2px 1px rgba(0,0,0,0.35)"
                }}
            >
                <Caret 
                    size={5} 
                    color={thumbTextColor} 
                    style={{margin:2}} 
                    direction="LEFT" 
                />
                <div style={{width:"40%", height:"40%", border:`3px solid ${thumbTextColor}`, borderRadius:3, position:"relative"}}>
                    <div style={{color: thumbTextColor, fontSize:11, position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)"}}>{value}</div>
                </div>
                <Caret 
                    size={5} 
                    color={thumbTextColor}
                    style={{margin:2}} 
                    direction="RIGHT" 
                />
            </div>
            
        </div>
    )
}

const SliderOverflowIndicators = ({sliderLength, visibleRange, sliderRange, color})=>(
    <React.Fragment>
        {visibleRange[visibleRange.length-1] !== sliderRange[sliderRange.length-1] &&
            <Caret 
                color={color}
                size={8}
                style={{
                    position: "absolute", 
                    top: 0,
                    left: sliderLength + 10
                }}
                direction= "RIGHT"
            />
        }
        {visibleRange[0] !== sliderRange[0] &&
            <Caret 
                color={color}
                size={8}
                style={{
                    position: "absolute", 
                    left: -18,
                    top: 0
                }}
                direction= "LEFT"
            />
        }
    </React.Fragment>
)


export default class HorizontalRangeSlider extends React.Component {
    constructor(props){
        super(props);
        this.dragComponentRef = React.createRef();
        let processedRange = this._processRange(props.range);
        this.state = {
            sliderRange: processedRange,
            visibleRange: processedRange.slice(0, this.props.visibleCount),
            sliderValue: this.props.defaultStart,
            visibleIndex: 0
        }
    }
    /**
     * Takes as input an array of two elements, where the first element represents the lower bound and the second, the upper bound.
     * It then returns a new array which contains all the numbers between the provided bounds.
     */
    _processRange = (arr)=>{
        let array = [];
        for(let i=arr[0]; i<=arr[1]; i++){
            array.push(i);
        }
        return array;
    }


    handleMouseDown = (evt)=>{
        let element = ReactDOM.findDOMNode(this.dragComponentRef.current);
        
        this.mousePressedX = evt.clientX - element.offsetLeft;
        this.mousePressedY = evt.clientY - element.offsetTop;
        
        document.onmousemove = this.handleMouseMove;
        document.onmouseup = this.handleMouseUp
    }
    handleMouseUp = (evt)=>{
        this.mousePressedX = null;
        this.mousePressedY = null;
    }
    handleMouseMove = (evt)=>{
        const {markSpacing} = this.props;
        const minRangeValue = this.state.visibleRange[0];

        if(this.mousePressedX!=null && this.mousePressedY!=null){
            let x =  evt.clientX - this.mousePressedX, 
            y =  evt.clientY - this.mousePressedY,
            value = 0, cursorPos = x;
            
            if(cursorPos<0)
                value = 0;
            
            else if( cursorPos > (this.state.visibleRange.length-1) * markSpacing )
                value = (this.state.visibleRange.length-1) * markSpacing;
            
            else
                value = Math.round( cursorPos / markSpacing ) * markSpacing;

            let sliderValue = (value / markSpacing) + minRangeValue;
            if(this.state.sliderValue !== sliderValue){
                this.setState({sliderValue: sliderValue}, ()=>{
                    this.props.onChange && this.props.onChange(this.state.sliderValue);
                });
            }

        }
    }
    _updateVisibleRange = (val)=>{
        let {sliderValue, sliderRange, visibleIndex, visibleRange} = this.state;
        let minRangeValue = visibleRange[0]; 
        let maxRangeValue = visibleRange[this.props.visibleCount-1]; 
        
        let nextSliderValue = sliderValue + val 
        if(nextSliderValue < minRangeValue || nextSliderValue > maxRangeValue || visibleIndex + val <= 0 || visibleIndex + val > sliderRange.length - this.props.visibleCount ){
            return;
        }
        this.setState({ 
            visibleRange: sliderRange.slice( 
                visibleIndex + val, 
                visibleIndex + this.props.visibleCount + val
            ),
            visibleIndex: visibleIndex + val,
            sliderValue: nextSliderValue
        }, ()=>{this.props.onChange && this.props.onChange(this.state.sliderValue)});
        this.rangeUpdated = true;
    }
    handleMouseWheel = (evt)=>{
        if(evt.deltaY<0){
            this._updateVisibleRange(1)
        } else if(evt.deltaY>0){
            this._updateVisibleRange(-1)
        }
    }
    componentWillReceiveProps(props){
        let processedRange = this._processRange(props.range);
        this.setState({
            sliderRange: processedRange,
            visibleRange: processedRange.slice(this.state.visibleIndex, this.state.visibleIndex+this.props.visibleCount)
        })
    }
    componentDidUpdate(){
        setTimeout(() => {
            let {sliderValue, sliderRange, visibleIndex, visibleRange} = this.state;
            let minRangeValue = visibleRange[0]; 
            let maxRangeValue = visibleRange[this.props.visibleCount-2]; 

            if(
                ( sliderValue >= maxRangeValue && visibleRange[visibleRange.length-1] !== sliderRange[sliderRange.length-1]  || 
                    sliderValue <= minRangeValue && visibleRange[0] !== sliderRange[0]) && !this.rangeUpdated)
            {
                this.rangeUpdated = true
                let nextRangeCount = ( sliderValue>=maxRangeValue ? 1 : sliderValue <= minRangeValue ? -1 : 0 )
                this.setState({ 
                    visibleRange: sliderRange.slice( 
                        visibleIndex + nextRangeCount, 
                        visibleIndex + this.props.visibleCount + nextRangeCount
                    ),
                    visibleIndex: visibleIndex + nextRangeCount
                })
            } else {
                this.rangeUpdated = false;
            }
        }, 100);
    }
    render(){
        const {markSpacing, trackColor, thumbColor, thumbTextColor, thumbSize, sliderColor} = this.props;
        const {visibleRange, sliderValue, sliderRange} = this.state;
        const sliderLength = ( visibleRange.length - 1 ) * markSpacing;
        const minValue = visibleRange[0];

        return (
            <div onWheel={this.handleMouseWheel}  
                style={{borderRadius:10, userSelect:"none",  backgroundColor: sliderColor||"whitesmoke", display:"inline-block", paddingTop:30, paddingLeft:35}}>
                <div style={{height:40, width: sliderLength+50, position:"relative"}}>
                    <Track 
                        length={(visibleRange.length - 1) * markSpacing}
                        size={1}
                        color={trackColor || "#212121"} />

                    {visibleRange.map(item=>(
                        item !== sliderValue && (
                            <TrackMark 
                                key={""+item}
                                value={item}
                                position={(item - minValue)*markSpacing}
                                color={trackColor || "#212121"}
                                markSpacing={markSpacing}
                            />
                        )
                    ))}

                    <SliderThumb 
                        refVal={this.dragComponentRef}
                        onMouseDown={this.handleMouseDown}
                        value={sliderValue}
                        position={(sliderValue - minValue)*markSpacing}
                        thumbColor={thumbColor || "whitesmoke"}
                        thumbTextColor={thumbTextColor || "#0D47A1"}
                        thumbSize={thumbSize || 40}
                    />
                    
                    <SliderOverflowIndicators 
                        sliderLength={sliderLength}
                        visibleRange={visibleRange}
                        sliderRange={sliderRange}
                        color={trackColor || "#212121"}
                    />
                </div>
            </div>
        )
    }
}