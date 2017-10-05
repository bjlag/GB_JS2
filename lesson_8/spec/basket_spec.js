describe( 'При создании экземпляра класса корзины', function () {

    var basket;

    beforeEach( function () {
        basket = new Basket();
    } );

    it( 'Экземпляр должен принадлежати классу Basket', function () {
        expect( basket ).toEqual( jasmine.any( Basket ) );
    } );

    it( 'ID не должен быть пустым', function () {
        expect( basket.id ).toBeDefined();
    } );

    it( 'Количество товаров в корзине должно быть равно 0', function () {
        expect( basket.countGoods ).toEqual( 0 );
    } );

    it( 'Общая стоимость корзины должна быть равно 0', function () {
        expect( basket.amount ).toEqual( 0 );
    } );

    it( 'В корзине не должно быть товаров', function () {
        expect( basket.basketItems ).toEqual( [] );
    } );

} );

describe( 'При добавлении товара в корзину', function () {

    var basket;

    beforeEach( function () {
        basket = new Basket();

        basket.countGoods = 0;
        basket.amount = 0;

        basket.add( 15, 1500 );
        basket.add( 20, 3000 );
    } );

    it( 'Должно увеличиться общее число товаров в корзине', function () {
        expect( basket.countGoods ).toBe( 2 );
    } );

    it( 'Должна увеличиться общая стоимость корзины', function () {
        expect( basket.amount ).toBe( 4500 );
    } );

    it( 'Должна увеличиться длина массива basketItems', function () {
        expect( basket.basketItems.length ).toBe( 2 );
    } );

} );

describe( 'При удалении товара из корзины', function () {

    var basket;

    beforeEach( function () {
        basket = new Basket();

        basket.countGoods = 0;
        basket.amount = 0;

        basket.add( 15, 1500 );
        basket.add( 20, 3000 );

        basket.remove( 15, 1500 );
    } );

    it( 'Должно уменьшиться общее число товаров в корзине', function () {
        expect( basket.countGoods ).toBe( 1 );
    } );

    it( 'Должна уменьшиться общая стоимость корзины', function () {
        expect( basket.amount ).toBe( 3000 );
    } );

    it( 'Должна уменьшиться длина массива basketItems', function () {
        expect( basket.basketItems.length ).toBe( 1 );
    } );

} );