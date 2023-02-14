import { HTMLInputTypeAttribute } from "react";

interface IInputProps {
  frame: "text" | "price";
  required?: boolean;
  type?: HTMLInputTypeAttribute;
  [key: string]: any;
}

const Input = ({ frame, required, type, register, rest }: IInputProps) => {
  return frame === "text" ? (
    <input
      className="input"
      type={type}
      required={required}
      {...register}
      {...rest}
    />
  ) : (
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
  );
};
21;

export default Input;
