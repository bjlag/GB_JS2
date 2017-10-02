$( document ).ready( function () {
    var review = new Review();

    $( '#submit' ).on( 'click', function () {
        var reviewText = $( '#form-review-add-text' );

        if ( !review.add( reviewText.val() ) ) {
            reviewText.addClass( 'error' );
        } else {
            reviewText.removeClass( 'error' );
        }
    } );
} );