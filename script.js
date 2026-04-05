// Optimized JavaScript with modern ES6+ features
class PortfolioApp {
    constructor() {
        this.navbar = document.querySelector('.navbar');
        this.sections = [];
        this.navLinks = document.querySelectorAll('.nav-menu a');
        this.commandPalette = document.getElementById('command-palette');
        this.commandInput = document.getElementById('command-input');
        this.commandOutput = document.getElementById('command-output');
        this.paletteOpen = false;
        this.contentData = {
            proofMetrics: [],
            skills: [],
            caseStudy: null,
            impactCards: []
        };
        this.init();
    }

    getFallbackContent() {
        return {
            proofMetrics: [
                {
                    value: '2+',
                    title: 'Years of Hands-On Support',
                    text: 'Delivered day-to-day IT and security support across production environments.'
                },
                {
                    value: '2',
                    title: 'Operational Environments',
                    text: 'Supported both business operations and a multi-site academic institution.'
                },
                {
                    value: '4',
                    title: 'Core Focus Areas',
                    text: 'IT technician support, hardware repair, Red Team mindset, and IT security operations.'
                }
            ],
            skills: [
                {
                    icon: '🧰',
                    title: 'IT Technician and Hardware Repair',
                    tags: ['Hardware Diagnostics', 'Desktop and Laptop Repair', 'Part Replacement', 'System Upgrades']
                },
                {
                    icon: '🌐',
                    title: 'Networking',
                    tags: ['TCP/IP', 'Wireless Networks', 'Active Directory', 'Network Security']
                },
                {
                    icon: '⚙️',
                    title: 'Cybersecurity and Endpoint Defense',
                    tags: ['CompTia Security+', 'Endpoint Security', 'Patch Management', 'EDR']
                },
                {
                    icon: '🎯',
                    title: 'Red Team and IT Security',
                    tags: ['Red Team Mindset', 'Vulnerability Assessment', 'Threat-Informed Troubleshooting', 'Security Control Validation']
                },
                {
                    icon: '🔧',
                    title: 'Systems Administration',
                    tags: ['Microsoft 365', 'Active Directory', 'Windows Server']
                },
                {
                    icon: '🖨️',
                    title: 'IT Support Operations',
                    tags: ['Ticket Resolution', 'User Support', 'Peripheral Setup', 'POS and Device Support']
                }
            ],
            caseStudy: {
                title: 'Mini Case Study: Operational Device Stability',
                problem: 'Frequent device and software issues interrupted operations and slowed daily workflows.',
                action: 'Applied structured troubleshooting, proactive checks, and accurate configuration documentation.',
                result: 'Improved service continuity with faster recovery and fewer repeated support issues.'
            },
            impactCards: [
                {
                    image: 'images/optimized/project-fraud.jpg',
                    fallbackImage: 'images/project-fraud.jpg',
                    alt: 'Hardware repair and diagnostic workflow',
                    title: 'Hardware Diagnostics and Repair',
                    description: 'Diagnosed device failures, completed component replacements, and restored stable workstation performance.',
                    tags: ['Hardware Repair', 'Diagnostics', 'IT Technician']
                },
                {
                    image: 'images/optimized/project-sentiment.jpg',
                    fallbackImage: 'images/project-sentiment.jpg',
                    alt: 'Network and incident troubleshooting workflow',
                    title: 'Network and Incident Troubleshooting',
                    description: 'Diagnosed and resolved hardware, software, and connectivity issues with clear escalation paths.',
                    tags: ['Network Troubleshooting', 'Hardware/Software Support', 'Incident Response']
                },
                {
                    image: 'images/optimized/project-maintenance.jpg',
                    fallbackImage: 'images/project-maintenance.jpg',
                    alt: 'IT security automation and scripting workflow',
                    title: 'Security Automation and Scripting',
                    description: 'Applied Python and PowerShell to automate administrative checks and security-oriented reporting workflows.',
                    tags: ['Python', 'PowerShell', 'Security Operations']
                }
            ]
        };
    }

    async init() {
        await this.loadSectionPartials();
        this.sections = document.querySelectorAll('.section, .hero');
        await this.loadContentData();
        this.renderDynamicSections();
        this.setupSmoothScroll();
        this.setupNavbar();
        this.setupActiveNavigation();
        this.setupAnimations();
        this.setupHeadingTypewriter();
        this.setupParallax();
        this.setupLazyLoading();
        this.setupResumeFallback();
        this.setupCommandPalette();
        this.setupSecurityStatusTicker();
    }

    async loadSectionPartials() {
        const partialTargets = Array.from(document.querySelectorAll('[data-partial]'));
        if (!partialTargets.length) {
            return;
        }

        await Promise.all(
            partialTargets.map(async (target) => {
                const partialPath = target.getAttribute('data-partial');
                if (!partialPath) {
                    return;
                }

                try {
                    const response = await fetch(partialPath, { cache: 'no-store' });
                    if (!response.ok) {
                        throw new Error(`Unable to load ${partialPath} (${response.status})`);
                    }
                    target.innerHTML = await response.text();
                } catch (error) {
                    console.error('Error loading partial:', partialPath, error);
                    target.innerHTML = '';
                }
            })
        );
    }

    async loadContentData() {
        try {
            const response = await fetch('portfolio-content.json', { cache: 'no-store' });
            if (!response.ok) {
                throw new Error(`Unable to load portfolio-content.json (${response.status})`);
            }
            const data = await response.json();
            this.contentData = {
                proofMetrics: Array.isArray(data.proofMetrics) ? data.proofMetrics : [],
                skills: Array.isArray(data.skills) ? data.skills : [],
                caseStudy: data.caseStudy || null,
                impactCards: Array.isArray(data.impactCards) ? data.impactCards : []
            };

            // If JSON loads but is empty, still keep the page complete.
            if (!this.contentData.proofMetrics.length || !this.contentData.skills.length) {
                this.contentData = this.getFallbackContent();
            }
        } catch (error) {
            console.error('Error loading portfolio content data:', error);
            this.contentData = this.getFallbackContent();
        }
    }

    renderDynamicSections() {
        this.renderProofGrid();
        this.renderSkillsGrid();
        this.renderImpactGrid();
    }

    createElement(tag, className, textContent) {
        const element = document.createElement(tag);
        if (className) {
            element.className = className;
        }
        if (typeof textContent === 'string') {
            element.textContent = textContent;
        }
        return element;
    }

    renderProofGrid() {
        const proofGrid = document.getElementById('proof-grid');
        if (!proofGrid) return;

        proofGrid.innerHTML = '';
        this.contentData.proofMetrics.forEach((metric) => {
            const card = this.createElement('article', 'proof-card');
            const value = this.createElement('span', 'proof-value', metric.value || '');
            const title = this.createElement('h3', 'proof-title', metric.title || '');
            const text = this.createElement('p', 'proof-text', metric.text || '');

            card.appendChild(value);
            card.appendChild(title);
            card.appendChild(text);
            proofGrid.appendChild(card);
        });
    }

    renderSkillsGrid() {
        const skillsGrid = document.getElementById('skills-grid');
        if (!skillsGrid) return;

        skillsGrid.innerHTML = '';
        this.contentData.skills.forEach((skill) => {
            const card = this.createElement('article', 'skill-card');
            const icon = this.createElement('div', 'skill-icon', skill.icon || '');
            const title = this.createElement('h3', 'skill-title', skill.title || '');
            const tagsWrap = this.createElement('div', 'skill-tags');

            (skill.tags || []).forEach((tagText) => {
                const tag = this.createElement('span', 'tag', tagText);
                tagsWrap.appendChild(tag);
            });

            card.appendChild(icon);
            card.appendChild(title);
            card.appendChild(tagsWrap);
            skillsGrid.appendChild(card);
        });
    }

    renderImpactGrid() {
        const impactGrid = document.getElementById('impact-grid');
        if (!impactGrid) return;

        impactGrid.innerHTML = '';

        if (this.contentData.caseStudy) {
            const caseStudyCard = this.createElement('article', 'project-card case-study-card');
            const caseStudyInfo = this.createElement('div', 'project-info');
            const caseTitle = this.createElement('h4', 'project-name', this.contentData.caseStudy.title || '');
            const caseList = this.createElement('ul', 'case-study-list');

            [
                ['Problem', this.contentData.caseStudy.problem],
                ['Action', this.contentData.caseStudy.action],
                ['Result', this.contentData.caseStudy.result]
            ].forEach(([label, text]) => {
                const item = this.createElement('li');
                const strong = document.createElement('strong');
                strong.textContent = `${label}: `;
                item.appendChild(strong);
                item.appendChild(document.createTextNode(text || ''));
                caseList.appendChild(item);
            });

            caseStudyInfo.appendChild(caseTitle);
            caseStudyInfo.appendChild(caseList);
            caseStudyCard.appendChild(caseStudyInfo);
            impactGrid.appendChild(caseStudyCard);
        }

        this.contentData.impactCards.forEach((cardData) => {
            const card = this.createElement('article', 'project-card');
            const imageWrap = this.createElement('div', 'project-image');
            const image = document.createElement('img');

            image.src = cardData.image || '';
            image.alt = cardData.alt || 'Portfolio capability image';
            image.loading = 'lazy';
            image.decoding = 'async';
            image.onerror = () => {
                if (cardData.fallbackImage && image.src.indexOf(cardData.fallbackImage) === -1) {
                    image.src = cardData.fallbackImage;
                    return;
                }
                image.style.display = 'none';
            };

            const info = this.createElement('div', 'project-info');
            const title = this.createElement('h4', 'project-name', cardData.title || '');
            const description = this.createElement('p', 'project-description', cardData.description || '');
            const techWrap = this.createElement('div', 'project-tech');

            (cardData.tags || []).forEach((tagText) => {
                const tag = this.createElement('span', '', tagText);
                techWrap.appendChild(tag);
            });

            imageWrap.appendChild(image);
            info.appendChild(title);
            info.appendChild(description);
            info.appendChild(techWrap);
            card.appendChild(imageWrap);
            card.appendChild(info);
            impactGrid.appendChild(card);
        });
    }

    // Smooth scroll with requestAnimationFrame for better performance
    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    const offset = 80;
                    const targetPosition = target.offsetTop - offset;
                    this.smoothScrollTo(targetPosition);
                }
            });
        });
    }

    smoothScrollTo(target) {
        const start = window.pageYOffset;
        const distance = target - start;
        const duration = 800;
        let startTime = null;

        const animation = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = this.easeInOutCubic(timeElapsed, start, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };

        requestAnimationFrame(animation);
    }

    easeInOutCubic(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t + 2) + b;
    }

    // Throttled scroll handler for navbar
    setupNavbar() {
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const currentScroll = window.pageYOffset;
                    
                    if (currentScroll > 50) {
                        this.navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                        this.navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
                    } else {
                        this.navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
                        this.navbar.style.boxShadow = 'none';
                    }
                    
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    // Active navigation highlighting
    setupActiveNavigation() {
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    let current = '';
                    
                    this.sections.forEach(section => {
                        const sectionTop = section.offsetTop;
                        if (window.pageYOffset >= sectionTop - 150) {
                            current = section.getAttribute('id');
                        }
                    });

                    this.navLinks.forEach(link => {
                        link.style.color = '';
                        if (link.getAttribute('href') === `#${current}`) {
                            link.style.color = 'var(--primary)';
                        }
                    });
                    
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    // Intersection Observer for staggered reveal animations
    setupAnimations() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion || !('IntersectionObserver' in window)) {
            return;
        }

        const targets = document.querySelectorAll(
            '.section-header, .proof-card, .highlight-item, .skill-card, .experience-card, .project-card, .education-card, .contact-method, .reference-card, .security-card, .security-status-item'
        );

        targets.forEach((el) => {
            el.classList.add('reveal-in-init');
        });

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    const index = Number(entry.target.dataset.revealIndex || 0);
                    entry.target.style.transitionDelay = `${Math.min(index * 45, 240)}ms`;
                    entry.target.classList.add('reveal-in');
                    observer.unobserve(entry.target);
                });
            },
            { threshold: 0.14, rootMargin: '0px 0px -8% 0px' }
        );

        targets.forEach((el, index) => {
            el.dataset.revealIndex = String(index % 6);
            observer.observe(el);
        });
    }

    // Parallax effect with throttling - disabled to prevent issues
    setupParallax() {
        // Parallax disabled for stability
        // Can be re-enabled if needed with reduced intensity
    }

    setupHeadingTypewriter() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const titles = document.querySelectorAll('.section-title');
        if (!titles.length) return;

        if (prefersReducedMotion || !('IntersectionObserver' in window)) {
            return;
        }

        const runTypewriter = (el) => {
            if (el.dataset.typed === 'true') return;

            const fullText = el.dataset.fullText || el.textContent.trim();
            if (!fullText) return;

            el.dataset.fullText = fullText;
            el.setAttribute('aria-label', fullText);
            el.textContent = '';
            el.classList.add('is-typing');

            let index = 0;
            const step = () => {
                if (index <= fullText.length) {
                    el.textContent = fullText.slice(0, index);
                    index += 1;
                    window.setTimeout(step, 20);
                    return;
                }

                el.classList.remove('is-typing');
                el.dataset.typed = 'true';
            };

            step();
        };

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    runTypewriter(entry.target);
                    observer.unobserve(entry.target);
                });
            },
            { threshold: 0.32 }
        );

        titles.forEach((el) => {
            el.classList.add('typewriter-ready');
            observer.observe(el);
        });
    }

    setupCommandPalette() {
        if (!this.commandPalette || !this.commandInput || !this.commandOutput) {
            return;
        }

        const sectionCommands = {
            home: '#home',
            about: '#about',
            skills: '#skills',
            security: '#security',
            experience: '#experience',
            projects: '#projects',
            education: '#education',
            contact: '#contact'
        };

        const commandNames = [...Object.keys(sectionCommands), 'help'];
        let activeSuggestion = '';

        const focusInput = () => {
            window.setTimeout(() => {
                this.commandInput.focus();
                this.commandInput.select();
            }, 40);
        };

        const openPalette = () => {
            if (this.paletteOpen) return;
            this.paletteOpen = true;
            this.commandPalette.classList.add('is-open');
            this.commandPalette.setAttribute('aria-hidden', 'false');
            focusInput();
        };

        const closePalette = () => {
            if (!this.paletteOpen) return;
            this.paletteOpen = false;
            this.commandPalette.classList.remove('is-open');
            this.commandPalette.setAttribute('aria-hidden', 'true');
        };

        const runCommand = (rawInput) => {
            const command = (rawInput || '').trim().toLowerCase();
            if (!command) {
                this.commandOutput.textContent = 'enter a command.';
                return;
            }

            if (command === 'help') {
                this.commandOutput.textContent = 'available: home, about, skills, security, experience, projects, education, contact.';
                return;
            }

            const selector = sectionCommands[command];
            if (!selector) {
                this.commandOutput.textContent = `unknown command: ${command}`;
                return;
            }

            const target = document.querySelector(selector);
            if (!target) {
                this.commandOutput.textContent = `target not found: ${command}`;
                return;
            }

            this.commandOutput.textContent = `executing: ${command}`;
            closePalette();
            const offset = 80;
            this.smoothScrollTo(target.offsetTop - offset);
        };

        const updateSuggestion = (rawValue) => {
            const value = (rawValue || '').trim().toLowerCase();
            if (!value) {
                activeSuggestion = '';
                this.commandOutput.textContent = 'type a command and press Enter.';
                return;
            }

            const exact = commandNames.find((cmd) => cmd === value);
            if (exact) {
                activeSuggestion = exact;
                this.commandOutput.textContent = `ready: ${exact}`;
                return;
            }

            const startsWith = commandNames.filter((cmd) => cmd.startsWith(value));
            if (startsWith.length) {
                activeSuggestion = startsWith[0];
                this.commandOutput.textContent = `suggestion: ${startsWith.join(', ')}`;
                return;
            }

            activeSuggestion = '';
            this.commandOutput.textContent = `unknown command: ${value}`;
        };

        document.addEventListener('keydown', (event) => {
            const tag = (event.target && event.target.tagName) ? event.target.tagName.toLowerCase() : '';
            const isTypingContext = tag === 'input' || tag === 'textarea' || event.target.isContentEditable;

            if (event.key === '/' && !event.metaKey && !event.ctrlKey && !event.altKey && !isTypingContext) {
                event.preventDefault();
                openPalette();
                return;
            }

            if (event.key === 'Escape' && this.paletteOpen) {
                event.preventDefault();
                closePalette();
            }
        });

        this.commandInput.addEventListener('keydown', (event) => {
            if (event.key === 'Tab') {
                event.preventDefault();
                if (activeSuggestion) {
                    this.commandInput.value = activeSuggestion;
                    updateSuggestion(activeSuggestion);
                }
                return;
            }

            if (event.key === 'Enter') {
                event.preventDefault();
                runCommand(this.commandInput.value);
                this.commandInput.value = '';
                updateSuggestion('');
            }

            if (event.key === 'Escape') {
                event.preventDefault();
                closePalette();
            }
        });

        this.commandInput.addEventListener('input', () => {
            updateSuggestion(this.commandInput.value);
        });

        this.commandPalette.addEventListener('click', (event) => {
            if (event.target === this.commandPalette) {
                closePalette();
            }

            const chip = event.target.closest('.command-chip');
            if (chip) {
                const command = chip.getAttribute('data-command') || '';
                runCommand(command);
            }
        });
    }

    setupSecurityStatusTicker() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) {
            return;
        }

        const targets = Array.from(document.querySelectorAll('.status-value[data-rotate]'));
        if (!targets.length) {
            return;
        }

        const pools = targets.map((el) => {
            const values = (el.dataset.rotate || '')
                .split('|')
                .map((v) => v.trim())
                .filter(Boolean);
            return { el, values, index: 0 };
        });

        window.setInterval(() => {
            pools.forEach((pool) => {
                if (!pool.values.length) return;
                pool.index = (pool.index + 1) % pool.values.length;
                pool.el.classList.remove('status-flip');
                void pool.el.offsetWidth;
                pool.el.textContent = pool.values[pool.index];
                pool.el.classList.add('status-flip');
            });
        }, 2200);
    }

    // Native lazy loading with fallback
    setupLazyLoading() {
        if ('loading' in HTMLImageElement.prototype) {
            const images = document.querySelectorAll('img[src]');
            images.forEach(img => {
                if (!img.hasAttribute('loading')) {
                    img.loading = 'lazy';
                }
            });
        } else {
            // Fallback for older browsers
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        imageObserver.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    setupResumeFallback() {
        const resumeLinks = document.querySelectorAll('a[href="resume/Sabin_Khatri_Resume.pdf"]');
        if (!resumeLinks.length) return;

        if (!window.location.protocol.startsWith('http')) {
            return;
        }

        fetch('resume/Sabin_Khatri_Resume.pdf', { method: 'HEAD', cache: 'no-store' })
            .then((response) => {
                if (response.ok) return;

                resumeLinks.forEach((link) => {
                    link.classList.add('disabled-download');
                    link.setAttribute('aria-disabled', 'true');
                    link.addEventListener('click', (event) => {
                        event.preventDefault();
                        alert('Resume is temporarily unavailable. Please contact me at khatrisa9@gmail.com.');
                    });
                });
            })
            .catch(() => {
                // Network checks can fail in some environments; keep links functional.
            });
    }
}

function setupTerminalBootLoader() {
    const loader = document.getElementById('boot-loader');
    if (!loader) {
        return () => {};
    }

    const commandEl = document.getElementById('boot-command');
    const statusEl = document.getElementById('boot-status');
    const loadingEl = document.getElementById('boot-loading');
    const asciiEl = document.getElementById('boot-ascii');

    const startTime = Date.now();
    let hidden = false;
    document.body.classList.add('booting');

    const sleep = (ms) => new Promise((resolve) => window.setTimeout(resolve, ms));

    const runTerminalAnimation = async () => {
        if (!commandEl || !statusEl || !loadingEl || !asciiEl) {
            return;
        }

        const commandText = './sh startup.sh';
        statusEl.textContent = 'initializing shell...';
        loadingEl.textContent = 'loading...';

        for (const char of commandText) {
            commandEl.textContent += char;
            await sleep(55);
        }

        await sleep(160);
        statusEl.textContent = 'executing startup script...';
        asciiEl.classList.add('is-visible');

        const frames = ['loading.', 'loading..', 'loading...'];
        for (let i = 0; i < 8; i += 1) {
            loadingEl.textContent = frames[i % frames.length];
            await sleep(120);
        }

        statusEl.textContent = 'interface ready.';
        loadingEl.textContent = 'done.';
    };

    const animationPromise = runTerminalAnimation();

    const hideLoader = () => {
        if (hidden) return;
        hidden = true;
        loader.classList.add('is-hidden');
        document.body.classList.remove('booting');
        window.setTimeout(() => {
            loader.remove();
        }, 460);
    };

    const hideWhenReady = async () => {
        await animationPromise;
        const elapsed = Date.now() - startTime;
        const minimumVisible = 2000;
        const wait = Math.max(0, minimumVisible - elapsed);
        window.setTimeout(hideLoader, wait);
    };

    if (document.readyState === 'complete') {
        hideWhenReady();
    } else {
        window.addEventListener('load', hideWhenReady, { once: true });
        window.setTimeout(hideWhenReady, 3200);
    }

    return hideLoader;
}

// Initialize app when DOM is ready
function initApp() {
    const hideBootLoader = setupTerminalBootLoader();

    try {
        // Ensure all content is visible and remove any inline opacity styles
        const allContent = document.querySelectorAll('*');
        allContent.forEach(el => {
            if (el.style.opacity === '0') {
                el.style.opacity = '';
            }
        });
        
        new PortfolioApp();
    } catch (error) {
        console.error('Error initializing portfolio app:', error);
        // Fallback: ensure everything is visible
        const allContent = document.querySelectorAll('*');
        allContent.forEach(el => {
            if (el.style.opacity === '0') {
                el.style.opacity = '';
            }
        });
        
        // Basic functionality without advanced features
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });

        // If initialization fails, still reveal the page.
        hideBootLoader();
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
