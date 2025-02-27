let nomes = JSON.parse(localStorage.getItem("nomes")) || [];

document.addEventListener("DOMContentLoaded", () => {
    atualizarLista();
    verificarBotaoAdicionar();
});

function adicionarAmigo() {
    const input = document.getElementById("amigo");
    const nome = input.value.trim();

    if (!nome) {
        alert("Por favor, digite um nome válido!");
        return;
    }

    if (nomes.some(p => p.toLowerCase() === nome.toLowerCase())) {
        alert("Este nome já foi adicionado!");
        limparCampo();
        return;
    }

    nomes.push(nome);
    salvarLista();
    atualizarLista();
    limparCampo();
}

function removerAmigo(index) {
    nomes.splice(index, 1);
    salvarLista();
    atualizarLista();
}

function atualizarLista() {
    const lista = document.getElementById("listaAmigos");
    lista.innerHTML = "";

    if (nomes.length === 0) {
        lista.innerHTML = "<li>Nenhum amigo adicionado.</li>";
        return;
    }

    nomes.forEach((nome, index) => {
        const item = document.createElement("li");
        item.textContent = nome;

        const botaoRemover = document.createElement("button");
        botaoRemover.textContent = "❌";
        botaoRemover.classList.add("remover");
        botaoRemover.onclick = () => removerAmigo(index);

        item.appendChild(botaoRemover);
        lista.appendChild(item);
    });
}

function salvarLista() {
    localStorage.setItem("nomes", JSON.stringify(nomes));
}

function limparCampo() {
    const input = document.getElementById("amigo");
    input.value = "";
    verificarBotaoAdicionar();
}

function verificarBotaoAdicionar() {
    const input = document.getElementById("amigo");
    const botao = document.getElementById("adicionarAmigo");
    botao.disabled = !input.value.trim();
}

document.getElementById("amigo").addEventListener("input", verificarBotaoAdicionar);

function sortearAmigo() {
    if (nomes.length < 2) {
        alert("Adicione pelo menos 2 amigos para sortear.");
        return;
    }

    let nomesSorteados = [...nomes];
    let tentativas = 0;
    let maxTentativas = 100;

    do {
        nomesSorteados = shuffleArray([...nomes]);
        tentativas++;
        if (tentativas > maxTentativas) {
            alert("Não foi possível gerar um sorteio válido. Tente novamente.");
            return;
        }
    } while (nomes.some((nome, i) => nome === nomesSorteados[i]));

    const resultado = document.getElementById("resultado");
    resultado.innerHTML = "";

    nomes.forEach((nome, i) => {
        const itemResultado = document.createElement("li");
        itemResultado.textContent = `${nome} vai presentear ${nomesSorteados[i]}`;
        resultado.appendChild(itemResultado);
    });
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
