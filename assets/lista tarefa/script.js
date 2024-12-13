document.getElementById('adicionar-tarefa').addEventListener('click', function() {
    let novaTarefa = document.getElementById('nova-tarefa').value;
    if (novaTarefa.trim() !== "") {
        let listaTarefas = document.getElementById('tarefas');

        let li = document.createElement('li');
        li.textContent = novaTarefa;

        let botaoRemover = document.createElement('button');
        botaoRemover.textContent = 'Remover';
        botaoRemover.className = 'remover-tarefa';
        botaoRemover.addEventListener('click', function() {
            listaTarefas.removeChild(li);
        });

        li.appendChild(botaoRemover);
        listaTarefas.appendChild(li);

        document.getElementById('nova-tarefa').value = '';
    }
});

document.getElementById('tarefas').addEventListener('click', function(event) {
    if (event.target.tagName === 'LI') {
        event.target.classList.toggle('tarefa-concluida');
    }
});
