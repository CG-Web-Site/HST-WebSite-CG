(function ($) {
	"use strict"
	//{Preloader script} 
	// ----------------------
	const preloader = document.querySelector('#preloader');
	if (preloader) {
		window.addEventListener('load', () => {
			preloader.remove();
		});
	}
	// ----------------------



	//{Sidebar Menu script} 
	// ----------------------
	$('.btn-side').click(function () {
		$(this).toggleClass("click");
		$('.sidebar').toggleClass("show");
	});

	$('.first-drop-btn').click(function () {
		$('nav ul .first-drop-show').toggleClass("show");
		$('nav ul .first').toggleClass("rotate");
	});


	$('.second-drop-btn').click(function () {
		$('nav ul .second-drop-show').toggleClass("show");
		$('nav ul .second').toggleClass("rotate");
	});
	$('.first-more-drop-btn').click(function () {
		$('nav ul .first-more-drop-show').toggleClass("show");
		$('nav ul .first-more').toggleClass("rotate");
	});

	$('.third-drop-btn').click(function () {
		$('nav ul .third-drop-show').toggleClass("show");
		$('nav ul .third').toggleClass("rotate");
	});

	$('.four-drop-btn').click(function () {
		$('nav ul .four-drop-show').toggleClass("show");
		$('nav ul .four').toggleClass("rotate");
	});

	$('.five-drop-btn').click(function () {
		$('nav ul .five-drop-show').toggleClass("show");
		$('nav ul .five').toggleClass("rotate");
	});

	$('nav ul li').click(function () {
		$(this).addClass("active").siblings().removeClass("active");
	});

	// ----------------------

	//{Menu fixed script} 
	// ----------------------
	var navoff = $('.header-main').offset().top;
	$(window).scroll(function () {
		var scrolling = $(this).scrollTop();
		if (scrolling > navoff) {
			$('.header-main').addClass('menu-fix');
		} else {
			$('.header-main').removeClass('menu-fix');
		}
	});
	// ----------------------


	$(window).on('scroll', function () {


		//{Count Up script script} 
		// ----------------------
		function counter() {
			var oTop;
			if ($('.counterUp').length !== 0) {
				oTop = $('.counterUp').offset().top - window.innerHeight;
			}
			if ($(window).scrollTop() > oTop) {
				$('.counterUp').each(function () {
					var $this = $(this),
						countTo = $this.attr('data-count');
					$({
						countNum: $this.text()
					}).animate({
						countNum: countTo
					}, {
						duration: 1000,
						easing: 'swing',
						step: function () {
							$this.text(Math.floor(this.countNum));
						},
						complete: function () {
							$this.text(this.countNum);
						}
					});
				});
			}
		}
		counter();
		// ----------------------

		//{scroll to top btn show/hide script} 
		// ----------------------
		function scrollTopBtn() {
			var scrollToTop = $('#back-to-top'),
				scroll = $(window).scrollTop();
			if (scroll >= 50) {
				scrollToTop.fadeIn();
			} else {
				scrollToTop.fadeOut();
			}
		}
		scrollTopBtn();
	});
	$(document).ready(function () {
		// back to top
		function backToTop() {
			$('#back-to-top').on('click', function () {
				$('#back-to-top').tooltip('hide');
				$('body,html').animate({
					scrollTop: 0
				}, 400);
				return false;
			});
		}
		backToTop();
	});

	// ----------------------


	$(document).ready(function () {

		//{Slick Carousel script} 
		// ----------------------

		// Banner Carousel
		function bannerCarouselOne() {
			$('.banner-carousel').slick({
				fade: true,
				slidesToShow: 1,
				slidesToScroll: 1,
				pauseOnHover: false,
				autoplay: true,
				dots: false,
				speed: 600,
				arrows: false,
				prevArrow: '<button type="button" class="carousel-control left" aria-label="carousel-control"><i class="fas fa-chevron-left"></i></button>',
				nextArrow: '<button type="button" class="carousel-control right" aria-label="carousel-control"><i class="fas fa-chevron-right"></i></button>'
			});
		}
		bannerCarouselOne();


		// About Carousel
		function pageSlider() {
			$('.about-slider').slick({
				fade: true,
				slidesToShow: 1,
				slidesToScroll: 1,
				pauseOnHover: false,
				autoplay: true,
				dots: false,
				speed: 600,
				arrows: false,
				prevArrow: '<button type="button" class="carousel-control left" aria-label="carousel-control"><i class="fas fa-chevron-left"></i></button>',
				nextArrow: '<button type="button" class="carousel-control right" aria-label="carousel-control"><i class="fas fa-chevron-right"></i></button>'
			});
		}
		pageSlider();

		// Department Carousel
		function pageSlider2() {
			$('.department-slider').slick({
				fade: true,
				slidesToShow: 1,
				slidesToScroll: 1,
				pauseOnHover: false,
				autoplay: true,
				dots: false,
				speed: 600,
				arrows: false,
				prevArrow: '<button type="button" class="carousel-control left" aria-label="carousel-control"><i class="fas fa-chevron-left"></i></button>',
				nextArrow: '<button type="button" class="carousel-control right" aria-label="carousel-control"><i class="fas fa-chevron-right"></i></button>'
			});
		}
		pageSlider2();

		// Service Carousel
		function pageSlider3() {
			$('.single-service-slider').slick({
				fade: true,
				slidesToShow: 1,
				slidesToScroll: 1,
				pauseOnHover: false,
				autoplay: true,
				dots: false,
				speed: 600,
				arrows: false,
				prevArrow: '<button type="button" class="carousel-control left" aria-label="carousel-control"><i class="fas fa-chevron-left"></i></button>',
				nextArrow: '<button type="button" class="carousel-control right" aria-label="carousel-control"><i class="fas fa-chevron-right"></i></button>'
			});
		}
		pageSlider3();


		// Quote carousel
		function quoteCarousel() {
			$('.quote-slide').slick({
				slidesToShow: 1,
				slidesToScroll: 1,
				fade: true,
				dots: true,
				speed: 500,
				autoplay: true,
				arrows: false
			});
		}
		quoteCarousel();


		// Team carousel
		function teamCarousel() {
			$('.team-slide').slick({
				dots: false,
				infinite: true,
				autoplay: true,
				speed: 1000,
				autoplay: true,
				slidesToShow: 4,
				slidesToScroll: 2,
				arrows: false,
				// prevArrow: '<button type="button" class="carousel-control left" aria-label="carousel-control"><i class="fas fa-chevron-left"></i></button>',
				// nextArrow: '<button type="button" class="carousel-control right" aria-label="carousel-control"><i class="fas fa-chevron-right"></i></button>',
				responsive: [{
						breakpoint: 992,
						settings: {
							slidesToShow: 3,
							slidesToScroll: 3
						}
					},
					{
						breakpoint: 768,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 2
						}
					},
					{
						breakpoint: 481,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1
						}
					}
				]
			});
		}
		teamCarousel();
		// ----------------------


		//{Shuffle js filter and masonry script} 
		// ----------------------
		function projectShuffle() {
			if ($('.shuffle-wrapper').length !== 0) {
				var Shuffle = window.Shuffle;
				var myShuffle = new Shuffle(document.querySelector('.shuffle-wrapper'), {
					itemSelector: '.shuffle-item',
					sizer: '.shuffle-sizer',
					buffer: 1
				});
				$('input[name="shuffle-filter"]').on('change', function (evt) {
					var input = evt.currentTarget;
					if (input.checked) {
						myShuffle.filter(input.value);
					}
				});
				$('.shuffle-btn-group label').on('click', function () {
					$('.shuffle-btn-group label').removeClass('active');
					$(this).addClass('active');
				});
			}
		}
		projectShuffle();
		// ----------------------

	});

	//{Magnific popup script} 
	// ----------------------
	$('.shuffle-wrapper ,.all-medal').each(function () { // the containers for all your galleries
		$(this).magnificPopup({
			delegate: '.gallery-popup', // the selector for gallery item
			type: 'image',
			gallery: {
				enabled: true
			},
			mainClass: 'mfp-fade'
		});
	});
	// ----------------------


	//{ScrollTo click event model script} 
	// ----------------------
	// on click event on all anchors with a class of scrollTo
	$('button.scrollTo').on('click', function () {

		// data-scrollTo = section scrolling to name
		var scrollTo = $(this).attr('data-scrollTo');


		// animate and scroll to the sectin 
		$('body, html').animate({

			// the magic - scroll to section
			"scrollTop": $('#' + scrollTo).offset().top
		}, 1000);
		return false;

	})
	// ----------------------




})(jQuery);

document.addEventListener('DOMContentLoaded', function () {
  const btnSide = document.querySelector('.btn-side');
  const sidebar = document.querySelector('.sidebar');
  const searchButtons = document.querySelectorAll('#searchBtn');
  const searchOverlay = document.getElementById('searchOverlay');
  const closeSearch = document.getElementById('closeSearch');
  const searchInput = document.getElementById('searchInput');
  const searchForm = document.getElementById('searchForm');
  const resultContainer = document.getElementById('searchResults');

  // Sidebar toggle
  if (btnSide && sidebar) {
    btnSide.addEventListener('click', function () {
      sidebar.classList.toggle('active');
      btnSide.classList.toggle('active');
    });
  }

  // Arama butonları için tıklama
  searchButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      // Mobil menüyü gizle
      if (sidebar) sidebar.classList.remove('active');
      if (btnSide) btnSide.classList.remove('active');

      // Search overlay'i göster
      searchOverlay.style.display = 'flex';
      setTimeout(() => searchInput.focus(), 100);
    });
  });

  // Search kapama
  if (closeSearch) {
    closeSearch.addEventListener('click', function () {
      searchOverlay.style.display = 'none';
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      searchOverlay.style.display = 'none';
    }
  });

  if (searchForm) {
    searchForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const query = searchInput.value.trim().toLowerCase();
      if (!query) return;

      resultContainer.innerHTML = '<p>🔍 Aranıyor...</p>';
      searchOverlay.style.display = 'flex';

      fetch('list-html-files.php')
        .then(res => res.json())
        .then(sitePages => {
          searchInPages(sitePages, query, resultContainer);
        });
    });
  }
});

function searchInPages(sitePages, query, resultContainer) {
  let foundResults = [];
  let completed = 0;

  sitePages.forEach(page => {
    fetch(page)
      .then(res => {
        if (!res.ok) throw new Error(`Sayfa yüklenemedi: ${page}`);
        return res.text();
      })
      .then(html => {
        const plainText = html.replace(/<[^>]*>?/gm, '').toLowerCase();
        if (plainText.includes(query)) {
          const titleMatch = html.match(/<title>(.*?)<\/title>/i);
          let displayTitle = titleMatch?.[1] || page.split('/').pop().replace('.html', '');
          foundResults.push(`<li><a href="${page}" target="_blank">${displayTitle}</a></li>`);
        }
      })
      .catch(err => {
        console.warn(err.message);
      })
	  
      .finally(() => {
  completed++;
  if (completed === sitePages.length) {
    resultContainer.style.display = 'block';

    const lang = document.documentElement.lang || 'tr'; // varsayılan: tr
    const noResultText = lang === 'en' 
      ? '🚫 No results found.' 
      : '🚫 Hiçbir sonuç bulunamadı.';

    resultContainer.innerHTML = foundResults.length > 0
      ? `<ul style="padding-left: 1rem;">${foundResults.join('')}</ul>`
      : `<p>${noResultText}</p>`;
  }
});
  });
}
