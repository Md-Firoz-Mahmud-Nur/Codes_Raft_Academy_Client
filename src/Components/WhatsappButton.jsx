import { FaWhatsapp } from "react-icons/fa";

const WhatsappButton = () => {
  return (
    <div className="fixed bottom-5 right-5 z-50 group flex flex-col items-center space-y-2">
      {/* Tooltip */}
      <div className="mb-1 px-3 py-1 text-sm bg-gray-100 text-gray-900 rounded-t-lg rounded-l-lg opacity-0 group-hover:opacity-100 transition-opacity">
        Chat with us
      </div>

      {/* Button */}
      <a
        href="https://wa.me/8801780515102"
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg transition-all"
      >
        {/* Pulse ring */}
        <span className="absolute w-full h-full rounded-full animate-ping bg-green-400 opacity-70 z-0"></span>

        {/* Icon */}
        <FaWhatsapp className="text-2xl z-10" />
      </a>
    </div>
  );
};

export default WhatsappButton;
