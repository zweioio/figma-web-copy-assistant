
async function sendMessageToTab(tabId, message) {
  return new Promise((resolve, reject) => {
    chrome.tabs.sendMessage(tabId, message, (response) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else {
        resolve(response);
      }
    });
  });
}

async function injectContentScript(tabId) {
  await chrome.scripting.executeScript({
    target: { tabId: tabId },
    files: ['content.js']
  });
}

function localizeHtml() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        const msg = chrome.i18n.getMessage(key);
        if (msg) {
            el.textContent = msg;
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // 1. Localize
    localizeHtml();

    // Website Button
    const websiteBtn = document.getElementById('websiteBtn');
    if (websiteBtn) {
        websiteBtn.addEventListener('click', () => {
            // window.open('https://figma.com', '_blank'); // Placeholder URL
        });
    }

    // Capture Button
    const captureBtn = document.getElementById('captureBtn');
    if (captureBtn) {
        captureBtn.addEventListener('click', async () => {
          
          // Config (Always auto-scroll)
          const config = {
            autoScroll: true
          };
          
          const originalText = captureBtn.textContent;
          captureBtn.disabled = true;
          // captureBtn.textContent = chrome.i18n.getMessage('statusSending') || '指令已发送...';

          try {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            
            if (!tab) {
                throw new Error('No active tab found');
            }

            // Function to send message
            const sendMsg = () => new Promise((resolve, reject) => {
                chrome.tabs.sendMessage(tab.id, { action: 'capture', config }, (response) => {
                    if (chrome.runtime.lastError) {
                        reject(chrome.runtime.lastError);
                    } else {
                        resolve(response);
                    }
                });
            });

            try {
                // First attempt
                const response = await sendMsg();
                handleResponse(response);
            } catch (err) {
                console.log('First attempt failed, trying to re-inject content script...', err);
                
                // Inject script
                await chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    files: ['content.js']
                });
                
                // Wait for script init
                await new Promise(resolve => setTimeout(resolve, 100));
                
                // Second attempt
                const response = await sendMsg();
                handleResponse(response);
            }

          } catch (error) {
            console.error('Capture failed:', error);
            alert(chrome.i18n.getMessage('statusFailRefresh') || '连接失败，请刷新页面');
            captureBtn.disabled = false;
            captureBtn.textContent = originalText;
          }
          
          function handleResponse(response) {
              if (response && response.status === 'triggered') {
                  // Keep open briefly for feedback
                  // captureBtn.textContent = chrome.i18n.getMessage('statusSuccess') || '✅ 已复制！';
                  setTimeout(() => {
                      window.close();
                  }, 50); 
              }
          }
        });
    }
});

chrome.runtime.onMessage.addListener((request) => {
  const btn = document.getElementById('captureBtn');
  
  if (request.action === 'captureSuccess') {
    if (btn) {
        // btn.textContent = chrome.i18n.getMessage('statusSuccess') || '✅ 已复制！';
        setTimeout(() => {
            window.close();
        }, 50);
    }
  } else if (request.action === 'captureError') {
    const errorPrefix = chrome.i18n.getMessage('statusError') || '❌ 失败: ';
    alert(errorPrefix + (request.message || '未知错误'));
    if (btn) {
        btn.disabled = false;
        btn.textContent = chrome.i18n.getMessage('captureBtn');
    }
  }
});
