import React, { Component } from 'react';
import classNames from 'classnames';

import './Footer.css'

class Footer extends Component {
    render() {
        const { todoItems, defaultStatus, statusEnums, onGetStatus, onClearCompleted, filterTodo } = this.props;
        return(
            <div id="Footer">
                <div id="number">
                    {filterTodo(defaultStatus).length} items left
                </div>
                <div id="status">
                {
                    statusEnums.map((item) => 
                        <p className={classNames("",{"active": defaultStatus === item.status})} 
                            onClick={() => onGetStatus(item.status)} 
                            key={item.status}
                        >
                            {item.title} 
                        </p>
                        )
                    }
                </div>
                { todoItems.some(x => x.isComplete) && <div onClick={() => onClearCompleted() } id="clear">Clear Completed</div> }
            </div>
        );
    }
}

export default Footer;