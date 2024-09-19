import { OPERATIONS } from './constants';

export function createElement(teg = 'div', elemClass = '') {
	const elem = document.createElement(teg);

	if (!elemClass.trim()) return elem;

	elem.classList.add(elemClass);
	return elem;
}

export function clearElement(elem) {
	elem.replaceChildren();
}

export function getIdsFromLink() {
	const params = new URLSearchParams(location.search);
	const idsString = params.get('ids');
	return idsString ? idsString.split(',') : [];
}

export function updateFavoriteIdsInURL(favoriteIds) {
	const idsString = favoriteIds.join(',');
	const queryString = new URLSearchParams({
		ids: idsString,
	}).toString();
	const nextUrl = `${window.location.pathname}?${queryString}`;
	history.pushState(null, '', nextUrl);
}

export function updateFavoriteIds(operation, value, favoriteIds) {
	switch (operation) {
		case OPERATIONS.add:
			favoriteIds.push(value);
			break;
		case OPERATIONS.remove:
			favoriteIds = favoriteIds.filter((id) => id !== value);
			break;
		default:
			break;
	}
	return favoriteIds;
}
