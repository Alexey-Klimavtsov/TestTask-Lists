import {
	createElement,
	clearElement,
	getIdsFromLink,
	updateFavoriteIdsInURL,
	updateFavoriteIds,
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
	const listElements = list.map((id) => {
		const templateElem = document.getElementById('li');
		const templateContent = templateElem.content.cloneNode(true);
		const liElem = templateContent.querySelector('.list__item');
		const labelElem = templateContent.querySelector('label');
		const checkBoxElem = templateContent.querySelector('input');
		const { genre } = movieGenres.find((item) => item.id == id);
		labelElem.textContent = genre;
		labelElem.setAttribute('for', id);
		checkBoxElem.setAttribute('id', id);
		const isChecked = favoriteIds.includes(id);
		checkBoxElem.checked = isChecked;
		checkBoxElem.addEventListener('change', handleCheckBoxClick);
		return liElem;
	});

	listElem.append(...listElements);
	rooListElem.append(listElem);
}

function handleCheckBoxClick(e) {
	const isChecked = e.target.checked;
	const operation = isChecked ? OPERATIONS.add : OPERATIONS.remove;
	favoriteIds = updateFavoriteIds(operation, e.target.id, favoriteIds);
	updateFavoriteIdsInURL(favoriteIds);
	renderList(titleTexts.second, favoriteIds, favoriteLisElem);
	renderList(titleTexts.base, movieGenresIds, baseListElem);
}
