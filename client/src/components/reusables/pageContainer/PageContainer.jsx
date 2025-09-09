import classNames from "classnames";

import "./PageContainer.style.css";

export const PageContainer = ({ children, centerContent }) => {
  return (
    <div
      className={classNames("page-container", {
        centered: centerContent,
      })}
    >
      {children}
    </div>
  );
};
