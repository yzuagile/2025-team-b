const addNoteBtn = document.getElementById('addNoteBtn');
const noteDialog = document.getElementById('noteDialog');
const okBtn = document.getElementById('okBtn');
const cancelBtn = document.getElementById('cancelBtn');
const noteTitleInput = document.getElementById('noteTitle');

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
