const unidaysTracking = require('./unidays');


describe('When the tracking script is called without a customer id', () => {
	let tracking;

	test('It should throw an error', () => {
		function testInit() {
			tracking = new unidaysTracking();
		}

		expect(testInit).toThrowError('customerId is required and cannot be empty');
	});
});

describe('When the tracking script is called with a customer id', () => {
	let tracking;

	test('No exception should be thrown', () => {
		function testInit() {
			tracking = new unidaysTracking('asdasdasd');
		}

		expect(testInit).not.toThrowError('customerId is required and cannot be empty');
	});
});

describe('Calling Order Total directly', () => {
	let tracking;

	beforeEach(async () => {
		tracking = new unidaysTracking('asdasdasd');
	});

	test('With no decimals directly should be 112.00', () => {
		let orderTotal = tracking._parseOrderTotal(112);
		expect(orderTotal).toBe('112.00');
	});

	test('With decimals directly should be 45.70', () => {
		let orderTotal = tracking._parseOrderTotal(45.70);
		expect(orderTotal).toBe('45.70');
	});

	test('With decimals directly as a string should be 67.08', () => {
		let orderTotal = tracking._parseOrderTotal('67.08');
		expect(orderTotal).toBe('67.08');
	});

	test('With decimals directly as a string should be 67.08', () => {
		let orderTotal = tracking._parseOrderTotal('67.008');
		expect(orderTotal).toBe('67.01');
	});

	test('With empty value should be 0.00', () => {
		let orderTotal = tracking._parseOrderTotal('');
		expect(orderTotal).toBe('0.00');
	});

	test('With null value should be empty string', () => {
		let orderTotal = tracking._parseOrderTotal(null);
		expect(orderTotal).toBe('');
	});
});