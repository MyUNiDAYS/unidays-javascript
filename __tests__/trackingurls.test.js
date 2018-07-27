const unidaysTracking = require('../src/unidays');

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