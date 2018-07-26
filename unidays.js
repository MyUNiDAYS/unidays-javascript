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

    this.trackingUrl = 'https://tracking.myunidays.com/v1.2/redemption';
    this.trackingScriptUrl = this.trackingUrl + '/js';
    this.trackingPixelUrl = this.trackingUrl + '/gif';

    this._validateString = function (string) {
        return encodeURIComponent(string)
    };

    this._validateNumber = function (number, decimalPlaces) {
        return (Math.round(number * 100) / 100).toFixed(decimalPlaces);
    };

    this._generateQuery = function (partnerId, transactionId, currency, orderTotal, itemsUNiDAYSDiscount, code, itemsTax, shippingGross, shippingDiscount, itemsGross, itemsOtherDiscount, UNiDAYSDiscountPercentage, newCustomer) {
        return '?PartnerId=' + this._validateString(partnerId) +
            '&TransactionId=' + this._validateString(transactionId) +
            '&Currency=' + this._validateString(currency) +
            (orderTotal ? '&OrderTotal=' + this._validateNumber(orderTotal, 2) : '') +
            (itemsUNiDAYSDiscount ? '&ItemsUNiDAYSDiscount=' + this._validateNumber(itemsUNiDAYSDiscount, 2) : '') +
            '&Code=' + this._validateString(code) +
            (itemsTax ? '&ItemsTax=' + this._validateNumber(itemsTax, 2) : '') +
            (shippingGross ? '&ShippingGross=' + this._validateNumber(shippingGross, 2) : '') +
            (shippingDiscount ? '&ShippingDiscount=' + this._validateNumber(shippingDiscount, 2) : '') +
            (itemsGross ? '&ItemsGross=' + this._validateNumber(itemsGross, 2) : '') +
            (itemsOtherDiscount ? '&ItemsOtherDiscount=' + this._validateNumber(itemsOtherDiscount, 2) : '') +
            (UNiDAYSDiscountPercentage ? '&UNiDAYSDiscountPercentage=' + this._validateNumber(UNiDAYSDiscountPercentage, 2) : '') +
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

    this.createScriptUrl = function (orderTotal, itemsUNiDAYSDiscount, itemsTax, shippingGross, shippingDiscount, itemsGross, itemsOtherDiscount, UNiDAYSDiscountPercentage, newCustomer) {
        var query = this._generateQuery(this.partnerId, this.transactionId, this.currency, orderTotal, itemsUNiDAYSDiscount, this.code, itemsTax, shippingGross, shippingDiscount, itemsGross, itemsOtherDiscount, UNiDAYSDiscountPercentage, newCustomer);

        return this.trackingScriptUrl + query;
    }

    this.createPixelUrl = function (orderTotal, itemsUNiDAYSDiscount, itemsTax, shippingGross, shippingDiscount, itemsGross, itemsOtherDiscount, UNiDAYSDiscountPercentage, newCustomer) {
        var query = this._generateQuery(this.partnerId, this.transactionId, this.currency, orderTotal, itemsUNiDAYSDiscount, this.code, itemsTax, shippingGross, shippingDiscount, itemsGross, itemsOtherDiscount, UNiDAYSDiscountPercentage, newCustomer);

        return this.trackingPixelUrl + query;
    }

    this.trackingScriptRequest = function (orderTotal, itemsUNiDAYSDiscount, itemsTax, shippingGross, shippingDiscount, itemsGross, itemsOtherDiscount, UNiDAYSDiscountPercentage, newCustomer) {
        var query = this._generateQuery(this.partnerId, this.transactionId, this.currency, orderTotal, itemsUNiDAYSDiscount, this.code, itemsTax, shippingGross, shippingDiscount, itemsGross, itemsOtherDiscount, UNiDAYSDiscountPercentage, newCustomer);
        var url = this.trackingScriptUrl + query;

        this._makeRequest(url, 'script');
    }

    this.trackingPixelRequest = function (orderTotal, itemsUNiDAYSDiscount, itemsTax, shippingGross, shippingDiscount, itemsGross, itemsOtherDiscount, UNiDAYSDiscountPercentage, newCustomer) {
        var query = this._generateQuery(this.partnerId, this.transactionId, this.currency, orderTotal, itemsUNiDAYSDiscount, this.code, itemsTax, shippingGross, shippingDiscount, itemsGross, itemsOtherDiscount, UNiDAYSDiscountPercentage, newCustomer);
        var url = this.trackingPixelUrl + query;

        this._makeRequest(url, 'img');
    }
}

// Node
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UnidaysTracking;
}