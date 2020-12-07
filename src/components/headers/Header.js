import React from "react";
import classNames from "classnames";
import "./Header.css";
import TickImg from "../../images/tick.svg";

const Header = ({ onClickAll, keyUpEnter, filterTodo, defaultStatus }) => {
  return (
    <div id="header">
      <img
        title="check all"
        className={classNames("", {
          isOpacity: filterTodo?.(defaultStatus).some((x) => !x.isComplete),
        })}
        alt=""
        onClick={() => onClickAll?.()}
        src={TickImg}
        width={20}
        height={20}
      />
      <input
        placeholder="What needs to be done ?"
        type="text"
        onKeyUp={(event) => keyUpEnter?.(event)}
      />
    </div>
  );
};

export default Header;
