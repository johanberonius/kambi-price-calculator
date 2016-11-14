'use strict';

describe('price calculator', function() {

    var today = new Date(),
        yesterday = new Date(today.getTime() - 24*60*60*1000);

    it('should calc price right for new products', function() {
        expect(calculatePrice({userType: 'normal',  productType: 'new', price: 1, publishedDate: yesterday})).to.equal(26);
    });

    it('should calc price right for old products', function() {
        expect(calculatePrice({userType: 'normal',  productType: 'old', price: 1, publishedDate: yesterday})).to.equal(36);
    });

    it('should give rebate to company users', function() {
        expect(calculatePrice({userType: 'company', productType: 'new', price: 1, publishedDate: yesterday})).to.equal(21);
        expect(calculatePrice({userType: 'company', productType: 'old', price: 1, publishedDate: yesterday})).to.equal(31);
    });

    it('should give rebate on new products published today', function() {
        expect(calculatePrice({userType: 'normal',  productType: 'new', price: 1, publishedDate: today})).to.equal(16);
        expect(calculatePrice({userType: 'company', productType: 'new', price: 1, publishedDate: today})).to.equal(11);
    });

    it('should handle unrecognized user type', function() {
        var calc = calculatePrice.bind(this, {userType: 'foo',  productType: 'new', price: 1, publishedDate: today});
        expect(calc).to.throwException();
    });

    it('should handle unrecognized product type', function() {
        var calc = calculatePrice.bind(this, {userType: 'normal',  productType: 'foo', price: 1, publishedDate: today});
        expect(calc).to.throwException();
    });

    it('should handle invalid price', function() {
        var calc = calculatePrice.bind(this, {userType: 'normal',  productType: 'new', price: 'foo', publishedDate: today});
        expect(calc).to.throwException();
    });

    it('should handle invalid date', function() {
        var calc = calculatePrice.bind(this, {userType: 'normal',  productType: 'new', price: 1, publishedDate: 'foo'});
        expect(calc).to.throwException();
    });

});
