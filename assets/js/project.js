function showCategory(category) {
    // Oculta todos os cards
    const allCards = document.querySelectorAll('.card');
    allCards.forEach(card => card.classList.add('hidden'));
  
    // Remove a classe 'active' de todos os botões
    const allButtons = document.querySelectorAll('.menu button');
    allButtons.forEach(button => button.classList.remove('active'));
  
    // Mostra os cards da categoria selecionada
    const selectedCards = document.querySelectorAll('.' + category);
    selectedCards.forEach(card => card.classList.remove('hidden'));
  
    // Adiciona a classe 'active' ao botão clicado
    event.target.classList.add('active');
  }
  