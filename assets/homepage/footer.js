document.addEventListener("DOMContentLoaded", () => {
    const footer = document.createElement("footer");
    footer.className = "footer bg-dark text-white text-center p-3";
    footer.innerHTML = `
        <p>&copy; 2024 Ideal Rastreamento</p>
        <p>Siga-nos: 
            <a href="https://facebook.com" target="_blank">Facebook</a> | 
            <a href="https://instagram.com" target="_blank">Instagram</a> | 
            <a href="https://twitter.com" target="_blank">Twitter</a>
        </p>
    `;
    document.body.appendChild(footer);
});

