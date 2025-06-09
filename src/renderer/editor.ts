document.getElementById("saveNoteBtn")?.addEventListener("click", () => {
    const title = (document.getElementById("noteTitle") as HTMLInputElement).value || "untitled";
    const content = (document.getElementById("markdownEditor") as HTMLTextAreaElement).value;

    const note = {
        title,
        content,
        date: new Date().toISOString(),
    };

    const notes = JSON.parse(localStorage.getItem("notes") || "[]");
    notes.unshift(note);
    localStorage.setItem("notes", JSON.stringify(notes));

    window.location.href = "index.html";
});

