
var mensagem = prompt('Digite a mensagem a ser enviada', '');
var repeticoes = parseInt(prompt('Digite o numero de repetições', 10));

async function enviarMensagems(mensagem, repeticoes) {
    main = document.querySelector("#main"),
        textarea = main.querySelector(`div[contenteditable="true"]`)

    if (!textarea) throw new Error("Não há uma conversa aberta")


    for (var i = 0; i < repeticoes; i++) {
        var line = mensagem + ' ' + (i+1)
        console.log(line)

        textarea.focus();
        document.execCommand('insertText', false, line);
        textarea.dispatchEvent(new Event('change', { bubbles: true }));

        setTimeout(() => {
            (main.querySelector(`[data-testid="send"]`) || main.querySelector(`[data-icon="send"]`)).click();
        }, 100);
        if (i !== repeticoes)
            await new Promise(resolve => setTimeout(resolve, 250));
    }


    return repeticoes;
}

await enviarMensagems(mensagem, repeticoes).then(e => console.log(`Código finalizado, ${e} mensagens enviadas`)).catch(console.error);