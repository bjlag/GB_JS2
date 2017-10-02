$( document ).ready( function () {
    // корзина
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

    // популярные товары
    var productHit = new Slider( '#product-hit__slider' );

    // drag and drop basket
    $( '.product-item' ).draggable( {
        opacity: 0.6,
        zIndex: 100,
        revert: true,
        cursor: 'move'
    } );

    $( '#basket' ).droppable( {
        activeClass: 'basket--active',
        hoverClass: 'basket--hover',
        drop: function ( event, ui ) {
            var productId = ui.draggable[ 0 ].querySelector( '.btn__buy' ).getAttribute( 'data-prod-id' ),
                productPrice = parseFloat( ui.draggable[ 0 ].querySelector( '.product-item__price' ).innerHTML );

            basket.add( productId, productPrice );
        }
    } );
} );