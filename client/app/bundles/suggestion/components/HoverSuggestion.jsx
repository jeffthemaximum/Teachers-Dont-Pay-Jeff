import React from 'react';
import ToolTip from 'react-portal-tooltip'

const HoverSuggestion = React.createClass({
    getInitialState(){
        return({
            isTooltipActive: false,
            id: this.makeid()
        })
    },

    showTooltip() {
        this.setState({isTooltipActive: true})
    },

    hideTooltip() {
        this.setState({isTooltipActive: false})
    },

    makeid() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

        for (var i = 0; i < 10; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    },

    definitions(){
        const { definition } = this.props.data
        if (definition) {
            const poses = Object.keys(definition)
            let defs = [];
            let def;
            _.each(poses, (pos) => {
                defs.push(
                    <p><b>{pos}</b></p>
                )
                def = definition[pos].join(", ")
                defs.push(
                    <p>{def}</p>
                )
            })
            return defs;
        } else {
            return (
                <p>No definition :(</p>
            )
        }
        
    },

    synonymsList(){
        const { synonyms } = this.props.data;
        if (synonyms) {
            // let syns = "";
            // _.each(synonyms, (syn) => {
            //     syns.push(
            //         <p>{syn}</p>
            //     )
            // })
            let syns = synonyms.join(", ");
            return <p>{syns}</p>
        } else {
            return (
                <p>No synonyms :(</p>
            )
        }
    },

    render() {
        const {i, word, data} = this.props;

        const style = {
            style: {
                maxHeight: '400px',
                maxWidth: '400px',
                fontSize: "12px"
            },
            arrowStyle: {

            }
        }

        const textStyle = {
            "fontSize": "24px",
            color: "#fcc500"
        }

        return (
            <span>
                <span 
                    id={this.state.id} 
                    onMouseEnter={this.showTooltip} 
                    onMouseLeave={this.hideTooltip}
                    class="difficult-word"
                    style={textStyle}
                >
                    <b>{word}</b>
                </span>
                <ToolTip 
                    active={this.state.isTooltipActive} 
                    position="top" 
                    arrow="center" 
                    parent={"#" + this.state.id}
                    class="suggestion-tooltip"
                    style={style}
                >
                    <div className="tooltip-container">
                        <div>
                            <p><b>Synonyms</b></p>
                            {this.synonymsList()}
                        </div>
                        <div>
                            <p><b>Definitions</b></p>
                            {this.definitions()}
                        </div>
                    </div>
                 </ToolTip>
            </span>
        )
    }
})

module.exports = HoverSuggestion;