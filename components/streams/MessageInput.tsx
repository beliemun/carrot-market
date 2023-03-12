interface IMessageInput {
  className?: string;
  [key: string]: any;
}

const MessageInput = ({ className, register, rest }: IMessageInput) => {
  return (
    <div className={className}>
      <div className="fixed row-center bottom-4 w-full px-4">
        <input className="input rounded-full pr-10 pl-4" type="text" {...register} {...rest} />
        <div className="absolute right-8 text-orange-400">
          <span>&rarr;</span>
        </div>
      </div>
    </div>
  );
};

export default MessageInput;
