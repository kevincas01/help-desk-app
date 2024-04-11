
import React from "react";

interface FormInputProps {
  name: string;
  label: string;
}
const FormInput: React.FC<FormInputProps> = ({ name, label }) => {
  return (
    <div className="flex flex-col relative">
      <label
        className="text-main text-lg absolute top-1/2 left-4 -translate-y-1/2 transition-all duration-300 bg-white p-1"
        htmlFor={name}
      >
        {label}
      </label>
      <input
        className="border-black border focus:border-main focus:outline-none focus:ring-2 p-4 rounded-md"
        type="text"
        name={name}
        required
        onFocus={(e) => {
          e.target.previousElementSibling?.classList.remove("top-1/2");
          e.target.previousElementSibling?.classList.add("text-sm");
          e.target.previousElementSibling?.classList.add("top-0");
        }}
        onBlur={(e) => {
          if (e.target.value === "") {
            
          e.target.previousElementSibling?.classList.add("top-1/2");
            e.target.previousElementSibling?.classList.remove("text-sm");
            e.target.previousElementSibling?.classList.remove("top-0");
          }
        }}
        onChange={(e) => {
          if (e.target.value !== "") {
          e.target.previousElementSibling?.classList.remove("top-1/2");
            e.target.previousElementSibling?.classList.add("text-sm");
            e.target.previousElementSibling?.classList.add("top-0");
          } else {

          e.target.previousElementSibling?.classList.add("top-1/2");
            e.target.previousElementSibling?.classList.remove("text-sm");
            e.target.previousElementSibling?.classList.remove("top-0");
          }
        }}
      />
    </div>
  );
};

export default FormInput;
