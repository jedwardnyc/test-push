# Graceshopper Business Rules

## When to trigger logging in
Shoppers will trigger the application to check whether the shopper is logged in and navigate to the login screen, if not logged in, when the shopper does the following:
  * Click the `Sign In` link.
  * Click the `Orders` link.
  * Click the `Buy` button from the `Shopping Cart`.

Otherwise shoppers can view products and review and modify shopping cart items without having to log in.


## Saving to database or redux store
* A *_pending_* order will be created for the shopper after adding the first product to his/her cart.
* The application will check whether a shopper is logged in when reading, updating, creating, or deleting shopping cart items, ie, line items on *_pending_* orders.
  * If the shopper is not logged in, the pending order is modified on the redux store only.
  * As soon as the shopper logs in, the redux store needs to be be synced with the database.
    * Line items not on the database should get added from the redux store.
    * Updates to line items, ie, product quantities, for line items should be updated in database from redux store.
  * When the shopper is logged in, any modificatins to orders should modify both the database and the redux store.
* When a shopper clicks the `Buy` button, the the status of the order will be marked *_complete_*. Completed orders will appear on the `Orders` screen.
