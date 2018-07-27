const unidaysTracking = require('./unidays');

describe('When the unidaysTracking method is called', () => {
	let tracking;

	test('With all parameters - The method should be defined', () => {
		function methodInit() {
			tracking = new unidaysTracking('0LTio6iVNaKj861RM9azJQ==', 'GBP', 'Order123', 'ABC123');
		}

		expect(methodInit).toBeDefined();
	});

	test('With all parameters in test mode - The method should be defined', () => {
		function methodInit() {
			tracking = new unidaysTracking('0LTio6iVNaKj861RM9azJQ==', 'GBP', 'Order123', 'ABC123', true);
		}

		expect(methodInit).toBeDefined();
	});

	test('With no partnerId - The method should throw an error', () => {
		function methodInit() {
			tracking = new unidaysTracking(null, 'GBP', 'Order123', 'ABC123');
		}

		expect(methodInit).toThrowError('partnerId is required and cannot be empty');
	});

	test('With no currency - The method should throw an error', () => {
		function methodInit() {
			tracking = new unidaysTracking('0LTio6iVNaKj861RM9azJQ==', null, 'Order123', 'ABC123');
		}

		expect(methodInit).toThrowError('currency is required and cannot be empty');
	});

	test('With no transactionId - The method should throw an error', () => {
		function methodInit() {
			tracking = new unidaysTracking('0LTio6iVNaKj861RM9azJQ==', 'GBP', null, 'ABC123');
		}

		expect(methodInit).toThrowError('transactionId is required and cannot be empty');
	});

	test('With no code - The method should throw an error', () => {
		function methodInit() {
			tracking = new unidaysTracking('0LTio6iVNaKj861RM9azJQ==', 'GBP', 'Order123', null);
		}

		expect(methodInit).toThrowError('code is required and cannot be empty');
	});
});

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

describe('When calling generateQuery directly', () => {
	let tracking;

	beforeEach(async () => {
		tracking = new unidaysTracking('0LTio6iVNaKj861RM9azJQ==', 'GBP', 'Order123', 'ABC123');
	});

	test('With all parameters set - The query should contain the corresponding parameters', () => {
		let query = tracking._generateQuery(209.00, 13.00, 34.50, 5.00, 3.00, 230.00, 10.00, 10.00, 1);

		expect(query).toBe('?PartnerId=0LTio6iVNaKj861RM9azJQ%3D%3D&TransactionId=Order123&Currency=GBP&OrderTotal=209.00&ItemsUNiDAYSDiscount=13.00&Code=ABC123&ItemsTax=34.50&ShippingGross=5.00&ShippingDiscount=3.00&ItemsGross=230.00&ItemsOtherDiscount=10.00&UNiDAYSDiscountPercentage=10.00&NewCustomer=1');
	});

	test('With some parameters set - The query should contain the corresponding parameters', () => {
		let query = tracking._generateQuery(209.00, null, 34.50, null, 3.00, 230.00, null, 10.00, null);

		expect(query).toBe('?PartnerId=0LTio6iVNaKj861RM9azJQ%3D%3D&TransactionId=Order123&Currency=GBP&OrderTotal=209.00&Code=ABC123&ItemsTax=34.50&ShippingDiscount=3.00&ItemsGross=230.00&UNiDAYSDiscountPercentage=10.00');
	});
});

describe('When calling generateQuery directly in test mode', () => {
	let tracking;

	beforeEach(async () => {
		tracking = new unidaysTracking('0LTio6iVNaKj861RM9azJQ==', 'GBP', 'Order123', 'ABC123', true);
	});

	test('With all parameters set - The query should contain the corresponding parameters with test mode', () => {
		let query = tracking._generateQuery(209.00, 13.00, 34.50, 5.00, 3.00, 230.00, 10.00, 10.00, 1);

		expect(query).toBe('?PartnerId=0LTio6iVNaKj861RM9azJQ%3D%3D&TransactionId=Order123&Currency=GBP&OrderTotal=209.00&ItemsUNiDAYSDiscount=13.00&Code=ABC123&ItemsTax=34.50&ShippingGross=5.00&ShippingDiscount=3.00&ItemsGross=230.00&ItemsOtherDiscount=10.00&UNiDAYSDiscountPercentage=10.00&NewCustomer=1&Test=True');
	});

	test('With some parameters set - The query should contain the corresponding parameters with test mode', () => {
		let query = tracking._generateQuery(209.00, null, 34.50, null, 3.00, 230.00, null, 10.00, null);

		expect(query).toBe('?PartnerId=0LTio6iVNaKj861RM9azJQ%3D%3D&TransactionId=Order123&Currency=GBP&OrderTotal=209.00&Code=ABC123&ItemsTax=34.50&ShippingDiscount=3.00&ItemsGross=230.00&UNiDAYSDiscountPercentage=10.00&Test=True');
	});
});

describe('When creating a tracking url', () => {
	let tracking;

	beforeEach(async () => {
		tracking = new unidaysTracking('0LTio6iVNaKj861RM9azJQ==', 'GBP', 'Order123', 'ABC123');
	});

	test('With a script route and all parameters set - The url should contain the corresponding parameters', () => {
		let url = tracking.createScriptUrl(209.00, 13.00, 34.50, 5.00, 3.00, 230.00, 10.00, 10.00, 1);

		expect(url).toBe('https://tracking.myunidays.com/v1.2/redemption/js?PartnerId=0LTio6iVNaKj861RM9azJQ%3D%3D&TransactionId=Order123&Currency=GBP&OrderTotal=209.00&ItemsUNiDAYSDiscount=13.00&Code=ABC123&ItemsTax=34.50&ShippingGross=5.00&ShippingDiscount=3.00&ItemsGross=230.00&ItemsOtherDiscount=10.00&UNiDAYSDiscountPercentage=10.00&NewCustomer=1');
	});

	test('With a script route and some parameters set - The url should contain the corresponding parameters', () => {
		let url = tracking.createScriptUrl(209.00, null, 34.50, null, 3.00, 230.00, null, 10.00, null);

		expect(url).toBe('https://tracking.myunidays.com/v1.2/redemption/js?PartnerId=0LTio6iVNaKj861RM9azJQ%3D%3D&TransactionId=Order123&Currency=GBP&OrderTotal=209.00&Code=ABC123&ItemsTax=34.50&ShippingDiscount=3.00&ItemsGross=230.00&UNiDAYSDiscountPercentage=10.00');
	});

	test('With a pixel route and all parameters set - The url should contain the corresponding parameters', () => {
		let url = tracking.createPixelUrl(209.00, 13.00, 34.50, 5.00, 3.00, 230.00, 10.00, 10.00, 1);

		expect(url).toBe('https://tracking.myunidays.com/v1.2/redemption/gif?PartnerId=0LTio6iVNaKj861RM9azJQ%3D%3D&TransactionId=Order123&Currency=GBP&OrderTotal=209.00&ItemsUNiDAYSDiscount=13.00&Code=ABC123&ItemsTax=34.50&ShippingGross=5.00&ShippingDiscount=3.00&ItemsGross=230.00&ItemsOtherDiscount=10.00&UNiDAYSDiscountPercentage=10.00&NewCustomer=1');
	});

	test('With a pixel route and some parameters set - The url should contain the corresponding parameters', () => {
		let url = tracking.createPixelUrl(209.00, null, 34.50, null, 3.00, 230.00, null, 10.00, null);

		expect(url).toBe('https://tracking.myunidays.com/v1.2/redemption/gif?PartnerId=0LTio6iVNaKj861RM9azJQ%3D%3D&TransactionId=Order123&Currency=GBP&OrderTotal=209.00&Code=ABC123&ItemsTax=34.50&ShippingDiscount=3.00&ItemsGross=230.00&UNiDAYSDiscountPercentage=10.00');
	});
});