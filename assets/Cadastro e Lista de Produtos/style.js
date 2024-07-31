// scripts.js
document.getElementById('Form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const prodName = document.getElementById('prodName').value;
    const prodDescription = document.getElementById('prodDescription').value;
    const prodValue = document.getElementById('prodValue').value;
    const prodAvailable = document.getElementById('prodAvailable').value;
    
    const prodTable = document.getElementById('prodTable').getElementsByTagName('tbody')[0];
    
    const newRow = prodTable.insertRow();
    
    const cellName = newRow.insertCell(0);
    const cellValue = newRow.insertCell(1);
    const cellAvailable = newRow.insertCell(2);
    
    cellName.textContent = prodName;
    cellValue.textContent = prodValue;
    cellAvailable.textContent = prodAvailable;
    
    sortTableByValue();
    
    document.getElementById('Form').reset();
});

function sortTableByValue() {
    const table = document.getElementById('prodTable');
    const rows = Array.from(table.rows).slice(1);
    
    rows.sort((a, b) => parseFloat(a.cells[1].textContent) - parseFloat(b.cells[1].textContent));
    
    rows.forEach(row => table.appendChild(row));
}
