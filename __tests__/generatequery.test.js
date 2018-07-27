const unidaysTracking = require('../unidays');


describe('When calling generateQuery', () => {

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

});
