import {
	createElement,
	clearElement,
	getIdsFromLink,
	updateFavoriteIds,
	updateFavoriteIdsInURL,
} from '../helpers';

beforeEach(() => {
	delete window.location;
	window.location = new URL('http://localhost');
	history.pushState = jest.fn();
});

describe('Helpers module', () => {
	test('1. createElement', () => {
		const element = createElement('div', 'test-class');
		expect(element.tagName).toBe('DIV');
		expect(element.classList.contains('test-class')).toBe(true);
	});

	test('2. clearElement', () => {
		const element = document.createElement('div');
		element.innerHTML = '<p>Test</p>';
		clearElement(element);
		expect(element.children.length).toBe(0);
	});

	test('3. getIdsFromLink', () => {
		const initialIds = ['1', '2', '3'];
		const queryString = new URLSearchParams({
			ids: initialIds,
		}).toString();
		window.location.search = '?' + queryString;
		const ids = getIdsFromLink();
		expect(ids).toEqual(initialIds);
	});

	test('4. getIdsFromLink', () => {
		window.location.search = '';
		const ids = getIdsFromLink();
		expect(ids).toEqual([]);
	});

	test('5. updateFavoriteIdsInURL', () => {
		updateFavoriteIdsInURL([]);

		expect(history.pushState).toHaveBeenCalled();
	});

	test('6. updateFavoriteIds', () => {
		const updatedIds = updateFavoriteIds('add', '5', ['1', '2', '3']);
		expect(updatedIds).toEqual(['1', '2', '3', '5']);
	});

	test('7. updateFavoriteIds', () => {
		const updatedIds = updateFavoriteIds('remove', '2', ['1', '2', '3']);
		expect(updatedIds).toEqual(['1', '3']);
	});
});
