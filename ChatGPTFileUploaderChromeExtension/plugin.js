(function() {
    loadPlugin();
    // Add event listener to `nav>a` element
    let navLink = document.querySelector('nav > a');
    if (navLink) {
        navLink.addEventListener('click', function () {
            loadPlugin()
        });
    }

    // Add event listener to nav ol for late binding with `nav ol>li>a` elements
    let navList = document.querySelector('nav ol');
    if (navList) {
        navList.addEventListener('click', function(e) {
            if (e.target && e.target.matches('li > a')) {
                loadPlugin();
            }
        });
    }
})();

async function submitConversation(text, part, filename) {
    const textarea = document.querySelector("textarea[tabindex='0']");
    const enterKeyEvent = new KeyboardEvent("keydown", {
        bubbles: true,
        cancelable: true,
        keyCode: 13,
    });

    textarea.value = `Part ${part} of ${filename}: \n\n ${text}`;
    textarea.dispatchEvent(enterKeyEvent);
}

// Function to check if ChatGPT is ready. Update this as per your needs.
async function checkIfChatGptIsReady() {
    let chatgptReady = false;
    while (!chatgptReady) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // Check if ChatGPT is ready
        // Update this condition according to your application
        chatgptReady = !document.querySelector('.text-2xl > span:not(.invisible)');
    }
}
function loadPlugin(){
    // Create the button and style it
    let submitButton = document.createElement('button');
    submitButton.textContent = 'Submit File';
    submitButton.style.cssText = 'background-color: green; color: white; padding: 5px; border: none; border-radius: 5px; margin: 5px';

    // Create the progress bar and the container for it
    let progressBar = document.createElement('div');
    progressBar.style.cssText = 'width: 0%; height: 100%; background-color: blue';

    let progressContainer = document.createElement('div');
    progressContainer.style.cssText = 'width: 99%; height: 5px; background-color: grey';
    progressContainer.appendChild(progressBar);

    // Find the textarea and its parent
    let textarea = document.querySelector('textarea');
    let parent = textarea.parentElement;

    // Insert the button and the progress bar before the parent of the textarea
    parent.insertBefore(submitButton, textarea);
    parent.insertBefore(progressContainer, textarea);

    // Add a click event listener to the submit button
    submitButton.addEventListener('click', () => {
        let inputFile = document.createElement('input');
        inputFile.type = 'file';
        inputFile.accept = '.txt,.js,.py,.html,.css,.json,.csv';

        inputFile.addEventListener('change', (e) => {
            let file = e.target.files[0];
            let reader = new FileReader();

            reader.onload = async function(e) {
                let text = e.target.result;
                let chunks = text.match(/[\s\S]{1,15000}/g);
                let numChunks = chunks.length;

                for (let i = 0; i < numChunks; i++) {
                    await submitConversation(chunks[i], i + 1, file.name);
                    progressBar.style.width = `${((i + 1) / numChunks) * 100}%`;

                    // Using a more reliable way to check if ChatGPT is ready. Update this as per your needs.
                    await checkIfChatGptIsReady();
                }

                progressBar.style.backgroundColor = 'blue';
            };

            reader.onerror = function() {
                console.error('An error occurred while reading the file.');
            };

            reader.readAsText(file);
        });

        inputFile.click();
    });
}