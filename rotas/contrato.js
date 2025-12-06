document.addEventListener('DOMContentLoaded', () => {
  const pinModal = document.getElementById('pinModal');
  const openPinModalBtn = document.getElementById('openPinModal');
  const closeBtn = document.querySelector('.close-button');
  const submitPinBtn = document.getElementById('submitPin');
  const pinInput = document.getElementById('pinInput');

  // Open PIN modal
  openPinModalBtn.addEventListener('click', () => {
    pinModal.style.display = 'flex';
    pinInput.focus();
  });

  // Close PIN modal
  closeBtn.addEventListener('click', () => {
    pinModal.style.display = 'none';
  });

  // Close modal if clicked outside of it
  window.addEventListener('click', (e) => {
    if (e.target === pinModal) {
      pinModal.style.display = 'none';
    }
  });

  // Handle PIN submission
  submitPinBtn.addEventListener('click', () => {
    if (pinInput.value === '510410') {
      pinModal.style.display = 'none';
      gerarPDF();
    } else {
      alert('PIN incorreto. Tente novamente.');
      pinInput.value = '';
      pinInput.focus();
    }
  });
});

function gerarPDF() {
    var razaoSocial = document.getElementById('contratante-razao-social').value.trim();
    var cpfCnpj = document.getElementById('contratante-cpf-cnpj').value.trim();
    var endereco = document.getElementById('contratante-endereco').value.trim();
    var representante = document.getElementById('contratante-representante').value.trim();

    var checkedServices = document.querySelectorAll('input[name="servicos"]:checked');
    var selectedServices = [];
    checkedServices.forEach(function(checkbox) {
        selectedServices.push({
            title: checkbox.getAttribute('data-title'),
            description: checkbox.nextElementSibling.querySelector('p').textContent
        });
    });

    if (selectedServices.length === 0) {
        alert('Por favor, selecione pelo menos um serviço.');
        return;
    }

    var servicesHtml = '<div style="margin-top: 15px;">';
    selectedServices.forEach(function(service) {
        servicesHtml += `
            <div style="margin-bottom: 12px; padding-left: 10px; border-left: 2px solid #007bff;">
                <h4 style="margin: 0 0 4px 0; font-size: 14px; font-weight: bold;">${service.title}</h4>
                <p style="margin: 0; font-size: 12px; color: #444;">${service.description}</p>
            </div>`;
    });
    servicesHtml += '</div>';

    var pdfContent = `
    <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #333; padding: 35px; max-width: 800px; margin: auto; border: 1px solid #ddd; background: #fff;">
        <div style="text-align: center; border-bottom: 2px solid #007bff; padding-bottom: 10px; margin-bottom: 20px;">
            <h1 style="font-size: 24px; margin: 0; color: #007bff;">CONTRATO DE PRESTAÇÃO DE SERVIÇOS</h1>
        </div>

        <div style="margin-top: 25px; font-size: 12px; line-height: 1.6;">
            <h2 style="font-size: 16px; border-bottom: 1px solid #eee; padding-bottom: 6px; margin-bottom: 10px;">PARTES CONTRATANTES</h2>
            <p><strong>CONTRATANTE:</strong> ${razaoSocial || 'A ser preenchido'}, doravante denominada simplesmente CONTRATANTE.</p>
            <p><strong>CNPJ/CPF:</strong> ${cpfCnpj || 'A ser preenchido'}</p>
            <p><strong>ENDEREÇO:</strong> ${endereco || 'A ser preenchido'}</p>
            <p><strong>REPRESENTANTE LEGAL:</strong> ${representante || 'A ser preenchido'}</p>
            <br>
            <p><strong>CONTRATADA:</strong> DM Solution, pessoa jurídica de direito privado, inscrita no CNPJ sob o nº 63.353.524/0001-86, doravante denominada CONTRATADA.</p>
        </div>

        <div style="margin-top: 20px; font-size: 12px; text-align: justify; line-height: 1.6;">
            <h3 style="font-size: 14px; font-weight: bold;">CLÁUSULA 1ª - DO OBJETO</h3>
            <p>1.1. O presente contrato tem por objeto a prestação de serviços de tecnologia, conforme detalhado no escopo abaixo, selecionado pela CONTRATANTE.</p>
            
            <h3 style="font-size: 14px; font-weight: bold; margin-top: 15px;">SERVIÇOS CONTRATADOS</h3>
            ${servicesHtml}

            <h3 style="font-size: 14px; font-weight: bold; margin-top: 20px;">CLÁUSULA 2ª - DO PRAZO E VIGÊNCIA</h3>
            <p>2.1. O presente contrato terá vigência mínima de 3 (três ) meses, a contar da data de sua assinatura, com renovação automática por iguais períodos, salvo manifestação em contrário por qualquer das partes, com aviso prévio de 30 (trinta) dias.</p>
            
            <h3 style="font-size: 14px; font-weight: bold; margin-top: 20px;">CLÁUSULA 3ª - DA RESCISÃO E MULTA</h3>
            <p>3.1. Caso a CONTRATANTE decida rescindir o presente contrato antes do término do prazo mínimo de 3 (três ) meses, incidirá multa rescisória no valor correspondente a 50% (cinquenta por cento) do valor restante do contrato.</p>
            <p>3.2. A parte que não comunicar a intenção de não renovação com a antecedência mínima de 30 (trinta) dias estará sujeita a multa equivalente a 1 (um) mês do valor do contrato.</p>

            <h3 style="font-size: 14px; font-weight: bold; margin-top: 20px;">CLÁUSULA 4ª - DO PREÇO E DAS CONDIÇÕES DE PAGAMENTO</h3>
            <p>4.1. Pelos serviços prestados, a CONTRATANTE pagará à CONTRATADA os valores que serão definidos em proposta comercial anexa, a qual passa a fazer parte integrante deste contrato.</p>
            <p>4.2. O pagamento deverá ser efetuado até o 5º (quinto) dia útil de cada mês, através de boleto bancário ou transferência.</p>

            <h3 style="font-size: 14px; font-weight: bold; margin-top: 20px;">CLÁUSULA 5ª - DAS OBRIGAÇÕES</h3>
            <p>5.1. Compete à CONTRATADA prestar os serviços com zelo e qualidade, em conformidade com as melhores práticas de mercado.</p>
            <p>5.2. Compete à CONTRATANTE fornecer todas as informações e acessos necessários para a execução dos serviços, bem como efetuar os pagamentos nos prazos estipulados.</p>

            <h3 style="font-size: 14px; font-weight: bold; margin-top: 20px;">CLÁUSULA 6ª - DA CONFIDENCIALIDADE</h3>
            <p>6.1. As partes se comprometem a manter em absoluto sigilo todas as informações comerciais e técnicas a que tiverem acesso durante a vigência deste contrato.</p>

            <h3 style="font-size: 14px; font-weight: bold; margin-top: 20px;">CLÁUSULA 7ª - DO FORO</h3>
            <p>7.1. Para dirimir quaisquer controvérsias oriundas do CONTRATO, as partes elegem o foro da comarca da CONTRATADA.</p>
        </div>

        <div style="margin-top: 60px; font-size: 12px; text-align: center;">
            <p>E, por estarem assim justos e contratados, firmam o presente instrumento em duas vias de igual teor.</p>
            <br><br><br>
            <div style="display: inline-block; width: 45%; text-align: center;">
                <p>_________________________________________</p>
                <p><strong>${razaoSocial || 'CONTRATANTE'}</strong></p>
            </div>
            <div style="display: inline-block; width: 45%; text-align: center;">
                <p>_________________________________________</p>
                <p><strong>DM Solution</strong></p>
            </div>
            <br><br>
            <p style="margin-top: 20px;">Data: _____/_____/______</p>
        </div>
    </div>
    `;

    var element = document.createElement('div');
    element.innerHTML = pdfContent;
    document.body.appendChild(element);

    html2canvas(element, { scale: 3, useCORS: true }).then(canvas => {
        var imgData = canvas.toDataURL('image/png');
        const { jsPDF } = window.jspdf;
        var pdf = new jsPDF('p', 'mm', 'a4');
        var pdfWidth = pdf.internal.pageSize.getWidth();
        var pdfHeight = pdf.internal.pageSize.getHeight();
        
        var canvasWidth = canvas.width;
        var canvasHeight = canvas.height;
        var ratio = canvasHeight / canvasWidth;
        
        var imgHeight = pdfWidth * ratio;
        var heightLeft = imgHeight;
        var position = 0;
        
        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
        heightLeft -= pdfHeight;
        
        while (heightLeft > 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
            heightLeft -= pdfHeight;
        }

        pdf.save(`Contrato_${razaoSocial.replace(/\s/g, '_') || 'Servicos'}.pdf`);
        document.body.removeChild(element);
    }).catch(function(error) {
        console.error('Ocorreu um erro ao gerar o PDF:', error);
        document.body.removeChild(element);
    });
}