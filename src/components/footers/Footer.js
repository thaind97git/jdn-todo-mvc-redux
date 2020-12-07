import React from "react";
import classNames from "classnames";
import "./Footer.css";

const Footer = ({
  todoItems = [],
  defaultStatus,
  statusEnums = [],
  onGetStatus,
  onClearCompleted,
}) => {
  return (
    <div id="Footer">
      <div id="number">
        {todoItems.filter((todo) => !todo.isComplete)?.length} items left
      </div>
      <div id="status">
        {statusEnums?.map((item) => (
          <p
            className={classNames("", {
              active: defaultStatus === item.status,
            })}
            onClick={() => onGetStatus(item.status)}
            key={item.status}
          >
            {item.title}
          </p>
        ))}
      </div>
      {todoItems?.some((todo) => todo.isComplete) && (
        <div onClick={() => onClearCompleted()} id="clear">
          Clear Completed
        </div>
      )}
    </div>
  );
};

export default Footer;
