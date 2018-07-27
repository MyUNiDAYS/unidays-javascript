const unidaysTracking = require('../unidays');

describe('When calling validateNumber directly', () => {
	let tracking;

	beforeEach(async () => {
		tracking = new unidaysTracking('0LTio6iVNaKj861RM9azJQ==', 'GBP', 'Order123', 'ABC123');
	});

	test('With an integer - The result should be 112.00', () => {
		let result = tracking._validateNumber(112, 2);
		expect(result).toBe('112.00');
	});

	test('With a decimal - The result should be 45.70', () => {
		let result = tracking._validateNumber(45.70, 2);
		expect(result).toBe('45.70');
	});

	test('With a decimal as a string - The result should be 67.08', () => {
		let result = tracking._validateNumber('67.08', 2);
		expect(result).toBe('67.08');
	});

	test('With a number with more than 2 d.p as a string - The result should be 67.01', () => {
		let result = tracking._validateNumber(67.008, 2);
		expect(result).toBe('67.01');
	});

	test('With an empty value - The result should be 0.00', () => {
		let result = tracking._validateNumber('', 2);
		expect(result).toBe('0.00');
	});

	test('With a null value - The result should be 0.00', () => {
		let result = tracking._validateNumber(null, 2);
		expect(result).toBe('0.00');
	});
});