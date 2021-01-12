<p align="center">
  <img src="https://assets1.unidays.world/v5/main/assets/images/logo_v003.svg" width="60%"/>
</p>
<br/>

[![npm version](https://badge.fury.io/js/unidays-javascript.svg)](https://badge.fury.io/js/unidays-javascript) [![CircleCI](https://circleci.com/gh/MyUNiDAYS/unidays-javascript.svg?style=svg)](https://circleci.com/gh/MyUNiDAYS/unidays-javascript/tree/master)

# UNiDAYS JavaScript Library

This is the JavaScript library for integrating with UNiDAYS. This is to be used for coded integrations. The following documentation provides descriptions of the implementations and examples.

## Contents

[**How to use this code?**](#how-to-use-this-code)

[**Direct Tracking**](#direct-tracking)
- [Parameters](#parameters)
    - [Example Basket](#example-basket)

- [Example Usage](#example-usage)
    - [Create Script URL _(returns url for use in a script element)_](#create-script-url)
    - [Tracking Script Request _(performs the web request asynchronously within a script element)_](#tracking-script-request)
    - [Tag Managers and CDN _(use this package without including it as a file)_](#tag-managers-and-cdn)
    - [Test endpoint](#test-endpoint)

[Unit Tests](#unit-tests)

[**Contributing**](#contributing)

## How to use this code

- Download the contents of `dist/`, choosing between a regular or minified version of the script.
- _Alternatively_, pull the package from [npm](https://www.npmjs.com/package/unidays-javascript), choosing between a regular of minified version of the script within the created modules directory.
- Include this on the post-payment/order-success page of your web project.
- See the example usage section for the type of call you intend to use. Each of these contains an example.

## Direct Tracking

## Parameters

Here is a description of all available parameters. Which of these you provide are dependent on the agreed contract.

### Mandatory parameters

| Parameter | Description | Data Type | Example |
|---|---|---|---|
| partnerId | Your partnerId as provided by UNiDAYS. If you operate in multiple geographic regions you _may_ have a different partnerId for each region | Base64 Encoded Guid | XaxptFh0sK8Co6pI== |
| transactionId | A unique ID for the transaction in your system | String | Order123 |
| currency | The ISO 4217 currency code | String | GBP |
| code | The UNiDAYS discount code used | String | ABC123 |

### Additional parameters

Note: any of the following parameters to which the value is unknown/inessential should be omitted from calls (assign `null`). Which of the following values you provide to us will depend on your agreed contract.

| Parameter | Description | Data Type | Example |
|---|---|---|---|
| orderTotal | Total monetary amount paid, formatted to 2 decimal places | Decimal | 209.00 |
| itemsUnidaysDiscount | Total monetary amount of UNiDAYS discount applied on gross item value `itemsGross`, formatted to 2 decimal places | Decimal | 13.00 |
| itemsTax | Total monetary amount of tax applied to items, formatted to 2 decimal places | Decimal | 34.50 |
| shippingGross | Total monetary amount of shipping cost, before any shipping discount or tax applied, formatted to 2 decimal places | Decimal | 5.00 |
| shippingDiscount | Total monetary amount of shipping discount (UNiDAYS or otherwise) applied to the order, formatted to 2 decimal places | Decimal | 3.00 |
| itemsGross | Total monetary amount of the items, including tax, before any discounts are applied, formatted to 2 decimal places | Decimal | 230.00 |
| itemsOtherDiscount | Total monetary amount of all non UNiDAYS discounts applied to `itemsGross`, formatted to 2 decimal places | Decimal | 10.00 |
| unidaysDiscountPercentage | The UNiDAYS discount applied, as a percentage, formatted to 2 decimal places | Decimal | 10.00 |
| newCustomer | Is the user a new (vs returning) customer to you? | Boolean | true or false |

### Example Basket

Here is an example basket with the fields relating to UNiDAYS tracking parameters.

| Item | Gross | UNiDAYS Discount | Other Discount | Tax | Net Total | Line Total |
|---|---|---|---|---|---|---|
| Shoes | 100.00 | 0.00 | 0.00 | 16.67 | 83.33 | 100.00 |
| Shirt | 50.00 | 5.00 | 0.00 | 7.50 | 37.50 | 45.00 |
| Jeans | 80.00 | 8.00 | 10.00 | 10.33 | 51.67 | 62.00 |
||||||||
| **Totals** | 230.00 | 13.00 | 10.00 | 34.50 | 172.50 | 207.00 |
||||||||
|||||| Shipping | 5.00 |
|||||| Shipping Discount | 3.00 |
||||||||
|||||| **Order Total** | 209.00 |

## Example Usage

Below are examples of implementing the different types of integrations. These examples cover coded integrations and include all optional parameters. They are intended as a guideline for implementation.

- [Create Script URL _(returns url for use in a script element)_](#create-script-url)
- [Tracking Script Request _(performs the web request asynchronously within a script element)_](#tracking-script-request)
- [Test endpoint](#test-endpoint)

### Create Script URL

This is known as our client-script to server integration

#### Making the call

The method to get the URL to make a client-to-server request with is `createScriptUrl(args...)`. To implement this method, you first need to ensure that you have access to all required transaction details.

Once you have access to this transaction information, create a UnidaysTracking object, providing the [mandatory parameters](#mandatory-parameters) as arguments `new UnidaysTracking(partnerId, currency, transactionId, code)` and call `.createScriptUrl(args...)`, where the `args` are the transaction details you have contractually agreed to send to UNiDAYS.

Note: The `args` passed into `createScriptUrl()` must all the present and in the correct order, as per the example below. If a value is unknown/inessential, pass `null` or `0`.

#### Return

A URL will be returned to you which can be used to call the API. If successful a response with a status code of 200 OK will be returned. This will only work with `GET` requests.

#### Example

```html
<script type='text/javascript' src='unidays-tracking.js'></script>

<script type='text/javascript'>
    (function (window) {
        // UNiDAYS will provide your partnerId.
        var partnerId = '0LTio6iVNaKj861RM9azJQ==';

        // These must be based on the real values of the transaction.
        var currency = 'GBP';
        var transactionId = 'Order123';
        var code = 'ABC123';

        var orderTotal = 209.00;
        var itemsUnidaysDiscount = 13.00;
        var itemsTax = 34.50;
        var shippingGross = 5.00;
        var shippingDiscount = 3.00;
        var itemsGross = 230.00;
        var itemsOtherDiscount = 10.00;
        var unidaysDiscountPercentage = 10.00;
        var newCustomer = 1;

        // Create a reference to the UnidaysTracking object, passing in your partnerId, currency, transactionId and code.
        var unidays = new UnidaysTracking(partnerId, currency, transactionId, code);

        // Pass in the remaining corresponding transaction details to the createScriptUrl method.
        var url = unidays.createScriptUrl(orderTotal, itemsUnidaysDiscount, itemsTax, shippingGross,
            shippingDiscount, itemsGross, itemsOtherDiscount, unidaysDiscountPercentage, newCustomer);

        // You now have a URL which can be used within a script element to call the API.
    }(window));
</script>
```

### Tracking Script Request

This will create the client-script URL and perform the request to the UNiDAYS Tracking API for you.

#### Making the call

The method to call the API with a client-script request is `trackingScriptRequest(args...)`. To implement this method, you first need to ensure that you have access to all required transaction details.

Once you have access to this transaction information, create a UnidaysTracking object, providing the mandatory parameters as arguments `new UnidaysTracking(partnerId, currency, transactionId, code)` and call `.trackingScriptRequest(args...)`, where the `args` are the transaction details you have contractually agreed to send to UNiDAYS.

Note: The `args` passed into `trackingScriptRequest()` must all the present and in the correct order, as per the example below. If a value is unknown/inessential, pass `null` or `0`.

#### Return

A URL will be created and called for you within a script element. If successful the response should have a status code of 200 OK.

#### Example

```html
<script type='text/javascript' src='unidays-tracking.js'></script>

<script type='text/javascript'>
    (function (window) {
        // UNiDAYS will provide your partnerId.
        var partnerId = '0LTio6iVNaKj861RM9azJQ==';

        // These must be based on the real values of the transaction.
        var currency = 'GBP';
        var transactionId = 'Order123';
        var code = 'ABC123';

        var orderTotal = 209.00;
        var itemsUnidaysDiscount = 13.00;
        var itemsTax = 34.50;
        var shippingGross = 5.00;
        var shippingDiscount = 3.00;
        var itemsGross = 230.00;
        var itemsOtherDiscount = 10.00;
        var unidaysDiscountPercentage = 10.00;
        var newCustomer = 1;

        // Create a reference to the UnidaysTracking object, passing in your partnerId, currency, transactionId and code.
        var unidays = new UnidaysTracking(partnerId, currency, transactionId, code);

        // Pass in the remaining corresponding transaction details to the trackingScriptRequest method.
        unidays.trackingScriptRequest(orderTotal, itemsUnidaysDiscount, itemsTax, shippingGross,
            shippingDiscount, itemsGross, itemsOtherDiscount, unidaysDiscountPercentage, newCustomer);

        // The method has built the request and performed a request to our API within a script element.
    }(window));
</script>
```

### Test Endpoint

UNiDAYS provide a test-endpoint configuration of the `UnidaysTracking` object.

#### Return

The UnidaysTracking object, configured in test mode, will add an extra parameter (`&Test=True`) to the URL that is returned to you, or sent for you.

#### Example

```html
<script type='text/javascript' src='unidays-tracking.js'></script>

<script type='text/javascript'>
    (function (window) {
        // UNiDAYS will provide your partnerId.
        var partnerId = '0LTio6iVNaKj861RM9azJQ==';

        // These must be based on the real values of the transaction.
        var currency = 'GBP';
        var transactionId = 'Order123';
        var code = 'ABC123';

        var orderTotal = 209.00;
        var itemsUnidaysDiscount = 13.00;
        var itemsTax = 34.50;
        var shippingGross = 5.00;
        var shippingDiscount = 3.00;
        var itemsGross = 230.00;
        var itemsOtherDiscount = 10.00;
        var unidaysDiscountPercentage = 10.00;
        var newCustomer = 1;

        // Create a reference to the UnidaysTracking object, passing an additional argument of true to instantiate in test mode.
        var unidays = new UnidaysTracking(partnerId, currency, transactionId, code, true);

        // Pass in the remaining corresponding transaction details to the createScriptUrl method.
        var url = unidays.createScriptUrl(orderTotal, itemsUnidaysDiscount, itemsTax, shippingGross,
            shippingDiscount, itemsGross, itemsOtherDiscount, unidaysDiscountPercentage, newCustomer);

        // You now have a script URL which can be used to test your implementation.
    }(window));
</script>
```

### Tag Managers and CDN

This will demonstrate how to use this Javascript helper within a Tag (e.g. Google Tag Manager or other similar CMS) and/or how to pull in the UNiDAYS Javascript client helper through our CDN.

Note: We have included the SHA384 in the example below; file integrity is guaranteed, so you can be assured that you are always pulling in the official UNiDAYS JavaScript helper.

**However**, if your Tag Manager or CMS does not support the `integrity` attribute within `<script>` elements, simply remove the `integrity` and `crossorigin` attributes.

e.g.

```html
<script src="https://cdn.unidays.world/unidays-tracking.min.js"></script>
```

#### Making the call

The method to call the API with a client-script request is `trackingScriptRequest(args...)`. To implement this method, you first need to ensure that you have access to all required transaction details. In Google Tag Manager, for example, all of the required transaction information should be already available within the Data Layer for your online store. If any required information is not already available within the Data Layer for your online store, please contact your Development team and ensure this information has been added.

Once you have access to this transaction information, create a UnidaysTracking object, providing the mandatory parameters as arguments `new UnidaysTracking(partnerId, currency, transactionId, code)` and call `.trackingScriptRequest(args...)`, where the `args` are the transaction details you have contractually agreed to send to UNiDAYS.

Note: The `args` passed into `trackingScriptRequest()` must all the present and in the correct order, as per the example below. If a value is unknown/inessential, pass `null` or `0`.

Note: Most Tag Manangers (such as Google Tag Manager) requires you to reference Data Layer / User-Defined variables using `{{This Syntax}}` or something similar. If you are unsure, please contact your Development team associated with the Tag Manager platform you use.

#### Return

A URL will be created and called for you within a script element. If successful the response should have a status code of 200 OK.

#### Example

```html
<script src="https://cdn.unidays.world/unidays-tracking.min.js"
    integrity="sha384-bUvPj5fOb894FDlGsAUHEdp1F9DILx2A5Kiq0abipj7QpjClwoO9iFSWnZvVhn2q"
    crossorigin="anonymous"></script>

<script type='text/javascript'>
    (function (window) {
        // UNiDAYS will provide your partnerId and signingKey.
        var partnerId = '0LTio6iVNaKj861RM9azJQ==';

        // These must be based on the real values of the transaction. (e.g. For Google Tag Manager, please reference your Data Layer)
        var currency = 'GBP';
        var transactionId = 'Order123';
        var code = 'ABC123';

        var orderTotal = 209.00;
        var itemsUnidaysDiscount = 13.00;
        var itemsTax = 34.50;
        var shippingGross = 5.00;
        var shippingDiscount = 3.00;
        var itemsGross = 230.00;
        var itemsOtherDiscount = 10.00;
        var unidaysDiscountPercentage = 10.00;
        var newCustomer = 1;

        // Create a reference to the UnidaysTracking object, passing in your partnerId, currency, transactionId and code.
        var unidays = new UnidaysTracking(partnerId, currency, transactionId, code);

        // Pass in the remaining corresponding transaction details to the trackingScriptRequest method.
        unidays.trackingScriptRequest(orderTotal, itemsUnidaysDiscount, itemsTax, shippingGross,
            shippingDiscount, itemsGross, itemsOtherDiscount, unidaysDiscountPercentage, newCustomer);

        // The method has built the request and performed a request to our API within a script element.
    }(window));
</script>
```

## Unit Tests

We use [Jest](https://jestjs.io/) for our Unit Tests

### Installation

To install the Jest test-runner and all dependencies for this project, run `npm install` from your favourite terminal within the project directory.

### Running the tests

To run the tests, run `npm test` from your favourite terminal within the project directory.

## Contributing

This project is set up as an open source project. As such, if there are any suggestions that you have for features, for improving the code itself, or you have come across any problems; you can raise them and/or suggest changes in implementation.

If you are interested in contributing to this codebase, please follow the [contributing guidelines](./.github/contributing.md). This contains guides on both contributing directly and raising feature requests or bug reports. Please adhere to our [code of conduct](./CODE_OF_CONDUCT.md) when doing any of the above.