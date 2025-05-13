const addNoteBtn = document.getElementById('addNoteBtn') as HTMLButtonElement;
const noteDialog = document.getElementById('noteDialog') as HTMLDialogElement;
const okBtn = document.getElementById('okBtn') as HTMLButtonElement;
const cancelBtn = document.getElementById('cancelBtn') as HTMLButtonElement;
const noteTitleInput = document.getElementById('noteTitle') as HTMLInputElement;

addNoteBtn.addEventListener('click', () => {
  noteTitleInput.value = 'untitle'; // reset to default
  noteDialog.showModal();
});

okBtn.addEventListener('click', (e) => {
  e.preventDefault(); // prevent default form close
  const title = noteTitleInput.value.trim();
  if (title) {
    console.log(`📝 新增筆記：${title}`);
  }
  noteDialog.close();
});

cancelBtn.addEventListener('click', (e) => {
  e.preventDefault();
  noteDialog.close();
});
