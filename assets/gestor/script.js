let despesasFixas = [];
let despesasVariaveis = [];

document.getElementById('adicionarFixa').addEventListener('click', function() {
    const valor = parseFloat(document.getElementById('despesaFixa').value) || 0;
    despesasFixas.push(valor);
    atualizarLista('listaFixas', despesasFixas);
});

document.getElementById('adicionarVariavel').addEventListener('click', function() {
    const valor = parseFloat(document.getElementById('despesaVariavel').value) || 0;
    despesasVariaveis.push(valor);
    atualizarLista('listaVariaveis', despesasVariaveis);
});

document.getElementById('calcular').addEventListener('click', function() {
    const valorRealizado = parseFloat(document.getElementById('valorRealizado').value) || 0;

    // Somando as despesas fixas e variáveis
    const totalDespesas = somarValores(despesasFixas) + somarValores(despesasVariaveis);
    const faltante = totalDespesas - valorRealizado;

    document.getElementById('meta').innerText = `Meta Total: R$ ${totalDespesas.toFixed(2)}`;
    document.getElementById('faltante').innerText = `Valor Faltante: R$ ${faltante.toFixed(2)}`;
    const percentual = (valorRealizado / totalDespesas) * 100;
    document.getElementById('percentual').innerText = `Percentual Realizado: ${percentual.toFixed(2)}%`;

    // Atualizando gráfico
    atualizarGrafico(totalDespesas, valorRealizado, faltante);
});

function atualizarLista(elementId, lista) {
    const ul = document.getElementById(elementId);
    ul.innerHTML = '';
    lista.forEach((valor, index) => {
        const li = document.createElement('li');
        li.textContent = `Despesa ${index + 1}: R$ ${valor.toFixed(2)}`;
        ul.appendChild(li);
    });
}

function somarValores(lista) {
    return lista.reduce((acc, val) => acc + val, 0);
}

function atualizarGrafico(totalDespesas, realizado, faltante) {
    const ctx = document.getElementById('grafico').getContext('2d');

    if (window.meuGrafico) {
        window.meuGrafico.destroy();
    }

    window.meuGrafico = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Realizado', 'Faltante'],
            datasets: [{
                data: [realizado, faltante],
                backgroundColor: ['#4bc0c0', '#ff6384'],
                borderColor: ['#fff', '#fff'],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom'
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return `${tooltipItem.label}: R$ ${tooltipItem.raw.toFixed(2)}`;
                        }
                    }
                }
            }
        }
    });
}
