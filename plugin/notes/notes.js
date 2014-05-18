/**
 * Handles opening of and synchronization with the reveal.js
 * notes window.
 */
var RevealNotes = (function() {

	function openNotes() {
		var jsFileLocation = document.querySelector('script[src$="notes.js"]').src;  // this js file path
		jsFileLocation = jsFileLocation.replace(/notes\.js(\?.*)?$/, '');   // the js folder path
		var notesPopup = window.open( jsFileLocation + 'notes.html', 'impress.js - Notes', 'width=1120,height=850' );

		// Fires when slide is changed
		Impress.root.addEventListener( 'impress:stepenter', post );

		/**
		 * Posts the current slide data to the notes window
		 */
		function post() {

			var currentStep = window.location.hash.replace(/^#\/?/,"");
			var slideElement = Impress.getElementFromHash();
			
			var notes = slideElement.querySelector( 'aside.notes' );
			var messageData = {
				notes : notes ? notes.innerHTML : '',
				step: currentStep,
				markdown : notes ? typeof notes.getAttribute( 'data-markdown' ) === 'string' : false
			};

			notesPopup.postMessage( JSON.stringify( messageData ), '*' );
		}

		// Navigate to the current slide when the notes are loaded
		notesPopup.addEventListener( 'load', function( event ) {
			post();
		}, false );
	}

	// If the there's a 'notes' query set, open directly
	if( window.location.search.match( /(\?|\&)notes/gi ) !== null ) {
		openNotes();
	}

	// Open the notes when the 's' key is hit
	document.addEventListener( 'keydown', function( event ) {
		// Disregard the event if the target is editable or a
		// modifier is present
		if ( document.querySelector( ':focus' ) !== null || event.shiftKey || event.altKey || event.ctrlKey || event.metaKey ) return;

		if( event.keyCode === 83 ) {
			event.preventDefault();
			openNotes();
		}
	}, false );

	return { open: openNotes };
})();
