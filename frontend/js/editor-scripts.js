'use strict';

let editor, saveBtn;
let notesListDisplay, showNotesListBtn, noteNameInput;
const storageKey = 'zoom-notes';
let notes = null;

window.addEventListener('DOMContentLoaded', () => {
	editor = document.querySelector('.editor--input');
	saveBtn = document.getElementById('btn-save');

	noteNameInput = document.getElementById('note-name--input');
	notesListDisplay = document.querySelector('.note--list');
	showNotesListBtn = document.querySelector('.button.note--list__show');

	// list past notes
	displayAllNotesList();
	addNewNote();

	// default seperator for content-editable
	document.execCommand('defaultParagraphSeparator', false, 'p');

	// event listeners
	editor.addEventListener('input', () => {
		saveBtn.classList.add('unsaved');
	});
	showNotesListBtn.addEventListener('click', () =>
		notesListDisplay.classList.toggle('show')
	);
	notesListDisplay.addEventListener('click', changeNote);
	saveBtn.addEventListener('click', saveNote);
});

function formatDoc(cmd, value) {
	document.execCommand(cmd, false, value);
	editor.focus();
}

function getNotesFromStore() {
	const data = localStorage.getItem(storageKey);
	if (data) {
		return JSON.parse(data);
	}

	localStorage.setItem(storageKey, '{}');
	return {};
}

function displayAllNotesList() {
	notes = getNotesFromStore();
	let notesDisplayString =
		'<li class="note" data-addnew="true">Add New Note</li>';
	for (const [key, value] of Object.entries(notes)) {
		notesDisplayString += `<li class="note" data-notename="${key}">${key} - ${value.date}</li>`;
	}
	notesListDisplay.innerHTML = notesDisplayString;
}

function changeNote(e) {
	if (!e.target.classList.contains('note')) {
		console.log('list clicked but not note');
		return;
	}

	const noteItem = e.target;
	if (noteItem.dataset.addnew) {
		addNewNote();
	} else {
		for (const [key, value] of Object.entries(notes)) {
			if (key === noteItem.dataset.notename) return showNote(value);
		}

		showNote(null);
	}
}

function addNewNote() {
	editor.innerHTML = '';
	noteNameInput.value = '';
	noteNameInput.focus();

	notesListDisplay.classList.remove('show');
}

function showNote(note) {
	if (!note) return alert('Note not found');

	noteNameInput.value = note.name;
	editor.innerHTML = note.content;
	editor.focus();

	notesListDisplay.classList.remove('show');
}

function saveNote() {
	const currNoteName = noteNameInput.value;
	if (notes[currNoteName] && !confirm('This will overwrite the existing note.\nContinue?')) return;
	if (currNoteName.trim() === '') return alert('Note must have a name');

	notes[currNoteName] = {
		name: currNoteName,
		date: new Date().toLocaleDateString(),
		content: editor.innerHTML,
	};

	localStorage.setItem(storageKey, JSON.stringify(notes));
	saveBtn.classList.remove('unsaved');

	displayAllNotesList();
}
