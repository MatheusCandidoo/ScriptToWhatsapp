function identifyTextArea() {
    main = document.querySelector("#main"),
        textarea = main.querySelector(`div[contenteditable="true"]`)

    return textarea;
}

function textareaDontExists() {
    if (!textarea) throw new Error("Não há uma conversa aberta")
}

async function prepareMessage(message, quantityBlock, quantityIntervals) {
    var count = 0;
    textarea = identifyTextArea();

    textareaDontExists();

    for (var j = 0; j < quantityIntervals; j++) {

        for (var i = 0; i < quantityBlock; i < i++) {
            setMessagOnTextarea(`${message} X ${count + 1}`);

            await clickSendButton()

            if (i !== quantityBlock)
                await new Promise(resolve => setTimeout(resolve, 250));

            count++;
        }
        await new Promise(resolve => setTimeout(resolve, 7200000));
    }

    return count;
}

function call(quantityBlock, message) {
    setTimeout(sendMessages(quantityBlock, message), 3000)
}




async function clickSendButton() {
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

async function start() {
    var message = prompt('Digite a mensagem a ser enviada', '');
    var quantityBlock = parseInt(prompt('Digite a quantidade de mensagens a ser enviada no bloco de mensagens', 10));
    var quantityIntervals = parseInt(prompt('Digite a quantidade de vezes que um bloco será enviado: ', ''))

    prepareMessage(message, quantityBlock, quantityIntervals)
        .then(e => console.log(`Código finalizado, ${e} mensagens enviadas`)).
        catch(console.error);
}

start();