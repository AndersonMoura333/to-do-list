import React, { useState } from 'react';

interface SelectProps {
  options: string[];
  onChange: (option: any) => void;
  value: string;
}

export const Select: React.FC<SelectProps> = ({ options, onChange, value }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectOption = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <span className="rounded-md shadow-sm">
          <button
            type="button"
            onClick={handleToggle}
            className="inline-flex justify-center w-full bg-blue-600 rounded-lg hover:bg-blue-800 target:bg-blue-900 px-4 py-2 text-sm font-medium text-white transition ease-in-out duration-150"
            id="options-menu"
            aria-haspopup="true"
            aria-expanded="true"
          >
            {value}
          </button>
        </span>
      </div>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="options-menu"
        >
          <div className="py-1" role="none">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => handleSelectOption(option)}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

