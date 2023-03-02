function identifyTextArea() {
    main = document.querySelector("#main"),
        textarea = main.querySelector(`div[contenteditable="true"]`)

    return textarea;
}

function textareaDontExists() {
    if (!textarea) throw new Error("Não há uma conversa aberta")
}

async function sendMessages(message, counter) {
    textarea = identifyTextArea();

    textareaDontExists();

    for (var i = 0; i < counter; i++) {

        setMessagOnTextarea(`${message} ${i + 1}`);

        clickSendButton()

        if (i !== counter)
            await new Promise(resolve => setTimeout(resolve, 250));
    }
    return counter;
}

function clickSendButton() {
    setTimeout(() => {
        (main.querySelector(`[data-testid="send"]`) || main.querySelector(`[data-icon="send"]`)).click();
    }, 100);
}

function setMessagOnTextarea(line) {
    console.log(line)

    textarea.focus();
    document.execCommand('insertText', false, line);
    textarea.dispatchEvent(new Event('change', { bubbles: true }));
}

function start() {
    var message = prompt('Digite a mensagem a ser enviada', '');
    var counter = parseInt(prompt('Digite o numero de repetições', 10));

    sendMessages(message, counter).then(e => console.log(`Código finalizado, ${e} mensagens enviadas`)).catch(console.error);
}

start();