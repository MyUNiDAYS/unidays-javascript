const unidaysTracking = global.unidaysTracking;

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

