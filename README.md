# Copy web to Figma

[English](#english) | [中文](#chinese)

---

<a name="english"></a>
## 🇬🇧 English

**One-click copy of a webpage and conversion into an editable Figma design.**

Supports any website, no Figma plugin needed, completely free to use.

👉 **[Install from Chrome Web Store](https://chromewebstore.google.com/detail/paomhndjjomojpmclhjnehoelclagpfp?utm_source=item-share-cb)**

### Features

- **One-Click Capture**: Easily convert any web page into a Figma-ready design.
- **Smart DOM Optimization**: Intercepts clipboard data to flatten deeply nested `div`/`span` wrappers, making Figma layers incredibly clean and easy to edit.
- **CJK Font Auto-Fix**: Automatically detects Chinese/Japanese/Korean text and replaces missing fonts with `PingFang SC` or `Noto Sans SC`, preventing the dreaded Figma missing font boxes.
- **High Fidelity**: Captures layout, styles, fonts, and images accurately.
- **Smart Handling**:
  - Automatically scrolls to capture full-page content.
  - Handles sticky headers and lazy-loaded images intelligently.
  - Fixes layout shifts during capture.
- **Responsive UI Support**: Capture elements or full pages directly.
- **Multi-Language Support**: English and Chinese (Simplified) interface support.
- **Privacy Focused**: Runs locally in your browser, minimal permissions required.

### Installation

**Option 1: Chrome Web Store (Recommended)**
1.  Visit the [Chrome Web Store page](https://chromewebstore.google.com/detail/paomhndjjomojpmclhjnehoelclagpfp?utm_source=item-share-cb).
2.  Click **Add to Chrome**.

**Option 2: Manual Installation (For Developers)**
1.  **Clone the repository** or download the source code.
    ```bash
    git clone https://github.com/zweioio/figma-web-copy-assistant.git
    ```
2.  Open Google Chrome and navigate to `chrome://extensions/`.
3.  Enable **Developer mode** in the top right corner.
4.  Click **Load unpacked**.
5.  Select the `chrome-extension` folder from this project.

### Usage

1.  Navigate to any website you want to copy.
2.  Click the **Copy web to Figma** icon in your Chrome toolbar.
3.  Click the **Copy to Figma** button.
4.  Wait for the process to complete (the page will automatically scroll).
5.  Once you see the "Copied!" success message, go to Figma and press `Ctrl+V` (or `Cmd+V`) to paste.

---

<a name="chinese"></a>
## 🇨🇳 中文

**一键将网页转换为可编辑的 Figma 设计稿。**

支持任何网站，无需安装 Figma 插件，完全免费使用。

👉 **[前往 Chrome 网上应用店安装](https://chromewebstore.google.com/detail/paomhndjjomojpmclhjnehoelclagpfp?utm_source=item-share-cb)**

### 功能特点

- **一键抓取**：轻松将任何网页转换为可直接在 Figma 中编辑的设计稿。
- **高保真还原**：精准还原布局、样式、字体和图片。
- **智能处理**：
  - 自动滚动页面以抓取完整内容。
  - 智能处理吸顶导航栏（Sticky Header）和图片懒加载。
  - 自动修复抓取过程中的布局错位问题。
- **多语言支持**：支持英文和简体中文界面。
- **隐私安全**：所有操作均在本地浏览器运行，只需极少的权限。

### 安装步骤

**方式一：Chrome 网上应用店（推荐）**
1.  访问 [Chrome 应用商店页面](https://chromewebstore.google.com/detail/paomhndjjomojpmclhjnehoelclagpfp?utm_source=item-share-cb)。
2.  点击 **添加至 Chrome** 按钮即可。

**方式二：手动安装（开发者模式）**
1.  **克隆仓库** 或直接下载源代码。
    ```bash
    git clone https://github.com/zweioio/figma-web-copy-assistant.git
    ```
2.  打开 Google Chrome 浏览器，访问 `chrome://extensions/`。
3.  在右上角开启 **开发者模式 (Developer mode)**。
4.  点击 **加载已解压的扩展程序 (Load unpacked)**。
5.  选择本项目中的 `chrome-extension` 文件夹。

### 使用方法

1.  打开您想要复制的任何网页。
2.  点击 Chrome 工具栏中的 **Copy web to Figma** 图标。
3.  点击 **复制到 Figma (Copy to Figma)** 按钮。
4.  等待处理完成（页面会自动滚动到底部）。
5.  当看到 "已复制 (Copied!)" 的成功提示后，打开 Figma，按下 `Ctrl+V` (或 `Cmd+V`) 即可粘贴。

---

## Development Structure / 开发结构

- `chrome-extension/`: The core Chrome Extension source code. (插件核心源码)
  - `manifest.json`: Extension configuration. (配置文件)
  - `popup.html` / `popup.js`: The extension popup interface. (弹窗界面)
  - `content.js`: Content script injection logic. (注入逻辑)
  - `trigger.js`: The main logic for handling page capture, scrolling, and UI patching. (核心抓取与UI补丁逻辑)
  - `official-capture.js`: Core capture engine (obfuscated). (抓取引擎)

## License / 许可协议

[MIT](https://choosealicense.com/licenses/mit/)
