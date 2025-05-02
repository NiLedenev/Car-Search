const burger = document.querySelector(".site-header__hamburger");
const menu = document.querySelector(".site-header__mobile-nav");
burger.addEventListener("click", () => {
    burger.classList.toggle("is-active");
    menu.classList.toggle("is-active");
})
document.addEventListener('DOMContentLoaded', function () {
    // Smooth scroll for internal links
    document.querySelectorAll('a.scroll-link[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetID = this.getAttribute('href').substring(1);
            const targetEl = document.getElementById(targetID);

            if (targetEl) {
                const yOffset = -150; // змінюй якщо хочеш відступ від верху
                const y = targetEl.getBoundingClientRect().top + window.pageYOffset + yOffset;
                menu.classList.remove("is-active");
                burger.classList.remove("is-active");
                window.scrollTo({
                    top: y,
                    behavior: 'smooth'
                });
            }
        });
    });


    // GSAP and ScrollTrigger for text animation
    gsap.registerPlugin(ScrollTrigger);


    const textMultipleElements = document.querySelector(".about__title");

    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: textMultipleElements,
            start: "top 40%",
            end: "bottom 20%",
            scrub: 2,
        }
    });

    const trimElement = (textElement) => {
        let combinedText = "";

        textElement.childNodes.forEach(child => {
            if (child.nodeType === Node.TEXT_NODE) {
                combinedText += child.textContent.trim();
            } else if (child.nodeType === Node.ELEMENT_NODE) {
                combinedText += child.textContent.trim();
            }
        });

        const splitText = combinedText.split("").map(char => `<span>${char}</span>`).join("");

        textElement.innerHTML = splitText;

        const chars = textElement.querySelectorAll("span");

        tl.from(chars, {
            color: 'rgba(255, 255, 255, 0.4)',
            stagger: 1,
            duration: 5,
        }, "+=0.5");
    }

    trimElement(document.querySelector(".about__title"));
    trimElement(document.querySelector(".about__title-1"));
    trimElement(document.querySelector(".about__title-2"));
    trimElement(document.querySelector(".about__text-orange"));
    trimElement(document.querySelector(".about__text-1"));
    trimElement(document.querySelector(".about__text-2"));

    // Slider initialization
    new Splide('.splide', {
        type: 'loop',
        perPage: 2,
        pagination: false,
        gap: 40,
        breakpoints: {
            640: {
                perPage: 1,
                gap: 10,
                padding: {
                    bottom: 80,
                },
            },
            1024: {
                perPage: 2,
                gap: 10,
            },
        }
    }).mount();


    // FAQ accordion functionality
    document.querySelectorAll('.faq__item').forEach(item => {
        const title = item.querySelector('.faq__question-title');
        const answer = item.querySelector('.faq__answer');

        // Початково ховаємо
        answer.style.maxHeight = '0px';

        title.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Закриваємо всі інші — якщо хочеш кілька відкритих, цей блок можна закоментити
            document.querySelectorAll('.faq__item.active').forEach(openItem => {
                if (openItem !== item) {
                    openItem.classList.remove('active');
                    const openAnswer = openItem.querySelector('.faq__answer');
                    openAnswer.style.maxHeight = '0px';
                }
            });

            // Перемикаємо поточний
            if (isActive) {
                item.classList.remove('active');
                answer.style.maxHeight = '0px';
            } else {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });


});