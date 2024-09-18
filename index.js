import {
	createElement,
	clearElement,
	getIdsFromLink,
	updateLink,
} from './helpers';
import { movieGenres, OPERATIONS } from './constants';
import { titleTexts } from './constants';

const favoriteLisElem = createElement('div', 'list');
const baseListElem = createElement('div', 'list');
const root = document.getElementById('root');
let favoriteIds = [];
const movieGenresIds = movieGenres.map(({ id }) => id.toString());
initApp(root);

function initApp(rootElem) {
	const app = createElement('section', 'app');
	root.append(app);
	favoriteIds = getIdsFromLink();
	renderList(titleTexts.base, movieGenresIds, baseListElem);
	renderList(titleTexts.second, favoriteIds, favoriteLisElem);
	app.append(baseListElem, favoriteLisElem);
}

function renderList(titleText, list = [], rooListElem) {
	clearElement(rooListElem);
	const titleElem = createElement('h3');
	titleElem.textContent = titleText;
	rooListElem.append(titleElem);

	if (list.length === 0) {
		const textElem = createElement('p');
		textElem.textContent = 'Ничего не выбрано';
		rooListElem.append(textElem);
		return;
	}

	const listElem = createElement('ul', 'list');
	const listItemElements = list.map((id) => {
		const { genre } = movieGenres.find((item) => item.id == id);
		const liElem = createElement('li', 'list__item');
		const labelElem = createElement('label', 'label');
		labelElem.textContent = genre;
		const checkBoxElem = createElement('input');
		checkBoxElem.setAttribute('type', 'checkbox');
		checkBoxElem.setAttribute('id', id);
		const isChecked = favoriteIds.includes(id);
		checkBoxElem.checked = isChecked;
		checkBoxElem.addEventListener('change', (e) => {
			const operation = e.target.checked ? OPERATIONS.add : OPERATIONS.remove;
			updateStorage(operation, e.target.id);
			updateLink();
			renderList(titleTexts.second, favoriteIds, favoriteLisElem);
			renderList(titleTexts.base, movieGenresIds, baseListElem);
		});
		labelElem.prepend(checkBoxElem);
		liElem.append(labelElem);
		return liElem;
	});

	listElem.append(...listItemElements);
	rooListElem.append(listElem);
}
function updateStorage(operation, value) {
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
}
