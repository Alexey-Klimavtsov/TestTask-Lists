export function createElement(teg = 'div', elemClass = '') {
	const elem = document.createElement(teg);

	if (!elemClass.trim()) return elem;
	if (elemClass.includes(' ')) {
		elem.className = elemClass;
	} else {
		elem.classList.add(elemClass);
	}

	return elem;
}

export function clearElement(elem) {
	elem.replaceChildren();
}

export function getIdsFromLink() {
	const idsString = window.location.hash.substring(1);
	return idsString ? idsString.split(',') : [];
}
