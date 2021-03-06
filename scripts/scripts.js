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
                    justify-content: center;
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
    
    const carousel = new Carousel({
        main: '.section_feedback_about-us-slider',
        wrap: '.section_feedback_about-us-slider__wrapper',
        prev: '.section_feedback_about-us-slider ~ .slider_news__arrow_left',
        next: '.section_feedback_about-us-slider ~ .slider_news__arrow_right',
        slidesToShow: 3,
        infinity: true,
        responsive: [
            {
            breakpoint: 1290,
            slidesToShow: 2
            },
            {
            breakpoint: 900,
            slidesToShow: 1
            }
        ]
    });
    
    carousel.init();
    
    const carousel1 = new Carousel({
        main: '.slider_news',
        wrap: '.slider_news__wrapper',
        prev: '.slider_news__arrow_left',
        next: '.slider_news__arrow_right',
        slidesToShow: 3,
        infinity: true,
        responsive: [
            {
            breakpoint: 1290,
            slidesToShow: 2
            },
            {
            breakpoint: 900,
            slidesToShow: 1
            }
        ]
    });
    
    carousel1.init();

    const carousel2 = new Carousel({
        main: '.section_feedback_product-slider',
        wrap: '.section_feedback_product-slider__wrapper',
        prev: '.section_feedback_product-slider ~ .slider_news__arrow_left',
        next: '.section_feedback_product-slider ~ .slider_news__arrow_right',
        slidesToShow: 3,
        infinity: true,
        responsive: [
            {
            breakpoint: 1250,
            slidesToShow: 2
            },
            {
            breakpoint: 900,
            slidesToShow: 1
            }
        ]
    });
    
    carousel2.init();

    const carousel3 = new Carousel({
        main: '.section_feedback_question-slider',
        wrap: '.section_feedback_question-slider__wrapper',
        prev: '.section_feedback_question-slider ~ .slider_news__arrow_left',
        next: '.section_feedback_question-slider ~ .slider_news__arrow_right',
        slidesToShow: 3,
        infinity: true,
        responsive: [
            {
            breakpoint: 1250,
            slidesToShow: 2
            },
            {
            breakpoint: 900,
            slidesToShow: 1
            }
        ]
    });
    
    carousel3.init();

    const carousel4 = new Carousel({
        main: '.section_feedback-slider',
        wrap: '.section_feedback-slider__wrapper',
        prev: '.section_feedback-slider ~ .slider_news__arrow_left',
        next: '.section_feedback-slider ~ .slider_news__arrow_right',
        slidesToShow: 3,
        infinity: true,
        responsive: [
            {
            breakpoint: 1290,
            slidesToShow: 2
            },
            {
            breakpoint: 900,
            slidesToShow: 1
            }

        ]
    });
    
    carousel4.init();
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

// Табы
(() => {
    if (!document.querySelector('.section_tabs__tabs-list')) {
        return;
    }

    const tabHeader = document.querySelector('.section_tabs__tabs-list'),
          tab = tabHeader.querySelectorAll('.section_tabs__tabs-item'),
          tabContent = document.querySelectorAll('.section_tabs__tabs-item-value');

    const toggleTabContent = index => {
        for (let i = 0; i < tabContent.length; i++) {
            if (index === i) {
                tab[i].classList.add('section_tabs__tabs-item_active');
                tabContent[i].classList.remove('section_tabs__tabs-item-value_d-none');
            } else {
                tab[i].classList.remove('section_tabs__tabs-item_active');
                tabContent[i].classList.add('section_tabs__tabs-item-value_d-none');
            }
        }
    };
    toggleTabContent(0);
    tabHeader.addEventListener('click', event => {
        let target = event.target;
        target = target.closest('.section_tabs__tabs-item');
        if (target) {
            tab.forEach((item, i) => {
                if (item === target) {
                    toggleTabContent(i);
                }
            });
        }
    });
})();

// Функционал каталога (кнопка "показать еще" и категории товаров)
(() => {
    class ShowMore {
        constructor({
            wrap,
            button,
            countShownItem = 3,
            hiddenElementSelector = '.hidden-item'
        }) {
            if (!document.querySelector(wrap)) {
                return;
            }

            this.wrap = document.querySelector(wrap);
            this.button = document.querySelector(button);
            this.countShownItem = countShownItem;
            this.hiddenElementSelector = hiddenElementSelector;
        }

        showItem(item) {
            if (!item) {
                return
            }
            item.classList.remove(this.hiddenElementSelector.slice(1));
        }

        showItems() {
            for (let i = 0; i < this.countShownItem; i++) {
                this.showItem(this.wrap.querySelector(this.hiddenElementSelector));
            }

            if (!this.wrap.querySelector(this.hiddenElementSelector)) {
                this.button.parentNode.classList.add('hidden-item');
            } else {
                this.button.parentNode.classList.remove('hidden-item');
            }
        }

        init() {
            if (!this.wrap) {
                return;
            }
            this.showItems();
            this.button.addEventListener('click', this.showItems.bind(this));
        }
    }

    class Categorys {
        constructor({
            section,
            catalog,
            catalogNav,
            catalogNavItems,
            catalogItems,
            activeClassName
        }) {
            if (!document.querySelector(section)) {
                return;
            }

            this.section = document.querySelector(section);
            this.catalog = this.section.querySelector(catalog);
            this.catalogNav = this.section.querySelector(catalogNav);
            this.catalogNavItems = this.section.querySelectorAll(catalogNavItems)
            this.catalogItems = this.section.querySelectorAll(catalogItems);
            this.activeClassName = activeClassName;
            this.hideElementText = document.querySelector('.empty-list-text');
        }

        removeChildren(parent) {
            while (parent.firstChild) {
                parent.removeChild(parent.firstChild);
            }
        }

        updateChildren(parent, children) {
            this.removeChildren(parent);

            children.forEach(child => {
                parent.appendChild(child);
                child.classList.add('hidden-item');
            })

            catalogButton.showItems();
        }

        filter(e) {
            let target = e.target,
                item = target.closest(`.${this.catalogNavItems[0].classList[0]}`);

            if (!item || item.classList.contains(this.activeClassName)) {
                return;
            }

            e.preventDefault();
            let filterValue = item.getAttribute('data-filter'),
                previousBtnActive = this.catalogNav.querySelector(`.${this.catalogNavItems[0].classList[0]}.${this.activeClassName}`),
                hiddenElements = this.section.querySelectorAll('.hidden-item');

            previousBtnActive.classList.remove(this.activeClassName);
            item.classList.add(this.activeClassName);

            if (filterValue === 'all') {
                this.updateChildren(this.catalog, this.catalogItems);
                return;
            }

            let filteredItems = [];
            filteredItems = [...this.catalogItems].filter(item => {
                return item.getAttribute('data-category').includes(filterValue)
            });

            if (hiddenElements === 0) {
                this.section.querySelector('.catalog-btn-show-more').parentNode.classList.add('hidden-item');
            } else if (hiddenElements !== 0) {
                this.section.querySelector('.catalog-btn-show-more').parentNode.classList.remove('hidden-item');
            } 
            
            if (!filteredItems.length) {
                this.hideElementText.style.display = 'block';
            } else {
                this.hideElementText.style.display = 'none';
            }

            this.updateChildren(this.catalog, filteredItems);
        }

        init() {
            if (!this.catalogNav) {
                return
            }
            this.catalogNav.addEventListener('click', {handleEvent: this.filter.bind(this)});
        }
    }

    const catalogButton = new ShowMore({
        wrap: '.stocks__catalog',
        button: '.catalog-btn-show-more',
        countShownItem: 6
    });

    catalogButton.init();

    const newsButton = new ShowMore({
        wrap: '.section_news-page__wrapper',
        button: '.section_news-page .catalog-btn-show-more',
    })

    newsButton.init();

    const stocksCatalog = new Categorys({
        section: '.section_stocks',
        catalog: '.stocks__catalog',
        catalogNav: '.stocks__categories',
        catalogNavItems: '.stocks__categories-item',
        catalogItems: '.stocks__catalog-item',
        activeClassName: 'stocks__categories-item_active'
    });

    stocksCatalog.init();

    const mainCatalog = new Categorys({
        section: '.section_catalog',
        catalog: '.stocks__catalog',
        catalogNav: '.section_catalog__aside',
        catalogNavItems: '.section_catalog__aside-item',
        catalogItems: '.stocks__catalog-item',
        activeClassName: 'section_catalog__aside-item_active'
    });

    mainCatalog.init();
})();

// Слайдер с пагинацией
(() => {
    class Slider {
        constructor({
            wrapper,
            dotsWrapper,
            dotItem,
            activeClassName
        }) {
            if (!document.querySelector(wrapper)) {
                return;
            }
            this.wrapper = document.querySelector(wrapper);
            this.dotsWrapper = this.wrapper.querySelector(dotsWrapper);
            this.dotItem = this.dotsWrapper.querySelectorAll(dotItem);
            this.activeClassName = activeClassName;
        }

        changeSlide(e) {
            let target = e.target,
                item = target.closest(`.${this.dotItem[0].classList[0]}`);

            if (!item || e.target.classList.contains(this.activeClassName)) {
                return;
            }

            let previosSlideActive = this.dotsWrapper.querySelector(`.${this.activeClassName}`),
                newBgImage = item.getAttribute('data-image-bg');

            previosSlideActive.classList.remove(this.activeClassName);
            item.classList.add(this.activeClassName);

            this.wrapper.style.backgroundImage = `url(${newBgImage})`;
        }

        init() {
            if (!this.wrapper) {
                return
            }
            this.dotsWrapper.addEventListener('click', {handleEvent: this.changeSlide.bind(this)})
        }
    }

    const productSlider = new Slider({
        wrapper: '.product__image-wrapper',
        dotsWrapper: '.mini-images',
        dotItem: '.mini-images__item',
        activeClassName: 'mini-images__item_active'
    });

    productSlider.init();
})();

// Сортировка в каталоге
(() => {
    const sectionCatalog = document.querySelector('.section_catalog');

    if (!sectionCatalog) {
        return;
    }

    const catalog = document.querySelector('.stocks__catalog');

    function insertAfter(elem, refElem) {
        return refElem.parentNode.insertBefore(elem, refElem.nextSibling);
    }

    const sort = (sortBy, direction) => {
        for (let i = 0; i < catalog.children.length; i++) {
            for (let j = i; j < catalog.children.length; j++) {
                let first = +catalog.children[i].getAttribute(`data-${sortBy}`);
                let second = +catalog.children[j].getAttribute(`data-${sortBy}`);
                
                if (direction === 'asc') {
                    if (first > second) {
                        let replaceNode = catalog.replaceChild(catalog.children[j], catalog.children[i]);
                        insertAfter(replaceNode, catalog.children[i]);
                    }
                } else if (direction === 'desc') {
                    if (first < second) {
                        let replaceNode = catalog.replaceChild(catalog.children[j], catalog.children[i]);
                        insertAfter(replaceNode, catalog.children[i]);
                    }
                }
            }
        }
    };

    const sortAlphabet = (direction) => {
        for (let i = 0; i < catalog.children.length; i++) {
            for (let j = i; j < catalog.children.length; j++) {
                let first = catalog.children[i].querySelector('.product__name');
                let second = catalog.children[j].querySelector('.product__name');

                if (direction === 'asc') {
                    if (first.textContent[0] > second.textContent[0]) {
                        let replaceNode = catalog.replaceChild(catalog.children[j], catalog.children[i]);
                        insertAfter(replaceNode, catalog.children[i]);
                    }
                } else if (direction === 'desc') {
                    if (first.textContent[0] < second.textContent[0]) {
                        let replaceNode = catalog.replaceChild(catalog.children[j], catalog.children[i]);
                        insertAfter(replaceNode, catalog.children[i]);
                    }
                }
                
            }
        }
    };

    const clickHandler = (e) => {
        let item = e.target.closest('.section_catalog__sort-item');

        if (!item || e.target.classList.contains(this.activeClassName)) {
            return
        }

        let previousActiveButton = sectionCatalog.querySelector('.section_catalog__sort-item_active');

        previousActiveButton.classList.remove('section_catalog__sort-item_active');
        item.classList.add('section_catalog__sort-item_active');

        let sortBy = item.getAttribute('data-sort');
        let direction = item.getAttribute('data-direction');

        if (sortBy === 'alphabet') {
            sortAlphabet(direction);
        } else {
            sort(sortBy, direction);
        }

        item.getAttribute('data-direction') === 'asc' 
            ? item.setAttribute('data-direction', 'desc') 
            : item.setAttribute('data-direction', 'asc')
    }
    
    document.querySelector('.section_catalog__sort').addEventListener('click', clickHandler);
})();

// Бургер меню
(() => {
    const burgerMenu = document.querySelector('.burger-menu');

    document.body.addEventListener('click', (e) => {
        if (burgerMenu.classList.contains('active') && !e.target.classList.contains('burger-btn')) {
            burgerMenu.classList.remove('active');
        }

        if (e.target.classList.contains('burger-btn')) {
            burgerMenu.classList.toggle('active');
        } else {
            return;
        }
    });
})();

// Функционал Квиза
(() => {
    let modalItemBtn = document.querySelectorAll('[data-trigger-modal]');

    if (!modalItemBtn) {
        return;
    }

    let modal = document.querySelectorAll('.modal');
    let modalContent = document.querySelector('.quiz__modal-wrapper');
    let closeMode = document.querySelectorAll('[data-close]');
    let targetBtn;

    function openModal() {
        modalItemBtn.forEach(element => {
            element.addEventListener('click', function(e) {
                targetBtn = element.getAttribute('data-label-modal');
                modal.forEach(element => {
                    let modalId = element.id;
                    element.style.display = 'none';

                    if (targetBtn === modalId) {
                        element.style.display = 'block';

                        modalContent.style.display = 'flex';
                    }
                });

                if (element.classList.contains('btn_quiz')) {
                    element.style.display = 'none';
                }
            });
        });
    }

    openModal();

    closeMode.forEach(item => {
        item.addEventListener('click', function (e) {
            if (e.target.closest('.modal') && !e.target.getAttribute('data-close')) {
                return;
            }
            
            modal.forEach(element => {
                element.style.display = 'none';
                modalContent.style.display = 'none';
            });
        })
    });

    let quiz_form = document.querySelector('.quiz__form');

    if (!quiz_form) {
        return;
    }

    let prevBtn = quiz_form.querySelector('.btnPrev');
    let nextBtn = quiz_form.querySelector('.btnNext');
    let quizAll = quiz_form.querySelectorAll('.quiz__block');
    let currentQ = quiz_form.querySelector('.current-block');
    let count = 0;

    removeBtn();

    quiz_form.querySelector('.all-blocks').textContent = `${quizAll.length}`;

    nextBtn.addEventListener('click', function () {
        currentQ.textContent++;
        count++
        initQuiz();
        removeBtn();
    })

    prevBtn.addEventListener('click', function () {
        count--
        currentQ.textContent--;
        initQuiz();
        removeBtn();
    })

    function initQuiz() {
        quizAll.forEach((element, i) => {
            element.classList.remove('active')
            if (i === count) {
                element.classList.add('active')
            }
        })
    }

    function removeBtn() {
        if (count === 0) {
            prevBtn.style.display = 'none'
        } else if (count !== 0) {
            prevBtn.style.display = 'inline-flex'
        }
        if (count === quizAll.length - 1) {
            nextBtn.style.display = 'none'
        } else if (count !== quizAll.length) {
            nextBtn.style.display = 'flex'
        }
    }
})();

// Корзина
(() => {
    const cartDOMElement = document.querySelector('.section_stocks')
                        || document.querySelector('.section_reccomendation__products')
                        || document.querySelector('.stocks__catalog') 
                        || document.querySelector('.cart__products-list');

    if (!cartDOMElement) {
        return;
    }

    let cart = JSON.parse(localStorage.getItem('cart')) || {};

    const cartTotalPriceDOMElement = document.querySelector('.order__total');
    const cartTotalProductPriceDOMElement = document.querySelector('.order__waste-value_products')
    const cartTotalPriceInputDOMElement = document.querySelector('.js-cart-total-price-input');
    const cartWrapperDOMElement = document.querySelector('.section_cart__left-side');

    const renderCartItem = ({ name, src, price, weight, quantity, count, label }) => {
        if (!cartDOMElement.classList.contains('cart__products-list')) {
            return
        }

        const cartItemDOMElement = document.createElement('div');

        const labelWrap = label ? `<div class="image-wrapper__label">${label}</div>` : ''

        const cartItemTemplate = `
            <div class="order-item__image-wrapper">
                ${labelWrap}
                <img src=".${src}" alt="product image">
            </div>
            <h3 class="order__name">
                ${name}
            </h3>
            <div class="order__pieces">
                <button class="btn btn__minus">-</button>
                <input type="text" readonly class="order__pieces-input" value="${weight}">
                <button class="btn btn__plus">+</button>
            </div>
            <div class="order__price">
                <span class="order__price-sum">${price * count}</span>
                <span class="currency">₽</span>
            </div>
            <button class="close-button"></button>
        `;

        cartItemDOMElement.innerHTML = cartItemTemplate;

        cartDOMElement.appendChild(cartItemDOMElement);
        cartItemDOMElement.classList.add('order-item');
        cartItemDOMElement.setAttribute('data-product-cart-name', name);
    }

    const saveCart = () => {
        localStorage.setItem('cart', JSON.stringify(cart));
    };

    const updateCartTotalPrice = () => {
        const names = Object.keys(cart);
        let totalPrice = 0;

        for (let i = 0; i < names.length; i++) {
            const name = names[i];
            totalPrice += cart[name].price * cart[name].count;
        }

        if (cartTotalPriceDOMElement) {
            cartTotalPriceDOMElement.textContent = totalPrice;
        }

        if (cartTotalProductPriceDOMElement) {
            cartTotalProductPriceDOMElement.textContent = totalPrice;
        }

        if (cartTotalPriceInputDOMElement) {
            cartTotalPriceInputDOMElement.value  = totalPrice;
        }

        return totalPrice;
    }

    const deleteCartItem = (name) => {
        const cartItemDOMElement = cartDOMElement.querySelector(`[data-product-cart-name="${name}"`);
        cartDOMElement.removeChild(cartItemDOMElement);
        delete cart[name];

        updateCart();
    }

    const updateCart = () => {
        const totalPrice = updateCartTotalPrice();
        saveCart();
        document.querySelector('.cart-product-count').textContent = Object.keys(cart).length;

        if (!cartWrapperDOMElement) {
            return;
        }

        if (totalPrice === 0) {
            cartWrapperDOMElement.classList.add('is-empty');
        } else {
            cartWrapperDOMElement.classList.remove('is-empty');
        }
    };

    const addCartItem = (data) => {
        const { name } = data;
        cart[name] = data;

        updateCart();
        renderCartItem(data);
    };

    const updateQuantity = (name, quantity) => {
        const cartItemDOMElement = cartDOMElement.querySelector(`[data-product-cart-name="${name}"`);
        const cartItemsCounterDOMElement = cartItemDOMElement.querySelector('.order__pieces-input');
        const cartItemPriceDOMElement = cartItemDOMElement.querySelector('.order__price-sum');

        cart[name].weight = `${+quantity} ${cart[name].weight.replace(/[\d.]/g, '').trim()}`;

        cartItemsCounterDOMElement.value = cart[name].weight;
        cartItemPriceDOMElement.textContent = +(cart[name].count * cart[name].price).toFixed(2);

        updateCart();
    }

    const increaseQuantity = (name) => {
        const newQuantity = +cart[name].weight.replace(/[^\d.]/g, '') + cart[name].quantity;
        cart[name].count++;

        updateQuantity(name, newQuantity.toFixed(2));
    }

    const decreaseQuantity = (name) => {
        const newQuantity = +cart[name].weight.replace(/[^\d.]/g, '') - cart[name].quantity;

        if (cart[name].count >= 1 && newQuantity > 0) {
            cart[name].count--;

            updateQuantity(name, newQuantity.toFixed(2));
        }
    }

    const getProductData = (productDOMElement) => {
        const name = productDOMElement.getAttribute('data-product-name');
        const price = productDOMElement.getAttribute('data-product-price');
        const src = productDOMElement.getAttribute('data-product-img');
        const weight = productDOMElement.getAttribute('data-product-weight');
        const label = productDOMElement.getAttribute('data-product-label');
        const quantity = +productDOMElement.getAttribute('data-product-weight').replace(/[^\d.]/g, '');
        const count = 1;

        return { name, price, src, weight, quantity, count, label }
    }

    const renderCart = () => {
        const names = Object.keys(cart);

        names.forEach((name) => {
            renderCartItem(cart[name]);
        })
    }

    const changeButton = (target) => {
        target.disabled = 'true';
        target.classList.add('active');
        target.textContent = 'В корзине';
    };

    const cartInit = () => {
        renderCart();
        updateCart();

        document.body.addEventListener('click', (e) => {

            const target = e.target;

            if (target.classList.contains('product__cart-button')) {
                e.preventDefault();

                changeButton(target);
                
                const productDOMElement = target.closest('.stocks__catalog-item');
                const data = getProductData(productDOMElement);

                cart = JSON.parse(localStorage.getItem('cart')) || {};
                addCartItem(data);
            }

            if (target.classList.contains('close-button')) {
                e.preventDefault();

                const cartItemDOMElement = target.closest('.order-item');
                const productName = cartItemDOMElement.getAttribute('data-product-cart-name');

                deleteCartItem(productName);
            }

            if (target.classList.contains('btn__plus')) {
                e.preventDefault();

                const cartItemDOMElement = target.closest('.order-item');
                const productName = cartItemDOMElement.getAttribute('data-product-cart-name');

                increaseQuantity(productName);
            }

            if (target.classList.contains('btn__minus')) {
                e.preventDefault();

                const cartItemDOMElement = target.closest('.order-item');
                const productName = cartItemDOMElement.getAttribute('data-product-cart-name');

                decreaseQuantity(productName);
            }
            
        });
    };

    cartInit();
})();

// Отправка форм
(() => {
    const popups = document.querySelectorAll('.modal');

    let serialize = (form) => {
        let items = form.querySelectorAll('input, select, textarea'),
            str = '';

        items.forEach((item, i) => {
            let name = item.name,
                value = item.value,
                separator = i === 0 ? '' : '&';
            if (value) {
                str += separator + name + '=' + value;
            }
        });

        return str;
    };

    let formSend = (form) => {
        let data = serialize(form),
            xhr = new XMLHttpRequest(),
            url = './mail/mail.php';
        
        xhr.open('POST', url);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        
        xhr.onload = () => {
            setTimeout( () => {
                popups.forEach(popup => {
                    popup.style.display = 'none';
                    popup.parentNode.style.display = 'none';
                })
            }, 5000)
            
            form.reset();
        };

        xhr.send(data);
    };

    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            formSend(form);
        });
    });
})();

// FTP
// Логин: sinits7i_seafood
// Пароль: ZqP*t6QY