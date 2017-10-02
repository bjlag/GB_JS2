function Slider( selector ) {
    this.selector = selector;

    var self = this,
        arSliderItems = [],
        currentItem = 0;

    collectSliderItem();

    function collectSliderItem() {
        $.ajax( {
            url: './product-hit.json',
            type: 'get',
            dataType: 'json',
            context: self,
            success: function ( data ) {
                for ( var i = 0; i < data.length; i++ ) {
                    arSliderItems.push( data[ i ] );
                }

                // renderItemSlider( arSliderItems.length - 1, 'product-hit__item--prev' );
                renderItemSlider( currentItem, 'product-hit__item--current' );
                // renderItemSlider( currentItem + 1, 'product-hit__item--next' );

                renderNavSlider();
            }
        } );
    }

    function renderNavSlider() {
        var slider = $( self.selector );

        slider.append( '<a id="slider-nav-prev" class="product-hit__slider-nav-prev icon-left" href="#"></a>' );
        slider.append( '<a id="slider-nav-next" class="product-hit__slider-nav-next icon-right" href="#"></a>' );

        $( '#slider-nav-prev' ).on( 'click', function () {
            slider.find( '.product-hit__item' ).remove();

            var prevItem = currentItem - 1;
            if ( prevItem < 0 ) {
                prevItem = arSliderItems.length - 1;
                currentItem = arSliderItems.length - 1
            } else {
                --currentItem;
            }

            renderItemSlider( prevItem, 'product-hit__item--current' );
        } );

        $( '#slider-nav-next' ).on( 'click', function () {
            slider.find( '.product-hit__item' ).remove();

            var nextItem = currentItem + 1;
            if ( nextItem > arSliderItems.length - 1 ) {
                nextItem = 0;
                currentItem = 0
            } else {
                ++currentItem;
            }

            renderItemSlider( nextItem, 'product-hit__item--current' );
        } );
    }
    
    function renderItemSlider( index, className ) {
        var slider = $( self.selector ).find( '.product-hit__slider-wrapper' ),
            itemDiv = $( '<div />', {
                class: 'product-hit__item ' + className
            } ),
            itemImgDiv = $( '<div />', {
                class: 'product-item__img',
                html: '<img src="' + arSliderItems[ index ].img + '" alt="' + arSliderItems[ index ].name + '">'
            } ),
            itemTitleDiv = $( '<div />', {
                class: 'product-item__title',
                text: arSliderItems[ index ].name
            } ),
            itemPriceDiv = $( '<div />', {
                class: 'product-item__price',
                text: arSliderItems[ index ].price + ' ' + arSliderItems[ index ].currency
            } );

        itemDiv.appendTo( slider );
        itemImgDiv.appendTo( itemDiv );
        itemTitleDiv.appendTo( itemDiv );
        itemPriceDiv.appendTo( itemDiv );
    }
}