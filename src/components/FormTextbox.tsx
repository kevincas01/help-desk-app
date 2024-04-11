
import React from 'react'

interface FormTextboxProps {
  name: string;
  label: string;
}
const FormTextbox: React.FC<FormTextboxProps> = ({ name, label }) => {
  return (
    <div className="flex flex-col relative">
      <label
        className="text-main text-lg absolute top-7 left-4 -translate-y-3 transition-all duration-300 bg-white p-1"
        htmlFor={name}
      >
        {label}
      </label>

      <textarea
        className="resize-none border-black border h-80 focus:border-main focus:outline-none focus:ring-2 p-4 rounded-md"
        name={name}
        required
        onFocus={(e) => {
          e.target.previousElementSibling?.classList.remove("top-7");
          e.target.previousElementSibling?.classList.add("text-sm");
          e.target.previousElementSibling?.classList.add("top-0");
        }}
        onBlur={(e) => {
          if (e.target.value === "") {
            e.target.previousElementSibling?.classList.add("top-7");
            e.target.previousElementSibling?.classList.remove("text-sm");
            e.target.previousElementSibling?.classList.remove("top-0");
          }
        }}
        onChange={(e) => {
          if (e.target.value !== "") {
            e.target.previousElementSibling?.classList.add("text-sm");
            e.target.previousElementSibling?.classList.add("top-0");
          } else {
            e.target.previousElementSibling?.classList.remove("text-sm");
            e.target.previousElementSibling?.classList.remove("top-0");
          }
        }}
      ></textarea>
    </div>
  );
};

export default FormTextbox