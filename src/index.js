import React from 'react'
import HorizontalRangeSlider from "./HorizontalRangeSlider";
import VerticalRangeSlider from "./VerticalRangeSlider";

export default class RangeSlider extends React.Component {
    render(){
        return (
            this.props.orientation == "VERTICAL"?
                <VerticalRangeSlider {...this.props}/>
                :
                <HorizontalRangeSlider {...this.props} />
        )
    }
}