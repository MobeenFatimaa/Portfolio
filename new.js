/* =========================================================
   Mobeen Fatima Portfolio — Vanilla JavaScript
   No React / no JSX / no React runtime.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    const root = document.documentElement;
    const body = document.body;


    /* =========================================================
       2. MOBILE NAVIGATION
       ========================================================= */

    const mobileMenu = document.getElementById("mobile-menu");
    const navLinks = document.querySelector(".nav-links");

    if (mobileMenu) {
        mobileMenu.addEventListener("click", () => {
            if (navLinks) {
                navLinks.classList.toggle("mobile-open");
            }

            mobileMenu.classList.toggle("is-open");
        });
    }

    if (navLinks) {
        navLinks.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("mobile-open");
                mobileMenu?.classList.remove("is-open");
            });
        });
    }


    /* =========================================================
       3. TYPEWRITER EFFECT
       ========================================================= */

    const typewriterElement =
        document.getElementById("typewriter");

    const words = [
        "actionable web apps.",
        "predictive ML pipelines.",
        "interactive platforms.",
        "data-driven solutions."
    ];

    if (typewriterElement) {

        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function typeWriter() {

            const currentWord = words[wordIndex];

            if (isDeleting) {

                typewriterElement.textContent =
                    currentWord.substring(0, charIndex - 1);

                charIndex--;

            } else {

                typewriterElement.textContent =
                    currentWord.substring(0, charIndex + 1);

                charIndex++;
            }

            let typeSpeed = isDeleting ? 40 : 80;

            if (
                !isDeleting &&
                charIndex === currentWord.length
            ) {

                typeSpeed = 1800;
                isDeleting = true;

            } else if (
                isDeleting &&
                charIndex === 0
            ) {

                isDeleting = false;

                wordIndex =
                    (wordIndex + 1) % words.length;

                typeSpeed = 500;
            }

            setTimeout(typeWriter, typeSpeed);
        }

        typeWriter();
    }


    /* =========================================================
       4. INTERACTIVE PARTICLE NETWORK BACKGROUND
       ========================================================= */

    const canvas =
        document.getElementById("bg-canvas");

    if (canvas) {

        const ctx = canvas.getContext("2d");

        let width = 0;
        let height = 0;
        let particles = [];

        const mouse = {
            x: null,
            y: null,
            radius: 150
        };


        function getParticleColor() {

            const isLight =
                root.getAttribute("data-theme") === "light";

            return isLight
                ? "2, 132, 199"
                : "56, 189, 248";
        }


        function resizeCanvas() {

            width = canvas.width =
                window.innerWidth;

            height = canvas.height =
                window.innerHeight;

            const particleCount =
                Math.min(
                    140,
                    Math.floor(
                        (width * height) / 12000
                    )
                );

            particles = [];

            for (
                let i = 0;
                i < particleCount;
                i++
            ) {

                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,

                    size:
                        Math.random() * 2 + 1,

                    vx:
                        (Math.random() - 0.5) * 1.2,

                    vy:
                        (Math.random() - 0.5) * 1.2
                });
            }
        }


        window.addEventListener(
            "resize",
            resizeCanvas
        );


        window.addEventListener(
            "mousemove",
            (event) => {

                mouse.x = event.clientX;
                mouse.y = event.clientY;
            }
        );


        window.addEventListener(
            "mouseout",
            () => {

                mouse.x = null;
                mouse.y = null;
            }
        );


        function animateParticles() {

            ctx.clearRect(
                0,
                0,
                width,
                height
            );


            /* -------------------------
               Update + draw particles
               ------------------------- */

            particles.forEach((particle) => {

                particle.x += particle.vx;
                particle.y += particle.vy;


                /* Boundary bounce */

                if (
                    particle.x <= 0 ||
                    particle.x >= width
                ) {

                    particle.vx *= -1;
                }


                if (
                    particle.y <= 0 ||
                    particle.y >= height
                ) {

                    particle.vy *= -1;
                }


                /* Mouse interaction */

                if (
                    mouse.x !== null &&
                    mouse.y !== null
                ) {

                    const dx =
                        mouse.x - particle.x;

                    const dy =
                        mouse.y - particle.y;

                    const distance =
                        Math.hypot(dx, dy);


                    if (
                        distance < mouse.radius &&
                        distance > 0
                    ) {

                        const force =
                            (mouse.radius - distance) /
                            mouse.radius;

                        const angle =
                            Math.atan2(dy, dx);

                        particle.x -=
                            Math.cos(angle) *
                            force *
                            4;

                        particle.y -=
                            Math.sin(angle) *
                            force *
                            4;
                    }
                }


                /* Draw particle */

                ctx.beginPath();

                ctx.arc(
                    particle.x,
                    particle.y,
                    particle.size,
                    0,
                    Math.PI * 2
                );

                ctx.fillStyle =
                    `rgba(${getParticleColor()}, 0.7)`;

                ctx.fill();
            });


            /* -------------------------
               Connect particles
               ------------------------- */

            const maxDistance = 120;

            for (
                let a = 0;
                a < particles.length;
                a++
            ) {

                for (
                    let b = a + 1;
                    b < particles.length;
                    b++
                ) {

                    const dx =
                        particles[a].x -
                        particles[b].x;

                    const dy =
                        particles[a].y -
                        particles[b].y;

                    const distance =
                        Math.hypot(dx, dy);


                    if (
                        distance < maxDistance
                    ) {

                        const opacity =
                            1 -
                            distance /
                            maxDistance;


                        ctx.strokeStyle =
                            `rgba(${getParticleColor()}, ${opacity * 0.25})`;

                        ctx.lineWidth = 1;

                        ctx.beginPath();

                        ctx.moveTo(
                            particles[a].x,
                            particles[a].y
                        );

                        ctx.lineTo(
                            particles[b].x,
                            particles[b].y
                        );

                        ctx.stroke();
                    }
                }
            }


            requestAnimationFrame(
                animateParticles
            );
        }


        resizeCanvas();
        animateParticles();
    }


    /* =========================================================
       5. ABOUT SECTION PERSONA TABS
       ========================================================= */

    const personaButtons =
        document.querySelectorAll(
            ".persona-btn"
        );

    const personaPanels =
        document.querySelectorAll(
            ".persona-panel"
        );


    personaButtons.forEach((button) => {

        button.addEventListener(
            "click",
            () => {

                personaButtons.forEach((btn) => {
                    btn.classList.remove("active");
                });


                personaPanels.forEach((panel) => {
                    panel.classList.remove("active");
                });


                button.classList.add("active");


                const personaKey =
                    button.getAttribute(
                        "data-persona"
                    );


                const targetPanel =
                    document.getElementById(
                        `persona-${personaKey}`
                    );


                if (targetPanel) {
                    targetPanel.classList.add("active");
                }
            }
        );
    });


    /* =========================================================
       6. EXPERIENCE TAB SWITCHER
       ========================================================= */

    const experienceTabs =
        document.querySelectorAll(
            ".exp-tab"
        );

    const experiencePanels =
        document.querySelectorAll(
            ".exp-panel"
        );


    experienceTabs.forEach((tab) => {

        tab.addEventListener(
            "click",
            () => {

                experienceTabs.forEach((item) => {
                    item.classList.remove("active");
                });


                experiencePanels.forEach((panel) => {
                    panel.classList.remove("active");
                });


                tab.classList.add("active");


                const targetId =
                    tab.getAttribute(
                        "data-target"
                    );


                const targetPanel =
                    document.getElementById(
                        targetId
                    );


                if (targetPanel) {
                    targetPanel.classList.add("active");
                }
            }
        );
    });


    /* =========================================================
       7. SKILL CATEGORY FILTER
       ========================================================= */

    const skillButtons =
        document.querySelectorAll(
            ".skill-filter-btn"
        );

    const skillCards =
        document.querySelectorAll(
            ".skill-card"
        );


    window.filterCategory =
        function (category, button) {

            skillButtons.forEach((btn) => {
                btn.classList.remove("active");
            });


            if (button) {
                button.classList.add("active");
            }


            skillCards.forEach((card) => {

                const categories =
                    (
                        card.getAttribute(
                            "data-category"
                        ) || ""
                    ).split(/\s+/);


                const shouldShow =
                    category === "all" ||
                    categories.includes(category);


                card.classList.toggle(
                    "hidden",
                    !shouldShow
                );
            });
        };


    /* =========================================================
       8. LIVE SKILL SEARCH
       ========================================================= */

    const skillSearch =
        document.getElementById(
            "skillSearch"
        );


    window.filterSkills =
        function () {

            const query =
                (
                    skillSearch?.value || ""
                )
                .toLowerCase()
                .trim();


            /* Reset */

            if (!query) {

                document
                    .querySelectorAll(
                        ".skill-tag"
                    )
                    .forEach((tag) => {
                        tag.classList.remove(
                            "highlight"
                        );
                    });


                const activeButton =
                    document.querySelector(
                        ".skill-filter-btn.active"
                    ) ||
                    skillButtons[0];


                if (activeButton) {

                    const onclick =
                        activeButton.getAttribute(
                            "onclick"
                        ) || "";


                    const match =
                        onclick.match(
                            /'([^']+)'/
                        );


                    window.filterCategory(
                        match
                            ? match[1]
                            : "all",
                        activeButton
                    );
                }

                return;
            }


            /* Search all cards */

            skillCards.forEach((card) => {

                let cardHasMatch = false;


                const tags =
                    card.querySelectorAll(
                        ".skill-tag"
                    );


                tags.forEach((tag) => {

                    const text =
                        tag.textContent
                            .toLowerCase();


                    const isMatch =
                        text.includes(query);


                    tag.classList.toggle(
                        "highlight",
                        isMatch
                    );


                    if (isMatch) {
                        cardHasMatch = true;
                    }
                });


                card.classList.toggle(
                    "hidden",
                    !cardHasMatch
                );
            });
        };


/* =========================================================
   9. PROJECT CATEGORY FILTER
   ========================================================= */

const projectSection = document.getElementById("projects");

if (projectSection) {

    const projectFilterButtons =
        projectSection.querySelectorAll(
            ".project-filter"
        );

    const projectCards =
        projectSection.querySelectorAll(
            "[data-category]"
        );


    /* ---------------------------------------------------------
       FILTER PROJECTS
       --------------------------------------------------------- */

    function filterProjects(filterValue) {

        projectCards.forEach((card) => {

            const categories =
                (card.getAttribute("data-category") || "")
                    .toLowerCase()
                    .split(/\s+/)
                    .filter(Boolean);


            const shouldShow =
                filterValue === "all" ||
                categories.includes(
                    filterValue.toLowerCase()
                );


            /* Remove previous animation */

            card.classList.remove(
                "project-enter"
            );


            if (shouldShow) {

                card.classList.remove(
                    "project-hidden"
                );


                /*
                 * Restart animation
                 */

                requestAnimationFrame(() => {

                    requestAnimationFrame(() => {

                        card.classList.add(
                            "project-enter"
                        );

                    });

                });

            } else {

                card.classList.add(
                    "project-hidden"
                );

            }

        });

    }


    /* ---------------------------------------------------------
       BUTTON CLICK
       --------------------------------------------------------- */

    projectFilterButtons.forEach((button) => {

        button.addEventListener(
            "click",
            () => {

                /* -----------------------------------------
                   Remove active state from all buttons
                   ----------------------------------------- */

                projectFilterButtons.forEach((btn) => {

                    btn.classList.remove(
                        "bg-amber-500",
                        "text-slate-950"
                    );

                    btn.classList.add(
                        "bg-slate-900/80",
                        "text-slate-400"
                    );

                });


                /* -----------------------------------------
                   Add active state
                   ----------------------------------------- */

                button.classList.add(
                    "bg-amber-500",
                    "text-slate-950"
                );

                button.classList.remove(
                    "bg-slate-900/80",
                    "text-slate-400"
                );


                /* -----------------------------------------
                   Get selected category
                   ----------------------------------------- */

                const filterValue =
                    button.getAttribute(
                        "data-filter"
                    );


                /* -----------------------------------------
                   Filter cards
                   ----------------------------------------- */

                filterProjects(filterValue);

            }
        );

    });


    /* ---------------------------------------------------------
       INITIAL STATE
       --------------------------------------------------------- */

    filterProjects("all");

}

    /* =========================================================
       10. SCROLL REVEAL ANIMATION
       ========================================================= */

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );


    if (
        "IntersectionObserver" in window
    ) {

        const revealObserver =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "is-visible"
                                );


                                revealObserver.unobserve(
                                    entry.target
                                );
                            }
                        }
                    );
                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(
            (element) => {

                revealObserver.observe(
                    element
                );
            }
        );

    } else {

        revealElements.forEach(
            (element) => {

                element.classList.add(
                    "is-visible"
                );
            }
        );
    }


    /* =========================================================
       11. ACTIVE NAVIGATION ON SCROLL
       ========================================================= */

    const sections =
        document.querySelectorAll(
            "section[id]"
        );


    const navigationLinks =
        document.querySelectorAll(
            "nav a[href^='#']"
        );


    function updateActiveNavigation() {

        let currentSection = "";


        sections.forEach(
            (section) => {

                if (
                    window.scrollY >=
                    section.offsetTop - 140
                ) {

                    currentSection =
                        section.id;
                }
            }
        );


        navigationLinks.forEach(
            (link) => {

                const href =
                    link.getAttribute(
                        "href"
                    );


                link.classList.toggle(
                    "text-orange-400",
                    href ===
                    `#${currentSection}`
                );
            }
        );
    }


    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        {
            passive: true
        }
    );


    updateActiveNavigation();


    /* =========================================================
       12. SCROLL PROGRESS BAR
       ========================================================= */

    const scrollProgress =
        document.getElementById(
            "scroll-progress"
        );


    function updateScrollProgress() {

        if (!scrollProgress) {
            return;
        }


        const scrollHeight =
            document.documentElement
                .scrollHeight -
            window.innerHeight;


        const progress =
            scrollHeight > 0
                ? (
                    window.scrollY /
                    scrollHeight
                ) * 100
                : 0;


        scrollProgress.style.width =
            `${progress}%`;
    }


    window.addEventListener(
        "scroll",
        updateScrollProgress,
        {
            passive: true
        }
    );


    updateScrollProgress();


    /* =========================================================
       13. 3D CARD HOVER EFFECT
       ========================================================= */

    const interactiveCards =
        document.querySelectorAll(
            ".feature-card, " +
            ".journey-card, " +
            ".skill-card, " +
            "#projects [data-category]"
        );


    interactiveCards.forEach(
        (card) => {

            card.addEventListener(
                "mousemove",
                (event) => {

                    if (
                        window.matchMedia(
                            "(pointer: coarse)"
                        ).matches
                    ) {
                        return;
                    }


                    const rect =
                        card.getBoundingClientRect();


                    const x =
                        event.clientX -
                        rect.left;


                    const y =
                        event.clientY -
                        rect.top;


                    const rotateX =
                        (
                            y /
                            rect.height -
                            0.5
                        ) * -5;


                    const rotateY =
                        (
                            x /
                            rect.width -
                            0.5
                        ) * 5;


                    card.style.transform =
                        `
                        perspective(800px)
                        rotateX(${rotateX}deg)
                        rotateY(${rotateY}deg)
                        translateY(-3px)
                        `;
                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    card.style.transform = "";
                }
            );
        }
    );


    /* =========================================================
       14. CUSTOM CURSOR
       ========================================================= */

    const cursorRing =
        document.getElementById(
            "cursor-ring"
        );


    const cursorDot =
        document.getElementById(
            "cursor-dot"
        );


    if (
        cursorRing &&
        cursorDot &&
        window.matchMedia(
            "(pointer: fine)"
        ).matches
    ) {

        cursorRing.classList.remove(
            "hidden"
        );


        cursorDot.classList.remove(
            "hidden"
        );


        document.addEventListener(
            "mousemove",
            (event) => {

                cursorDot.style.transform =
                    `
                    translate(
                        ${event.clientX - 3}px,
                        ${event.clientY - 3}px
                    )
                    `;


                cursorRing.style.transform =
                    `
                    translate(
                        ${event.clientX - 16}px,
                        ${event.clientY - 16}px
                    )
                    `;
            }
        );
    }


    /* =========================================================
       15. MARQUEE HOVER PAUSE
       ========================================================= */

    const marquee =
        document.querySelector(
            ".animate-marquee"
        );


    if (marquee) {

        marquee.addEventListener(
            "mouseenter",
            () => {

                marquee.style.animationPlayState =
                    "paused";
            }
        );


        marquee.addEventListener(
            "mouseleave",
            () => {

                marquee.style.animationPlayState =
                    "running";
            }
        );
    }


    /* =========================================================
       16. SMOOTH SCROLL
       ========================================================= */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach((link) => {

        link.addEventListener(
            "click",
            (event) => {

                const targetId =
                    link.getAttribute(
                        "href"
                    );


                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) {
                    return;
                }


                event.preventDefault();


                const offset = 80;


                const targetPosition =
                    target.getBoundingClientRect()
                        .top +
                    window.scrollY -
                    offset;


                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });
            }
        );
    });





    /* =========================================================
       18. EXTERNAL LINKS
       ========================================================= */

    document
        .querySelectorAll(
            'a[href^="http"]'
        )
        .forEach((link) => {

            if (
                !link.hasAttribute(
                    "target"
                )
            ) {

                link.setAttribute(
                    "target",
                    "_blank"
                );
            }


            link.setAttribute(
                "rel",
                "noopener noreferrer"
            );
        });


    /* =========================================================
       19. KEYBOARD ACCESSIBILITY
       ========================================================= */

    document.addEventListener(
        "keydown",
        (event) => {

            /* Escape closes mobile menu */

            if (
                event.key === "Escape"
            ) {

                navLinks?.classList.remove(
                    "mobile-open"
                );


                mobileMenu?.classList.remove(
                    "is-open"
                );
            }
        }
    );


    /* =========================================================
       20. PAGE LOADED
       ========================================================= */

    window.dispatchEvent(
        new CustomEvent(
            "portfolioReady"
        )
    );

});

 /* =========================================================
        DATASET INTERACTION SCRIPT
       ========================================================= */


/* =========================================================
   DATASET PAGINATION
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const datasetGrid =
        document.getElementById("datasetGrid");

    const pagination =
        document.getElementById("datasetPagination");


    if (!datasetGrid || !pagination) {
        return;
    }


    /* -----------------------------------------------------
       SETTINGS
    ----------------------------------------------------- */

    const cardsPerPage = 6;

    let currentPage = 1;


    /* -----------------------------------------------------
       GET ALL DATASET CARDS
    ----------------------------------------------------- */

    const allCards =
        Array.from(
            datasetGrid.querySelectorAll(".dataset-card")
        );


    /* -----------------------------------------------------
       CALCULATE TOTAL PAGES
    ----------------------------------------------------- */

    function getTotalPages() {

        return Math.ceil(
            allCards.length / cardsPerPage
        );

    }


    /* -----------------------------------------------------
       SHOW PAGE
    ----------------------------------------------------- */

    function showPage(page) {

        const totalPages =
            getTotalPages();


        /* Safety */

        if (page < 1) {
            page = 1;
        }

        if (page > totalPages) {
            page = totalPages;
        }


        currentPage = page;


        /* ---------------------------------------------
           Hide all cards
        --------------------------------------------- */

        allCards.forEach(card => {

            card.classList.remove(
                "dataset-page-showing"
            );

            card.classList.add(
                "dataset-page-hidden"
            );

        });


        /* ---------------------------------------------
           Determine visible cards
        --------------------------------------------- */

        const start =
            (currentPage - 1) * cardsPerPage;

        const end =
            start + cardsPerPage;


        const visibleCards =
            allCards.slice(start, end);


        /* ---------------------------------------------
           Show current page cards
        --------------------------------------------- */

        visibleCards.forEach((card, index) => {

            card.classList.remove(
                "dataset-page-hidden"
            );

            /*
             * Small staggered animation
             */

            setTimeout(() => {

                card.classList.add(
                    "dataset-page-showing"
                );

            }, index * 45);

        });


        /* ---------------------------------------------
           Update pagination
        --------------------------------------------- */

        renderPagination(totalPages);

    }


    /* =====================================================
       RENDER PAGINATION
       ===================================================== */

    function renderPagination(totalPages) {

        pagination.innerHTML = "";


        /* ---------------------------------------------
           Previous Button
        --------------------------------------------- */

        const previous =
            document.createElement("button");

        previous.type = "button";

        previous.className =
            "dataset-page-btn prev";

        previous.innerHTML =
            '<i class="fa-solid fa-chevron-left"></i>';

        previous.setAttribute(
            "aria-label",
            "Previous page"
        );


        if (currentPage === 1) {

            previous.classList.add(
                "disabled"
            );

        }


        previous.addEventListener(
            "click",
            () => {

                if (currentPage > 1) {

                    showPage(
                        currentPage - 1
                    );

                    scrollToDatasetGrid();

                }

            }
        );


        pagination.appendChild(
            previous
        );


        /* ---------------------------------------------
           Page Number Buttons
        --------------------------------------------- */

        for (
            let page = 1;
            page <= totalPages;
            page++
        ) {

            const button =
                document.createElement("button");


            button.type = "button";


            button.className =
                "dataset-page-btn";


            button.textContent =
                page;


            button.setAttribute(
                "aria-label",
                `Go to dataset page ${page}`
            );


            if (page === currentPage) {

                button.classList.add(
                    "active"
                );

            }


            button.addEventListener(
                "click",
                () => {

                    if (
                        page !== currentPage
                    ) {

                        showPage(page);

                        scrollToDatasetGrid();

                    }

                }
            );


            pagination.appendChild(
                button
            );

        }


        /* ---------------------------------------------
           Next Button
        --------------------------------------------- */

        const next =
            document.createElement("button");


        next.type = "button";


        next.className =
            "dataset-page-btn next";


        next.innerHTML =
            '<i class="fa-solid fa-chevron-right"></i>';


        next.setAttribute(
            "aria-label",
            "Next page"
        );


        if (
            currentPage === totalPages
        ) {

            next.classList.add(
                "disabled"
            );

        }


        next.addEventListener(
            "click",
            () => {

                if (
                    currentPage < totalPages
                ) {

                    showPage(
                        currentPage + 1
                    );

                    scrollToDatasetGrid();

                }

            }
        );


        pagination.appendChild(
            next
        );

    }


    /* =====================================================
       SCROLL BACK TO DATASET GRID
       ===================================================== */

    function scrollToDatasetGrid() {

        const rect =
            datasetGrid.getBoundingClientRect();


        const offset =
            window.scrollY +
            rect.top -
            120;


        window.scrollTo({

            top: offset,

            behavior: "smooth"

        });

    }


    /* =====================================================
       INITIALIZE
    ===================================================== */

    if (allCards.length > 0) {

        showPage(1);

    }


});
/* =========================================================
   CERTIFICATE PAGINATION
   6 CERTIFICATES PER PAGE
   ========================================================= */

(function () {

    const certificatesGrid =
        document.getElementById("certificatesGrid");

    const certificatePagination =
        document.getElementById("certificatePagination");

    const certificatePrev =
        document.getElementById("certificatePrev");

    const certificateNext =
        document.getElementById("certificateNext");


    /* Safety check */

    if (
        !certificatesGrid ||
        !certificatePagination ||
        !certificatePrev ||
        !certificateNext
    ) {
        return;
    }


    /* -----------------------------------------------------
       SETTINGS
       ----------------------------------------------------- */

    const certificatesPerPage = 6;

    let currentCertificatePage = 1;


    /* -----------------------------------------------------
       GET CERTIFICATE CARDS
       ----------------------------------------------------- */

    const certificateCards =
        Array.from(
            certificatesGrid.querySelectorAll(
                ".certificate-card"
            )
        );


    /* -----------------------------------------------------
       TOTAL PAGES
       ----------------------------------------------------- */

    const totalCertificatePages =
        Math.ceil(
            certificateCards.length /
            certificatesPerPage
        );


    /* -----------------------------------------------------
       SHOW CERTIFICATES
       ----------------------------------------------------- */

    function showCertificatePage(page) {

        currentCertificatePage = page;


        const start =
            (page - 1) *
            certificatesPerPage;


        const end =
            start +
            certificatesPerPage;


        certificateCards.forEach(
            (card, index) => {

                const shouldShow =
                    index >= start &&
                    index < end;


                card.classList.remove(
                    "certificate-page-visible"
                );


                if (shouldShow) {

                    card.classList.remove(
                        "certificate-page-hidden"
                    );


                    /*
                     * Force animation restart
                     */

                    void card.offsetWidth;


                    card.classList.add(
                        "certificate-page-visible"
                    );

                } else {

                    card.classList.add(
                        "certificate-page-hidden"
                    );

                }

            }
        );


        updateCertificatePagination();


        /*
         * Scroll back to certificates
         * only when changing page
         */

        if (page !== 1) {

            const section =
                document.getElementById(
                    "certificates"
                );

            if (section) {

                setTimeout(() => {

                    section.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }, 100);

            }

        }

    }


    /* -----------------------------------------------------
       CREATE PAGINATION
       ----------------------------------------------------- */

    function updateCertificatePagination() {

        certificatePagination.innerHTML = "";


        for (
            let page = 1;
            page <= totalCertificatePages;
            page++
        ) {

            const button =
                document.createElement("button");


            button.type = "button";


            button.className =
                "certificate-page-number";


            button.textContent =
                page;


            button.setAttribute(
                "aria-label",
                `Go to certificate page ${page}`
            );


            if (
                page ===
                currentCertificatePage
            ) {

                button.classList.add(
                    "active"
                );

            }


            button.addEventListener(
                "click",
                () => {

                    if (
                        page !==
                        currentCertificatePage
                    ) {

                        showCertificatePage(
                            page
                        );

                    }

                }
            );


            certificatePagination.appendChild(
                button
            );

        }


        /*
         * Previous button
         */

        certificatePrev.disabled =
            currentCertificatePage === 1;


        /*
         * Next button
         */

        certificateNext.disabled =
            currentCertificatePage ===
            totalCertificatePages;

    }


    /* -----------------------------------------------------
       PREVIOUS
       ----------------------------------------------------- */

    certificatePrev.addEventListener(
        "click",
        () => {

            if (
                currentCertificatePage >
                1
            ) {

                showCertificatePage(
                    currentCertificatePage - 1
                );

            }

        }
    );


    /* -----------------------------------------------------
       NEXT
       ----------------------------------------------------- */

    certificateNext.addEventListener(
        "click",
        () => {

            if (
                currentCertificatePage <
                totalCertificatePages
            ) {

                showCertificatePage(
                    currentCertificatePage + 1
                );

            }

        }
    );


    /* -----------------------------------------------------
       INITIALIZE
       ----------------------------------------------------- */

    if (certificateCards.length > 0) {

        showCertificatePage(1);

    }


})();

/*FORM SUBMISSION JS*/


document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("contact-form");
    const button = document.getElementById("contact-submit-btn");
    const buttonText = document.getElementById("contact-btn-text");
    const buttonIcon = document.getElementById("contact-btn-icon");
    const status = document.getElementById("contact-status");

    if (!form || !button || !buttonText || !buttonIcon || !status) {
        console.error("Contact form elements missing.");
        return;
    }


    // =========================================================
    // SHOW STATUS
    // =========================================================

    function showStatus(message, success) {

        status.classList.remove("hidden");

        if (success) {

            status.className =
                "mt-5 px-4 py-3 rounded-xl text-sm border " +
                "text-green-400 border-green-500/30 bg-green-500/10";

            status.innerHTML = `
                <div class="flex items-center gap-3">
                    <i class="fa-solid fa-circle-check"></i>
                    <span>${message}</span>
                </div>
            `;

        } else {

            status.className =
                "mt-5 px-4 py-3 rounded-xl text-sm border " +
                "text-red-400 border-red-500/30 bg-red-500/10";

            status.innerHTML = `
                <div class="flex items-center gap-3">
                    <i class="fa-solid fa-circle-exclamation"></i>
                    <span>${message}</span>
                </div>
            `;
        }
    }


    // =========================================================
    // RESTORE BUTTON
    // =========================================================

    function restoreButton() {

        button.disabled = false;

        button.style.opacity = "";
        button.style.cursor = "";

        buttonText.textContent = "Send Message";

        buttonIcon.innerHTML = `
            <i class="fa-regular fa-paper-plane"></i>
        `;
    }


    // =========================================================
    // FORM SUBMIT
    // =========================================================

    form.addEventListener("submit", async function (event) {

        event.preventDefault();

        console.log("CONTACT FORM SUBMITTED");


        if (button.disabled) {
            return;
        }


        // =====================================================
        // GET INPUTS
        // =====================================================

        const nameInput =
            document.getElementById("contact-name");

        const emailInput =
            document.getElementById("contact-email");

        const messageInput =
            document.getElementById("contact-message");


        if (!nameInput || !emailInput || !messageInput) {

            showStatus(
                "Unable to read the contact form.",
                false
            );

            return;
        }


        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();


        // =====================================================
        // VALIDATION
        // =====================================================

        if (!name || !email || !message) {

            showStatus(
                "Please fill in all fields before sending.",
                false
            );

            return;
        }


        // =====================================================
        // LOADING STATE
        // =====================================================

        button.disabled = true;

        button.style.opacity = "0.7";
        button.style.cursor = "not-allowed";

        buttonText.textContent = "Sending...";

        buttonIcon.innerHTML = `
            <i class="fa-solid fa-spinner fa-spin"></i>
        `;


        // =====================================================
        // API URL
        // =====================================================

        const apiUrl = form.getAttribute("action");


        try {

            console.log("Sending request to:", apiUrl);


            // =================================================
            // SEND REQUEST
            // =================================================

            const response = await fetch(apiUrl, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    name: name,
                    email: email,
                    message: message
                })

            });


            console.log(
                "Response status:",
                response.status
            );


            // =================================================
            // READ RESPONSE
            // =================================================

            const result = await response.json();

            console.log(
                "Server response:",
                result
            );


            // =================================================
            // SUCCESS
            // =================================================

            if (response.ok && result.success) {

                console.log(
                    "MESSAGE SENT SUCCESSFULLY"
                );


                // Clear form
                form.reset();


                // Show success message
                showStatus(
                    "Your message has been sent successfully. I'll get back to you soon.",
                    true
                );


                // =================================================
                // IMPORTANT:
                // REMOVE SPINNER IMMEDIATELY
                // =================================================

                buttonText.textContent = "Message Sent";

                buttonIcon.innerHTML = `
                    <i class="fa-solid fa-check"></i>
                `;


                // Keep button disabled temporarily
                button.disabled = true;

                button.style.opacity = "0.85";
                button.style.cursor = "default";


                // =================================================
                // RESTORE AFTER 3 SECONDS
                // =================================================

                setTimeout(function () {

                    restoreButton();

                }, 3000);


                return;
            }


            // =================================================
            // SERVER ERROR
            // =================================================

            console.error(
                "Server error:",
                result
            );


            showStatus(
                result.message ||
                "Failed to send your message.",
                false
            );


            restoreButton();

            buttonText.textContent = "Try Again";

            buttonIcon.innerHTML = `
                <i class="fa-solid fa-rotate-right"></i>
            `;


        } catch (error) {

            console.error(
                "CONTACT FORM ERROR:",
                error
            );


            showStatus(
                "Unable to send your message. Please try again.",
                false
            );


            // Restore button
            restoreButton();

            buttonText.textContent = "Try Again";

            buttonIcon.innerHTML = `
                <i class="fa-solid fa-rotate-right"></i>
            `;

        }

    });

});
