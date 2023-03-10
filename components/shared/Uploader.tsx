interface IUploaderProps {
  className?: string;
  required?: boolean;
  [key: string]: any;
}

const Uploader = ({ className, register, required, rest }: IUploaderProps) => {
  return (
    <div className={className}>
      <div className="col-center h-48 border-2 border-gray-200 hover:border-orange-400 text-gray-400 hover:text-orange-400 border-dashed rounded-md cursor-pointer">
        <div>
          <label>
            <svg
              className="h-12 w-12"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <input
              className="hidden"
              type="file"
              required={required}
              {...register}
              {...rest}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default Uploader;
