'use strict';

function calculatePrice({userType: userType, productType: productType, price: price, publishedDate: publishedDate}) {

    if (typeof price != 'number')
        throw 'Reqiured argument "price" should be a number.';


    // Product type price
    if (productType == 'new') {
        price += 25;
    } else if (productType == 'old') {
        price += 35;
    } else {
        throw 'Unrecogized product type: ' + productType;
    }


    // User type rebate
    if (userType == 'normal') {
        // No rebate
    } else if (userType == 'company') {
        price -= 5;
    } else {
        throw 'Unrecogized user type: ' + userType;
    }


    // Rebate for new products published today
    if (typeof publishedDate != 'object' || !'toDateString' in publishedDate)
        throw 'Reqiured argument "publishedDate" should be a date.';

    var today = new Date().toDateString();
    if (productType == 'new' &&
        publishedDate.toDateString() == today) {
        price -= 10;
    }

    return price;
}
