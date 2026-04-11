const dados = [
  {
    id: 1,
    titulo: "Prefeitura Lança Novo Plano de Mobilidade Urbana",
    descricao:
      "Novo plano visa melhorar o transporte público e reduzir o trânsito na cidade.",
    conteudo:
      "A Prefeitura apresentou nesta segunda-feira um novo plano de mobilidade urbana que inclui a criação de corredores exclusivos de ônibus, ciclovias e a requalificação de vias principais. O projeto será implementado ao longo dos próximos dois anos e promete revolucionar a forma como os cidadãos se locomovem.",
    categoria: "Cidades",
    autor: "Joana Ribeiro",
    data: "2025-03-30",
    imagem: "imgs/mobilidade.jpg",
  },
  {
    id: 2,
    titulo: "Tecnologia 6G Está em Desenvolvimento",
    descricao:
      "Pesquisadores anunciam avanços na próxima geração de redes móveis.",
    conteudo:
      "Universidades e empresas de telecomunicação já estão testando tecnologias que poderão compor a infraestrutura do 6G. A expectativa é que a nova geração seja 100 vezes mais rápida que o 5G e amplie a integração entre dispositivos inteligentes, permitindo avanços significativos em áreas como carros autônomos e Internet das Coisas.",
    categoria: "Tecnologia",
    autor: "Carlos Mendes",
    data: "2025-03-28",
    imagem: "imgs/tecnologia_6g.jpg",
  },
  {
    id: 3,
    titulo: "Festival de Música Reúne Mais de 50 Mil Pessoas",
    descricao:
      "Evento cultural movimentou o final de semana com atrações nacionais e internacionais.",
    conteudo:
      "Durante três dias de programação, o festival contou com a participação de mais de 40 artistas e promoveu atividades culturais e gastronômicas em paralelo. A prefeitura estima um impacto positivo no turismo local, com hotéis e restaurantes operando com capacidade máxima.",
    categoria: "Cultura",
    autor: "Ana Clara Silva",
    data: "2025-03-27",
    imagem: "imgs/festival_musica.jpg",
  },
];

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("noticias-container")) {
    carregarNoticiasHome();
  }
});

function carregarNoticiasHome() {
  const container = document.getElementById("noticias-container");

  dados.forEach((noticia) => {
    const card = document.createElement("article");
    card.className = "card";

    const card_content = document.createElement("div");
    card_content.innerHTML = `
            <img src="${noticia.imagem}" alt="Imagem da notícia: ${noticia.titulo}">
            <div class="card-content">
                <h3>${noticia.titulo}</h3>
                <p>${noticia.descricao}</p>
            </div>
        `;

    card.appendChild(card_content);
    container.appendChild(card);
  });
}
