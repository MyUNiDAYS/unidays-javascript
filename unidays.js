function UnidaysTracking(partnerId, currency, transactionId, code) {
    "use strict";

    this.partnerId = partnerId;
    this.currency = currency;
    this.transactionId = transactionId;
    this.code = code;

    if (!this.partnerId)
        throw "partnerId is required and cannot be empty";

    if (!this.currency)
        throw "currency is required and cannot be empty";

    if (!this.transactionId)
        throw "transactionId is required and cannot be empty";

    if (!this.code)
        throw "code is required and cannot be empty";

    this.trackingUrl = "https://tracking.myunidays.com/v1.2/redemption";
    this.trackingScriptUrl = trackingUrl + "/js";
    this.trackingPixelUrl = trackingUrl + "/gif";

    this._encode = function (string) {
        return encodeURIComponent(string).replace(/(%[A-Z0-9]{2})/ig, function (s) {
            return s.toLowerCase();
        });
    };

    this._validateString = function (string) {
        return (string != null ? this._encode(string) : '');
    };

    this._validateNumber = function (number, decimalPlaces) {
        return (number != null ? (Math.round(number * 100) / 100).toFixed(decimalPlaces) : '');
    };

    this._generateQuery = function (partnerId, transactionId, currency, orderTotal, itemsUNiDAYSDiscount, code, itemsTax, shippingGross, shippingDiscount, itemsGross, itemsOtherDiscount, UNiDAYSDiscountPercentage, newCustomer) {
        return '?PartnerId=' + this._validateString(partnerId) +
            '&TransactionId=' + this._validateString(transactionId) +
            '&Currency=' + this._validateString(currency) +
            '&OrderTotal=' + this._validateNumber(orderTotal, 2) +
            '&ItemsUNiDAYSDiscount=' + this._validateNumber(itemsUNiDAYSDiscount, 2) +
            '&Code=' + this._validateString(code) +
            '&ItemsTax=' + this._validateNumber(itemsTax, 2) +
            '&ShippingGross=' + this._validateNumber(shippingGross, 2) +
            '&ShippingDiscount=' + this._validateNumber(shippingDiscount, 2) +
            '&ItemsGross=' + this._validateNumber(itemsGross, 2) +
            '&ItemsOtherDiscount=' + this._validateNumber(itemsOtherDiscount, 2) +
            '&UNiDAYSDiscountPercentage=' + this._validateNumber(UNiDAYSDiscountPercentage, 2) +
            '&NewCustomer=' + this._validateNumber(newCustomer, 0);
    };

    this._appendTestParameter = function (query) {
        return query + "&Test=True";
    }

    this._makeScriptRequest = function (url) {
        (function (e, u) {
            var t = e.getElementsByTagName("script")[0],
                n = e.createElement("script");
            n.async = true;
            n.src = u;
            t.parentNode.insertBefore(n, t);
        })(document, url);
    }

    this._makePixelRequest = function (url) {
        (function (e, u) {
            var t = e.getElementsByTagName("img")[0],
                n = e.createElement("img");
            n.async = true;
            n.src = u;
            t.parentNode.insertBefore(n, t);
        })(document, url);
    }

    this.createScriptUrl = function (orderTotal, itemsUNiDAYSDiscount, itemsTax, shippingGross, shippingDiscount, itemsGross, itemsOtherDiscount, UNiDAYSDiscountPercentage, newCustomer) {
        var query = this._generateQuery(this.partnerId, this.transactionId, this.currency, orderTotal, itemsUNiDAYSDiscount, this.code, itemsTax, shippingGross, shippingDiscount, itemsGross, itemsOtherDiscount, UNiDAYSDiscountPercentage, newCustomer);

        return trackingScriptUrl + query;
    }

    this.createPixelUrl = function (orderTotal, itemsUNiDAYSDiscount, itemsTax, shippingGross, shippingDiscount, itemsGross, itemsOtherDiscount, UNiDAYSDiscountPercentage, newCustomer) {
        var query = this._generateQuery(this.partnerId, this.transactionId, this.currency, orderTotal, itemsUNiDAYSDiscount, this.code, itemsTax, shippingGross, shippingDiscount, itemsGross, itemsOtherDiscount, UNiDAYSDiscountPercentage, newCustomer);

        return trackingPixelUrl + query;
    }

    this.trackingScriptRequest = function (orderTotal, itemsUNiDAYSDiscount, itemsTax, shippingGross, shippingDiscount, itemsGross, itemsOtherDiscount, UNiDAYSDiscountPercentage, newCustomer) {
        var query = this._generateQuery(this.partnerId, this.transactionId, this.currency, orderTotal, itemsUNiDAYSDiscount, this.code, itemsTax, shippingGross, shippingDiscount, itemsGross, itemsOtherDiscount, UNiDAYSDiscountPercentage, newCustomer);
        var url = trackingScriptUrl + query;

        this._makeScriptRequest(url);
    }

    this.trackingPixelRequest = function (orderTotal, itemsUNiDAYSDiscount, itemsTax, shippingGross, shippingDiscount, itemsGross, itemsOtherDiscount, UNiDAYSDiscountPercentage, newCustomer) {
        var query = this._generateQuery(this.partnerId, this.transactionId, this.currency, orderTotal, itemsUNiDAYSDiscount, this.code, itemsTax, shippingGross, shippingDiscount, itemsGross, itemsOtherDiscount, UNiDAYSDiscountPercentage, newCustomer);
        var url = trackingPixelUrl + query;

        this._makePixelRequest(url);
    }

    this.trackingScriptTestRequest = function (orderTotal, itemsUNiDAYSDiscount, itemsTax, shippingGross, shippingDiscount, itemsGross, itemsOtherDiscount, UNiDAYSDiscountPercentage, newCustomer) {
        var query = this._generateQuery(this.partnerId, this.transactionId, this.currency, orderTotal, itemsUNiDAYSDiscount, this.code, itemsTax, shippingGross, shippingDiscount, itemsGross, itemsOtherDiscount, UNiDAYSDiscountPercentage, newCustomer);
        var url = trackingScriptUrl + query;
        var testUrl = this._appendTestParameter(url);

        this._makeScriptRequest(testUrl);
    }

    this.trackingPixelTestRequest = function (orderTotal, itemsUNiDAYSDiscount, itemsTax, shippingGross, shippingDiscount, itemsGross, itemsOtherDiscount, UNiDAYSDiscountPercentage, newCustomer) {
        var query = this._generateQuery(this.partnerId, this.transactionId, this.currency, orderTotal, itemsUNiDAYSDiscount, this.code, itemsTax, shippingGross, shippingDiscount, itemsGross, itemsOtherDiscount, UNiDAYSDiscountPercentage, newCustomer);
        var url = trackingPixelUrl + query;
        var testUrl = this._appendTestParameter(url);

        this._makePixelRequest(testUrl);
    }
}

if (typeof module !== 'undefined' && module.exports) { //Node
    module.exports = UnidaysTracking;
}