interface IMessageItem {
  className?: string;
  reverse?: boolean;
  text: string;
  [key: string]: any;
}

const MessageItem = ({ className, reverse, text, rest }: IMessageItem) => {
  return (
    <div className={className} {...rest}>
      <div className={reverse ? "flex flex-row-reverse space-x-2" : "flex"}>
        <div className={`w-6 h-6 bg-gray-200 rounded-full ${reverse ? "ml-2" : "mr-2"}`} />
        <div className="w-1/2 border border-gray-200 rounded-md text-sm px-3 py-2">{text}</div>
      </div>
    </div>
  );
};

export default MessageItem;
