function UnidaysTracking(partnerId, currency, transactionId, code, test) {
    "use strict";

    this.partnerId = partnerId;
    this.currency = currency;
    this.transactionId = transactionId;
    this.code = code;
    this.test = test;

    if (!this.partnerId)
        throw 'partnerId is required and cannot be empty';

    if (!this.currency)
        throw 'currency is required and cannot be empty';

    if (!this.transactionId)
        throw 'transactionId is required and cannot be empty';

    if (!this.code)
        throw 'code is required and cannot be empty';

    this.trackingScriptUrl = 'https://tracking.myunidays.com/v1.2/redemption/js';

    this._validateNumber = function (number, decimalPlaces) {
        return (Math.round(number * 100) / 100).toFixed(decimalPlaces);
    };

    this._generateQuery = function (orderTotal, itemsUnidaysDiscount, itemsTax, shippingGross, shippingDiscount, itemsGross, itemsOtherDiscount, discountPercentage, newCustomer) {
        return '?PartnerId=' + encodeURIComponent(this.partnerId) +
            '&TransactionId=' + encodeURIComponent(this.transactionId) +
            '&Currency=' + encodeURIComponent(this.currency) +
            (orderTotal ? '&OrderTotal=' + this._validateNumber(orderTotal, 2) : '') +
            (itemsUnidaysDiscount ? '&ItemsUNiDAYSDiscount=' + this._validateNumber(itemsUnidaysDiscount, 2) : '') +
            '&Code=' + encodeURIComponent(this.code) +
            (itemsTax ? '&ItemsTax=' + this._validateNumber(itemsTax, 2) : '') +
            (shippingGross ? '&ShippingGross=' + this._validateNumber(shippingGross, 2) : '') +
            (shippingDiscount ? '&ShippingDiscount=' + this._validateNumber(shippingDiscount, 2) : '') +
            (itemsGross ? '&ItemsGross=' + this._validateNumber(itemsGross, 2) : '') +
            (itemsOtherDiscount ? '&ItemsOtherDiscount=' + this._validateNumber(itemsOtherDiscount, 2) : '') +
            (discountPercentage ? '&UNiDAYSDiscountPercentage=' + this._validateNumber(discountPercentage, 2) : '') +
            (newCustomer ? '&NewCustomer=' + this._validateNumber(newCustomer, 0) : '') +
            (this.test ? "&Test=True" : '');
    };

    this._makeRequest = function (url, tag) {
        (function (e, u) {
            var t = e.getElementsByTagName(tag)[0],
                n = e.createElement(tag);
            n.async = true;
            n.src = u;
            t.parentNode.insertBefore(n, t);
        })(document, url);
    }

    this.createScriptUrl = function (orderTotal, itemsUnidaysDiscount, itemsTax, shippingGross, shippingDiscount, itemsGross, itemsOtherDiscount, unidaysDiscountPercentage, newCustomer) {
        var query = this._generateQuery(orderTotal, itemsUnidaysDiscount, itemsTax, shippingGross, shippingDiscount, itemsGross, itemsOtherDiscount, unidaysDiscountPercentage, newCustomer);

        return this.trackingScriptUrl + query;
    }

    this.trackingScriptRequest = function (orderTotal, itemsUnidaysDiscount, itemsTax, shippingGross, shippingDiscount, itemsGross, itemsOtherDiscount, unidaysDiscountPercentage, newCustomer) {
        var query = this._generateQuery(orderTotal, itemsUnidaysDiscount, itemsTax, shippingGross, shippingDiscount, itemsGross, itemsOtherDiscount, unidaysDiscountPercentage, newCustomer);
        var url = this.trackingScriptUrl + query;

        this._makeRequest(url, 'script');
    }
}

// Node
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UnidaysTracking;
}