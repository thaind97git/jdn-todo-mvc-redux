import React, { Component } from 'react';

import './TodoItem.css';
import CheckImgComplete from '../../images/check.svg';
import CheckImg from '../../images/check-complete.svg';
import CancelImg from '../../images/cancel.svg';
// import EditImg from '../../images/edit.svg';

var classNames = require('classnames');

class TodoItem extends Component {
    render() {
        const { item, onItemClicked, onDeleteItem } = this.props;
        let checkComplete = item.isComplete ? CheckImg : CheckImgComplete;
        return(
            <div className={classNames('TodoItems', { 'TodoItems-complete': item.isComplete })}>
                <img className={classNames("check-img", {"isOpacity": !item.isComplete})} 
                    onClick={() => onItemClicked(item._id)} 
                    alt="" 
                    src={checkComplete} 
                    width={32} 
                    height={32}
                />
                <p>{ item.title }</p>
                {/* <input className="edit-input">
                    
                </input> */}
                {/* <img className="edit-img"
                    alt=""
                    src={EditImg}
                    width={15} 
                    height={15}/> */}
                <img className="cancel-img" 
                    onClick={() => onDeleteItem(item._id)} 
                    alt="" 
                    src={CancelImg} 
                    width={15} 
                    height={15}/>
            </div>
        );
    }
}

export default TodoItem;