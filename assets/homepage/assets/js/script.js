document.getElementById('darkModeToggle').addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
    document.querySelector('header').classList.toggle('dark-mode');
    document.querySelector('footer').classList.toggle('dark-mode');
    this.classList.toggle('dark-mode');
});

// Exibir o botão ao rolar a página para baixo
function subirParaInicio() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.onscroll = () => {
    const botaoTopo = document.getElementById("botaoTopo");
    if (window.scrollY > 200) { // Exibe o botão após rolar 200px
        botaoTopo.style.display = "block";
    } else {
        botaoTopo.style.display = "none";
    }
};
