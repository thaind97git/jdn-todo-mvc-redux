import React from "react";
import "./TodoItem.css";
import CheckImgComplete from "../../images/check.svg";
import CheckImg from "../../images/check-complete.svg";
import CancelImg from "../../images/cancel.svg";

var classNames = require("classnames");

const TodoItem = ({ item, onItemClicked, onDeleteItem }) => {
  let checkComplete = item.isComplete ? CheckImg : CheckImgComplete;
  return (
    <div
      className={classNames("TodoItems", {
        "TodoItems-complete": item.isComplete,
      })}
    >
      <img
        className={classNames("check-img", { isOpacity: !item.isComplete })}
        onClick={() => onItemClicked(item)}
        alt=""
        src={checkComplete}
        width={32}
        height={32}
      />

      <p>{item.title}</p>
      <img
        className="cancel-img"
        onClick={() => onDeleteItem(item.id)}
        alt=""
        src={CancelImg}
        width={15}
        height={15}
      />
    </div>
  );
};

export default TodoItem;
