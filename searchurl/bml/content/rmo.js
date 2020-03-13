/**
 * Get rid of full-page overlays.
 *
 * @title rm overlays
 */
(function rmo() {
	function getFirstZIndexedElement(elements) {
		if (!Array.isArray(elements)) {
			elements = Array.from(elements);
		}

		for (let i = 0; i < elements.length; i++) {
			if (!isNaN(getComputedStyle(elements[i]).zIndex)) {
				return elements[i];
			}
		}

		return null;
	}

	/* Recursively execute the logic on the document and its sub-documents. */
	function execute(document) {
		/* Look for absolutely positioned (well, Z-indexed) elements that
		* cover the entire width of the page. Look for them in the vertical
		* center, to avoid cookie/GDPR/… banners that are typically at the
		* top or bottom of the window, and slightly away from the edges, to
		* avoid scrollbars/social sharing toolbars/… */
		let leftX = 64;
		let leftY = document.defaultView.innerHeight / 2;
		let leftOverlay = getFirstZIndexedElement(document.elementsFromPoint(leftX, leftY));
		if (!leftOverlay)
		  return;

		let rightX = document.defaultView.innerWidth - 64;
		let rightY = document.defaultView.innerHeight / 2;
		let rightOverlay = getFirstZIndexedElement(document.elementsFromPoint(rightX, rightY));
		if (!rightOverlay)
		  return;

		if (leftOverlay !== rightOverlay)
		  return;

		let centerX = document.defaultView.innerWidth / 2;
		let centerY = document.defaultView.innerHeight / 2;
		let centerElements = document.elementsFromPoint(centerX, centerY);
		if (!centerElements.indexOf(leftOverlay) === -1)
		  return;//leftOverlay not in center

		/* Hide the overlay and its “visual descendants” (i.e., the elements
		 * on top of the overlay). */
		for (let i = 0; i < centerElements.length; i++) {
			centerElements[i].style.display = 'none';

			if (centerElements[i] === leftOverlay) {
				break;
			}
		}

		/* Re-enable scrolling on the BODY element. */
		let currentBodyStyle = document.body.hasAttribute('style')
			? document.body.getAttribute('style')
			: '';

		let newBodyStyle = currentBodyStyle +
			'; overflow: auto !important' +
			'; position: static !important';

		document.body.setAttribute('style', newBodyStyle);

		/* Re-enable scrolling on Quora.com. */
		document.body.classList.remove('login_no_scroll');

		/* Re-enable scrolling disabled by inline styles. */
		[].forEach.call(
			document.querySelectorAll('[style*="overflow"][style*="hidden"]'),
			function (elem) {
				elem.setAttribute('style', elem.getAttribute('style').replace(/overflow\s*:\s*hidden\s*;?/, ''));
			}
		);

		/* Recurse for frames and IFRAMEs. */
		try {
			Array.from(
				document.querySelectorAll('frame, iframe, object[type^="text/html"], object[type^="application/xhtml+xml"]')
			).forEach(
				elem => execute(elem.contentDocument)
			);
		} catch (e) {
			/* Catch and ignore exceptions for out-of-domain access. */
		}
	}

	execute(document);
})();
