import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './SmartScroll.css';

const propTypes = {
    children: PropTypes.node.isRequired
}

class SmartScroll extends PureComponent {

    constructor(props) {
        super(props);

        this.scroller = React.createRef();
        this.state = {
            autoScroll: true,
            isScrollButtonVisible: false,
        }
    }

    componentDidMount() {
        this.scrollToBottom();
    }

    c
    componentDidUpdate(prevProps) {
        if (this.state.autoScroll)
            this.scrollToBottom();

        if(this.props.children !== prevProps.children) {            
            this.scroller.current.scrollTop = this.scroller.current.scrollHeight - this.state.lastScrollPosition;
        }
    }

    handleScroll = () => {
        const { scrollTop, scrollHeight, offsetHeight } = this.scroller.current;

        if(scrollTop <= 100  && this.props.onScrollTop) {
            this.props.onScrollTop();
        }

        const distanceFromBottom = scrollHeight - (scrollTop + offsetHeight);
        const autoScroll = distanceFromBottom <= 100;

        this.setState({
            autoScroll,
            isScrollButtonVisible: !autoScroll,
            lastScrollPosition: scrollHeight,
        });
    }

    scrollToBottom = () => {
        this.scroller.current.scrollTop = this.scroller.current.scrollHeight;
    }

    render() {
        return (
            <div className='smart-scroll'>
                <div
                    className='smart-scroll-content'
                    ref={this.scroller}
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

SmartScroll.propTypes = propTypes;

export default SmartScroll;