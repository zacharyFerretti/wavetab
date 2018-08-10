/*
	Stellar by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

// detect browser to show the right buttons
var browser = "default";
if (navigator.userAgent.indexOf("Chrome") != -1 )
	browser = "Chrome";
else if (navigator.userAgent.indexOf("Firefox") != -1 ) 
	browser = "Firefox";

updateBrowserDisplay();

function toggleUserAgent()
{
	if (browser == "Chrome")
		browser = "Firefox";
	else
		browser = "Chrome";
	
	// show all elements
	var elements = document.getElementsByClassName("firefox");
	for (var i = 0; i < elements.length; i++)
		elements[i].style.display = "block";
	elements = document.getElementsByClassName("chrome");
	for (var i = 0; i < elements.length; i++)
		elements[i].style.display = "block";
	
	updateBrowserDisplay();
}

function updateBrowserDisplay()
{
	var btnContainer = document.getElementById("browser-btns");
	if (browser == "Firefox")
	{
		// hide chrome-related FAQ entries
		var elements = document.getElementsByClassName("chrome");
		for (var i = 0; i < elements.length; i++){
			elements[i].style.display = "none";
		}

		// highlight the firefox support tab
		var ffBtn = document.getElementById("firefox-tab");
		if (ffBtn != null)
		{
			ffBtn.classList.add("active");
			document.getElementById("chrome-tab").classList.remove("active");
		}
	}
	else if (browser == "Chrome")
	{
		// hide firefox FAQ entries
		var elements = document.getElementsByClassName("firefox");
		for (var i = 0; i < elements.length; i++){
			elements[i].style.display = "none";
		}

		// highlight the chrome support tab
		var chromeBtn = document.getElementById("chrome-tab");
		if (chromeBtn != null)
		{
			chromeBtn.classList.add("active");
			document.getElementById("firefox-tab").classList.remove("active");
		}
	}
	else
	{
		btnContainer.style.display = "none";
	}
}

(function($) {

	skel.breakpoints({
		xlarge: '(max-width: 1680px)',
		large: '(max-width: 1280px)',
		medium: '(max-width: 980px)',
		small: '(max-width: 736px)',
		xsmall: '(max-width: 480px)',
		xxsmall: '(max-width: 360px)'
	});

	$(function() {

		var	$window = $(window),
			$body = $('body'),
			$main = $('#main');

		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');

			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-loading');
				}, 100);
			});

		// Fix: Placeholder polyfill.
			$('form').placeholder();

		// Prioritize "important" elements on medium.
			skel.on('+medium -medium', function() {
				$.prioritize(
					'.important\\28 medium\\29',
					skel.breakpoint('medium').active
				);
			});

		// Nav.
			var $nav = $('#nav');

			if ($nav.length > 0) {

				// Shrink effect.
					$main
						.scrollex({
							mode: 'top',
							enter: function() {
								$nav.addClass('alt');
							},
							leave: function() {
								$nav.removeClass('alt');
							},
						});

				// Links.
					var $nav_a = $nav.find('a');

					$nav_a
						.scrolly({
							speed: 1000,
							offset: function() { return $nav.height(); }
						})
						.on('click', function() {

							var $this = $(this);

							// External link? Bail.
								if ($this.attr('href').charAt(0) != '#')
									return;

							// Deactivate all links.
								$nav_a
									.removeClass('active')
									.removeClass('active-locked');

							// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
								$this
									.addClass('active')
									.addClass('active-locked');

						})
						.each(function() {

							var	$this = $(this),
								id = $this.attr('href'),
								$section = $(id);

							// No section for this link? Bail.
								if ($section.length < 1)
									return;

							// Scrollex.
								$section.scrollex({
									mode: 'middle',
									initialize: function() {

										// Deactivate section.
											if (skel.canUse('transition'))
												$section.addClass('inactive');

									},
									enter: function() {

										// Activate section.
											$section.removeClass('inactive');

										// No locked links? Deactivate all links and activate this section's one.
											if ($nav_a.filter('.active-locked').length == 0) {

												$nav_a.removeClass('active');
												$this.addClass('active');

											}

										// Otherwise, if this section's link is the one that's locked, unlock it.
											else if ($this.hasClass('active-locked'))
												$this.removeClass('active-locked');

									}
								});

						});

			}

		// Scrolly.
			$('.scrolly').scrolly({
				speed: 1000
			});

	});

})(jQuery);