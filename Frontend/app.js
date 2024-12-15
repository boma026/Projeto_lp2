const apiBaseUrl = "http://localhost:8080/api/produtos"; // URL da sua API

// Função para carregar os produtos
async function carregarProdutos() {
    const resposta = await fetch(apiBaseUrl);
    const produtos = await resposta.json();

    const tbody = document.getElementById("produtos-tbody");
    tbody.innerHTML = "";

    produtos.forEach(produto => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${produto.id}</td>
            <td>${produto.nome}</td>
            <td>${produto.quantidade}</td>
            <td>R$ ${produto.preco.toFixed(2)}</td>
            <td>
                <button onclick="editarProduto(${produto.id}, '${produto.nome}', ${produto.quantidade}, ${produto.preco})">Editar</button>
                <button onclick="deletarProduto(${produto.id})">Deletar</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Função para salvar ou atualizar um produto
async function salvarProduto(event) {
    event.preventDefault();

    const id = document.getElementById("id").value;
    const nome = document.getElementById("nome").value;
    const quantidade = document.getElementById("quantidade").value;
    const preco = document.getElementById("preco").value;

    const produto = { nome, quantidade, preco };

    if (id) {
        await fetch(`${apiBaseUrl}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(produto),
        });
    } else {
        await fetch(apiBaseUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(produto),
        });
    }

    document.getElementById("produto-form").reset();
    carregarProdutos();
}

// Função para editar um produto
function editarProduto(id, nome, quantidade, preco) {
    document.getElementById("id").value = id;
    document.getElementById("nome").value = nome;
    document.getElementById("quantidade").value = quantidade;
    document.getElementById("preco").value = preco;
}

// Função para deletar um produto
async function deletarProduto(id) {
    if (confirm("Tem certeza que deseja deletar este produto?")) {
        await fetch(`${apiBaseUrl}/${id}`, { method: "DELETE" });
        carregarProdutos();
    }
}

// Adicionar evento ao formulário
document.getElementById("produto-form").addEventListener("submit", salvarProduto);

// Carregar os produtos na inicialização
carregarProdutos();
