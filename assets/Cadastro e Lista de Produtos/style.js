
document.getElementById('Form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const prodName = document.getElementById('prodName').value;
    const prodValue = document.getElementById('prodValue').value;
    const prodAvailable = document.getElementById('prodAvailable').value;

    const table = document.getElementById('prodTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();

    const nameCell = newRow.insertCell(0);
    const valueCell = newRow.insertCell(1);
    const availableCell = newRow.insertCell(2);
    const actionsCell = newRow.insertCell(3); 

    nameCell.textContent = prodName;
    valueCell.textContent = prodValue;
    availableCell.textContent = prodAvailable;

    // Botão de editar
    const editButton = document.createElement('button');
    editButton.textContent = 'Editar';
    editButton.addEventListener('click', function() {
        editProduct(newRow);
    });
    actionsCell.appendChild(editButton);

    // Botão de deletar
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Deletar';
    deleteButton.addEventListener('click', function() {
        deleteProduct(newRow);
    });
    actionsCell.appendChild(deleteButton);

    // Limpar o formulário após adicionar o produto
    document.getElementById('Form').reset();
});

function editProduct(row) {
    const nameCell = row.cells[0];
    const valueCell = row.cells[1];
    const availableCell = row.cells[2];

    const newName = prompt('Novo nome do produto:', nameCell.textContent);
    const newValue = prompt('Novo valor do produto:', valueCell.textContent);
    const newAvailable = prompt('Disponível para venda (sim/não):', availableCell.textContent);

    if (newName) nameCell.textContent = newName;
    if (newValue) valueCell.textContent = newValue;
    if (newAvailable) availableCell.textContent = newAvailable;
}

function deleteProduct(row) {
    row.remove();
}
