let estoque = [];

/* adicionar produto */
function adicionar() {
  const nome = document.getElementById("nome").value;
  const preco = parseFloat(document.getElementById("preco").value);
  const qtd = parseInt(document.getElementById("qtd").value);

  if (!nome || !preco || !qtd) return;

  estoque.push({ nome, preco, qtd });

  atualizarLista();
  limparCampos();
}

/* atualizar estoque */
function atualizarLista() {
  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  estoque.forEach((item, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      ${item.nome} - R$ ${item.preco} x ${item.qtd}
      <button onclick="remover(${index})">X</button>
    `;

    lista.appendChild(li);
  });
}

/* remover item */
function remover(i) {
  estoque.splice(i, 1);
  atualizarLista();
}

/* limpar inputs */
function limparCampos() {
  document.getElementById("nome").value = "";
  document.getElementById("preco").value = "";
  document.getElementById("qtd").value = "";
}

/* gerar código de barras fake */
function gerarCodigoBarra() {
  let codigo = "";
  for (let i = 0; i < 12; i++) {
    codigo += Math.floor(Math.random() * 9);
  }
  return codigo;
}

/* gerar recibo */
function gerarRecibo() {
  const area = document.getElementById("reciboArea");

  let total = 0;
  let html = "<h3>RECIBO</h3>";

  estoque.forEach(item => {
    let subtotal = item.preco * item.qtd;
    total += subtotal;

    html += `<p>${item.nome} x${item.qtd} = R$ ${subtotal.toFixed(2)}</p>`;
  });

  html += `<hr><h3>Total: R$ ${total.toFixed(2)}</h3>`;
  html += `<div class="barcode">|| ${gerarCodigoBarra()} ||</div>`;

  area.innerHTML = html;
}