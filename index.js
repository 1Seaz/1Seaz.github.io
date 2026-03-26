
    // Données des projets (même structure que précédemment)
    const projectsData = {
        technique: {
            title: "Jour photo",
            description: "Projet de photo jour ???",
            mainImage: "Jour//IMG_2253.jpg",
            gallery: [
                "Jour//IMG_2286.jpg",
                "Jour//IMG_1796.jpg",
                "Jour//IMG_1637.jpg",

            ]
        },
        miseenscene: {
            title: "Nuit photo",
            description: "Photo de nuit ???",
            mainImage: "nuit//IMG_2202.jpg",
            gallery: [
                "nuit//IMG_1609.jpg",
                "nuit//IMG_2152.jpg",
                "nuit//IMG_2353.jpg",
                "nuit//IMG_2357.jpg",
           
            ]
        }
    };

    const modal = document.getElementById('projectModal');
    const modalContent = document.getElementById('modalDynamicContent');
    const closeModal = document.querySelector('.close-modal');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');

    function openProject(projectKey) {
        const project = projectsData[projectKey];
        if (!project) return;

        modalContent.innerHTML = `
            <div class="project-detail">
                <div class="main-media">
                    <div class="main-image" id="mainImageContainer">
                        <img src="${project.mainImage}" alt="${project.title}" id="mainImage">
                    </div>
                    <div class="project-description">
                        <h2>${project.title}</h2>
                        <p>${project.description}</p>
                    </div>
                </div>
                <div class="carousel">
                    <div class="carousel-title">Galerie</div>
                    <div class="carousel-container">
                        <button class="carousel-btn prev-btn"><i class="fas fa-chevron-left"></i></button>
                        <div class="carousel-track" id="carouselTrack"></div>
                        <button class="carousel-btn next-btn"><i class="fas fa-chevron-right"></i></button>
                    </div>
                </div>
            </div>
        `;

        const track = document.getElementById('carouselTrack');
        project.gallery.forEach(imgUrl => {
            const img = document.createElement('img');
            img.src = imgUrl;
            img.alt = "Galerie";
            img.addEventListener('click', () => {
                document.getElementById('mainImage').src = imgUrl;
            });
            track.appendChild(img);
        });

        const prevBtn = modalContent.querySelector('.prev-btn');
        const nextBtn = modalContent.querySelector('.next-btn');
        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => {
                track.scrollBy({ left: -200, behavior: 'smooth' });
            });
            nextBtn.addEventListener('click', () => {
                track.scrollBy({ left: 200, behavior: 'smooth' });
            });
        }

        const mainImg = document.getElementById('mainImage');
        mainImg.addEventListener('click', () => {
            lightboxImg.src = mainImg.src;
            lightbox.style.display = 'flex';
        });

        modal.style.display = 'flex';
    }

    function closeModalFn() {
        modal.style.display = 'none';
    }

    closeModal.addEventListener('click', closeModalFn);
    window.addEventListener('click', (e) => {
        if (e.target === modal) closeModalFn();
    });

    lightbox.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });

    // Écouteurs sur les cartes verticales
    document.querySelectorAll('.project-card-vertical').forEach(card => {
        card.addEventListener('click', (e) => {
            const project = card.getAttribute('data-project');
            if (project) openProject(project);
        });
    });

    // Animations fade-up
    const fadeElements = document.querySelectorAll('.fade-up');
    function checkFade() {
        fadeElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top <= window.innerHeight - 80) {
                el.classList.add('appear');
            }
        });
    }
    window.addEventListener('scroll', checkFade);
    window.addEventListener('resize', checkFade);
    checkFade();

    // Active link
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section[id]');
    function updateActiveLink() {
        let current = '';
        const scrollPos = window.scrollY + 150;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href').substring(1);
            if (href === current) link.classList.add('active');
        });
    }
    window.addEventListener('scroll', updateActiveLink);
    window.addEventListener('load', updateActiveLink);

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').substring(1);
            if (targetId && document.getElementById(targetId)) {
                e.preventDefault();
                document.getElementById(targetId).scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
