import React, { useState } from "react";
import classnames from "classnames";

export const Accordion = ({ children }) => {
  return <div className="accordion">{children}</div>;
};

const ArrowIcon = () => <>&#x25BC;</>;

export const AccordionItem = ({
  title,
  isOpen: defaultIsOpen,
  showIcon = true,
  children
}) => {
  const [isOpen, setOpen] = useState(false || defaultIsOpen);
  return (
    <div className={classnames("accordion-item", { open: isOpen })}>
      <div
        className="accordion-item-header"
        onClick={() => setOpen(val => !val)}
      >
        <span>{title}</span>
        <span className="accordion-item-toggle">
          <ArrowIcon />
        </span>
      </div>
      <div className="accordion-item-content">{children}</div>
    </div>
  );
};

