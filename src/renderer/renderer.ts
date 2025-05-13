const addNoteBtn = document.getElementById('addNoteBtn') as HTMLButtonElement;
const noteDialog = document.getElementById('noteDialog') as HTMLDialogElement;
const okBtn = document.getElementById('okBtn') as HTMLButtonElement;
const cancelBtn = document.getElementById('cancelBtn') as HTMLButtonElement;
const noteTitleInput = document.getElementById('noteTitle') as HTMLInputElement;
import * as createNote from "../backend/model/create";
import * as get from "../backend/model/get";

addNoteBtn.addEventListener('click', () => {
  noteTitleInput.value = 'untitle'; // reset to default
  noteDialog.showModal();
});

okBtn.addEventListener('click', async (e) => {
  e.preventDefault(); // prevent default form close
  const title = noteTitleInput.value.trim();
  if (title) {
    let newNoteId = createNote.createNote();
    const newNote = await get.getNote(newNoteId);
    newNote.title = title;
  }
  noteDialog.close();
});

cancelBtn.addEventListener('click', (e) => {
  e.preventDefault();
  noteDialog.close();
});
