const api =
  'https://frontend-intern-challenge-api.iurykrieger.vercel.app/products?page=';
const main = document.querySelector('#sessao-produtos');

const button = document.querySelector('[data-button="adicionar"]');
const btnCadastro = document.querySelector('#btn-cadastro');
const puxarProdutos = async () => {
  let html = '';
  let pages = 1;

  const apiProdutos = await fetch(
    ` https://frontend-intern-challenge-api.iurykrieger.now.sh/products?page=1`,
  );
  const apiProdutosJson = await apiProdutos.json();
  apiProdutosJson.products.map((produto) => {
    if (produto.id < 2) {
      html += `
      <div class="produtos">
      <div>
      <img src="${produto.image}" alt="${produto.name}">
      </div>
      
      <div>
      <h3 class="titulo-produto">${produto.name}</h3>
      <p class="descricao-produto">${produto.description}</p>
      <p class="valor-anterior-produto">De R$${produto.oldPrice}</p> 
      <p class="desconto-valor-produto">Por R$\t${produto.price}</p>
      <p class="cartao-valor-produto">ou R$${produto.installments.count}X de R$${produto.installments.value} </p>
      <button class="botao-comprar-produto">Comprar</button>
      </div>
      </div>
      `;
      main.innerHTML = html;
    }
  });
};
puxarProdutos();
