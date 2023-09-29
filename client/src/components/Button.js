import React from 'react';

const Button = ({ text, className, active, onClick, styles }) => {
    return (
        <button
            onClick={onClick}
            type="button"
            className={
                className
                    ? className
                    : `py-1 px-4 border min-w-[100px] max-h-10 border-gray-400 ${
                          styles ? styles : ''
                      } rounded-l-full rounded-r-full bg-transparent ${active ? 'bg-[#0E8080] text-white' : ''}`
            }
        >
            {text}
        </button>
    );
};

export default Button;
