import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './SmartScroll.css';
import Spinner from '../Spinner/Spinner';

const propTypes = {
    triggerAtTop: PropTypes.number,
    triggerAtBottom: PropTypes.number,
    onScrollTop: PropTypes.func,
    children: PropTypes.array.isRequired,
}

const defaultProps = {
    triggerAtTop: 100,
    triggerAtBottom: 100
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

    getSnapshotBeforeUpdate() {
        const { scrollTop, scrollHeight } = this.scroller.current;

        return scrollHeight - scrollTop;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.autoScroll) {
            this.scrollToBottom();
            return;
        }

        let arr = this.props.children[0];
        let prevArr = prevProps.children[0];

        //keep cursor at the same position 
        if (arr.key !== prevArr.key) {
            this.scroller.current.scrollTop = this.scroller.current.scrollHeight - snapshot;
        }
    }

    handleScroll = () => {
        const { scrollTop, scrollHeight, offsetHeight } = this.scroller.current;
        const { triggerAtTop, triggerAtBottom, onScrollTop } = this.props;

        if (scrollTop <= triggerAtTop && onScrollTop) {
            onScrollTop();
        }

        const distanceFromBottom = scrollHeight - (scrollTop + offsetHeight);
        const autoScroll = distanceFromBottom <= triggerAtBottom;

        this.setState({
            autoScroll,
            isScrollButtonVisible: !autoScroll,
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

                    {this.props.isLoadingMoreItems && <Spinner />}
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
SmartScroll.defaultProps = defaultProps;

export default SmartScroll;