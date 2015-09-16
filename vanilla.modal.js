/**
 * Vanilla modal ;) (https://github.com/xylphid)
 * Version 0.1.0
 *
 * @author Anthony PERIQUET
 */
(function(vanilla) {
    var currentModal = null;
    var refresh = {
        time: null,
        timeout: false
    };

    vanilla.modal = function( query, options ){
        if (!(this instanceof vanilla.modal))
            return new vanilla.modal( query, options );

        this.options = vanilla.extend({}, vanilla.modal.defaults, options);

        if (typeof query !== typeof undefined) {
            this.elm = vanilla( query );
            currentModal = this;

            // Bind window resize
            vanilla(window).on('resize', function() {
                if (!currentModal.opened) return;
                refresh.time = new Date();
                if (refresh.timeout === false) {
                    refresh.timeout = true;
                    setTimeout( vanilla.modal.center, 200 );
                }
            });

            // Bind keyboard event
            vanilla(document).on('keydown', function(event) {
                if (currentModal && currentModal.opened) {
                    if (event.which == 27) vanilla.modal.close();
                }
            });
        }
    };

    vanilla.modal.prototype = {
        constructor: vanilla.modal,

        // Open the modal
        open: function( elm ) {
            if ( elm instanceof vanilla )
                this.elm = elm;
            this.setOverlay();
            this.setModal();
            this.showSpinner();
            this.show();
            this.opened = true;
            return false;
        },
        
        // Define background overlay
        setOverlay: function() {
            vanilla('.overlay').remove();
            this.overlay = vanilla('<div>')
                .addClass('overlay')
                .css('background', this.options.overlay)
                .css('bottom', 0)
                .css('display', 'none')
                .css('height', '100%')
                .css('left', 0)
                .css('opacity', this.options.opacity)
                .css('position', 'fixed')
                .css('right', 0)
                .css('top', 0)
                .css('transition', 'opacity 100ms, z-index 1s')
                .css('width', '100%')
                .css('z-index', this.options.zIndex)
                .appendTo('body')
                .fadeIn();
        },
        
        // Define the modal
        setModal: function() {
            vanilla( '.vanilla-modal' ).remove();
            this.modal = vanilla('<div>').addClass( 'vanilla-modal' )
                // Add close button
                .append( vanilla('<a>').addClass('close').on('click', vanilla.modal.close) )
                .appendTo( 'body' )
                .swipe('left', function(event) { vanilla.modal.next(); })
                .swipe('right', function(event) { vanilla.modal.prev(); });
            this.center();
        },
        
        // Show slide
        show: function() {
            if ( isUrl(this.elm.attr('href')) ) {
                vanilla.ajax( this.elm.attr('href'), {
                    success:function( request ) {
                        currentModal.modal.append( request.responseText );
                        currentModal.hideSpinner();
                        currentModal.center();
                        currentModal.hideSpinner();
                    }
                } );
            }
            else {
                this.modal.append( vanilla( this.elm.attr('href') ).outerHtml() );
                this.center();
                this.hideSpinner();
            }
        },

        // Center the modal
        center: function() {
            this.modal.css('left', "50%")
                .css('margin-left', -(this.modal.outerWidth() / 2) + 'px')
                .css('margin-top', -(this.modal.outerHeight() / 2) + 'px')
                .css('position', 'fixed')
                .css('top', "50%")
                .css('z-index', this.options.zIndex + 1);
        },

        // Show spinner (loading)
        showSpinner: function() {
            this.working = true;
            if (!this.options.showSpinner) return;
            this.spinner = this.spinner || vanilla('<div>').addClass('spinner');
            this.modal.append(this.spinner);
        },

        // Hide spinner (content loaded)
        hideSpinner: function() {
            if (this.spinner) this.spinner.remove();
            this.working = false;
        },

        // Close the modal
        close: function() {
            this.modal.css('opacity', 0);
            this.overlay.css('opacity', 0)
                .css('z-index', -1);
            this.opened = false;
        },
    };

    // Slideshow default options
    vanilla.modal.defaults = {
        opacity: 0.75,
        overlay: '#000',
        showSpinner: true,
        zIndex: 1,
    }

    vanilla.modal.dispatcher = function( event, callable ) {
        if (!currentModal || typeof currentModal[callable] != 'function') return;
        if (/Event/.test(event)) event.preventDefault();
        currentModal[callable]( event );
        return currentModal; 
    };
    vanilla.modal.open = function(event) {
        return vanilla.modal.dispatcher( event, 'open');
    };
    vanilla.modal.close = function(event) {
        return vanilla.modal.dispatcher( event, 'close');
    };
    vanilla.modal.resize = function(event) {
        vanilla.modal.dispatcher( event, 'resize');
    };

    var isUrl = function( string ) {
        var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
            '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return urlPattern.test( string );
    };

    vanilla.prototype.modal = function(options) {
        if (this instanceof vanilla) {
            currentModal = new vanilla.modal(this, options);
            vanilla.modal.open();
        }
        return this;
    };

    vanilla(document).on('click', 'a[data-modal]', function(event) {
        event.preventDefault();
        vanilla(event.value).modal();
    });
    
}) (vanilla);