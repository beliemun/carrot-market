import { FormEventHandler } from "react";

interface IButtonProps {
  className?: string;
  onSubmit?: FormEventHandler<HTMLButtonElement> | undefined;
  label: string;
  [key: string]: any;
}

const Button = ({ className, onSubmit, label }: IButtonProps) => {
  return (
    <div className={className}>
      <button className="button mt-4" onSubmit={onSubmit}>
        {label}
      </button>
    </div>
  );
};

export default Button;
