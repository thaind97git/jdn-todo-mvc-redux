import React, { Component } from 'react';
import classNames from 'classnames';

import './Header.css'
import TickImg from '../../images/tick.svg';
class Header extends Component {
    render() {
        const { onClickAll, keyUpEnter, filterTodo, defaultStatus } = this.props;
        console.log(filterTodo(defaultStatus).some(x => !x.isComplete))
        return(
            <div id="header">
                <img 
                    title="check all" 
                    className={classNames("",{ "isOpacity": filterTodo(defaultStatus).some(x => !x.isComplete)} )} 
                    alt="" 
                    onClick={() => onClickAll()} 
                    src={TickImg} 
                    width={20} height={20} 
                />
                <input 
                    placeholder="What needs to be done ?" 
                    type="text" 
                    onKeyUp={(event) => keyUpEnter(event)} 
                />
            </div>
        );
    }
}

export default Header;