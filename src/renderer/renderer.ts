const addNoteBtn = document.getElementById('addNoteBtn') as HTMLButtonElement;
const notesList = document.getElementById('notesList') as HTMLDivElement;

let notes: { title: string; content: string; date: string }[] = loadNotes();

renderNotes();

addNoteBtn.addEventListener('click', () => {
    window.location.href = 'editor.html';
});

function renderNotes() {
    notesList.innerHTML = '';
    for (const note of notes) {
        const noteDiv = document.createElement('div');
        noteDiv.className = 'note';
        noteDiv.innerHTML = `
      <h3>${note.title}</h3>
      <div class="note-content">${markdownToHTML(note.content)}</div>
      <button class="edit-note" data-id="${note.date}">✏️ 編輯</button>
      <button class="delete-note" data-id="${note.date}">🗑️ 刪除</button>
      <hr/>
    `;
        notesList.appendChild(noteDiv);
    }

    document.querySelectorAll('.edit-note').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = (e.target as HTMLElement).dataset.id;
            if (id) {
                window.location.href = `editor.html?id=${encodeURIComponent(id)}`;
            }
        });
    });

    document.querySelectorAll('.delete-note').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = (e.target as HTMLElement).dataset.id;
            if (id) {
                notes = notes.filter(n => n.date !== id);
                saveNotesToStorage();
                renderNotes();
            }
        });
    });
}

function saveNotesToStorage() {
    localStorage.setItem('notes', JSON.stringify(notes));
}

function loadNotes(): { title: string; content: string; date: string }[] {
    const raw = localStorage.getItem('notes');
    return raw ? JSON.parse(raw) : [];
}

function markdownToHTML(md: string): string {
    return md
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/gim, '<em>$1</em>')
        .replace(/\n/g, '<br>');
}
