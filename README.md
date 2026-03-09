# Figma Web Copy Assistant

**One-click copy web pages to editable Figma designs.**

Supports any website, no Figma plugin needed, completely free to use.

## Features

- **One-Click Capture**: Easily convert any web page into a Figma-ready design.
- **High Fidelity**: Captures layout, styles, fonts, and images accurately.
- **Smart Handling**:
  - Automatically scrolls to capture full-page content.
  - Handles sticky headers and lazy-loaded images intelligently.
  - Fixes layout shifts during capture.
- **Multi-Language Support**: English and Chinese (Simplified) interface support.
- **Privacy Focused**: Runs locally in your browser, minimal permissions required.

## Installation

1.  **Clone the repository** or download the source code.
    ```bash
    git clone https://github.com/yourusername/figma-web-copy-assistant.git
    ```
2.  Open Google Chrome and navigate to `chrome://extensions/`.
3.  Enable **Developer mode** in the top right corner.
4.  Click **Load unpacked**.
5.  Select the `chrome-extension` folder from this project.

## Usage

1.  Navigate to any website you want to copy.
2.  Click the **Figma Web Copy Assistant** icon in your Chrome toolbar.
3.  Click the **Copy to Figma** button.
4.  Wait for the process to complete (the page will automatically scroll).
5.  Once you see the "Copied!" success message, go to Figma and press `Ctrl+V` (or `Cmd+V`) to paste.

## Development Structure

- `chrome-extension/`: The core Chrome Extension source code.
  - `manifest.json`: Extension configuration.
  - `popup.html` / `popup.js`: The extension popup interface.
  - `content.js`: Content script injection logic.
  - `trigger.js`: The main logic for handling page capture, scrolling, and UI patching.
  - `official-capture.js`: Core capture engine (obfuscated).
- `landing-page/`: Source code for the promotional website.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
