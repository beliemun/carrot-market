interface IInputProps {
  frame: "text" | "price";
  required?: boolean;
  [key: string]: any;
}

const Input = ({ frame, required, register, rest }: IInputProps) => {
  return frame === "text" ? (
    <input
      className="input"
      type="email"
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

export default Input;
