document.getElementById('imcForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const peso = parseFloat(document.getElementById('peso').value);
    const altura = parseFloat(document.getElementById('altura').value);
    const resultado = document.getElementById('resultado');

    if (peso < 30 || peso > 200) {
        resultado.textContent = 'Por favor, insira um peso entre 30 kg e 200 kg.';
        return;
    }

    if (altura < 1.2 || altura > 2.5) {
        resultado.textContent = 'Por favor, insira uma altura entre 1,2 m e 2,5 m.';
        return;
    }

    const imc = peso / (altura * altura);
    resultado.textContent = `Seu IMC é = ${imc.toFixed(2)}`;

    if (imc < 18.5) {
        resultado.textContent += '\nVocê está abaixo do peso normal.';
    } else if (imc >= 18.5 && imc <= 24.9) {
        resultado.textContent += '\nSeu peso está normal.';
    } else if (imc >= 25.0 && imc <= 29.9) {
        resultado.textContent += '\nVocê está com excesso de peso.';
    } else if (imc >= 30.0 && imc <= 34.9) {
        resultado.textContent += '\nVocê está em obesidade classe I.';
    } else if (imc >= 35.0 && imc <= 39.9) {
        resultado.textContent += '\nVocê está em obesidade classe II.';
    } else {
        resultado.textContent += '\nVocê está em obesidade classe III.';
    }
});
