window.addEventListener('DOMContentLoaded', () => {
	const mainGrid = document.querySelector('.main-grid');
	const dividerHR = mainGrid.querySelector('.divider--hr');
	const dividerVR = mainGrid.querySelector('.divider--vr');
	const iframe = mainGrid.querySelector('iframe');

	// keep track if a divider is being dragged
	let isDraggingHR = false,
		isDraggingVR = false;

	function setCursor(cursorName = 'auto') {
		mainGrid.style.cursor = cursorName;
	}

	// reset layout to original
	function resetGrid() {
		mainGrid.gridTemplate = '1fr 5px 1fr / 1fr 5px 1fr';
	}

	function onDrag(e) {
		if (isDraggingHR || isDraggingVR) {
			e.preventDefault();

			// prevent pointer events on iframe
			// so the mousemove event on this window is fired
			iframe.classList.add('no-mouse-events');

			if (isDraggingHR) {
				// horizontal resize
				mainGrid.style.gridTemplateRows = `
					${e.clientY - mainGrid.offsetTop}px 
					5px 
					1fr
				`;
			} else if (isDraggingVR) {
				// vertical resize
				mainGrid.style.gridTemplateColumns = `
					${e.clientX - mainGrid.offsetLeft}px 
					5px 
					1fr
				`;
			}
		}
	}

	function endDrag() {
		iframe.classList.remove('no-mouse-events');
		setCursor('auto');

		isDraggingHR = false;
		isDraggingVR = false;
	}

	// EVENT LISTENERS

	dividerHR.addEventListener('mousedown', () => {
		isDraggingHR = true;
		setCursor('ns-resize');
	});

	dividerVR.addEventListener('mousedown', () => {
		isDraggingVR = true;
		setCursor('ew-resize');
	});

	window.addEventListener('mouseup', endDrag);
	window.addEventListener('mousemove', onDrag);
});
