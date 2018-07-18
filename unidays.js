function UnidaysTracking(customerId) {
	"use strict";

	this.customerId = customerId;

	if (!this.customerId)
		throw "customerId is required and cannot be empty";

	this.trackingUrl = "https://tracking.myunidays.com/perks/redemption/v1.1.js";
	//var trackingUrl = "https://tracking.myunidays.com/perks/redemption/v1.1-test.js";

	this._parseCustomerId = function(customerId) {
		return (customerId != null ? this._encode(customerId) : '');
	};

	this._parseOrderTotal = function(orderTotal) {
		return (orderTotal != null ? (Math.round(orderTotal * 100) / 100).toFixed(2) : '');
	};

	this._generateQuery = function (customerId, transactionId, memberId, currency, orderTotal, itemsUNiDAYSDiscount, code, itemsTax, shippingGross, shippingDiscount, itemsGross, itemsOtherDiscount, UNiDAYSDiscountPercentage, newCustomer) {
		return '?CustomerId=' + this._parseCustomerId(customerId) +
			'&TransactionId=' + (transactionId != null ? this._encode(transactionId) : '') +
			'&MemberId=' + (memberId != null ? this._encode(memberId) : '') +
			'&Currency=' + (currency != null ? this._encode(currency) : '') +
			'&OrderTotal=' + this._parseOrderTotal(orderTotal) +
			'&ItemsUNiDAYSDiscount=' + (itemsUNiDAYSDiscount != null ? (Math.round(itemsUNiDAYSDiscount * 100) / 100).toFixed(2) : '') +
			'&Code=' + (code != null ? this._encode(code) : '') +
			'&ItemsTax=' + (itemsTax != null ? (Math.round(itemsTax * 100) / 100).toFixed(2) : '') +
			'&ShippingGross=' + (shippingGross != null ? (Math.round(shippingGross * 100) / 100).toFixed(2) : '') +
			'&ShippingDiscount=' + (shippingDiscount != null ? (Math.round(shippingDiscount * 100) / 100).toFixed(2) : '') +
			'&ItemsGross=' + (itemsGross != null ? (Math.round(itemsGross * 100) / 100).toFixed(2) : '') +
			'&ItemsOtherDiscount=' + (itemsOtherDiscount != null ? (Math.round(itemsOtherDiscount * 100) / 100).toFixed(2) : '') +
			'&UNiDAYSDiscountPercentage=' + (UNiDAYSDiscountPercentage != null ? (Math.round(UNiDAYSDiscountPercentage * 100) / 100).toFixed(2) : '') +
			'&NewCustomer=' + (newCustomer != null ? (Math.round(newCustomer * 100) / 100).toFixed(0) : '');
	};

	this._encode = function (string) {
		return encodeURIComponent(string).replace(/(%[A-Z0-9]{2})/ig, function (s) {
			return s.toLowerCase();
		});
	};

	this.trackingRequest = function (transactionId, currency, orderTotal, itemsUNiDAYSDiscount, code, itemsTax, shippingGross, shippingDiscount, itemsGross, itemsOtherDiscount, UNiDAYSDiscountPercentage, newCustomer) {
		var query = this._generateQuery(this.customerId, transactionId, null, currency, orderTotal, itemsUNiDAYSDiscount, code, itemsTax, shippingGross, shippingDiscount, itemsGross, itemsOtherDiscount, UNiDAYSDiscountPercentage, newCustomer);

		var url = trackingUrl + query;

		(function (e, u) {
			var t = e.getElementsByTagName("script")[0],
				n = e.createElement("script");
			n.async = true;
			n.src = u;
			t.parentNode.insertBefore(n, t)
		})(document, url)
	}
}

if (typeof module !== 'undefined' && module.exports) { //Node
	module.exports = UnidaysTracking;
}