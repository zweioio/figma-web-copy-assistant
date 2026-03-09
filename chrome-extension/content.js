
// Inject Core Script (Official Logic)
function injectScript(file) {
  const script = document.createElement('script');
  script.src = chrome.runtime.getURL(file);
  script.onload = function() {
    this.remove();
    console.log(`✅ ${file} injected!`);
  };
  (document.head || document.documentElement).appendChild(script);
}

// Determine language and inject core
const uiLang = chrome.i18n.getUILanguage();
const coreScript = uiLang.startsWith('zh') ? 'official-capture.js' : 'official-capture-en.js';

injectScript(coreScript);

// Listen for messages from Popup or Background
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  
  // 1. Standard capture (from Popup)
  if (request.action === 'capture') {
    if (request.config) {
        sessionStorage.setItem('FIGMA_CAPTURE_CONFIG', JSON.stringify(request.config));
    }
    // Clear any specific mode override
    sessionStorage.removeItem('FIGMA_CAPTURE_MODE');
    
    injectScript('trigger.js');
    sendResponse({ status: 'triggered' });
  }
  
  // 2. Shortcut/ContextMenu trigger
  if (request.action === 'trigger_figma_capture') {
      // Set the mode (capturePage or selectElement)
      sessionStorage.setItem('FIGMA_CAPTURE_MODE', request.mode);
      
      injectScript('trigger.js');
      sendResponse({ status: 'triggered_with_mode' });
  }
});
