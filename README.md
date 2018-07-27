<p align="center">
  <img src="/assets/UNiDAYS_Logo.png" />
</p>
<br/>

# UNiDAYS JavaScript Direct Tracking

This is the JavaScript library for UNiDAYS direct tracking. This is to be used for coded integrations. The following documentation provides descriptions of the implementations and examples.

## Contents

- [How to use this code?](#how-to-use-this-code)
- [Contributing](#contributing)
- [Parameters](#parameters)
    - [Example Basket](#example-basket)

- [Example Usage](#example-usage)
    - [Create Script URL _(returns url for use in a script element)_](#create-script-url)
    - [Create Pixel URL _(returns url for use in an image element)_](#create-pixel-url)
    - [Tracking Script Request _(performs the web request asynchronously within a script element)_](#tracking-script-request)
    - [Tracking Pixel Request _(performs the web request asynchronously within an image element)_](#tracking-pixel-request)
    - [Test endpoint](#test-endpoint)

## How to use this code

- Download/clone `unidays.js` and include this on the post-payment/order-success page of your web project.
- See the example usage section for the type of call you intend to use. Each of these contains an example.

## Contributing

This project is set up as an open source project. As such, if there any any suggestions you have for features, for improving the code itself or come across any problems, you can raise them and / or suggest changes in implementation.

If you are interested in contributing to this codebase, please follow the [contributing guidelines](./GUIDELINES/contributing.md). This contains guides on both contributing directly and raising feature requests or bug reports. Please adhere to our [code of conduct](./CODE_OF_CONDUCT.md) when doing any of the above.

## Parameters

Here is a description of all the available parameters. Which of these you provide to us are dependant on the agreed contract.

### Mandatory parameters

| Parameter | Description | Data Type | Example |
|---|---|---|---|
| partnerId | Your PartnerId as provided by UNiDAYS. If you operate in multiple geographic regions you MAY have a different PartnerId for each region | String | 0LTio6iVNaKj861RM9azJQ== |
| transactionId | A unique ID for the transaction in your system | String | Order123 |
| currency | The ISO 4217 currency code | String | GBP |
| code | The UNiDAYS discount code used | String | ABC123 |

### Optional parameters

Note any of the following properties to which the value is unknown should be omitted from calls (assigned `null`). Which of the following values you provide to us will depend on your agreed contract.

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
| newCustomer | Is the user a new (vs returning) customer to you? | Boolean integer | 1 or 0 |

### Example Basket

Here is an example basket with the fields relating to UNiDAYS tracking parameters,

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
- [Create Pixel URL _(returns url for use in an image element)_](#create-pixel-url)
- [Tracking Script Request _(performs the web request asynchronously within a script element)_](#tracking-script-request)
- [Tracking Pixel Request _(performs the web request asynchronously within an image element)_](#tracking-pixel-request)
- [Test endpoint](#test-endpoint)

### Create Script URL

This is known as our client-script to server integration

#### Making the call

The method to get the URL to make a client-to-server request with is `createScriptUrl(args...)`. To implement this method you first need to ensure that you have access to all required transaction details.

Once you have access to this transaction information, create a UnidaysTracking object, providing the mandatory parameters as arguments (`UnidaysTracking(partnerId, currency, transactionId, code)`) and call `.createScriptUrl(args...)` where the `args` are the transaction details you are required to send to the UNiDAYS Tracking API.

#### Return

A URL will be returned to you, which can then be used to call the UNiDAYS Tracking API.

#### Example

```html
<script type="text/javascript" src="unidays.js"></script>

<script type="text/javascript">
    (function (window) {
        // UNiDAYS will provide your partnerId.
        var partnerId = '0LTio6iVNaKj861RM9azJQ==';

        // These must be based on the real values of the transaction.
        var currency = 'GBP';
        var transactionId = 'Order123';
        var code = 'ABC123';

        // Create a reference to the UnidaysTracking object, passing in your partnerId, currency, transactionId and code.
        var unidays = new UnidaysTracking(partnerId, currency, transactionId, code);

        // Pass in the remaining corresponding transaction details to the createScriptUrl method.
        var url = unidays.createScriptUrl(209.00, 13.00, 34.50, 5.00, 3.00, 230.00, 10.00, 10.00, 1);

        // You now have a URL which can be used in a script element to call the API.
    }(window));
</script>
```

### Create Pixel URL

This is known as our pixel-to-server integration

#### Making the call

The method to get the URL to make a pixel-to-server request with is `createPixelUrl(args...)`. To implement this method you first need to ensure that you have access to all required transaction details.

Once you have access to this transaction information, create a UnidaysTracking object, providing the mandatory parameters as arguments (`UnidaysTracking(partnerId, currency, transactionId, code)`) and call `.createPixelUrl(args...)` where the `args` are the transaction details you are required to send to the UNiDAYS Tracking API.

#### Return

A URL will be returned to you, which can then be used to call the UNiDAYS Tracking API.

#### Example

```html
<script type="text/javascript" src="unidays.js"></script>

<script type="text/javascript">
    (function (window) {
        // UNiDAYS will provide your partnerId.
        var partnerId = '0LTio6iVNaKj861RM9azJQ==';

        // These must be based on the real values of the transaction.
        var currency = 'GBP';
        var transactionId = 'Order123';
        var code = 'ABC123';

        // Create a reference to the UnidaysTracking object, passing in your partnerId, currency, transactionId and code.
        var unidays = new UnidaysTracking(partnerId, currency, transactionId, code);

        // Pass in the remaining corresponding transaction details to the createPixelUrl method.
        var url = unidays.createPixelUrl(209.00, 13.00, 34.50, 5.00, 3.00, 230.00, 10.00, 10.00, 1);

        // You now have a URL which can be used in an image element to call the API.
    }(window));
</script>
```

### Tracking Script Request

This will create the client-script URL and perform the request to the UNiDAYS Tracking API for you.

#### Making the call

The method to call the API with a client-script request is `trackingScriptRequest(args...)`. To implement this method you first need to ensure that you have access to all required transaction details.

Once you have access to this transaction information, create a UnidaysTracking object, providing the mandatory parameters as arguments (`UnidaysTracking(partnerId, currency, transactionId, code)`) and call `.trackingScriptRequest(args...)` where the `args` are the transaction details you are required to send to the UNiDAYS Tracking API.

#### Return

A URL will be created and called for you within a script element

#### Example

```html
<script type="text/javascript" src="unidays.js"></script>

<script type="text/javascript">
    (function (window) {
        // UNiDAYS will provide your partnerId.
        var partnerId = '0LTio6iVNaKj861RM9azJQ==';

        // These must be based on the real values of the transaction.
        var currency = 'GBP';
        var transactionId = 'Order123';
        var code = 'ABC123';

        // Create a reference to the UnidaysTracking object, passing in your partnerId, currency, transactionId and code.
        var unidays = new UnidaysTracking(partnerId, currency, transactionId, code);

        // Pass in the remaining corresponding transaction details to the trackingScriptRequest method.
        unidays.trackingScriptRequest(209.00, 13.00, 34.50, 5.00, 3.00, 230.00, 10.00, 10.00, 1);

        // The method has built the request and performed a request to our API within a script element.
    }(window));
</script>
```

### Tracking Pixel Request

This will create the pixel URL and perform the request to the UNiDAYS Tracking API for you.

#### Making the call

The method to call the API with a pixel request is `trackingPixelRequest(args...)`. To implement this method you first need to ensure that you have access to all required transaction details.

Once you have access to this transaction information, create a UnidaysTracking object, providing the mandatory parameters as arguments (`UnidaysTracking(partnerId, currency, transactionId, code)`) and call `.trackingPixelRequest(args...)` where the `args` are the transaction details you are required to send to the UNiDAYS Tracking API.

#### Return

A URL will be created and called for you within an image element; the UNIDAYS API will always respond with a 1x1 transparent GIF.

#### Example

```html
<script type="text/javascript" src="unidays.js"></script>

<script type="text/javascript">
    (function (window) {
        // UNiDAYS will provide your partnerId.
        var partnerId = '0LTio6iVNaKj861RM9azJQ==';

        // These must be based on the real values of the transaction.
        var currency = 'GBP';
        var transactionId = 'Order123';
        var code = 'ABC123';

        // Create a reference to the UnidaysTracking object, passing in your partnerId, currency, transactionId and code.
        var unidays = new UnidaysTracking(partnerId, currency, transactionId, code);

        // Pass in the remaining corresponding transaction details to the trackingPixelRequest method.
        unidays.trackingPixelRequest(209.00, 13.00, 34.50, 5.00, 3.00, 230.00, 10.00, 10.00, 1);

        // The method has built the request and performed a request to our API within an image element.
    }(window));
</script>
```

### Test Endpoint

UNiDAYS provide a test-endpoint configuration of the `UnidaysTracking` object.

#### Example

```html
<script type="text/javascript" src="unidays.js"></script>

<script type="text/javascript">
    (function (window) {
        // UNiDAYS will provide your partnerId.
        var partnerId = '0LTio6iVNaKj861RM9azJQ==';

        // These must be based on the real values of the transaction.
        var currency = 'GBP';
        var transactionId = 'Order123';
        var code = 'ABC123';

        // Create a reference to the UnidaysTracking object, passing an additional argument of true to instantiate in test mode.
        var unidays = new UnidaysTracking(partnerId, currency, transactionId, code, true);

        // Pass in the remaining corresponding transaction details to the createScriptUrl method.
        unidays.createScriptUrl(209.00, 13.00, 34.50, 5.00, 3.00, 230.00, 10.00, 10.00, 1);

        // You now have a script URL which can be used to test your implementation.
    }(window));
</script>
```

The UnidaysTracking object, configured in test mode, will add an extra parameter (`&Test=True`) to the URL that is returned to you, or sent for you.
> `"https://tracking.myunidays.com/v1.2/redemption/js?CustomerId=0LTio6iVNaKj861RM9azJQ%3d%3d&TransactionId=Order123&MemberId=&Currency=GBP&OrderTotal=209.00&ItemsUNiDAYSDiscount=13.00&Code=ABC123&ItemsTax=34.50&ShippingGross=5.00&ShippingDiscount=3.00&ItemsGross=230.00&ItemsOtherDiscount=10.00&UNiDAYSDiscountPercentage=10.00&NewCustomer=1`


## Installation and Running Tests

We use Jest for our Unit Tests. To install run

`npm install`

Then to run the tests either use your favourite editor or run `jest` from the command line.

