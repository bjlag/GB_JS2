/**
 * Контсруктор класса по управлению отзывами
 *
 * @constructor
 */
function Review() {
    Container.call( this, 'review' );

    var self = this,
        lastIdReview = 0,
        reviewItems = [];

    loadReview();

    Review.prototype.load = loadReview;
    Review.prototype.remove = removeReview;
    Review.prototype.add = addReview;
    Review.prototype.approved = approvedReview;

    /**
     * Загрузка и отображение отзывов
     */
    function loadReview() {
        var appendId = '#' + self.id;

        $.ajax( {
            url: './reviews.json',
            dataType: 'json',
            type: 'get',
            context: self,
            success: function ( data ) {
                for ( var i = 0; i < data.comments.length; i++ ) {
                    renderReviewItem( appendId, data.comments[ i ].id_comment, data.comments[ i ].text, data.comments[ i ].approved );

                    lastIdReview = data.comments[ i ].id_comment;
                    reviewItems.push( data.comments[ i ] );
                }

                $( ' button.btn__remove' ).on( 'click', function () {
                    removeReview( $( this ).attr( 'data-review-id' ) );
                } );

                $( ' button.btn__approved' ).on( 'click', function () {
                    approvedReview( $( this ).attr( 'data-review-id' ) );
                } );
            }
        } );
    }

    /**
     * Добавление нового отзыва
     *
     * @param {string} reviewText - текст отзыва
     * @returns {boolean} - результат выполнения, true отзыв добавлен успешно, false возникла ошибка
     */
    function addReview( reviewText ) {
        if ( reviewText.length === 0 ) {
            return false;
        }

        lastIdReview += 1;

        var reviewItem = {
            id_comment: lastIdReview, // todo: id отзыва должен приходить с сервера
            text: reviewText,
            approved: false
        };

        //todo: отправили на сервер, получили ID отзыва, пока генирится

        reviewItems.push( reviewItem );

        renderReviewItem( '#' + self.id, lastIdReview, reviewText, false );

        $( 'button.btn__remove[data-review-id="' + lastIdReview + '"]' ).on( 'click', function () {
            removeReview( $( this ).attr( 'data-review-id' ) );
        } );

        $( ' button.btn__approved' ).on( 'click', function () {
            approvedReview( $( this ).attr( 'data-review-id' ) );
        } );

        return true;
    }

    /**
     * Удаление отзыва
     *
     * @param {string} reviewId - ID отзыва
     */
    function removeReview( reviewId ) {
        $( '#review-' + reviewId ).remove();

        for ( var i = 0; i < reviewItems.length; i++ ) {
            if ( reviewItems[ i ].id_comment === +reviewId ) {
                reviewItems.splice( i, 1 );
                break;
            }
        }
    }

    /**
     * Одобрение отзыва
     *
     * @param {string} reviewId - ID отзыва
     */
    function approvedReview( reviewId ) {
        $( '#review-' + reviewId ).addClass( 'review-item--approved' ).find( '.btn__approved' ).remove();
    }

    /**
     * Формирование и вывод HTML структуры отзыва
     *
     * @param {string} appendBlockId - ID HTML контейнера родителя, в который встраивается отзыв
     * @param {string} reviewId - ID отзыва в базе
     * @param {string} reviewText - Текст отзыва
     * @param {boolean} isApproved - true (одобрен), false (неодобрен)
     */
    function renderReviewItem( appendBlockId, reviewId, reviewText, isApproved ) {
        var reviewItemDiv = $( '<div />', {
                id: 'review-' + reviewId,
                class: 'review-item' + ( isApproved === true ? ' review-item--approved' : '' )
            } ),
            reviewItemTitleDiv = $( '<div />', {
                class: 'review-item__title',
                text: 'Отзыв #' + reviewId
            } ),
            reviewItemTextDiv = $( '<div />', {
                class: 'review-item__text',
                text: reviewText
            } ),
            reviewItemButtonDiv = $( '<div />', {
                class: 'review-item__button'
            } );

        reviewItemDiv.appendTo( appendBlockId );
        reviewItemTitleDiv.appendTo( reviewItemDiv );
        reviewItemTextDiv.appendTo( reviewItemDiv );
        reviewItemButtonDiv.appendTo( reviewItemDiv );

        if ( !isApproved ) {
            reviewItemButtonDiv.append( '<button data-review-id="' + reviewId + '" class="btn btn__approved">Одобрить</button>' );
        }
        reviewItemButtonDiv.append( '<button data-review-id="' + reviewId + '" class="btn btn__remove">Удалить</button>' );
    }
}

Review.prototype = Object.create( Container.prototype );
Review.prototype.constructor = Review;