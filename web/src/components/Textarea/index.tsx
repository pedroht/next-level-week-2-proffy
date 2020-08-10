import React, { TextareaHTMLAttributes } from "react";

import "./styles.css";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  labelOptions?: string;
  name: string;
}

const Textarea: React.FC<TextareaProps> = ({
  label,
  labelOptions,
  name,
  ...rest
}) => {
  return (
    <div className="textarea-block">
      <label htmlFor={name}>
        {label}
        <span>{labelOptions}</span>
      </label>

      <textarea id={name} {...rest}></textarea>
    </div>
  );
};

export default Textarea;
