$( document ).ready( function () {
    var basket = new Basket();
    basket.render( '#basket__data' );

    $( '.btn__buy' ).on( 'click', function () {
        var productId = $( this ).attr( 'data-prod-id' ),
            productPrice = parseFloat( $( this ).closest( '.product-item' ).find( '.product-item__price' ).text() );

        basket.add( productId, productPrice );
    } );

    $( '.btn__remove' ).on( 'click', function () {
        var productId = $( this ).attr( 'data-prod-id' );

        basket.remove( productId );
    } );
} );