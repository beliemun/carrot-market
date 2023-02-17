import Link from "next/link";

interface UploadButton {
  type: "Product" | "Commmunity";
  url: string;
}

const UploadButton = ({ type, url }: UploadButton) => {
  return (
    <Link
      href={url}
      className="fixed bottom-20 right-8 bg-orange-400 hover:bg-orange-500 t-300 rounded-full p-3 text-white shadow-black/20 shadow-xl"
    >
      {type === "Product" ? (
        <svg
          className="h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      ) : null}
      {type === "Commmunity" ? (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          ></path>
        </svg>
      ) : null}
    </Link>
  );
};

export default UploadButton;
