
import { useState, useEffect } from 'react'
import { Copy, MousePointer2, X, Loader2, Check } from 'lucide-react'
import './index.css'

function App() {
  const [state, setState] = useState('TOOLBAR') // 'TOOLBAR', 'LOADING', 'SUCCESS', 'SELECTION'
  const [message, setMessage] = useState('')

  // Expose UI control to window so core script can call it
  useEffect(() => {
    window.__FIGMA_UI__ = {
      showLoading: (msg) => {
        setState('LOADING')
        setMessage(msg || '正在复制网页，请耐心等待')
      },
      showSuccess: (msg) => {
        setState('SUCCESS')
        setMessage(msg || '复制成功！请到 Figma 粘贴文件')
        setTimeout(() => setState('TOOLBAR'), 3000)
      },
      showToolbar: () => setState('TOOLBAR'),
      close: () => setState('IDLE') // Or remove component
    }
    
    // Notify core that UI is ready
    if (window.__FIGMA_CORE__ && window.__FIGMA_CORE__.onUIReady) {
        window.__FIGMA_CORE__.onUIReady();
    }
  }, [])

  const handleCopyPage = async () => {
    setState('LOADING')
    setMessage('正在复制网页，请耐心等待')
    
    // Call Core Script
    try {
        if (window.__FIGMA_CORE__) {
            await window.__FIGMA_CORE__.capturePage()
            // Success state will be triggered by core or here
            setState('SUCCESS')
            setMessage('复制成功！请到 Figma 粘贴文件')
            setTimeout(() => setState('TOOLBAR'), 3000)
        } else {
            console.error("Figma Core not found")
            setTimeout(() => setState('TOOLBAR'), 1000)
        }
    } catch (e) {
        console.error(e)
        setState('TOOLBAR') // Or error state
    }
  }

  const handleSelectElement = () => {
    setState('SELECTION') // UI might hide or show "Select element" tip
    if (window.__FIGMA_CORE__) {
        window.__FIGMA_CORE__.startSelectionMode()
    }
  }

  const handleClose = () => {
    // Tell core to cleanup
    if (window.__FIGMA_CORE__) {
        window.__FIGMA_CORE__.close()
    }
    // Remove self? Or just hide
    // For now, just hide toolbar logic
  }

  if (state === 'IDLE') return null

  return (
    <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[2147483647]">
      <div className="figma-toolbar">
        
        {/* LOADING STATE */}
        {state === 'LOADING' && (
          <>
            <Loader2 className="animate-spin text-gray-500" />
            <span className="figma-text">{message}</span>
          </>
        )}

        {/* SUCCESS STATE */}
        {state === 'SUCCESS' && (
          <>
            <Check className="text-green-500" />
            <span className="figma-text">{message}</span>
            <button className="figma-btn" onClick={() => setState('TOOLBAR')}>
              <X size={16} />
            </button>
          </>
        )}

        {/* TOOLBAR STATE */}
        {state === 'TOOLBAR' && (
          <>
            <span className="figma-text mr-2">已复制成功！你还可以</span>
            <div className="w-px h-4 bg-gray-200 mx-1"></div>
            
            <button 
                className="figma-btn" 
                onClick={handleCopyPage}
                title="重新复制网页"
            >
              <Copy size={18} />
              <span className="ml-1 text-sm">重新复制网页</span>
            </button>
            
            <button 
                className="figma-btn" 
                onClick={handleSelectElement}
                title="复制网页元素"
            >
              <MousePointer2 size={18} />
              <span className="ml-1 text-sm">复制网页元素</span>
            </button>
            
            <div className="w-px h-4 bg-gray-200 mx-1"></div>
            
            <button className="figma-btn" onClick={handleClose}>
              <X size={18} />
            </button>
          </>
        )}
        
        {/* SELECTION STATE (Simple Tip) */}
        {state === 'SELECTION' && (
           <>
             <MousePointer2 className="text-blue-500" />
             <span className="figma-text">请选择要复制的元素</span>
             <button className="figma-btn text-sm" onClick={() => {
                 setState('TOOLBAR');
                 if(window.__FIGMA_CORE__) window.__FIGMA_CORE__.stopSelectionMode();
             }}>
               返回
             </button>
           </>
        )}

      </div>
    </div>
  )
}

export default App
