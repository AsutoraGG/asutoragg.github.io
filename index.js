document.addEventListener('DOMContentLoaded', () => {
    const inputField = document.getElementById('input');
    const outputDiv = document.getElementById('output');

    inputField.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const inputText = inputField.value.trim();
            if (inputText) {
                handleCommand(inputText);
                inputField.value = '';
            }
        }
    });

    function handleCommand(command) {
        const output = document.createElement('div');
        output.textContent = '> ' + command;
        output.classList.add("command-text")

        if (containsJapanese(command)) {
            output.classList.add('japanese-font');
        }

        outputDiv.appendChild(output);

        let response = '';
        switch (command.toLowerCase()) {
            case "start" || "スタート" || "すたーと":
                sendText(msg.startGame); sendText(msg.m1, 3); sendText(msg.m2, 6);
            break;
            case "netsh wlan show profiles":
                sendText(msg.netsh1, 0)
            break;
            default:
                response = `そのコマンド"${command}"は見つかりませんでした`;
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