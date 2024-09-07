const filmes = [
    {
        titulo: "O Poderoso Chefão",
        descricao: "A história da família Corleone, uma das mais poderosas da máfia italiana nos EUA.",
        nota: 9.2,
        atores: "Marlon Brando, Al Pacino, James Caan",
        diretor: "Francis Ford Coppola",
        imagem: "https://image.tmdb.org/t/p/w300/3bhkrj58Vtu7enYsRolD1fZdja1.jpg" // URL de exemplo
    },
    {
        titulo: "Os Vingadores",
        descricao: "Super-heróis se unem para salvar o mundo de uma ameaça alienígena.",
        nota: 8.0,
        atores: "Robert Downey Jr., Chris Evans, Scarlett Johansson",
        diretor: "Joss Whedon",
        imagem: "https://image.tmdb.org/t/p/w300/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg" // URL de exemplo
    },
    {
        titulo: "Interestelar",
        descricao: "Uma equipe de astronautas viaja através de um buraco de minhoca em busca de um novo lar para a humanidade.",
        nota: 8.6,
        atores: "Matthew McConaughey, Anne Hathaway, Jessica Chastain",
        diretor: "Christopher Nolan",
        imagem: "https://image.tmdb.org/t/p/w300/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg" // URL de exemplo
    },
    {
        titulo: "Matrix",
        descricao: "Um programador descobre que o mundo real é uma simulação controlada por máquinas.",
        nota: 8.7,
        atores: "Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss",
        diretor: "Lana Wachowski, Lilly Wachowski",
        imagem: "https://image.tmdb.org/t/p/w300/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg" // URL de exemplo
    },
    {
        titulo: "Inception",
        descricao: "Um ladrão que entra nos sonhos das pessoas para roubar segredos é desafiado a implantar uma ideia na mente de alguém.",
        nota: 8.8,
        atores: "Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page",
        diretor: "Christopher Nolan",
        imagem: "https://i.scdn.co/image/ab67616d0000b273a883e26f90ab617c91b90e56"
    },
    {
        "titulo": "The Dark Knight",
        "descricao": "Batman enfrenta o Coringa, um criminoso que busca criar o caos em Gotham City.",
        "nota": 9.0,
        "atores": "Christian Bale, Heath Ledger, Aaron Eckhart",
        "diretor": "Christopher Nolan",
        "imagem": "https://image.tmdb.org/t/p/w300/qJ2tW6WMUDux911r6m7haRef0WH.jpg"
    },
    {
        "titulo": "Interstellar",
        "descricao": "Uma equipe de exploradores viaja através de um buraco de minhoca em busca de um novo lar para a humanidade.",
        "nota": 8.6,
        "atores": "Matthew McConaughey, Anne Hathaway, Jessica Chastain",
        "diretor": "Christopher Nolan",
        "imagem": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1-7WPYsUt0SF-2LWXMqn0Zirc3yY7YArZaw&s"
    },
    {
        "titulo": "Pulp Fiction",
        "descricao": "As vidas de dois assassinos, um boxeador e um casal de criminosos se entrelaçam em histórias interconectadas de violência e redenção.",
        "nota": 8.9,
        "atores": "John Travolta, Uma Thurman, Samuel L. Jackson",
        "diretor": "Quentin Tarantino",
        "imagem": "https://is1-ssl.mzstatic.com/image/thumb/Music124/v4/26/b1/07/26b1079f-82ca-2e88-0bc8-0300b754daf9/cover.jpg/1200x1200bb.jpg"
    },
    {
        "titulo": "Fight Club",
        "descricao": "Um homem insatisfeito com sua vida funda um clube de luta secreto que rapidamente se transforma em um movimento revolucionário.",
        "nota": 8.8,
        "atores": "Brad Pitt, Edward Norton, Helena Bonham Carter",
        "diretor": "David Fincher",
        "imagem": "https://m.media-amazon.com/images/M/MV5BOTgyOGQ1NDItNGU3Ny00MjU3LTg2YWEtNmEyYjBiMjI1Y2M5XkEyXkFqcGc@._V1_.jpg"
    },
    {
        "titulo": "The Matrix Reloaded",
        "descricao": "Neo continua sua luta contra as máquinas e descobre mais sobre seu destino como o Escolhido.",
        "nota": 7.2,
        "atores": "Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss",
        "diretor": "Lana Wachowski, Lilly Wachowski",
        "imagem": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq9ouys05fnjPb7DvIFa_FQKTY3rlIEd05QQ&s"
    },
    {
        "titulo": "The Matrix Revolutions",
        "descricao": "A batalha final entre os humanos e as máquinas se desenrola enquanto Neo enfrenta o agente Smith em uma luta épica.",
        "nota": 6.8,
        "atores": "Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss",
        "diretor": "Lana Wachowski, Lilly Wachowski",
        "imagem": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlkT_p2Xmm2q21kEgXwo3mK8mSEoDvqMFeZA&s"
    },
    {
        "titulo": "The Shawshank Redemption",
        "descricao": "Um homem é condenado a prisão perpétua por um crime que não cometeu e forma uma amizade improvável com um colega detento.",
        "nota": 9.3,
        "atores": "Tim Robbins, Morgan Freeman, Bob Gunton",
        "diretor": "Frank Darabont",
        "imagem": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSB5ansc5AAcw5PzWYSY4ymbIVXgdTPj-GIiA&s"
    },
    {
        "titulo": "Forrest Gump",
        "descricao": "A história de um homem com uma inteligência limitada, mas uma vida extraordinária, que influencia eventos históricos e pessoais com sua bondade e simplicidade.",
        "nota": 8.8,
        "atores": "Tom Hanks, Robin Wright, Gary Sinise",
        "diretor": "Robert Zemeckis",
        "imagem": "https://m.media-amazon.com/images/S/pv-target-images/f9ddd832d1b566f5b8dd29a4dbc76b7531c420c8c8d9fdfe94eca128bda8e2b1.jpg"
    },
    {
        "titulo": "The Godfather",
        "descricao": "A saga da família Corleone, uma das famílias mafiosas mais poderosas dos Estados Unidos, e a luta pelo poder e controle.",
        "nota": 9.2,
        "atores": "Marlon Brando, Al Pacino, James Caan",
        "diretor": "Francis Ford Coppola",
        "imagem": "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_FMjpg_UX1000_.jpg"
    },
    {
        "titulo": "Gladiator",
        "descricao": "Um general romano destituído busca vingança contra o imperador que assassinou sua família e usurpou o trono.",
        "nota": 8.5,
        "atores": "Russell Crowe, Joaquin Phoenix, Connie Nielsen",
        "diretor": "Ridley Scott",
        "imagem": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWlz8C32cG65OwU1bAV95M4NBa2Hh6bA-MwQ&s"
    },
    {
        "titulo": "The Silence of the Lambs",
        "descricao": "Uma jovem agente do FBI busca a ajuda de um prisioneiro canibal para capturar um assassino em série que está à solta.",
        "nota": 8.6,
        "atores": "Jodie Foster, Anthony Hopkins, Lawrence A. Bonney",
        "diretor": "Jonathan Demme",
        "imagem": "https://m.media-amazon.com/images/M/MV5BZTk5NTYzMGEtMDE2OS00ODYxLWJiNjQtNGMyMmM2MTE0M2QxXkEyXkFqcGc@._V1_.jpg"
    },
    {
        "titulo": "Parasite",
        "descricao": "Uma família pobre se infiltra na vida de uma família rica e a relação entre eles começa a se desmoronar em um drama social e psicológico.",
        "nota": 8.6,
        "atores": "Kang-ho Song, Sun-kyun Lee, Yeo-jeong Jo",
        "diretor": "Bong Joon-ho",
        "imagem": "https://m.media-amazon.com/images/S/pv-target-images/fb4358b042adbf87a337f58bfc44ca6516388f7d6ed9c69f174cc71e473dab08.jpg"
    },
    {
        "titulo": "La La Land",
        "descricao": "Um músico de jazz e uma aspirante a atriz se apaixonam enquanto tentam realizar seus sonhos em Los Angeles.",
        "nota": 8.0,
        "atores": "Ryan Gosling, Emma Stone, John Legend",
        "diretor": "Damien Chazelle",
        "imagem": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZi1cGiNHen3KlI-QnYCsxmTKAagKvtg6DtA&s"
    },
    {
        "titulo": "The Revenant",
        "descricao": "Um caçador de peles é deixado para morrer após ser atacado por um urso e embarca em uma jornada brutal de sobrevivência e vingança.",
        "nota": 8.0,
        "atores": "Leonardo DiCaprio, Tom Hardy, Domhnall Gleeson",
        "diretor": "Alejandro G. Iñárritu",
        "imagem": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgJgxdc7u3QEg6VEfZ9wzSfU24kFa_5pthdQ&s"
    }
];

function listarFilmes(filmes) {
    const listaDeFilmes = document.getElementById('listaDeFilmes');
    listaDeFilmes.innerHTML = ''; // Limpa a lista de filmes

    filmes.forEach(filme => {
        const filmeElemento = document.createElement('div');
        filmeElemento.className = 'filme';
        filmeElemento.innerHTML = `
            <img src="${filme.imagem}" alt="${filme.titulo}" class="imagem-filme">
            <div class="info-filme">
                <div class="titulo">${filme.titulo}</div>
                <div class="descricao">${filme.descricao}</div>
                <div class="nota">Nota: ${filme.nota}</div>
                <div class="atores">Atores: ${filme.atores}</div>
                <div class="diretor">Diretor: ${filme.diretor}</div>
            </div>
        `;
        listaDeFilmes.appendChild(filmeElemento);
    });
}

function pesquisarFilme() {
    const termoDePesquisa = document.getElementById('searchInput').value.toLowerCase();
    const filmesFiltrados = filmes.filter(filme => 
        filme.titulo.toLowerCase().includes(termoDePesquisa) ||
        filme.descricao.toLowerCase().includes(termoDePesquisa) ||
        filme.atores.toLowerCase().includes(termoDePesquisa) ||
        filme.diretor.toLowerCase().includes(termoDePesquisa)
    );

    listarFilmes(filmesFiltrados);
}

// Inicializa a lista de filmes ao carregar a página
listarFilmes(filmes);

