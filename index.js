document.addEventListener('DOMContentLoaded', () => {
    const inputField = document.getElementById('input');
    const outputDiv = document.getElementById('output');

    const otherFileType = ["wav", "avi", "wmv", "mov"]

    inputField.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const inputText = inputField.value.trim();
            if (inputText) {
                handleCommand(inputText);
                inputField.value = '';
            }
        }
    });

    function converter(url) { // Main Code
        for (let i = 0; i < otherFileType.length; i++) { // Check VideoType
          if (url.includes(otherFileType[i])) {
            url = url.replace(otherFileType[i], "mp4")
          }
        }
        const parts = url.split('/');
      
        if (!isNaN(parts[5])) {
          parts[2] = "v.theync.com";
          parts.splice(3, 2, "videos");
          parts.pop()

          sendText(msg.conv_worked);
          return window.open(parts.join('/'), '_blank').focus();
        } else if (parts[5] === "v") {
          parts[4] = "videos"
          parts.pop()

          sendText(msg.conv_worked);
          return window.open(parts.join('/'), '_blank').focus();
        } else {
            sendText(msg.UnknownError)
        }
      }

    function handleCommand(command) {
        const output = document.createElement('div');
        output.textContent = '> ' + command;
        output.classList.add("command-text")

        if (containsJapanese(command)) {
            output.classList.add('japanese-font');
        }

        outputDiv.appendChild(output);

        let response = '';
        let splitedCommand = command.split(" ");

        if(command.includes("conv")) {
            if(!splitedCommand[1]) {
                return sendText(msg.conv_error)
            } else {
                converter(splitedCommand[1])
            }
        } else {
            return sendText(msg.CmdNotFound(command))
        }

        const responseDiv = document.createElement('div');
        responseDiv.textContent = response;

        if (containsJapanese(response)) {
            responseDiv.classList.add('japanese-font');
        }

        outputDiv.appendChild(responseDiv);

        outputDiv.scrollTop = outputDiv.scrollHeight;
    }

    function sendText(text, await) {
        setTimeout(() => {
            const output = document.createElement('div');
            output.textContent = '> ' + text;
    
            if (containsJapanese(text)) {
                output.classList.add('japanese-font');
            }
    
            outputDiv.appendChild(output);
    
            outputDiv.scrollTop = outputDiv.scrollHeight;
        }, await * 1000)
    }

    function containsJapanese(text) {
        return /[\u3000-\u30FF\u3400-\u4DBF\u4E00-\u9FFF\uF900-\uFAFF]/.test(text);
    }
});