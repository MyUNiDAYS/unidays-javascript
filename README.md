# Examples

## Params of the createUrl method

(line 35 in `unidays.js`)

Pass the following parameters into the `createUrl` method to get a URL to call UNiDAYS on.

| Parameter | Parameter value description |
|---|---|
| TransactionId  | Your Unique ID for the transaction ie Order123 |
| Currency | ISO 4217 Currency Code |
| OrderTotal | Total monetary amount paid, formatted to 2 decimal places |
| ItemsUNiDAYSDiscount | Total monetary amount of UNiDAYS discount applied on gross item value ItemsGross, formatted to 2 decimal places |
| Code | Discount code used |
| ItemsTax | Total monetary amount of tax applied to items, formatted to 2 decimal places. |
| ShippingGross | Total monetary amount of shipping discount (UNiDAYS or otherwise) applied to the order, formatted to 2 decimal places. |
| ShippingDiscount | Total monetary amount paid, formatted to 2 decimal places |
| ItemsGross | Total monetary amount of the items, including tax, before any discounts are applied, formatted to 2 decimal places. |
| ItemsOtherDiscount | Total monetary amount of all non UNiDAYS discounts applies to ItemsGross, formatted to 2 decimal places |
| UNiDAYSDiscountPercentage | The UNiDAYS discount applied as a percentage formatted to 2 decimal places. |
| NewCustomer | Is the user a new (vs returning) customer to you? 1 if new, 0 if returning. |

## Example of createUrl usage

```html
<script type="text/javascript" src="unidays.js"></script>
<script type="text/javascript">
    (function (window) {
        // UNiDAYS will provide your customerId.
        var customerId = 'someCustomerId';

        // Create a reference to the UNiDAYS TrackingHelper object, passing in your customerId.
        var unidays = new TrackingHelper(customerId);

        // Pass in the corresponding transaction details.
        var trackingUrl = unidays.createUrl('Order123', 'GBP', 209.00, 13.00, 'ABC123', 34.50,
            5.00, 3.00, 230.00, 10.00, 10.00, 1);

        // You now have a fully formed URL to call the UNiDAYS Tracking API,
        // perform a HTTP request with this URL using your preferred method.

    }(window));
</script>
```

This creates a `trackingUrl` which can be used to call the UNiDAYS Tracking API, for example:

> `https://tracking.myunidays.com/perks/redemption/v1.1.js?CustomerId=someCustomerId&TransactionId=Order123&MemberId=&Currency=GBP&OrderTotal=209.00&ItemsUNiDAYSDiscount=13.00&Code=ABC123&ItemsTax=34.50&ShippingGross=5.00&ShippingDiscount=3.00&ItemsGross=230.00&ItemsOtherDiscount=10.00&UNiDAYSDiscountPercentage=10.00&NewCustomer=1`
