import { useState } from "react";
import AddNote from "./components/AddNote";
import NotesList from "./components/NotesList";
import { NotebookPen, StickyNote } from "lucide-react";

function App() {
  const [view, setView] = useState("add");

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-6 font-sans">
      <nav className="flex justify-center gap-6 mb-8">
        <button
          onClick={() => setView("add")}
          className={`flex items-center gap-2 px-5 py-2 rounded-full transition-all shadow-lg text-white font-medium text-lg ${
            view === "add"
              ? "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              : "bg-purple-300 hover:bg-purple-400"
          }`}
        >
          <NotebookPen size={20} /> Add Note
        </button>
        <button
          onClick={() => setView("view")}
          className={`flex items-center gap-2 px-5 py-2 rounded-full transition-all shadow-lg text-white font-medium text-lg ${
            view === "view"
              ? "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
              : "bg-blue-300 hover:bg-blue-400"
          }`}
        >
          <StickyNote size={20} /> View Notes
        </button>
      </nav>

      <div className="max-w-2xl mx-auto">
        {view === "add" ? <AddNote /> : <NotesList />}
      </div>
    </div>
  );
}

export default App;
