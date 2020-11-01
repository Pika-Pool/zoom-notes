window.addEventListener('DOMContentLoaded', () => {
	const mainGrid = document.querySelector('.main-grid');
	const dividerHR = mainGrid.querySelector('.divider--hr');
	const dividerVR = mainGrid.querySelector('.divider--vr');

	const meetingIframe = document.getElementById('meeting--iframe');

	// keep track if a divider is being dragged
	let isDraggingHR = false,
		isDraggingVR = false;

	function setCursor(cursorName = 'auto') {
		mainGrid.style.cursor = cursorName;
	}

	// reset layout to original
	function resetGrid() {
		resetGridColumns();
		resetGridRows();
	}

	function resetGridColumns() {
		mainGrid.style.gridTemplateColumns = '1fr 5px 1fr';
	}

	function resetGridRows() {
		mainGrid.style.gridTemplateRows = '1fr 5px 1fr';
	}

	// add or remove meeting iframe pointer/mouse events
	const iframeMouseEvents = {
		disable: () => {
			if (!meetingIframe) return;
			meetingIframe.classList.add('no-mouse-events');
		},
		enable: () => {
			if (!meetingIframe) return;
			meetingIframe.classList.remove('no-mouse-events');
		},
	};

	function onDrag(e) {
		if (isDraggingHR || isDraggingVR) {
			e.preventDefault();

			// prevent pointer events on iframe
			// so the mousemove event on this window is fired
			iframeMouseEvents.disable();

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
		iframeMouseEvents.enable();
		setCursor('auto');

		isDraggingHR = false;
		isDraggingVR = false;
	}

	// EVENT LISTENERS

	dividerHR.addEventListener('dblclick', resetGridRows);
	dividerHR.addEventListener('mousedown', () => {
		isDraggingHR = true;
		setCursor('ns-resize');
	});

	dividerVR.addEventListener('dblclick', resetGridColumns);
	dividerVR.addEventListener('mousedown', () => {
		isDraggingVR = true;
		setCursor('ew-resize');
	});

	window.addEventListener('mouseup', endDrag);
	window.addEventListener('mousemove', onDrag);
});
