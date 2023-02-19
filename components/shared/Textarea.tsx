interface ITextareaProps {
  className: string;
  requried?: boolean;
  label?: string;
  [key: string]: any;
}

const Textarea = ({
  className,
  requried,
  register,
  label,
  rest,
}: ITextareaProps) => {
  return (
    <div className={className}>
      <div className="mt-4">
        <label className="font-medium text-sm text-gray-400">{label}</label>
        <div>
          <textarea
            className="input"
            rows={4}
            required={requried}
            {...register}
            {...rest}
          />
        </div>
      </div>
    </div>
  );
};

export default Textarea;
