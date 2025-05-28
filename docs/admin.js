document.addEventListener('DOMContentLoaded', function() {
    const root = document.documentElement;
    const spacingControls = document.getElementById('spacing-controls');
    const adminBtn = document.getElementById('adminBtn');
    const adminModal = document.getElementById('adminModal');
    const adminPassword = document.getElementById('adminPassword');
    const submitPassword = document.getElementById('submitPassword');
    
    // Výchozí hodnoty pro text
    const defaultValues = {
        '.content-card': {
            'width': '900',
            'padding': '60',
            'border-radius': '40'
        },
        '.content-card p': {
            'font-size': '20',
            'margin-bottom': '24'
        },
        '.content-card .greeting, .content-card .question': {
            'font-size': '32'
        },
        '.content-btn': {
            'font-size': '20',
            'padding': '12'
        },
        '.navbar-padding': '32',
        '.hero-padding-top': '128',
        '.hero-padding-bottom': '128',
        '.hero-h1-margin-bottom': '24',
        '.hero-subtitle-margin-bottom': '32',
        '.clients-padding-top': '80',
        '.clients-padding-bottom': '80',
        '.section-title-margin-bottom': '64'
    };

    // Skryjeme controls na začátku
    if (spacingControls) {
        spacingControls.style.display = 'none';
    }

    // Admin přihlášení přes modal
    if (adminBtn && adminModal) {
        adminBtn.addEventListener('click', () => {
            adminModal.style.display = 'flex';
        });

        // Zavření modalu kliknutím mimo
        adminModal.addEventListener('click', (e) => {
            if (e.target === adminModal) {
                adminModal.style.display = 'none';
            }
        });
    }

    // Zpracování hesla
    if (submitPassword && adminPassword) {
        submitPassword.addEventListener('click', () => {
            if (adminPassword.value === '180admin') {
                if (adminModal) adminModal.style.display = 'none';
                if (spacingControls) spacingControls.style.display = 'block';
                sessionStorage.setItem('adminMode', 'true');
            } else {
                alert('Nesprávné heslo');
            }
            adminPassword.value = '';
        });

        // Enter na input
        adminPassword.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                submitPassword.click();
            }
        });
    }

    // Kontrola admin módu při načtení
    if (sessionStorage.getItem('adminMode') === 'true' && spacingControls) {
        spacingControls.style.display = 'block';
    }

    // Odhlášení
    const logoutBtn = document.getElementById('logoutAdmin');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            if (spacingControls) spacingControls.style.display = 'none';
            sessionStorage.removeItem('adminMode');
        });
    }

    // Event listeners pro slidery
    document.getElementById('sectionSpacing')?.addEventListener('input', function(e) {
        const value = e.target.value;
        root.style.setProperty('--section-spacing', value + 'px');
        document.getElementById('sectionSpacingValue').textContent = value + 'px';
    });

    document.getElementById('dividerMargin')?.addEventListener('input', function(e) {
        const value = e.target.value;
        root.style.setProperty('--section-divider-margin', value + 'px');
        document.getElementById('dividerMarginValue').textContent = value + 'px';
    });

    // Funkce pro proporční škálování
    function scaleText(targetWidth) {
        const baseWidth = 900; // Výchozí šířka
        const scale = targetWidth / baseWidth;
        
        // Škálování běžného textu
        const paragraphs = document.querySelectorAll('.content-card p:not(.greeting):not(.question)');
        paragraphs.forEach(p => {
            const baseFontSize = 20;
            p.style.fontSize = `${Math.round(baseFontSize * scale)}px`;
        });

        // Škálování nadpisů (greeting a question)
        const headlines = document.querySelectorAll('.content-card .greeting, .content-card .question');
        headlines.forEach(h => {
            const baseFontSize = 32;
            h.style.fontSize = `${Math.round(baseFontSize * scale)}px`;
        });

        // Škálování tlačítka
        const button = document.querySelector('.content-btn');
        if (button) {
            const baseButtonFontSize = 20;
            button.style.fontSize = `${Math.round(baseButtonFontSize * scale)}px`;
        }
    }

    // Upravený event listener pro slidery
    document.querySelectorAll('#spacing-controls input[type="range"]').forEach(input => {
        const valueDisplay = input.nextElementSibling;
        const target = input.dataset.target;
        const property = input.dataset.property;
        const unit = input.dataset.unit || '';
        const scale = parseFloat(input.dataset.scale) || 1;
        const scaleText = input.dataset.scaleText === 'true';

        if (!valueDisplay || !target || !property) return;

        // Nastavení počáteční hodnoty
        const value = input.value * scale;
        valueDisplay.textContent = `${value}${unit}`;

        if (property === 'y-offset') {
            // Speciální handling pro y-offset
            const elements = document.querySelectorAll(target);
            elements.forEach(el => {
                el.style.setProperty('--y-offset', `${value}px`);
            });
        } else if (property === 'textLength') {
            // Speciální handling pro textLength
            document.querySelectorAll(target).forEach(el => {
                el.setAttribute('textLength', value);
            });
        } else {
            // Standardní handling pro ostatní vlastnosti
            document.querySelectorAll(target).forEach(el => {
                el.style[property] = `${value}${unit}`;
            });
        }

        // Aktualizace při změně
        input.addEventListener('input', () => {
            const value = input.value * scale;
            valueDisplay.textContent = `${value}${unit}`;

            if (property === 'y-offset') {
                // Speciální handling pro y-offset
                const elements = document.querySelectorAll(target);
                elements.forEach(el => {
                    el.style.setProperty('--y-offset', `${value}px`);
                });
            } else if (property === 'textLength') {
                // Speciální handling pro textLength
                document.querySelectorAll(target).forEach(el => {
                    el.setAttribute('textLength', value);
                });
            } else {
                // Standardní handling pro ostatní vlastnosti
                document.querySelectorAll(target).forEach(el => {
                    el.style[property] = `${value}${unit}`;
                });
            }
            
            // Pokud je to slider pro šířku, škálujeme text
            if (scaleText) {
                scaleText(parseInt(value));
            }
        });
    });

    // Editace obsahu
    const editBtn = document.getElementById('editContent');
    const saveBtn = document.getElementById('saveContent');
    const cancelBtn = document.getElementById('cancelEdit');
    const contentView = document.querySelector('.content-view');
    const formattingControls = document.querySelector('.formatting-controls');
    let originalContent = '';

    // Funkce pro změnu velikosti písma
    window.changeFontSize = function(action) {
        const selection = window.getSelection();
        if (!selection.rangeCount) {
            alert('Nejprve vyberte text, který chcete upravit');
            return;
        }

        const range = selection.getRangeAt(0);
        const container = range.commonAncestorContainer;
        const selectedText = range.toString();

        if (!selectedText) {
            alert('Nejprve vyberte text, který chcete upravit');
            return;
        }

        // Vytvoření nového elementu
        const span = document.createElement('span');
        span.textContent = selectedText;

        // Získání aktuální velikosti písma
        let currentSize = parseInt(window.getComputedStyle(container.parentElement || container).fontSize);
        if (isNaN(currentSize)) currentSize = 20; // výchozí velikost

        // Nastavení nové velikosti
        const newSize = action === 'increase' ? currentSize + 2 : currentSize - 2;
        span.style.fontSize = `${newSize}px`;

        // Aplikování změny
        range.deleteContents();
        range.insertNode(span);
        
        // Vyčištění selection
        selection.removeAllRanges();
    };

    if (editBtn) {
        editBtn.addEventListener('click', function() {
            originalContent = contentView.innerHTML;
            contentView.contentEditable = true;
            contentView.focus();
            editBtn.style.display = 'none';
            saveBtn.style.display = 'inline-block';
            cancelBtn.style.display = 'inline-block';
            formattingControls.style.display = 'flex';
            contentView.classList.add('editing');
        });
    }

    if (saveBtn) {
        saveBtn.addEventListener('click', function() {
            contentView.contentEditable = false;
            contentView.classList.remove('editing');
            saveBtn.style.display = 'none';
            cancelBtn.style.display = 'none';
            formattingControls.style.display = 'none';
            editBtn.style.display = 'inline-block';
            localStorage.setItem('cardContent', contentView.innerHTML);
        });
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', function() {
            contentView.contentEditable = false;
            contentView.innerHTML = originalContent;
            contentView.classList.remove('editing');
            saveBtn.style.display = 'none';
            cancelBtn.style.display = 'none';
            formattingControls.style.display = 'none';
            editBtn.style.display = 'inline-block';
        });
    }

    // Načtení uloženého obsahu
    if (contentView) {
        const savedContent = localStorage.getItem('cardContent');
        if (savedContent) {
            contentView.innerHTML = savedContent;
        }
    }

    // Výchozí hodnoty pro reset
    function loadSavedValues() {
        const savedValues = localStorage.getItem('spacingValues');
        if (savedValues) {
            const values = JSON.parse(savedValues);
            document.querySelectorAll('#spacing-controls input[type="range"]').forEach(input => {
                const target = input.dataset.target;
                const property = input.dataset.property;
                const key = `${target}-${property}`.replace('.', '');
                if (values[key]) {
                    input.value = values[key];
                    const event = new Event('input');
                    input.dispatchEvent(event);
                }
            });
        }
    }

    // Uložení hodnot
    function saveCurrentValues() {
        const values = {};
        document.querySelectorAll('#spacing-controls input[type="range"]').forEach(input => {
            const target = input.dataset.target;
            const property = input.dataset.property;
            const key = `${target}-${property}`.replace('.', '');
            values[key] = input.value;
        });
        localStorage.setItem('spacingValues', JSON.stringify(values));
        alert('Pozice byly úspěšně uloženy!');
    }

    // Reset na výchozí hodnoty
    function resetToDefault() {
        if (confirm('Opravdu chcete resetovat všechny pozice do výchozího stavu?')) {
            document.querySelectorAll('#spacing-controls input[type="range"]').forEach(input => {
                const target = input.dataset.target;
                const property = input.dataset.property;
                const key = `${target}-${property}`.replace('.', '');
                if (defaultValues[key]) {
                    input.value = defaultValues[key];
                    const event = new Event('input');
                    input.dispatchEvent(event);
                }
            });
            localStorage.removeItem('spacingValues');
            alert('Pozice byly resetovány do výchozího stavu.');
        }
    }

    // Event listeners pro tlačítka
    document.getElementById('saveSpacing')?.addEventListener('click', saveCurrentValues);
    document.getElementById('resetSpacing')?.addEventListener('click', resetToDefault);

    // Načtení uložených hodnot při startu
    loadSavedValues();

    // Scroll-based animation speed control
    let lastScrollTop = 0;
    let lastScrollTime = Date.now();
    let scrollVelocity = 0;

    window.addEventListener('scroll', () => {
        const now = Date.now();
        const st = window.pageYOffset || document.documentElement.scrollTop;
        const timeDiff = now - lastScrollTime;
        
        // Výpočet rychlosti scrollování (px/ms)
        if (timeDiff > 0) {
            scrollVelocity = Math.abs(st - lastScrollTop) / timeDiff;
        }
        
        // Omezení rozsahu rychlosti animace (mezi 2s a 10s)
        const minDuration = 2;
        const maxDuration = 10;
        const velocityThreshold = 1; // px/ms
        
        let animationDuration = maxDuration;
        if (scrollVelocity > 0) {
            // Převod rychlosti scrollu na dobu animace
            animationDuration = maxDuration - (Math.min(scrollVelocity, velocityThreshold) / velocityThreshold) * (maxDuration - minDuration);
        }
        
        // Aplikace nové rychlosti animace
        document.documentElement.style.setProperty('--stroke-animation-duration', `${animationDuration}s`);
        
        // Uložení hodnot pro příští výpočet
        lastScrollTop = st;
        lastScrollTime = now;
        
        // Postupné zpomalení animace zpět na původní rychlost
        clearTimeout(window.scrollTimeout);
        window.scrollTimeout = setTimeout(() => {
            document.documentElement.style.setProperty('--stroke-animation-duration', `${maxDuration}s`);
        }, 150);
    });

    // Scroll-based content card animation
    const contentCard = document.querySelector('.content-card');
    const contentSection = document.querySelector('.content-marketing');

    function updateContentCardPosition() {
        if (!contentCard || !contentSection) return;

        const sectionTop = contentSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        const sectionHeading = contentSection.querySelector('.section-heading');
        
        // Začneme animovat, když je sekce více viditelná
        const headingTriggerPoint = windowHeight * 0.8;  // Dřívější trigger pro nadpis
        const cardTriggerPoint = windowHeight * 0.5;     // Karta zůstává stejně
        
        // Animace nadpisu
        if (sectionHeading) {
            if (sectionTop <= headingTriggerPoint) {
                sectionHeading.classList.add('visible');
            } else {
                sectionHeading.classList.remove('visible');
            }
        }
        
        // Animace karty
        if (sectionTop <= cardTriggerPoint) {
            contentCard.classList.add('visible');
        } else {
            contentCard.classList.remove('visible');
        }
    }

    // Přidáme event listener pro scroll
    window.addEventListener('scroll', updateContentCardPosition);

    // Initial check
    updateContentCardPosition();
}); 