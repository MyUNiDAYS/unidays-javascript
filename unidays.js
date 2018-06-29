var TrackingHelper = (function (window, undefined) {
	"use strict";

	var trackingUrl = "https://tracking.myunidays.com/perks/redemption/v1.1.js";
	//var trackingUrl = "https://tracking.myunidays.com/perks/redemption/v1.1-test.js";

	function generateQuery(customerId, transactionId, memberId, currency, orderTotal, itemsUNiDAYSDiscount, code, itemsTax, shippingGross, shippingDiscount, itemsGross, itemsOtherDiscount, UNiDAYSDiscountPercentage, newCustomer) {
		return '?CustomerId=' + (customerId != null ? encode(customerId) : '') +
			'&TransactionId=' + (transactionId != null ? encode(transactionId) : '') +
			'&MemberId=' + (memberId != null ? encode(memberId) : '') +
			'&Currency=' + (currency != null ? encode(currency) : '') +
			'&OrderTotal=' + (orderTotal != null ? (Math.round(orderTotal * 100) / 100).toFixed(2) : '') +
			'&ItemsUNiDAYSDiscount=' + (itemsUNiDAYSDiscount != null ? (Math.round(itemsUNiDAYSDiscount * 100) / 100).toFixed(2) : '') +
			'&Code=' + (code != null ? encode(code) : '') +
			'&ItemsTax=' + (itemsTax != null ? (Math.round(itemsTax * 100) / 100).toFixed(2) : '') +
			'&ShippingGross=' + (shippingGross != null ? (Math.round(shippingGross * 100) / 100).toFixed(2) : '') +
			'&ShippingDiscount=' + (shippingDiscount != null ? (Math.round(shippingDiscount * 100) / 100).toFixed(2) : '') +
			'&ItemsGross=' + (itemsGross != null ? (Math.round(itemsGross * 100) / 100).toFixed(2) : '') +
			'&ItemsOtherDiscount=' + (itemsOtherDiscount != null ? (Math.round(itemsOtherDiscount * 100) / 100).toFixed(2) : '') +
			'&UNiDAYSDiscountPercentage=' + (UNiDAYSDiscountPercentage != null ? (Math.round(UNiDAYSDiscountPercentage * 100) / 100).toFixed(2) : '') +
			'&NewCustomer=' + (newCustomer != null ? (Math.round(newCustomer * 100) / 100).toFixed(0) : '');
	}

	function encode(string) {
		return encodeURIComponent(string).replace(/(%[A-Z0-9]{2})/ig, function (s) {
			return s.toLowerCase();
		});
	}

	return function (customerId) {

		if(!customerId)
			throw "customerId is required and cannot be empty";

		this.createUrl = function (transactionId, currency, orderTotal, itemsUNiDAYSDiscount, code, itemsTax, shippingGross, shippingDiscount, itemsGross, itemsOtherDiscount, UNiDAYSDiscountPercentage, newCustomer) {
			var query = generateQuery(customerId, transactionId, null, currency, orderTotal, itemsUNiDAYSDiscount, code, itemsTax, shippingGross, shippingDiscount, itemsGross, itemsOtherDiscount, UNiDAYSDiscountPercentage, newCustomer);

			return trackingUrl + query;
		};
	};

})(window);