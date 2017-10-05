function Basket() {
    Container.call( this, 'basket' );

    this.countGoods = 0; // Количество товаров в корзине
    this.amount = 0; // Общая стоимость корзины
    this.basketItems = []; // Товары в корзине

    this.collectBasketItems();
}

Basket.prototype = Object.create( Container.prototype );
Basket.prototype.constructor = Basket;

Basket.prototype.collectBasketItems = function () {
    var appendId = '#' + this.id + '__data';

    $.ajax( {
        url: './basket.json',
        dataType: 'json',
        type: 'get',
        context: this,
        success: function ( data ) {
            if ( data.result === 1 ) {

                this.amount = data.amount;
                this.countGoods = data.basket.length;

                var basketCountDiv = $( '<div />', {
                        class: this.id + '__count',
                        text: 'Количество товаров: ' + this.countGoods + ' шт.'
                    } ),
                    basketAmountDiv = $( '<div />', {
                        class: this.id + '__amount',
                        text: 'На сумму: ' + this.amount + ' руб.'
                    } );

                basketCountDiv.appendTo( appendId );
                basketAmountDiv.appendTo( appendId );

                for ( var i = 0; i < data.basket.length; i++ ) {
                    this.basketItems.push( data.basket[ i ] );
                }
            } else {
                console.log( 'Обработка ошибки' );
            }
        }
    } );
};

Basket.prototype.render = function () {
    var basketTitleDiv = $( '<div />', {
            class: this.id + '__title',
            text: 'Корзина'
        } ),
        basketDataDiv = $( '<div />', {
            id: this.id + '__data'
        } );

    basketTitleDiv.appendTo( '#' + this.id );
    basketDataDiv.appendTo( '#' + this.id );
};

Basket.prototype.add = function ( productId, productPrice ) {
    var product = {
        id_product: +productId,
        price: productPrice
    };

    this.basketItems.push( product );
    this.amount += productPrice;
    this.countGoods += 1;

    // todo: передаем данные на сервер

    this.refresh();
};

Basket.prototype.remove = function ( productId ) {
    productId = +productId;

    for ( var i = 0; i < this.basketItems.length; i++ ) {
        if ( this.basketItems[ i ].id_product === productId ) {
            this.amount -= this.basketItems[ i ].price;
            this.countGoods -= 1;
            this.basketItems.splice( i, 1 );
        }
    }

    // todo: передаем данные на сервер

    this.refresh();
};

Basket.prototype.refresh = function () {
    var basketDataDiv = $( '#basket__data' ),
        basketCountDiv = basketDataDiv.find( '.' + this.id + '__count' ),
        basketAmountDiv = basketDataDiv.find( '.' + this.id + '__amount' );

    basketCountDiv.empty();
    basketAmountDiv.empty();

    basketCountDiv.text( 'Количество товаров: ' + this.countGoods + ' шт.' );
    basketAmountDiv.text( 'На сумму: ' + this.amount + ' руб.' );
};