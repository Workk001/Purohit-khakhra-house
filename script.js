// ===== PREMIUM BROCHURE WEBSITE - JAVASCRIPT =====
// Maang-level UI/UX with 3D animations and micro-interactions

class SpiceCraftWebsite {
    constructor() {
        this.init();
        this.setupEventListeners();
        this.setupAnimations();
        this.setup3DElements();
        this.setupScrollAnimations();
        this.setupProductFilter();
        this.setupFormHandling();
        this.setupGallery();
    }

    init() {
        // Hide loading screen after page load
        window.addEventListener('load', () => {
            setTimeout(() => {
                const loadingScreen = document.getElementById('loading-screen');
                if (loadingScreen) {
                    loadingScreen.classList.add('hidden');
                }
            }, 1500);
        });

        // Initialize smooth scrolling
        this.initSmoothScroll();
        
        // Initialize navbar scroll effect
        this.initNavbarScroll();
        
        // Initialize particle system
        this.initParticleSystem();
        
        // Initialize hero slider
        this.initHeroSlider();
    }

    setupEventListeners() {
        // Mobile menu toggle
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                navToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
        }

        // Close mobile menu when clicking on links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });

        // Hero CTA buttons
        const heroButtons = document.querySelectorAll('.hero-actions button');
        heroButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                if (button.textContent.includes('Explore')) {
                    document.getElementById('products').scrollIntoView({ 
                        behavior: 'smooth' 
                    });
                } else if (button.textContent.includes('Watch')) {
                    this.showVideoModal();
                }
            });
        });

        // Order Now button in navigation
        const orderNowBtn = document.querySelector('.nav-cta .btn-primary');
        if (orderNowBtn) {
            orderNowBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.openWhatsAppForGeneral();
            });
        }

        // Product card interactions
        this.setupProductCardInteractions();
    }

    setupAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                }
            });
        }, observerOptions);

        // Observe elements for scroll animations
        const animateElements = document.querySelectorAll('.timeline-item, .stat-item, .contact-item');
        animateElements.forEach(el => {
            el.classList.add('animate-on-scroll');
            observer.observe(el);
        });
    }

    setup3DElements() {
        // 3D Khakhra rotation with mouse interaction
        const khakhra3D = document.getElementById('khakhra-3d');
        if (khakhra3D) {
            this.setup3DKhakhra(khakhra3D);
        }

        // 3D Product cards
        this.setup3DProductCards();

        // Parallax effects
        this.setupParallaxEffects();
    }

    setup3DKhakhra(element) {
        let isMouseOver = false;
        let rotationX = 0;
        let rotationY = 0;
        let targetRotationX = 0;
        let targetRotationY = 0;

        // Mouse move handler
        const handleMouseMove = (e) => {
            if (!isMouseOver) return;

            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const mouseX = e.clientX - centerX;
            const mouseY = e.clientY - centerY;
            
            targetRotationY = (mouseX / rect.width) * 30;
            targetRotationX = -(mouseY / rect.height) * 30;
        };

        // Mouse enter/leave handlers
        element.addEventListener('mouseenter', () => {
            isMouseOver = true;
            element.style.transition = 'none';
        });

        element.addEventListener('mouseleave', () => {
            isMouseOver = false;
            targetRotationX = 0;
            targetRotationY = 0;
            element.style.transition = 'transform 0.5s ease-out';
        });

        element.addEventListener('mousemove', handleMouseMove);

        // Smooth rotation animation
        const animateRotation = () => {
            rotationX += (targetRotationX - rotationX) * 0.1;
            rotationY += (targetRotationY - rotationY) * 0.1;
            
            element.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
            requestAnimationFrame(animateRotation);
        };
        
        animateRotation();

        // Touch support for mobile
        let touchStartX = 0;
        let touchStartY = 0;

        element.addEventListener('touchstart', (e) => {
            const touch = e.touches[0];
            touchStartX = touch.clientX;
            touchStartY = touch.clientY;
        });

        element.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const touch = e.touches[0];
            const deltaX = touch.clientX - touchStartX;
            const deltaY = touch.clientY - touchStartY;
            
            targetRotationY = deltaX * 0.5;
            targetRotationX = -deltaY * 0.5;
        });
    }

    setup3DProductCards() {
        const productCards = document.querySelectorAll('.product-card');
        
        productCards.forEach(card => {
            let isHovered = false;
            let rotationX = 0;
            let rotationY = 0;

            card.addEventListener('mouseenter', () => {
                isHovered = true;
                card.style.transition = 'none';
            });

            card.addEventListener('mouseleave', () => {
                isHovered = false;
                card.style.transition = 'all 0.3s ease-out';
                rotationX = 0;
                rotationY = 0;
            });

            card.addEventListener('mousemove', (e) => {
                if (!isHovered) return;

                const rect = card.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;
                
                const mouseX = e.clientX - centerX;
                const mouseY = e.clientY - centerY;
                
                rotationY = (mouseX / rect.width) * 15;
                rotationX = -(mouseY / rect.height) * 15;
                
                card.style.transform = `perspective(1000px) rotateX(${rotationX}deg) rotateY(${rotationY}deg) translateZ(20px)`;
            });
        });
    }

    setupParallaxEffects() {
        const parallaxElements = document.querySelectorAll('.hero-particles, .hero-gradient');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            parallaxElements.forEach((element, index) => {
                const speed = (index + 1) * 0.1;
                element.style.transform = `translateY(${rate * speed}px)`;
            });
        });
    }

    setupScrollAnimations() {
        // Navbar scroll effect
        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            const navbar = document.getElementById('navbar');
            
            if (navbar) {
                if (currentScrollY > 100) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
                
                // Hide/show navbar on scroll
                if (currentScrollY > lastScrollY && currentScrollY > 200) {
                    navbar.style.transform = 'translateY(-100%)';
                } else {
                    navbar.style.transform = 'translateY(0)';
                }
            }
            
            lastScrollY = currentScrollY;
        });

        // Scroll progress indicator
        this.setupScrollProgress();
    }

    setupScrollProgress() {
        const scrollProgress = document.createElement('div');
        scrollProgress.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #F2A900, #E67E22);
            z-index: 9999;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(scrollProgress);

        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            scrollProgress.style.width = scrolled + '%';
        });
    }

    setupProductFilter() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const productsGrid = document.getElementById('products-grid');
        
        // Sample product data
        const products = [
            {
                id: 1,
                name: "Classic Methi Khakhra",
                description: "Traditional fenugreek flavored crispy flatbread",
                price: "₹120",
                category: "khakhra",
                image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop"
            },
            {
                id: 2,
                name: "Spicy Jeera Khakhra",
                description: "Cumin spiced crispy delight with a kick",
                price: "₹110",
                category: "khakhra",
                image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop"
            },
            {
                id: 3,
                name: "Premium Namkeen Mix",
                description: "Assorted savory snacks with traditional flavors",
                price: "₹180",
                category: "namkeen",
                image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop"
            },
            {
                id: 4,
                name: "Sweet Jalebi",
                description: "Crispy golden spirals soaked in sugar syrup",
                price: "₹150",
                category: "sweets",
                image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop"
            },
            {
                id: 5,
                name: "Festival Gift Box",
                description: "Premium assortment for special occasions",
                price: "₹500",
                category: "gift",
                image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop"
            },
            {
                id: 6,
                name: "Masala Khakhra",
                description: "Spiced with traditional Gujarati masala blend",
                price: "₹130",
                category: "khakhra",
                image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop"
            }
        ];

        // Render products
        const renderProducts = (filteredProducts = products) => {
            if (productsGrid) {
                productsGrid.innerHTML = filteredProducts.map(product => `
                    <div class="product-card" data-category="${product.category}">
                        <div class="product-image">
                            <img src="${product.image}" alt="${product.name}" loading="lazy">
                        </div>
                        <div class="product-info">
                            <h3 class="product-title">${product.name}</h3>
                            <p class="product-description">${product.description}</p>
                            <div class="product-price">${product.price}</div>
                            <button class="product-cta">Enquire Now</button>
                        </div>
                    </div>
                `).join('');

                // Re-setup 3D card interactions
                this.setup3DProductCards();
                this.setupProductCardInteractions();
            }
        };

        // Initial render
        renderProducts();

        // Filter functionality
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                // Filter products
                const filter = button.dataset.filter;
                const filteredProducts = filter === 'all' 
                    ? products 
                    : products.filter(product => product.category === filter);

                // Animate out current products
                const currentCards = productsGrid.querySelectorAll('.product-card');
                currentCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                    }, index * 50);
                });

                // Render new products after animation
                setTimeout(() => {
                    renderProducts(filteredProducts);
                }, currentCards.length * 50 + 200);
            });
        });
    }

    setupProductCardInteractions() {
        const productCards = document.querySelectorAll('.product-card');
        
        productCards.forEach(card => {
            const ctaButton = card.querySelector('.product-cta');
            
            if (ctaButton) {
                ctaButton.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.openWhatsAppForProduct(card);
                });
            }
        });
    }

    openWhatsAppForProduct(productCard) {
        const phoneNumber = '919876543210'; // Your WhatsApp number
        const productName = productCard.querySelector('.product-title').textContent;
        const productPrice = productCard.querySelector('.product-price').textContent;
        
        const message = `Hello! I am interested in your ${productName} (${productPrice}). Can you please provide more information about availability and delivery?`;
        
        // Create WhatsApp link
        const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        
        // Open in new tab
        window.open(whatsappLink, '_blank');
        
        // Show feedback
        this.showNotification(`Opening WhatsApp for ${productName}...`, 'success');
    }

    openWhatsAppForGeneral() {
        const phoneNumber = '919876543210'; // Your WhatsApp number
        const message = 'Hello! I am interested in your khakhra and namkeen products. Can you please provide more information about your products and pricing?';
        
        // Create WhatsApp link
        const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        
        // Open in new tab
        window.open(whatsappLink, '_blank');
        
        // Show feedback
        this.showNotification('Opening WhatsApp...', 'success');
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#25D366' : type === 'error' ? '#E74C3C' : '#F2A900'};
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            z-index: 10000;
            font-weight: 500;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    setupFormHandling() {
        const contactForm = document.getElementById('contact-form');
        
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmission(contactForm);
            });
        }
    }

    setupGallery() {
        const galleryGrid = document.getElementById('gallery-grid');
        const filterButtons = document.querySelectorAll('.gallery-filter-btn');
        
        // Sample gallery data with external links
        const galleryItems = [
            {
                id: 1,
                title: "Our Traditional Shop",
                description: "The heart of our khakhra making process",
                image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&h=400&fit=crop",
                type: "shop",
                category: "shop"
            },
            {
                id: 2,
                title: "Fresh Khakhra Making",
                description: "Watch our artisans craft the perfect khakhra",
                image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=400&fit=crop",
                video: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
                type: "video",
                category: "process"
            },
            {
                id: 3,
                title: "Premium Ingredients",
                description: "Finest spices and grains for authentic taste",
                image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop",
                type: "image",
                category: "process"
            },
            {
                id: 4,
                title: "Traditional Roasting",
                description: "Slow-roasted to perfection using age-old techniques",
                image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&h=400&fit=crop",
                type: "image",
                category: "process"
            },
            {
                id: 5,
                title: "Fresh Khakhra Collection",
                description: "Our daily fresh khakhra varieties",
                image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&h=400&fit=crop",
                type: "image",
                category: "products"
            },
            {
                id: 6,
                title: "Namkeen Delights",
                description: "Crispy and flavorful namkeen snacks",
                image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&h=400&fit=crop",
                type: "image",
                category: "products"
            },
            {
                id: 7,
                title: "Happy Customer",
                description: "Satisfied customer enjoying our khakhra",
                image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop",
                type: "image",
                category: "customers"
            },
            {
                id: 8,
                title: "Shop Interior",
                description: "Warm and welcoming shop atmosphere",
                image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=400&fit=crop",
                type: "image",
                category: "shop"
            },
            {
                id: 9,
                title: "Making Process Video",
                description: "Behind the scenes of our traditional process",
                image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=600&h=400&fit=crop",
                video: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4",
                type: "video",
                category: "process"
            }
        ];

        // Render gallery items
        const renderGallery = (filteredItems = galleryItems) => {
            if (galleryGrid) {
                galleryGrid.innerHTML = filteredItems.map(item => `
                    <div class="gallery-item" data-category="${item.category}" onclick="openLightbox(${item.id})">
                        <img src="${item.image}" alt="${item.title}" class="gallery-image" loading="lazy">
                        <div class="gallery-overlay">
                            ${item.type === 'video' ? '<div class="gallery-play-btn">▶</div>' : ''}
                        </div>
                        <div class="gallery-info">
                            <h3 class="gallery-title">${item.title}</h3>
                            <p class="gallery-description">${item.description}</p>
                        </div>
                        <div class="gallery-type">${item.type}</div>
                    </div>
                `).join('');
            }
        };

        // Initial render
        renderGallery();

        // Filter functionality
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                // Filter gallery items
                const filter = button.dataset.filter;
                const filteredItems = filter === 'all' 
                    ? galleryItems 
                    : galleryItems.filter(item => item.category === filter);

                // Animate out current items
                const currentItems = galleryGrid.querySelectorAll('.gallery-item');
                currentItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                    }, index * 50);
                });

                // Render new items after animation
                setTimeout(() => {
                    renderGallery(filteredItems);
                }, currentItems.length * 50 + 200);
            });
        });
    }

    initSmoothScroll() {
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    initNavbarScroll() {
        let ticking = false;
        
        const updateNavbar = () => {
            const navbar = document.getElementById('navbar');
            if (navbar) {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            }
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateNavbar);
                ticking = true;
            }
        });
    }

    initParticleSystem() {
        const particlesContainer = document.getElementById('hero-particles');
        if (!particlesContainer) return;

        // Create floating particles
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 4 + 1}px;
                height: ${Math.random() * 4 + 1}px;
                background: ${i % 3 === 0 ? '#F2A900' : i % 3 === 1 ? '#16697A' : '#E74C3C'};
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${Math.random() * 10 + 10}s linear infinite;
                opacity: ${Math.random() * 0.5 + 0.1};
            `;
            particlesContainer.appendChild(particle);
        }
    }

    initHeroSlider() {
        const slider = document.getElementById('hero-slider');
        if (!slider) return;

        const slides = slider.querySelectorAll('.slide');
        const indicators = slider.querySelectorAll('.indicator');
        const prevBtn = document.getElementById('prev-slide');
        const nextBtn = document.getElementById('next-slide');
        
        let currentSlide = 0;
        let slideInterval;

        // Auto-slide functionality
        const startSlideShow = () => {
            slideInterval = setInterval(() => {
                nextSlide();
            }, 5000); // Change slide every 5 seconds
        };

        const stopSlideShow = () => {
            clearInterval(slideInterval);
        };

        const showSlide = (index) => {
            // Hide all slides
            slides.forEach(slide => slide.classList.remove('active'));
            indicators.forEach(indicator => indicator.classList.remove('active'));
            
            // Show current slide
            slides[index].classList.add('active');
            indicators[index].classList.add('active');
            
            currentSlide = index;
        };

        const nextSlide = () => {
            const nextIndex = (currentSlide + 1) % slides.length;
            showSlide(nextIndex);
        };

        const prevSlide = () => {
            const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(prevIndex);
        };

        // Event listeners
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                stopSlideShow();
                startSlideShow(); // Restart auto-slide
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                stopSlideShow();
                startSlideShow(); // Restart auto-slide
            });
        }

        // Indicator clicks
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                showSlide(index);
                stopSlideShow();
                startSlideShow(); // Restart auto-slide
            });
        });

        // Pause on hover
        slider.addEventListener('mouseenter', stopSlideShow);
        slider.addEventListener('mouseleave', startSlideShow);

        // Touch/swipe support
        let startX = 0;
        let endX = 0;

        slider.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });

        slider.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            handleSwipe();
        });

        const handleSwipe = () => {
            const threshold = 50;
            const diff = startX - endX;

            if (Math.abs(diff) > threshold) {
                if (diff > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
                stopSlideShow();
                startSlideShow();
            }
        };

        // Start the slideshow
        startSlideShow();
    }

    showVideoModal() {
        // Create video modal
        const modal = document.createElement('div');
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;

        const videoContainer = document.createElement('div');
        videoContainer.style.cssText = `
            position: relative;
            width: 80%;
            max-width: 800px;
            background: white;
            border-radius: 12px;
            overflow: hidden;
            transform: scale(0.8);
            transition: transform 0.3s ease;
        `;

        const video = document.createElement('video');
        video.src = 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4'; // Placeholder
        video.controls = true;
        video.style.width = '100%';
        video.style.height = 'auto';

        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '×';
        closeBtn.style.cssText = `
            position: absolute;
            top: 10px;
            right: 15px;
            background: rgba(0, 0, 0, 0.5);
            color: white;
            border: none;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            cursor: pointer;
            font-size: 18px;
            z-index: 1;
        `;

        videoContainer.appendChild(video);
        videoContainer.appendChild(closeBtn);
        modal.appendChild(videoContainer);
        document.body.appendChild(modal);

        // Animate in
        setTimeout(() => {
            modal.style.opacity = '1';
            videoContainer.style.transform = 'scale(1)';
        }, 10);

        // Close functionality
        const closeModal = () => {
            modal.style.opacity = '0';
            videoContainer.style.transform = 'scale(0.8)';
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 300);
        };

        closeBtn.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });
    }


    handleFormSubmission(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        setTimeout(() => {
            alert('Thank you for your message! We will get back to you soon.');
            form.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    }
}

// ===== UTILITY FUNCTIONS =====

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the website
    new SpiceCraftWebsite();
    
    // Add loading animation to buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.type === 'submit' || this.classList.contains('btn-primary')) {
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
            }
        });
    });
    
    // Add ripple effect to buttons
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add CSS for ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});

// ===== PERFORMANCE OPTIMIZATIONS =====

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Preload critical resources
const preloadCriticalResources = () => {
    const criticalImages = [
        'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop'
    ];
    
    criticalImages.forEach(src => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        document.head.appendChild(link);
    });
};

// Initialize preloading
preloadCriticalResources();

// ===== ACCESSIBILITY ENHANCEMENTS =====

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close any open modals
        const modals = document.querySelectorAll('[style*="position: fixed"]');
        modals.forEach(modal => {
            if (modal.style.zIndex === '9999') {
                modal.click();
            }
        });
    }
});

// Focus management
const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

const trapFocus = (element) => {
    const focusableContent = element.querySelectorAll(focusableElements);
    const firstFocusableElement = focusableContent[0];
    const lastFocusableElement = focusableContent[focusableContent.length - 1];

    element.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusableElement) {
                    lastFocusableElement.focus();
                    e.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusableElement) {
                    firstFocusableElement.focus();
                    e.preventDefault();
                }
            }
        }
    });
};

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('Website Error:', e.error);
    // Could send error to analytics service
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled Promise Rejection:', e.reason);
    // Could send error to analytics service
});

// ===== GALLERY FUNCTIONS =====
function openLightbox(itemId) {
    // Sample gallery data (same as in setupGallery)
    const galleryItems = [
        {
            id: 1,
            title: "Our Traditional Shop",
            description: "The heart of our khakhra making process",
            image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&h=600&fit=crop",
            type: "shop",
            category: "shop"
        },
        {
            id: 2,
            title: "Fresh Khakhra Making",
            description: "Watch our artisans craft the perfect khakhra",
            image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&h=600&fit=crop",
            video: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4",
            type: "video",
            category: "process"
        },
        {
            id: 3,
            title: "Premium Ingredients",
            description: "Finest spices and grains for authentic taste",
            image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop",
            type: "image",
            category: "process"
        },
        {
            id: 4,
            title: "Traditional Roasting",
            description: "Slow-roasted to perfection using age-old techniques",
            image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&h=600&fit=crop",
            type: "image",
            category: "process"
        },
        {
            id: 5,
            title: "Fresh Khakhra Collection",
            description: "Our daily fresh khakhra varieties",
            image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop",
            type: "image",
            category: "products"
        },
        {
            id: 6,
            title: "Namkeen Delights",
            description: "Crispy and flavorful namkeen snacks",
            image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&h=600&fit=crop",
            type: "image",
            category: "products"
        },
        {
            id: 7,
            title: "Happy Customer",
            description: "Satisfied customer enjoying our khakhra",
            image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop",
            type: "image",
            category: "customers"
        },
        {
            id: 8,
            title: "Shop Interior",
            description: "Warm and welcoming shop atmosphere",
            image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&h=600&fit=crop",
            type: "image",
            category: "shop"
        },
        {
            id: 9,
            title: "Making Process Video",
            description: "Behind the scenes of our traditional process",
            image: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&h=600&fit=crop",
            video: "https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4",
            type: "video",
            category: "process"
        }
    ];

    const item = galleryItems.find(item => item.id === itemId);
    if (!item) return;

    // Create lightbox
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <button class="lightbox-close" onclick="closeLightbox()">×</button>
            ${item.type === 'video' ? 
                `<video class="lightbox-video" controls autoplay>
                    <source src="${item.video}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>` :
                `<img src="${item.image}" alt="${item.title}" class="lightbox-image">`
            }
            <div class="lightbox-info">
                <h3 class="lightbox-title">${item.title}</h3>
                <p class="lightbox-description">${item.description}</p>
            </div>
        </div>
    `;

    document.body.appendChild(lightbox);

    // Animate in
    setTimeout(() => {
        lightbox.classList.add('active');
    }, 10);

    // Close on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });
}

function closeLightbox() {
    const lightbox = document.querySelector('.lightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
        setTimeout(() => {
            if (document.body.contains(lightbox)) {
                document.body.removeChild(lightbox);
            }
        }, 300);
    }
}

// ===== CONTACT FUNCTIONS =====
function callNumber(phoneNumber) {
    // Remove any non-digit characters
    const cleanNumber = phoneNumber.replace(/\D/g, '');
    
    // Create clickable phone link
    const phoneLink = document.createElement('a');
    phoneLink.href = `tel:${cleanNumber}`;
    phoneLink.click();
    
    // Show feedback
    showNotification('Opening phone dialer...', 'success');
}

function openWhatsApp() {
    const phoneNumber = '919876543210'; // Your WhatsApp number
    const message = 'Hello! I am interested in your khakhra and namkeen products. Can you please provide more information?';
    
    // Create WhatsApp link
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    // Open in new tab
    window.open(whatsappLink, '_blank');
    
    // Show feedback
    showNotification('Opening WhatsApp...', 'success');
}

// WhatsApp function for specific products
function openWhatsAppForProduct(productCard) {
    const phoneNumber = '919876543210'; // Your WhatsApp number
    const productName = productCard.querySelector('.product-title').textContent;
    const productPrice = productCard.querySelector('.product-price').textContent;
    
    const message = `Hello! I am interested in your ${productName} (${productPrice}). Can you please provide more information about availability and delivery?`;
    
    // Create WhatsApp link
    const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    // Open in new tab
    window.open(whatsappLink, '_blank');
    
    // Show feedback
    showNotification(`Opening WhatsApp for ${productName}...`, 'success');
}

function openMap() {
    // Coordinates for Sumerpur, Pali, Rajasthan
    const latitude = 25.5;
    const longitude = 73.5;
    const address = 'Near Hindustan Petrolpump, Sumerpur, Pali, Rajasthan';
    
    // Try to open in Google Maps app first, fallback to web
    const mapsLink = `https://maps.app.goo.gl/sQ7ZW9S44gvRh3uK9`;
    
    // Open in new tab
    window.open(mapsLink, '_blank');
    
    // Show feedback
    showNotification('Opening Google Maps...', 'success');
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#25D366' : type === 'error' ? '#E74C3C' : '#F2A900'};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 10000;
        font-weight: 500;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// ===== EXPORT FOR TESTING =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SpiceCraftWebsite;
}
