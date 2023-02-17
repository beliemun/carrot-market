import React, { HTMLInputTypeAttribute } from "react";

interface IInputProps {
  className?: string;
  template: "text" | "phone" | "price";
  type?: HTMLInputTypeAttribute;
  lable?: string;
  required?: boolean;
  [key: string]: any;
}

const Input = ({
  template,
  required,
  type,
  register,
  className,
  lable,
  rest,
}: IInputProps) => {
  return (
    <div className={className}>
      {template === "text" ? (
        <div>
          <label className="font-medium text-sm text-gray-400">{lable}</label>
          <input
            className="input"
            type={type}
            required={required}
            {...register}
            {...rest}
          />
        </div>
      ) : null}
      {template === "phone" ? (
        <div className="flex w-full">
          <span className="text-sm text-gray-400 border rounded-l-md py-2 px-3 select-none bg-gray-100">
            +82
          </span>
          <input
            className="input rounded-l-none border-l-0 hover:border-l focus:border-l"
            type="number"
            required={required}
            {...register}
            {...rest}
          />
        </div>
      ) : null}
      {template === "price" ? (
        <div className="relative">
          <label className="font-medium text-sm text-gray-400">{lable}</label>
          <div className="flex items-center">
            <div className="absolute left-3">
              <span>$</span>
            </div>
            <input
              className="input pl-7"
              type="number"
              placeholder="0.00"
              required={required}
              {...register}
              {...rest}
            />
            <div className="absolute right-3">
              <span>USD</span>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Input;
