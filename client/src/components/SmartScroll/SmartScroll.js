import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

import Spinner from '../Spinner/Spinner';

const SmartScrollWrapper = styled.div`
    width: 100%;
`;

const Content = styled.div`
    overflow: auto;
    position: absolute;
    width: 100%;
    max-height: 100%;
    bottom: 0;
`;

const ScrollDown = styled.div`
    position: absolute;
    bottom: 10px;
    right: 20px;
    background: white;
    height: 45px;
    width: 45px;
    border-radius: 50%;
    box-shadow: 1px 1px 10px 0px;
    font-size: 25px;
    color: #353838;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

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
    state = {
        autoScroll: true,
        isScrollButtonVisible: false,
    }

    componentDidMount() {
        this.scrollToBottom();
    }

    getSnapshotBeforeUpdate() {
        const { scrollTop, scrollHeight } = this.scroller;

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
            this.scroller.scrollTop = this.scroller.scrollHeight - snapshot;
        }
    }

    handleScroll = () => {
        const { scrollTop, scrollHeight, offsetHeight } = this.scroller;
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
        this.scroller.scrollTop = this.scroller.scrollHeight;
    }

    render() {
        return (
            <SmartScrollWrapper>
                <Content
                    innerRef={node => this.scroller = node}
                    onScroll={this.handleScroll}>

                    {this.props.isLoadingMoreItems && <Spinner />}
                    {this.props.children}
                </Content>

                {this.state.isScrollButtonVisible &&
                    <ScrollDown onClick={this.scrollToBottom}>
                        <FontAwesomeIcon icon={faAngleDown} />
                    </ScrollDown>
                }
            </SmartScrollWrapper>
        );
    }
}

SmartScroll.propTypes = propTypes;
SmartScroll.defaultProps = defaultProps;

export default SmartScroll;