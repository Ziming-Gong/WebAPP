# How to start 
You should run with `npm install`, `npm run build`, `npm start`.

# Login Page
You should input you username in input box.
The username will be recognized automatically.
    -If the word includes 'employ', it will seem you as a manager. 
    -else it will seem you as a customer.
    --'dog' is invalid username.

# Products Zone
Both managers and users will show Products Zone, but what they can do is a little bit different.
The same things:
    -You could sorted the list by products category.
    -You could type some letters in input box, the server will search the products that related with your letters. You needn't type the fullname of the product you want to search. The server will change your letters to lower case.
    
# As a manager:
    -You could click product names to edit the information of the product you select. including name, price and category.
    -You should click the 'change it button' to submit the updated information.
    -You could click the 'delete' button to delete the product in your store.
    -Error: 
        -If you change the product name to a product name which exists in the store (except the same product), it will show error.
        -If you change the price to a something that is not a number, it will show errer.
        -If you do not select the category, it will send the previous category and not send error

# As a customer
    -You could click 'add to cart' button to add the product to your cart.
    -If you click the 'add to cart' button more than one time, it will add amount of the product in your shopping list
    

## Special function for Managers
    -You could Add the product to the store
    Errors:
        -If 'Name' is null or has existed
        -If 'Price' is null or is not a number
        -If 'category' is not selected

## Special function for Users
    -You could adjust the amount that you want in your cart.
    -You could delete the products in your cart.
    -You could clean up your cart
    -You could check out, and the items in your cart will send to your history order as a order
    -You could check your history orders
    -You could click the order name that use to find out what product that you had ordered
    Error:
        -Checking out the empty cart
        -Checking out with some products with amount of 0
        -Cleaning up the empty cart
        -Decreasing the amount of the product in your cart to the number below to '0'
