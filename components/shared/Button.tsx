import { MouseEventHandler } from "react";

interface IButtonProps {
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  label: string;
  [key: string]: any;
}

const Button = ({ className, onClick, label }: IButtonProps) => {
  return (
    <div className={className}>
      <button className="button mt-4" onClick={onClick}>
        {label}
      </button>
    </div>
  );
};

export default Button;
