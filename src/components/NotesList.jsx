import { useEffect, useState } from "react";
import { getNotes, saveNote } from "../utils/storage";
import { StickyNote, PencilLine, CheckCircle, Trash2 } from "lucide-react";

export default function NotesList() {
  const [notes, setNotes] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    const freshNotes = getNotes();
    setNotes(freshNotes.reverse());
    if (editingIndex !== null && !freshNotes[editingIndex]) {
      setEditingIndex(null);
    }
  }, []);

  const handleEdit = (index) => {
    const note = notes[index];
    if (!note) return;
    setEditingIndex(index);
    setEditTitle(note.title);
    setEditContent(note.content);
  };

  const handleSave = () => {
    const updatedNotes = [...notes];
    if (!updatedNotes[editingIndex]) return;
    updatedNotes[editingIndex] = {
      ...updatedNotes[editingIndex],
      title: editTitle,
      content: editContent,
      createdAt: new Date().toISOString(),
    };
    saveNote(null, [...updatedNotes].reverse());
    setNotes(updatedNotes);
    setEditingIndex(null);
  };

  const handleDelete = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    saveNote(null, [...updatedNotes].reverse());
    setNotes(updatedNotes);
    setEditingIndex(null);
  };

  if (notes.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-12 text-lg">
        No notes yet. <br /> Add your first one!
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {notes.map((note, i) => (
        <div
          key={i}
          className="bg-gradient-to-br from-white via-purple-50 to-purple-100 border border-purple-200 p-6 rounded-3xl shadow-lg hover:shadow-2xl transition duration-300"
        >
          {editingIndex === i ? (
            <div className="space-y-3">
              <input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded-lg text-lg"
              />
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded-lg text-md h-28"
              />
              <button
                onClick={handleSave}
                className="flex items-center gap-2 text-white bg-gradient-to-r from-green-500 to-teal-500 px-4 py-2 rounded-full hover:from-green-600 hover:to-teal-600 transition shadow-md"
              >
                <CheckCircle size={18} /> Save
              </button>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center text-purple-600 mb-2">
                <div className="flex items-center gap-2">
                  <StickyNote size={20} />
                  <h3 className="text-xl font-semibold">{note.title}</h3>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleEdit(i)}
                    className="text-indigo-600 hover:text-indigo-800 transition transform hover:scale-110"
                  >
                    <PencilLine size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(i)}
                    className="text-red-500 hover:text-red-700 transition transform hover:scale-110"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
              <p className="text-gray-700 text-md mb-1 whitespace-pre-line">
                {note.content}
              </p>
              <p className="text-xs text-gray-400">
                {new Date(note.createdAt).toLocaleString()}
              </p>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
