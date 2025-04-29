import { StickyNote, PlusCircle } from "lucide-react";

export default function Nav({ current, onChange }) {
  return (
    <div className="flex justify-center gap-6 mb-8">
      <button
        onClick={() => onChange("add")}
        className={`flex items-center gap-2 px-6 py-3 rounded-full shadow-lg transition-all duration-300 text-lg font-medium ${
          current === "add"
            ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white scale-105"
            : "bg-white text-gray-700 hover:bg-blue-100 hover:scale-105"
        }`}
      >
        <PlusCircle size={22} /> Add Note
      </button>
      <button
        onClick={() => onChange("list")}
        className={`flex items-center gap-2 px-6 py-3 rounded-full shadow-lg transition-all duration-300 text-lg font-medium ${
          current === "list"
            ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white scale-105"
            : "bg-white text-gray-700 hover:bg-blue-100 hover:scale-105"
        }`}
      >
        <StickyNote size={22} /> View Notes
      </button>
    </div>
  );
}
