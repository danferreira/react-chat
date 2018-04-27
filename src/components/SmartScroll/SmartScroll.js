import React, { PureComponent } from 'react';

import './SmartScroll.css';

class SmartScroll extends PureComponent {

    constructor(props) {
        super(props);

        this.node = React.createRef();
        this.state = {
            autoScroll: true,
            isScrollButtonVisible: false
        }
    }

    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate() {
        if (this.state.autoScroll)
            this.scrollToBottom();
    }

    handleScroll = () => {
        const { scrollTop, scrollHeight, offsetHeight } = this.node.current;
        const distanceFromBottom = scrollHeight - (scrollTop + offsetHeight);

        const autoScroll = distanceFromBottom <= 100;
        this.setState({
            autoScroll,
            isScrollButtonVisible: !autoScroll
        });
    }

    scrollToBottom = () => {
        this.node.current.scrollTop = this.node.current.scrollHeight;
    }

    render() {
        
        return (
            <div>
                <div
                    className='smart-scroll'
                    ref={this.node}
                    onScroll={this.handleScroll}>
                    {this.props.children}
                </div>

                {this.state.isScrollButtonVisible &&
                    <div
                        className='scroll-down'
                        onClick={this.scrollToBottom}>
                        <i className="fas fa-angle-down"></i>
                    </div>
                }
            </div>
        );
    }
}

export default SmartScroll;