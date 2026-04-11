const newsData = [
  {
    id: 1,
    title: "City Hall Launches New Urban Mobility Plan",
    description:
      "The new plan aims to improve public transportation and reduce city traffic.",
    content:
      "City Hall introduced a new urban mobility plan this Monday, including exclusive bus lanes, bike paths, and major road upgrades. The project will be implemented over the next two years and promises to transform how citizens move around the city.",
    category: "Cities",
    author: "Joana Ribeiro",
    date: "2025-03-30",
    image: "imgs/mobilidade.jpg",
  },
  {
    id: 2,
    title: "6G Technology Is Under Development",
    description:
      "Researchers announce progress in the next generation of mobile networks.",
    content:
      "Universities and telecom companies are already testing technologies that may form the infrastructure of 6G. Expectations are that the new generation will be 100 times faster than 5G and will expand integration between smart devices, enabling major advances in areas such as autonomous cars and the Internet of Things.",
    category: "Technology",
    author: "Carlos Mendes",
    date: "2025-03-28",
    image: "imgs/tecnologia_6g.jpg",
  },
  {
    id: 3,
    title: "Music Festival Draws More Than 50,000 People",
    description:
      "The cultural event energized the weekend with national and international acts.",
    content:
      "Over three days of programming, the festival featured more than 40 artists and promoted parallel cultural and food activities. City Hall estimates a positive impact on local tourism, with hotels and restaurants operating at full capacity.",
    category: "Culture",
    author: "Ana Clara Silva",
    date: "2025-03-27",
    image: "imgs/festival_musica.jpg",
  },
];

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("news-container")) {
    loadHomeNews();
  }
});

function loadHomeNews() {
  const container = document.getElementById("news-container");

  newsData.forEach((article) => {
    const card = document.createElement("article");
    card.className = "card";

    const cardContent = document.createElement("div");
    cardContent.innerHTML = `
            <img src="${article.image}" alt="News image: ${article.title}">
            <div class="card-content">
                <h3>${article.title}</h3>
                <p>${article.description}</p>
            </div>
        `;

    card.appendChild(cardContent);
    container.appendChild(card);
  });
}
