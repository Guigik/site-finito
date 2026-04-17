(function($) {

	var	$window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$banner = $('#banner');

	// Breakpoints.
	breakpoints({
		xlarge:	'(max-width: 1680px)',
		large:	'(max-width: 1280px)',
		medium:	'(max-width: 980px)',
		small:	'(max-width: 736px)',
		xsmall:	'(max-width: 480px)'
	});

	// Animation chargement
	$window.on('load', function() {
		setTimeout(function() {
			$body.removeClass('is-preload');
		}, 100);
	});

	// Header
	if ($banner.length > 0 && $header.hasClass('alt')) {

		$window.on('resize', function() { $window.trigger('scroll'); });

		$banner.scrollex({
			bottom: $header.outerHeight(),
			terminate: function() { $header.removeClass('alt'); },
			enter: function() { $header.addClass('alt'); },
			leave: function() { $header.removeClass('alt'); }
		});
	}

	// Menu
	var $menu = $('#menu');

	$menu._locked = false;

	$menu._lock = function() {
		if ($menu._locked) return false;
		$menu._locked = true;
		setTimeout(function() { $menu._locked = false; }, 350);
		return true;
	};

	$menu._show = function() {
		if ($menu._lock()) $body.addClass('is-menu-visible');
	};

	$menu._hide = function() {
		if ($menu._lock()) $body.removeClass('is-menu-visible');
	};

	$menu._toggle = function() {
		if ($menu._lock()) $body.toggleClass('is-menu-visible');
	};

	$menu
		.appendTo($body)
		.on('click', function(event) {
			event.stopPropagation();
			$menu._hide();
		})
		.find('.inner')
			.on('click', '.close', function(event) {
				event.preventDefault();
				event.stopPropagation();
				event.stopImmediatePropagation();
				$menu._hide();
			})
			.on('click', function(event) {
				event.stopPropagation();
			})
			.on('click', 'a', function(event) {

				var href = $(this).attr('href');

				event.preventDefault();
				event.stopPropagation();

				$menu._hide();

				setTimeout(function() {
					window.location.href = href;
				}, 350);
			});

	$body
		.on('click', 'a[href="#menu"]', function(event) {
			event.preventDefault();
			event.stopPropagation();
			$menu._toggle();
		})
		.on('keydown', function(event) {
			if (event.keyCode == 27) $menu._hide();
		});

})(jQuery);


// ================= FAQ =================
document.addEventListener("DOMContentLoaded", function () {

	const items = document.querySelectorAll(".faq-item");

	items.forEach(item => {
		const question = item.querySelector(".faq-question");
		const answer = item.querySelector(".faq-answer");

		question.addEventListener("click", () => {

			// ferme les autres
			items.forEach(i => {
				if (i !== item) {
					i.classList.remove("active");
					i.querySelector(".faq-answer").style.maxHeight = "0px";
				}
			});

			// toggle
			if (item.classList.contains("active")) {
				item.classList.remove("active");
				answer.style.maxHeight = "0px";
			} else {
				item.classList.add("active");
				answer.style.maxHeight = answer.scrollHeight + "px";
			}
		});
	});
});


// ================= SLIDER =================
document.addEventListener("DOMContentLoaded", function () {

	let index = 0;
	const slides = document.querySelectorAll('.slide');
	const total = slides.length;
	const slider = document.querySelector('.slides');
	const nextBtn = document.getElementById('next');
	const prevBtn = document.getElementById('prev');

	if (!slider || slides.length === 0) return;

	function showSlide(i) {
		slides.forEach(s => s.classList.remove('active'));
		slides[i].classList.add('active');
		slider.style.transform = `translateX(-${i * 100}%)`;
	}

	// boutons
	if (nextBtn) {
		nextBtn.addEventListener("click", () => {
			index = (index + 1) % total;
			showSlide(index);
		});
	}

	if (prevBtn) {
		prevBtn.addEventListener("click", () => {
			index = (index - 1 + total) % total;
			showSlide(index);
		});
	}

	// swipe mobile
	let startX = 0;
	let endX = 0;

	slider.addEventListener("touchstart", (e) => {
		startX = e.touches[0].clientX;
	});

	slider.addEventListener("touchmove", (e) => {
		endX = e.touches[0].clientX;
	});

	slider.addEventListener("touchend", () => {
		let diff = startX - endX;

		if (diff > 50) {
			index = (index + 1) % total;
			showSlide(index);
		} else if (diff < -50) {
			index = (index - 1 + total) % total;
			showSlide(index);
		}
	});
});