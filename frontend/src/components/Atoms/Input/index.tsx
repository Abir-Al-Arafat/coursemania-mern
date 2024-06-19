import React, { useState } from "react";

interface InputProps {
  initialValue?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  initialValue = "",
  placeholder = "Enter text",
  onChange,
  className,
}) => {
  const [inputValue, setInputValue] = useState<string>(initialValue);

  const handleInputChange = (value: string) => {
    setInputValue(value);
    if (onChange) {
      onChange(value);
    }
  };

  const inputClassName = `border rounded px-3 py-2 w-full focus:outline-none ${className}`;

  return (
    <input
      type="text"
      className={`${inputClassName}`}
      placeholder={placeholder}
      value={inputValue}
      onChange={(e) => handleInputChange(e.target.value)}
    />
  );
};

export default Input;
