## Example Usage

```html
<script type="text/javascript" src="unidays.js"></script>
<script type="text/javascript">
    (function (window) {
        // UNiDAYS will provide your customerId.
        var customerId = 'someCustomerId';

        // Create a reference to the UNiDAYS TrackingHelper object, passing in your customerId.
        var unidays = new TrackingHelper(customerId);

        // Depending on use-case, you will want to base your implementation on one of the following methods,
        // passing in the corresponding transaction details.
        var codedTrackingUrl = unidays.clientSideCodedUrl('Order123', 'GBP', 209.00, 13.00, 'ABC123', 34.50, 5.00, 3.00, 230.00, 10.00, 10.00, 1);
        var codelessTrackingUrl = unidays.clientSideCodelessUrl('Order123', 'someMemberID', 'GBP', 209.00, 13.00, 34.50, 5.00, 3.00, 230.00, 10.00, 10.00, 1);

        // You now have a fully formed URL to call the UNiDAYS Tracking API,
        // perform a HTTP request with this URL using your preferred method. 

    }(window));
</script>
```