const api =
  'https://frontend-intern-challenge-api.iurykrieger.vercel.app/products?page=';
const main = document.querySelector('#sessao-produtos');
const formularioCadastro = document.querySelector('#form-cadastro');
const formularioLogin = document.querySelector('#formulario-amigo');
const button = document.querySelector('[data-button="adicionar"]');
const btnCadastro = document.querySelector('#btn-cadastro');
const btnLogin = document.querySelector('#btn-amigo');

const puxarProdutos = async () => {
  let html = '';
  let pages = 1;

  const apiProdutos = await fetch(
    ` https://frontend-intern-challenge-api.iurykrieger.now.sh/products?page=1`,
  );
  const apiProdutosJson = await apiProdutos.json();
  apiProdutosJson.products.map((produto) => {
    html += `
  <div class="produtos">
  <img src="${produto.image}" alt="${produto.name}">
  <h3 class="titulo-produto">${produto.name}</h3>
  <p class="descricao-produto">${produto.description}</p>
  <p class="valor-anterior-produto">De R$${produto.oldPrice}</p> 
  <p class="desconto-valor-produto">Por R$${produto.price}</p>
  <p class="cartao-valor-produto">ou ${produto.installments.count}X de R$${produto.installments.value} 
  </p>
  <button class="botao-comprar-produto">Comprar</button>
  </div>
  `;
    main.innerHTML = html;
  });

  button.addEventListener('click', handleClick);
  async function handleClick() {
    pages++;
    const apiProximaPagina = await fetch(`${api}${pages}`);
    const apiProximaPaginaJson = await apiProximaPagina.json();
    apiProximaPaginaJson.products.map((produtoProximaPagina) => {
      html += `
      <div class="produtos">
      <img src="${produtoProximaPagina.image}" alt="${produtoProximaPagina.name}">
      <h3 class="titulo-produto">${produtoProximaPagina.name}</h3>
      <p class="descricao-produto">${produtoProximaPagina.description}</p>
      <p class="valor-anterior-produto">De R$${produtoProximaPagina.oldPrice}</p> 
      <p class="desconto-valor-produto">Por R$\t${produtoProximaPagina.price}</p>
      <p class="cartao-valor-produto">ou R$${produtoProximaPagina.installments.count}X de R$${produtoProximaPagina.installments.value} </p>
      <button class="botao-comprar-produto">Comprar</button>
      </div>
      `;
      main.innerHTML = html;
    });
  }
};
puxarProdutos();

const validacao = () => {
  const cpfCadastro = formularioCadastro.cpf.value;
  console.log(cpfCadastro.length);
  const resultadoValidacao = document.querySelector('.resultado-validacao');
  console.log(cpfCadastro.length);
  if (cpfCadastro == '' || cpfCadastro.length < 11 || cpfCadastro.length > 11) {
    resultadoValidacao.innerText = 'CPF inválido';
  }
  if (
    formularioCadastro.sexo[0].checked == false &&
    formularioCadastro.sexo[1].checked == false
  ) {
    resultadoValidacao.innerText = 'Selecione seu Sexo';
  }
};

const validacaoAmigo = () => {
  const nomAmigo = document.querySelector('#nome-amigo');
  const emailAmigo = document.querySelector('#email-amigo');
  if (nomAmigo === '') {
    btnCadastro.preventDefault();
  } else if (emailAmigo === '') {
    btnCadastro.preventDefault();
  }
};

btnCadastro.addEventListener('click', validacao);
btnLogin.addEventListener('click', validacaoAmigo);
