'use strict';

const editor = document.querySelector('.editor--input');

document.execCommand('defaultParagraphSeparator', false, 'p');

function formatDoc(cmd, value) {
	document.execCommand(cmd, false, value);
	editor.focus();
}
