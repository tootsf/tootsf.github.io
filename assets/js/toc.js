// Table of Contents functionality
document.addEventListener('DOMContentLoaded', function() {
    generateTOC();
    updateActiveSection();
    addMobileToggle();
    
    // Update active section on scroll
    window.addEventListener('scroll', updateActiveSection);
});

function generateTOC() {
    // Only generate TOC for pages with content
    const content = document.querySelector('.main-content');
    if (!content) return;
    
    // Find all headings in the content
    const headings = content.querySelectorAll('h1, h2, h3, h4, h5, h6');
    if (headings.length < 2) return; // Don't show TOC if less than 2 headings
    
    // Create TOC container
    const tocContainer = document.createElement('div');
    tocContainer.className = 'toc-right';
    tocContainer.id = 'toc-sidebar';
    
    // Create TOC title
    const tocTitle = document.createElement('h3');
    tocTitle.textContent = 'Table of Contents';
    tocContainer.appendChild(tocTitle);
    
    // Create TOC list
    const tocList = document.createElement('ul');
    
    let tocHTML = '';
    let functionCount = 0;
    
    headings.forEach((heading, index) => {
        // Skip headings with .no_toc class
        if (heading.classList.contains('no_toc')) return;
        
        // Create an ID if the heading doesn't have one
        if (!heading.id) {
            heading.id = 'heading-' + index;
        }
        
        const level = heading.tagName.toLowerCase();
        const text = heading.textContent.trim();
        const link = '#' + heading.id;
        
        // Skip empty headings
        if (!text) return;
        
        // Special handling for function indicators (🔹)
        if (text.includes('🔹')) {
            functionCount++;
            const cleanText = text.replace('🔹', '').trim();
            tocHTML += `<li><a href="${link}" class="toc-${level} toc-function" data-target="${heading.id}">${cleanText}</a></li>`;
        } else {
            tocHTML += `<li><a href="${link}" class="toc-${level}" data-target="${heading.id}">${text}</a></li>`;
        }
    });
    
    if (tocHTML) {
        tocList.innerHTML = tocHTML;
        tocContainer.appendChild(tocList);
        document.body.appendChild(tocContainer);
        
        // Add function styling
        const functionLinks = tocContainer.querySelectorAll('.toc-function');
        functionLinks.forEach(link => {
            link.style.fontWeight = '600';
            link.style.borderLeft = '3px solid var(--link-color)';
            link.style.paddingLeft = '12px';
        });
        
        // Add click handlers for smooth scrolling
        const tocLinks = tocContainer.querySelectorAll('a');
        tocLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('data-target');
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Add a brief highlight to the target
                    targetElement.style.backgroundColor = 'var(--code-background-color)';
                    setTimeout(() => {
                        targetElement.style.backgroundColor = '';
                    }, 1000);
                }
            });
        });
    }
}

function updateActiveSection() {
    const tocLinks = document.querySelectorAll('.toc-right a');
    if (tocLinks.length === 0) return;
    
    let activeLink = null;
    const scrollPosition = window.scrollY + 100; // Offset for better UX
    
    tocLinks.forEach(link => {
        const targetId = link.getAttribute('data-target');
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            const elementTop = targetElement.offsetTop;
            
            if (scrollPosition >= elementTop) {
                // Remove active class from previous link
                if (activeLink) {
                    activeLink.classList.remove('toc-active');
                }
                activeLink = link;
            }
        }
    });
    
    // Add active class to current link
    if (activeLink) {
        tocLinks.forEach(link => link.classList.remove('toc-active'));
        activeLink.classList.add('toc-active');
    }
}

// Add mobile toggle functionality
function addMobileToggle() {
    const toc = document.getElementById('toc-sidebar');
    if (!toc) return;
    
    // Create toggle button
    const toggleButton = document.createElement('button');
    toggleButton.className = 'toc-toggle';
    toggleButton.innerHTML = '📋';
    toggleButton.title = 'Toggle Table of Contents';
    
    // Add click handler
    toggleButton.addEventListener('click', function() {
        toc.classList.toggle('mobile-show');
        if (toc.classList.contains('mobile-show')) {
            toggleButton.innerHTML = '✕';
        } else {
            toggleButton.innerHTML = '📋';
        }
    });
    
    document.body.appendChild(toggleButton);
    
    // Close TOC when clicking outside on mobile
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 1400 && 
            !toc.contains(e.target) && 
            !toggleButton.contains(e.target) &&
            toc.classList.contains('mobile-show')) {
            toc.classList.remove('mobile-show');
            toggleButton.innerHTML = '📋';
        }
    });
}

// Show/hide TOC based on content
function toggleTOC() {
    const toc = document.getElementById('toc-sidebar');
    const content = document.querySelector('.main-content');
    
    if (toc && content) {
        const headings = content.querySelectorAll('h1, h2, h3, h4, h5, h6');
        const validHeadings = Array.from(headings).filter(h => !h.classList.contains('no_toc'));
        
        if (validHeadings.length < 2) {
            toc.style.display = 'none';
        } else {
            toc.style.display = 'block';
        }
    }
}
