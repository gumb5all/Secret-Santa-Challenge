let nomes = [];

function adicionarAmigo() {
    const input = document.getElementById('amigo');
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
    atualizarLista();
    limparCampo();
}

function limparCampo() {
    const input = document.getElementById('amigo');
    input.value = ''; 
    document.getElementById('adicionarAmigo').setAttribute('disabled', 'true'); 
}

function atualizarLista() {
    const lista = document.getElementById('listaAmigos');
    lista.innerHTML = ''; 

    nomes.forEach(nome => {
        const item = document.createElement('li');
        item.textContent = nome;
        lista.appendChild(item);
    });
}

document.getElementById('amigo').addEventListener('input', function () {
    const input = document.getElementById('amigo');
    const nome = input.value.trim();
    const botao = document.getElementById('adicionarAmigo');

    if (nome) {
        botao.removeAttribute('disabled'); 
    } else {
        botao.setAttribute('disabled', 'true'); 
    }
});

function sortearAmigo() {
    if (nomes.length < 2) {
        alert("Adicione pelo menos 2 amigos para sortear.");
        return;
    }

    let nomesSorteados = [...nomes]; 

    do {
        nomesSorteados = shuffleArray([...nomes]);
    } while (nomes.some((nome, i) => nome === nomesSorteados[i]));

    const resultado = document.getElementById('resultado');
    resultado.innerHTML = ''; 

    nomes.forEach((nome, i) => {
        const amigoSorteado = nomesSorteados[i];
        const itemResultado = document.createElement('li');
        itemResultado.textContent = `${nome} vai presentear ${amigoSorteado}`;
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
