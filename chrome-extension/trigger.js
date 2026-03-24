(async function() {
    const config = JSON.parse(sessionStorage.getItem('FIGMA_CAPTURE_CONFIG') || '{}');
    const mode = sessionStorage.getItem('FIGMA_CAPTURE_MODE');
    
    // Helper: Wait function
    const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    // --- Icon Replacement Logic (Patch) ---
    function patchToolbarIcons() {
        const host = document.getElementById('__figma_ext_host__');
        if (!host || !host.shadowRoot) return;

        // 1. Inject Styles
        if (!host.shadowRoot.getElementById('figma-ext-custom-styles')) {
            const style = document.createElement('style');
            style.id = 'figma-ext-custom-styles';
            style.textContent = `
                /* 
                   Target specific icons that we have marked with .custom-icon.
                   We enforce dimensions to prevent layout collapse when hiding children.
                */
                
                .custom-icon svg {
                    width: 20px !important;
                    height: 20px !important;
                    min-width: 20px !important;
                    display: inline-block !important;
                    vertical-align: middle !important;
                    background-repeat: no-repeat !important;
                    background-position: center !important;
                    background-size: contain !important;
                    opacity: 1 !important;
                    fill: transparent !important;
                }
                
                /* Hide the original content (paths) of the SVG */
                .custom-icon svg * {
                    display: none !important;
                }

                /* Specific Icons */
                /* Put success first so other specific icons can override it if nested */
                .icon-success svg {
                    background-image: url('data:image/svg+xml;utf8,<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4ZM16.4375 9.58984C16.2109 9.3481 15.8316 9.33586 15.5898 9.5625L10.666 14.1768L8.41016 12.0625C8.16841 11.8359 7.78914 11.8481 7.5625 12.0898C7.33586 12.3316 7.3481 12.7109 7.58984 12.9375L10.2559 15.4375C10.4867 15.6539 10.8464 15.6539 11.0771 15.4375L16.4102 10.4375C16.6519 10.2109 16.6641 9.83159 16.4375 9.58984Z" fill="%2312B981"/></svg>') !important;
                }
                .icon-browser svg {
                    background-image: url('data:image/svg+xml;utf8,<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="5.5" width="15" height="13" rx="2" stroke="black" stroke-width="1.2" stroke-linecap="round"/><path d="M5 7.5C5 6.39543 5.89543 5.5 7 5.5H18C19.1046 5.5 20 6.39543 20 7.5V9.5H5V7.5Z" stroke="black" stroke-width="1.2" stroke-linecap="round"/><circle cx="7.5" cy="7.5" r="0.5" fill="black"/><circle cx="9.5" cy="7.5" r="0.5" fill="black"/></svg>') !important;
                }
                .icon-select svg {
                    background-image: url('data:image/svg+xml;utf8,<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.9101 18.4309L12.524 11.9982C12.4993 11.5869 12.9548 11.324 13.2986 11.551L18.6764 15.1017C19.0774 15.3665 18.9105 15.9893 18.4309 16.0181L15.7137 16.1812C15.5566 16.1906 15.4131 16.2734 15.3264 16.4048L13.8265 18.6764C13.5617 19.0774 12.9389 18.9105 12.9101 18.4309Z" stroke="black" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 18H7C5.89543 18 5 17.1046 5 16V7C5 5.89543 5.89543 5 7 5H16C17.1046 5 18 5.89543 18 7V10" stroke="black" stroke-width="1.2" stroke-linecap="round"/></svg>') !important;
                }
                .icon-close svg {
                    background-image: url('data:image/svg+xml;utf8,<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.33984 17.6583L17.6536 6.34462" stroke="black" stroke-width="1.2" stroke-linecap="round"/><path d="M6.34766 6.34399L17.6614 17.6577" stroke="black" stroke-width="1.2" stroke-linecap="round"/></svg>') !important;
                }
            `;
            host.shadowRoot.appendChild(style);
        }

        // 2. Assign classes to buttons
        const buttons = host.shadowRoot.querySelectorAll('button');
        buttons.forEach(btn => {
            const text = btn.textContent || "";
            
            // CLEANUP: Always remove all custom classes first to prevent state pollution
            // This fixes the issue where "Recapture" gets "Select" icon after returning from Select mode
            btn.classList.remove('custom-icon', 'icon-browser', 'icon-select', 'icon-success', 'icon-close');

            // Recapture Button
            if (text.includes('重新')) {
                btn.classList.add('custom-icon', 'icon-browser');
            }
            
            // Select Button
            if (text.includes('选择')) {
                btn.classList.add('custom-icon', 'icon-select');
            }

            // Close Button
            if (text.trim() === '') {
                if (btn.querySelector('svg')) {
                    btn.classList.add('custom-icon', 'icon-close');
                }
            }
        });

        // 3. Assign classes to Status Bar elements
        const divs = host.shadowRoot.querySelectorAll('div, span');
        divs.forEach(el => {
            if (el.closest('button')) return;
            const text = el.textContent || "";
            
            // Select Element Status
            if (text.includes('选择元素')) {
                 let container = el;
                 if (!el.querySelector('svg')) container = el.parentElement;
                 
                 if (container && container.querySelector('svg')) {
                     container.classList.add('custom-icon', 'icon-select');
                 }
            }

            // Copied Status
            if (text.includes('已复制')) {
                // If this is the "Choose action" banner, we DO NOT want to apply the icon to the container
                // because there is no icon for the text itself, only for the buttons.
                if (text.includes('选择操作')) {
                     return; 
                }

                let container = el;
                if (!el.querySelector('svg')) container = el.parentElement;
                
                if (container && container.querySelector('svg')) {
                    container.classList.add('custom-icon', 'icon-success');
                }
            }
        });
    }

    // Run patch periodically (Switching back to setInterval for stability)
    const patchInterval = setInterval(() => {
        try {
            patchToolbarIcons();
        } catch (e) {
            console.error("Icon patch error:", e);
        }
    }, 50);

    setTimeout(() => clearInterval(patchInterval), 60000);
    patchToolbarIcons();

    // ==============================================================================
    // --- PAYLOAD INTERCEPTOR & OPTIMIZER (V1.2 Feature) ---
    // Intercepts the Figma clipboard write to apply font fixes and DOM flattening
    // ==============================================================================
    function installInterceptor() {
        if (window.__figmaCaptureInterceptor) return;
        window.__figmaCaptureInterceptor = true;

        const CJK_RE = /[\u4e00-\u9fff\u3400-\u4dbf\u3040-\u309f\u30a0-\u30ff\uac00-\ud7af]/;
        const ICON_RE = /Material|Symbol|Icon|FontAwesome|fa-/i;
        const SERIF_FONTS = new Set(['Georgia', 'Times New Roman', 'Times', 'Palatino', 'Garamond']);
        const PASSTHROUGH_TAGS = new Set(['DIV', 'SPAN', 'SECTION', 'ARTICLE', 'MAIN', 'ASIDE', 'HEADER', 'FOOTER', 'NAV']);

        // --- Helpers ---
        function collectText(node) {
            if (!node || typeof node !== 'object') return '';
            if (node.nodeType === 3) return node.text || '';
            if (node.nodeType === 1 && Array.isArray(node.childNodes)) {
                return node.childNodes.map(collectText).join('');
            }
            return '';
        }

        // --- Font Fix ---
        function isSerif(ff) {
            const list = ff.split(',').map(f => f.trim().replace(/^["']|["']$/g, ''));
            return list.some(f => SERIF_FONTS.has(f) || f === 'serif');
        }

        function fixFont(node) {
            if (!node || typeof node !== 'object') return;
            if (node.nodeType === 3) return;

            if (node.nodeType === 1) {
                if (Array.isArray(node.childNodes)) node.childNodes.forEach(fixFont);

                const ff = node.styles?.fontFamily;
                
                // Fallback for missing fonts
                if (!ff) {
                    if (!node.styles) node.styles = {};
                    node.styles.fontFamily = 'Inter, PingFang SC, Noto Sans SC, sans-serif';
                    return;
                }

                if (/PingFang|Noto (Sans|Serif) SC|Microsoft YaHei/i.test(ff)) return;

                // Keep icon fonts but add CJK fallback
                if (ICON_RE.test(ff)) {
                    const text = collectText(node);
                    if (text && CJK_RE.test(text)) {
                        node.styles.fontFamily = ff + ', PingFang SC';
                    }
                    return;
                }

                // Apply CJK Fix
                const text = collectText(node);
                if (text && CJK_RE.test(text)) {
                    if (!node.styles) node.styles = {};
                    node.styles.fontFamily = isSerif(ff) ? 'Noto Serif SC, serif' : 'PingFang SC, Noto Sans SC, sans-serif';
                }
            }
        }

        // --- DOM Flattening ---
        const TRANSPARENT_RE = /transparent|rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*0(\.0+)?\s*\)/i;
        const ZERO_BORDER_RE = /^0(px)?\b/;

        function isVisibleBg(v) { return v && v !== 'none' && v !== '0' && !TRANSPARENT_RE.test(v); }
        function isVisibleBorder(v) { return v && v !== 'none' && v !== '0' && v !== '0px' && !ZERO_BORDER_RE.test(v) && !TRANSPARENT_RE.test(v); }

        function hasDecoration(node) {
            const s = node.styles || {};
            if (isVisibleBg(s.backgroundColor) || isVisibleBg(s.background) || isVisibleBg(s.backgroundImage)) return true;
            for (const key of ['border', 'borderTop', 'borderRight', 'borderBottom', 'borderLeft']) {
                if (isVisibleBorder(s[key])) return true;
            }
            for (const side of ['Top', 'Right', 'Bottom', 'Left']) {
                const w = s[`border${side}Width`];
                if (w && w !== '0' && w !== '0px') {
                    const c = s[`border${side}Color`];
                    if (c && !TRANSPARENT_RE.test(c)) return true;
                }
            }
            for (const key of ['boxShadow', 'outline']) {
                if (s[key] && s[key] !== 'none' && s[key] !== '0') return true;
            }
            if (s.opacity && s.opacity !== '1') return true;
            return false;
        }

        function sizeMatch(parentRect, childRect) {
            if (!parentRect || !childRect) return true;
            const dw = Math.abs((parentRect.width || 0) - (childRect.width || 0));
            const dh = Math.abs((parentRect.height || 0) - (childRect.height || 0));
            return dw <= 4 && dh <= 4;
        }

        function canFlatten(node) {
            if (!node || node.nodeType !== 1) return false;
            if (!PASSTHROUGH_TAGS.has((node.tag || '').toUpperCase())) return false;
            if (hasDecoration(node)) return false;
            const children = Array.isArray(node.childNodes) ? node.childNodes : [];
            if (children.length !== 1) return false;
            const child = children[0];
            
            const s = node.styles || {};
            const hasClip = s.overflow === 'hidden' || s.overflow === 'clip' || s.overflowX === 'hidden' || s.overflowY === 'hidden';
            if (hasClip && !sizeMatch(node.rect, child.rect)) return false;
            
            if (child.nodeType === 3) return true;
            return sizeMatch(node.rect, child.rect);
        }

        function promoteChild(wrapper, child) {
            const ws = wrapper.styles || {};
            for (const key of ['flex', 'flexGrow', 'flexShrink', 'flexBasis', 'order', 'alignSelf']) {
                if (ws[key] != null && ws[key] !== '') {
                    if (!child.styles) child.styles = {};
                    child.styles[key] = ws[key];
                }
            }
            return child;
        }

        function phase3Flatten(node) {
            if (!node || typeof node !== 'object') return node;
            if (node.nodeType === 3) return node;

            if (node.nodeType === 1 && Array.isArray(node.childNodes)) {
                node.childNodes = node.childNodes.map(phase3Flatten);
                const hasSiblings = node.childNodes.length > 1;
                const newChildren = [];
                let changed = false;
                for (const child of node.childNodes) {
                    if (canFlatten(child)) {
                        const promoted = child.childNodes[0];
                        if (promoted.nodeType === 3 && hasSiblings) {
                            newChildren.push(child);
                        } else {
                            newChildren.push(promoteChild(child, promoted));
                            changed = true;
                        }
                    } else {
                        newChildren.push(child);
                    }
                }
                if (changed) node.childNodes = newChildren;
            }
            return node;
        }

        function cleanupNodes(node) {
            if (!node || typeof node !== 'object') return node;
            if (node.nodeType === 3) return node;

            if (node.nodeType === 1 && Array.isArray(node.childNodes)) {
                node.childNodes = node.childNodes.map(cleanupNodes).filter(Boolean);
                
                // Remove pure whitespace text nodes
                node.childNodes = node.childNodes.filter(child => {
                    if (child.nodeType === 3 && !(child.text || '').trim()) return false;
                    return true;
                });

                // Remove zero-size empty frames
                const SELF_RENDERING = new Set(['IMG', 'SVG', 'VIDEO', 'CANVAS', 'INPUT', 'TEXTAREA', 'SELECT', 'IFRAME', 'HR']);
                node.childNodes = node.childNodes.filter(child => {
                    if (child.nodeType === 1) {
                        const r = child.rect;
                        const tag = (child.tag || '').toUpperCase();
                        const hasChildren = Array.isArray(child.childNodes) && child.childNodes.length > 0;
                        if (!hasChildren && !SELF_RENDERING.has(tag) && !hasDecoration(child) && r && (r.width < 1 || r.height < 1)) return false;
                    }
                    return true;
                });

                if (node.childNodes.length === 0) {
                    const tag = (node.tag || '').toUpperCase();
                    if (!SELF_RENDERING.has(tag) && !hasDecoration(node)) return null;
                }
            }
            return node;
        }

        function transformPayload(root) {
            fixFont(root);
            for (let i = 0; i < 3; i++) {
                cleanupNodes(root);
                phase3Flatten(root);
            }
            return root;
        }

        // --- The Interception ---
        const H2D_PREFIX = '<!--(figh2d)';
        const H2D_SUFFIX = '(/figh2d)-->';

        function fixHtmlFonts(html) {
            const match = html.match(/data-h2d="([^"]*)"/);
            if (!match) return html;

            let encoded = match[1];
            if (encoded.startsWith(H2D_PREFIX)) encoded = encoded.slice(H2D_PREFIX.length);
            if (encoded.endsWith(H2D_SUFFIX)) encoded = encoded.slice(0, -H2D_SUFFIX.length);

            try {
                const bytes = Uint8Array.from(atob(encoded), c => c.charCodeAt(0));
                const json = new TextDecoder().decode(bytes);
                const payload = JSON.parse(json);
                const root = payload.root || payload;
                
                if (root.nodeType === 1) {
                    transformPayload(root);
                    console.log('[ToFigma] Payload optimized: Fonts fixed & DOM flattened');
                }
                
                const outBytes = new TextEncoder().encode(JSON.stringify(payload));
                let binary = '';
                for (let i = 0; i < outBytes.length; i += 8192) {
                    binary += String.fromCharCode(...outBytes.subarray(i, i + 8192));
                }
                const newAttr = H2D_PREFIX + btoa(binary) + H2D_SUFFIX;
                return html.replace(match[1], newAttr);
            } catch (e) {
                console.warn('[ToFigma] Payload optimization failed:', e);
                return html;
            }
        }

        // Intercept clipboard.write (Used by official capture)
        const origWrite = navigator.clipboard.write.bind(navigator.clipboard);
        navigator.clipboard.write = async function(items) {
            const newItems = await Promise.all([...items].map(async (item) => {
                const types = item.types || [];
                if (types.includes('text/html')) {
                    try {
                        const blob = await item.getType('text/html');
                        const html = await blob.text();
                        const fixedHtml = fixHtmlFonts(html);
                        const data = {};
                        for (const t of types) {
                            data[t] = t === 'text/html'
                                ? new Blob([fixedHtml], { type: 'text/html' })
                                : await item.getType(t);
                        }
                        return new ClipboardItem(data);
                    } catch (e) {
                        console.warn('[ToFigma] Clipboard processing error:', e);
                    }
                }
                return item;
            }));
            return origWrite(newItems);
        };
    }

    // Install interceptor immediately before capture starts
    installInterceptor();
    // ==============================================================================


    // 1. Wait for Figma Script to load (max 5 seconds)
    let retries = 0;
    const MAX_RETRIES = 50; // 50 * 100ms = 5s
    
    // Check loop
    while (!window.figma || !window.figma.captureForDesign) {
        if (retries >= MAX_RETRIES) {
            console.error('Figma capture script not loaded after 5s');
            alert('Figma 插件加载超时，请刷新页面重试');
            return;
        }
        await wait(100);
        retries++;
    }

    // 2. Auto Scroll Logic (Only for full page capture to load lazy content)
    // Skip if selectElement mode
    if (mode !== 'selectElement') {
        try {
            const viewportHeight = window.innerHeight;
            let lastScrollY = window.scrollY;
            let unchangedCount = 0;
            
            // Scroll down loop
            // Step: 80% of viewport
            // Wait: 600ms
            while (true) {
                window.scrollBy({ top: viewportHeight * 0.8, behavior: 'smooth' });
                
                // Wait longer for scroll animation and natural feel
                await wait(600);

                const currentScrollY = window.scrollY;
                const scrollHeight = document.body.scrollHeight;

                // Check if we hit bottom or stopped moving
                if (Math.abs(currentScrollY - lastScrollY) < 10 || 
                    (currentScrollY + viewportHeight >= scrollHeight - 50)) {
                    unchangedCount++;
                } else {
                    unchangedCount = 0;
                }

                lastScrollY = currentScrollY;

                // Stop if we haven't moved for 2 checks (hit bottom)
                if (unchangedCount >= 2) break; 
                
                // Safety break for very long pages (limit to ~40 scrolls)
                if (window.scrollY > 40000) break; 
            }

            // Scroll back up instantly
            window.scrollTo({ top: 0, behavior: 'auto' });
            
            // Force layout recalc
            void document.body.offsetHeight; 
            
            // --- Pre-load images before capture ---
            const images = document.querySelectorAll('img');
            images.forEach(img => {
                // Force lazy images to load
                if (img.loading === 'lazy') {
                    img.loading = 'eager';
                }
                // Handle data-src patterns
                if (img.dataset.src && img.src !== img.dataset.src) {
                    img.src = img.dataset.src;
                }
                if (img.dataset.original && img.src !== img.dataset.original) {
                    img.src = img.dataset.original;
                }
                // Handle srcset: set sizes to large to force high-res load
                if (img.srcset && !img.sizes) {
                    img.sizes = '100vw';
                }
            });
            
            // Wait for scroll listeners and CSS transitions to settle
            await wait(1000);
            
            // Final safety check: ensure we are strictly at 0
            if (window.scrollY > 0) {
                window.scrollTo(0, 0);
                await wait(200);
            }

        } catch (e) {
            console.error("Auto-scroll failed:", e);
        }
    }

    // 3. Start Capture
    try {
        window.figma.captureForDesign({
            captureId: config.captureId,
            endpoint: config.endpoint,
            selector: config.selector || 'body',
            verbose: config.verbose,
            delayMs: config.delayMs
        });
    } catch (err) {
        console.error("Failed to start capture:", err);
        alert('启动插件失败: ' + err.message);
    }

    // Cleanup
    sessionStorage.removeItem('FIGMA_CAPTURE_CONFIG');
    sessionStorage.removeItem('FIGMA_CAPTURE_MODE');
})();
