export const getNotes = () => {
  const notes = JSON.parse(localStorage.getItem("notes-app")) || [];
  return Array.isArray(notes) ? notes : [];
};

export const saveNote = (newNote = null, overrideNotes = null) => {
  const notes = overrideNotes || getNotes();
  if (newNote) {
    notes.push(newNote);
  }
  localStorage.setItem("notes-app", JSON.stringify(notes));
};
