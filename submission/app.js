const dados = [
  {
    "id": 1,
    "titulo": "Prefeitura Lança Novo Plano de Mobilidade Urbana",
    "descricao": "Novo plano visa melhorar o transporte público e reduzir o trânsito na cidade.",
    "conteudo": "A Prefeitura apresentou nesta segunda-feira um novo plano de mobilidade urbana que inclui a criação de corredores exclusivos de ônibus, ciclovias e a requalificação de vias principais. O projeto será implementado ao longo dos próximos dois anos e promete revolucionar a forma como os cidadãos se locomovem.",
    "categoria": "Cidades",
    "autor": "Joana Ribeiro",
    "data": "2025-03-30",
    "imagem": "imgs/mobilidade.jpg"
  },
  {
    "id": 2,
    "titulo": "Tecnologia 6G Está em Desenvolvimento",
    "descricao": "Pesquisadores anunciam avanços na próxima geração de redes móveis.",
    "conteudo": "Universidades e empresas de telecomunicação já estão testando tecnologias que poderão compor a infraestrutura do 6G. A expectativa é que a nova geração seja 100 vezes mais rápida que o 5G e amplie a integração entre dispositivos inteligentes, permitindo avanços significativos em áreas como carros autônomos e Internet das Coisas.",
    "categoria": "Tecnologia",
    "autor": "Carlos Mendes",
    "data": "2025-03-28",
    "imagem": "imgs/tecnologia_6g.jpg"
  },
  {
    "id": 3,
    "titulo": "Festival de Música Reúne Mais de 50 Mil Pessoas",
    "descricao": "Evento cultural movimentou o final de semana com atrações nacionais e internacionais.",
    "conteudo": "Durante três dias de programação, o festival contou com a participação de mais de 40 artistas e promoveu atividades culturais e gastronômicas em paralelo. A prefeitura estima um impacto positivo no turismo local, com hotéis e restaurantes operando com capacidade máxima.",
    "categoria": "Cultura",
    "autor": "Ana Clara Silva",
    "data": "2025-03-27",
    "imagem": "imgs/festival_musica.jpg"
  }
];

document.addEventListener('DOMContentLoaded', () => {
    // Verifica em qual página estamos
    if (document.getElementById('noticias-container')) {
        carregarNoticiasHome();
    } else if (document.getElementById('detalhe-noticia-container')) {
        carregarDetalheNoticia();
    }
});

function carregarNoticiasHome() {
    const container = document.getElementById('noticias-container');
    
    dados.forEach(noticia => {
        const card = document.createElement('article');
        card.className = 'card';
        
        const link = document.createElement('a');
        link.href = `detalhes.html?id=${noticia.id}`;

        link.innerHTML = `
            <img src="${noticia.imagem}" alt="Imagem da notícia: ${noticia.titulo}">
            <div class="card-content">
                <h3>${noticia.titulo}</h3>
                <p>${noticia.descricao}</p>
            </div>
        `;
        
        card.appendChild(link);
        container.appendChild(card);
    });
}

function carregarDetalheNoticia() {
    const container = document.querySelector('#detalhe-noticia-container');
    
    // Pega o ID da query string da URL
    const params = new URLSearchParams(window.location.search);
    const noticiaId = parseInt(params.get('id'));

    if (noticiaId) {
        const noticia = dados.find(item => item.id === noticiaId);
        
        if (noticia) {
            container.innerHTML = `
                <h2>${noticia.titulo}</h2>
                <img src="${noticia.imagem}" alt="Imagem da notícia: ${noticia.titulo}">
                <p class="conteudo-completo">${noticia.conteudo}</p>
                <div class="meta-info">
                    <span><strong>Autor:</strong> ${noticia.autor}</span>
                    <span><strong>Data:</strong> ${new Date(noticia.data).toLocaleDateString()}</span>
                    <span><strong>Categoria:</strong> ${noticia.categoria}</span>
                </div>
            `;
        } else {
            container.innerHTML = '<p>Notícia não encontrada.</p>';
        }
    }
}
