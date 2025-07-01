import { FaWhatsapp } from "react-icons/fa";

const WhatsappButton = () => {
  return (
    <div className="group fixed right-5 bottom-5 z-50 flex flex-col items-center space-y-2">
      {/* Tooltip */}
      <div className="mb-1 rounded-t-lg rounded-l-lg bg-gray-100 px-3 py-1 text-sm text-gray-900 opacity-0 transition-opacity group-hover:opacity-100">
        Chat with us
      </div>

      {/* Button */}
      <a
        href="https://wa.me/8801780515102"
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-all hover:bg-green-600"
      >
        {/* Pulse ring */}
        <span className="absolute z-0 h-full w-full animate-ping rounded-full bg-green-400 opacity-70"></span>

        {/* Icon */}
        <FaWhatsapp className="z-10 text-2xl" />
      </a>
    </div>
  );
};

export default WhatsappButton;
