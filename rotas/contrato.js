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

async function gerarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'mm', 'a4');
    
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

    var servicesHtml = '';
    selectedServices.forEach(function(service) {
        servicesHtml += `
            <div style="margin-bottom: 8px; padding-left: 10px; border-left: 2px solid #007bff;">
                <h4 style="margin: 0; font-size: 13px;">${service.title}</h4>
                <p style="margin: 2px 0 0 0; font-size: 11px; color: #444;">${service.description}</p>
            </div>`;
    });

    // ESTILO COMUM PARA AS PÁGINAS
    const pageStyle = `style="font-family: Arial, sans-serif; color: #333; padding: 50px; width: 750px; background: #fff; min-height: 1050px;"`;

    // CONTEÚDO DA PÁGINA 1: Cabeçalho, Partes e Escopo
    var contentPage1 = `
    <div ${pageStyle}>
        <div style="text-align: center; border-bottom: 2px solid #007bff; padding-bottom: 10px; margin-bottom: 30px;">
            <h1 style="font-size: 22px; margin: 0; color: #007bff; text-transform: uppercase;">Contrato de Prestação de Serviços Técnicos</h1>
            <p style="font-size: 11px; color: #666; margin-top: 5px;">DM Solution Connect - Soluções Digitais & Inteligência</p>
        </div>

        <div style="font-size: 13px; margin-bottom: 30px;">
            <h2 style="font-size: 15px; border-bottom: 1px solid #eee; padding-bottom: 5px; font-weight: bold;">1. PARTES CONTRATANTES</h2>
            <p style="margin: 10px 0;"><strong>CONTRATANTE:</strong> ${razaoSocial || '________________________________________________'}</p>
            <p style="margin: 10px 0;"><strong>CNPJ/CPF:</strong> ${cpfCnpj || '________________________'}</p>
            <p style="margin: 10px 0;"><strong>ENDEREÇO:</strong> ${endereco || '________________________________________________'}</p>
            <p style="margin: 10px 0;"><strong>REPRESENTANTE:</strong> ${representante || '________________________________'}</p>
            <p style="margin-top: 15px;"><strong>CONTRATADA:</strong> <strong>DM Solution</strong>, inscrita no CNPJ sob o nº 63.353.524/0001-86, com sede em Fortaleza-CE.</p>
        </div>

        <div style="font-size: 13px;">
            <h3 style="font-size: 14px; font-weight: bold; margin-bottom: 10px;">CLÁUSULA 1ª - DO OBJETO E ESCOPO</h3>
            <p style="margin-bottom: 15px;">1.1. O presente contrato tem por objeto a prestação dos serviços técnicos abaixo descritos:</p>
            <div style="background: #fdfdfd; padding: 15px; border: 1px solid #f0f0f0; border-radius: 8px;">
                ${servicesHtml}
            </div>
        </div>
    </div>`;

    // CONTEÚDO DA PÁGINA 2: Cláusulas Jurídicas, Valores e Assinaturas
    var contentPage2 = `
    <div ${pageStyle}>
        <div style="font-size: 13px; text-align: justify; line-height: 1.6;">
            <h3 style="font-size: 14px; font-weight: bold;">CLÁUSULA 2ª - DO PRAZO E VIGÊNCIA</h3>
            <p>2.1. O presente contrato terá vigência mínima de <strong>03 (três) meses</strong>, com renovação automática por períodos iguais.</p>
            
            <h3 style="font-size: 14px; font-weight: bold; margin-top: 20px;">CLÁUSULA 3ª - DA RESCISÃO E MULTA</h3>
            <p>3.1. A rescisão antecipada por parte da CONTRATANTE sem justa causa implicará em multa de 50% sobre o valor das parcelas restantes do período de vigência.</p>

            <h3 style="font-size: 14px; font-weight: bold; margin-top: 20px; color: #d9534f;">CLÁUSULA 4ª - VALORES E CONDIÇÕES DE PAGAMENTO</h3>
            <p>4.1. Como contraprestação pelos serviços, a CONTRATANTE pagará:</p>
            <p style="margin: 10px 0 10px 20px;"><strong>A) TAXA DE IMPLEMENTAÇÃO (SETUP):</strong> R$ ________________________</p>
            <p style="margin: 10px 0 10px 20px;"><strong>B) MENSALIDADE DOS SERVIÇOS:</strong> R$ ________________________</p>
            <p>4.2. Os pagamentos deverão ser quitados até o dia <strong>05 (cinco)</strong> de cada mês via PIX ou transferência bancária.</p>

            <h3 style="font-size: 14px; font-weight: bold; margin-top: 20px;">CLÁUSULA 5ª - DAS OBRIGAÇÕES</h3>
            <p>5.1. A CONTRATADA deverá manter o padrão técnico de excelência. 5.2. A CONTRATANTE deverá fornecer os acessos e informações necessárias em tempo hábil.</p>

            <h3 style="font-size: 14px; font-weight: bold; margin-top: 20px;">CLÁUSULA 6ª - CONFIDENCIALIDADE (LGPD)</h3>
            <p>6.1. Ambas as partes comprometem-se com o sigilo total de dados sensíveis e estratégicos conforme a Lei Geral de Proteção de Dados.</p>

            <h3 style="font-size: 14px; font-weight: bold; margin-top: 20px;">CLÁUSULA 7ª - DO FORO</h3>
            <p>7.1. Fica eleito o foro da comarca de Fortaleza-CE para dirimir quaisquer dúvidas deste instrumento.</p>
        </div>

        <div style="margin-top: 80px; font-size: 12px; text-align: center;">
            <p>Fortaleza, ____ de ____________ de 2026.</p>
            <br><br><br>
            <div style="display: flex; justify-content: space-between; padding: 0 40px;">
                <div style="width: 250px; border-top: 1px solid #000; padding-top: 5px;">CONTRATANTE</div>
                <div style="width: 250px; border-top: 1px solid #000; padding-top: 5px;">DM SOLUTION CONNECT</div>
            </div>
        </div>
    </div>`;

    // FUNÇÃO AUXILIAR PARA RENDERIZAR E ADICIONAR AO PDF
    async function addPageToPdf(htmlContent, isLast) {
        const tempDiv = document.createElement('div');
        tempDiv.style.position = 'fixed';
        tempDiv.style.left = '-10000px';
        tempDiv.innerHTML = htmlContent;
        document.body.appendChild(tempDiv);

        const canvas = await html2canvas(tempDiv, { scale: 2, useCORS: true });
        const imgData = canvas.toDataURL('image/png');
        doc.addImage(imgData, 'PNG', 0, 0, 210, 297); // Ajuste exato A4
        
        if (!isLast) doc.addPage();
        document.body.removeChild(tempDiv);
    }

    try {
        await addPageToPdf(contentPage1, false);
        await addPageToPdf(contentPage2, true);
        doc.save(`Contrato_DM_${razaoSocial.replace(/\s+/g, '_') || 'Digital'}.pdf`);
    } catch (err) {
        console.error("Erro ao gerar páginas:", err);
    }
}