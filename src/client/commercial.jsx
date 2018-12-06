import React from "react";
import dives from "./dives";
import logos from "./logos";
import _ from "lodash";

export default class Commercial extends React.Component {
    constructor(props) {
        super(props);
        let self = this;
        this.socket = io("/divecalc");
        console.log(props.channel + "_commercial")
        this.socket.on(props.channel + "_commercial", data => {
            self.setState({
                logo: data.argument,
                show: true
            })
            setTimeout(() => {
                self.setState({ show: false });
            }, 5000)
        });
        this.state = { competitions: {} };
    }
    componentWillUnmount() {
        this.socket.off(this.props.channel + "_commercial");
    }
    render() {
        return (
            <div className={'commercial animated ' + (this.state.show ? 'fadeIn' : 'fadeOut')}>
                {this.state.logo &&
                    <img src={"/img/"+this.state.logo} alt="" />
                }
            </div>
        );
    }
}