// Carousel
(() => {
    class Carousel {
        constructor({
            main,
            wrap,
            prev,
            next,
            slidesToShow = 3,
            position = 0,
            infinity = false,
            responsive = []
        }) {
            if (!document.querySelector(wrap)) {
                return;
            }
            // элементы:
            this.main = document.querySelector(main);
            this.wrap = document.querySelector(wrap);
            this.slides = this.wrap.children;
            this.prev = document.querySelector(prev);
            this.next = document.querySelector(next);
            // опции:
            this.slidesToShow = slidesToShow;
            this.slideWidth = Math.floor(100 / this.slidesToShow);
            this.maxPosition = this.slides.length - this.slidesToShow;
            this.position = position;
            this.infinity = infinity;
            this.responsive = responsive;
        }
        
        init() {
            if (!this.slides) {
                return;
            }
            this.addStyleClass();
            this.addStyle();
            this.controlSlider();
            if (this.responsive) {
            this.responseInit();
            }
        }
        
        addStyleClass() {
            this.main.classList.add('slider-carousel');
            this.wrap.classList.add('slider-carousel_wrap');
            for (const item of this.slides) {
            item.classList.add('slider-carousel_item');
            }
        }
        
        addStyle() {
            let style = document.getElementById('carousel-style');
            
            if (!style) {
            style = document.createElement('style');
            style.id = 'carousel-style';
            }
            style.textContent = `
            .slider-carousel {
                overflow: hidden;
                position: relative;
            }
            .slider-carousel_wrap {
                display: flex;
                transition: transform 0.5s;
                will-change: transform;
            }
            .slider-carousel_item {
                display: flex;
                flex-direction: column;
                max-width: 100%;
            }
            `;
            document.head.append(style);
        
            for (const item of this.slides) {
                item.style.flex = `0 0 ${this.slideWidth + 0.5}%`;
            }
        }
        
        prevSlide() {
            if (this.infinity || this.position > 0) {
            --this.position;
            if (this.position < 0) {
                this.position = this.maxPosition;
            }
            this.wrap.style.transform = `translateX(-${this.position * this.slideWidth}%)`;
            }
        }
        
        nextSlide() {
            if (this.infinity || this.position < this.maxPosition) {
            ++this.position;
            if (this.position > this.maxPosition) {
                this.position = 0;
            }
            this.wrap.style.transform = `translateX(-${this.position * this.slideWidth}%)`;
            }
        }
        
        controlSlider() {
            this.prev.addEventListener('click', this.prevSlide.bind(this));
            this.next.addEventListener('click', this.nextSlide.bind(this));
        }
        
        responseInit() {
            const slidesToShowDefault = this.slidesToShow,
                allResponse = this.responsive.map(item => item.breakpoint),
                maxResponse = Math.max(...allResponse);
        
            const renderResponse = slToShow => {
            this.slideWidth = Math.floor(100 / slToShow);
            this.addStyle();
            this.maxPosition = this.slides.length - slToShow;
            };
        
            const checkResponse = () => {
            const widthWindow = document.documentElement.clientWidth;
        
            if (widthWindow < maxResponse) {
                for (let i = 0; i < allResponse.length; i++) {
                if (widthWindow < allResponse[i]) {
                    this.slidesToShow = this.responsive[i].slidesToShow;
                    renderResponse(this.slidesToShow);
                }
                }
            } else {
                this.slidesToShow = slidesToShowDefault;
                renderResponse(this.slidesToShow);
            }
            };
        
            checkResponse();
            window.addEventListener('resize', checkResponse);
        }
    }
    
    const carouselBenefits = new Carousel({
        main: '.section_feedback-slider',
        wrap: '.section_feedback-slider__wrapper',
        prev: '.slider_news__arrow_left',
        next: '.slider_news__arrow_right',
        slidesToShow: 3,
        infinity: true,
        responsive: [
            {
            breakpoint: 576,
            slidesToShow: 1
            }
        ]
    });
    
    carouselBenefits.init();
    
    const carouselBenefits1 = new Carousel({
        main: '.slider_news',
        wrap: '.slider_news__wrapper',
        prev: '.slider_news__arrow_left',
        next: '.slider_news__arrow_right',
        slidesToShow: 3,
        infinity: true,
        responsive: [
            {
            breakpoint: 576,
            slidesToShow: 1
            }
        ]
    });
    
    carouselBenefits1.init();
})();

// Кнопка "читать далее"
(() => {
    const sliderItem = document.querySelectorAll('.slider_news__item')

    sliderItem.forEach(item => {
        item.addEventListener('click', (e) => {
            let target = e.target;

            if (!target.classList.contains('slider_news__read-more_open') && 
                !target.classList.contains('slider_news__read-more_close')) {
                return;
            }

            const openButton = item.querySelector('.slider_news__read-more_open');
            const itemContent = item.querySelector('.slider_news__item-content')

            if (target.classList.contains('slider_news__read-more_open')) {
                openButton.style.display = 'none';
                itemContent.classList.add('slider_news__item-content_open')
            } else if (target.classList.contains('slider_news__read-more_close')) {
                openButton.style.display = 'block';
                itemContent.classList.remove('slider_news__item-content_open')
            }
        });
    });
})();