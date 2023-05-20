# ChatGPT File Upload Extension

## Description
This is a browser extension that adds file upload functionality to the ChatGPT webpage. With this extension, users can upload a file, which will then be chunked and sent to ChatGPT for processing in multiple parts.

## Features
- Allows file upload to ChatGPT webpage
- Chunks file content and sends it to ChatGPT for processing
- Displays a progress bar indicating the proportion of file content processed
- Checks and waits for ChatGPT readiness before sending the next chunk
- Supports file types `.txt, .js, .py, .html, .css, .json, .csv`

## Compatibility
This extension has been developed and tested for Chrome-based browsers. While it uses standard web technologies that should work across modern browsers, it has not been thoroughly tested with Firefox or other non-Chrome browsers. Compatibility with browsers other than Chrome is therefore not guaranteed.

## Installation
1. Clone or download the repository
2. Load the extension into your Chrome-based browser. You can go to the extensions page (`chrome://extensions`), enable "Developer mode", and then "Load unpacked" extension. Choose the folder of the downloaded extension.
3. Navigate to the ChatGPT webpage. You should see a new "Submit File" button and a progress bar below it.

## Usage
1. Click on the "Submit File" button. This will open a file selection dialog.
2. Choose the file you wish to upload. The file should be one of the supported file types (`.txt, .js, .py, .html, .css, .json, .csv`).
3. The content of the file will be divided into chunks, and each chunk will be sent to ChatGPT for processing.
4. The progress bar shows the proportion of the file content that has been processed.

## Notes
- The extension waits for ChatGPT to finish processing a chunk before sending the next one.
- If an error occurs while reading the file, a console error message will be displayed.
- The chunking process may split the text at unintended points. To ensure important parts of your text aren't divided, please check your chunking limit and file content accordingly.

## Contribution
If you find a bug or have suggestions for improvements, feel free to open an issue or a pull request.

## Disclaimer
This extension is not officially associated with ChatGPT or OpenAI. Please use responsibly and ensure your usage complies with the ChatGPT terms of service.

## License
This project is licensed under the MIT License.
