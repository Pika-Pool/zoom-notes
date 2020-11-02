'use strict';

const editor = document.querySelector('.editor--input');
const saveBtn = document.getElementById('btn-save');

document.execCommand('defaultParagraphSeparator', false, 'p');

function formatDoc(cmd, value) {
	document.execCommand(cmd, false, value);
	editor.focus();
}

function isLocalStorageAvailable() {
	var test = 'test';
	try {
		localStorage.setItem(test, test);
		localStorage.removeItem(test);
		return true;
	} catch (e) {
		return false;
	}
}

function saveChanges() {
	if (isLocalStorageAvailable()) {
		const data = {
			[Date.now()]: editor.innerHTML,
		};

		localStorage.setItem('zoom-notes', JSON.stringify(data));

		saveBtn.classList.remove('unsaved');
	} else {
		alert(
			'localstorage not available in your browser' +
				'\nTry using the latest version of google chrome or firefox'
		);
	}
}

editor.addEventListener('input', () => {
	saveBtn.classList.add('unsaved');
});
