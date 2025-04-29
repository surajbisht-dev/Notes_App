import { useState } from "react";
import { saveNote } from "../utils/storage";
import { PlusCircle } from "lucide-react";

export default function AddNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) return;

    try {
      setSaving(true);
      const newNote = { title, content, createdAt: new Date().toISOString() };
      saveNote(newNote);
      setTitle("");
      setContent("");
    } catch (err) {
      setError("Failed to save note.", err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gradient-to-br from-pink-100 to-purple-200 p-6 rounded-3xl shadow-2xl space-y-4"
    >
      <h2 className="text-3xl font-bold text-purple-800 flex items-center gap-2">
        <PlusCircle size={26} /> Add a New Note
      </h2>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full p-3 rounded-xl border border-purple-300 text-lg bg-white shadow-inner"
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your note here..."
        className="w-full p-3 rounded-xl border border-purple-300 text-md h-36 bg-white shadow-inner"
      />
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white py-3 rounded-full text-lg font-semibold flex justify-center items-center gap-2 shadow-lg transition"
      >
        <PlusCircle size={20} /> {saving ? "Saving…" : "Add Note"}
      </button>
      {error && <p className="text-red-600 text-sm">{error}</p>}
    </form>
  );
}
