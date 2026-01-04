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
        });
    });

    if (selectedServices.length === 0) {
        alert('Por favor, selecione pelo menos um serviço.');
        return;
    }

    // Gerar HTML dos serviços com proteção contra quebra de linha no meio do bloco
    var servicesHtml = '<div style="margin-top: 10px;">';
    selectedServices.forEach(function(service) {
        servicesHtml += `
            <div style="margin-bottom: 10px; padding-left: 10px; border-left: 2px solid #007bff; page-break-inside: avoid;">
                <h4 style="margin: 0 0 2px 0; font-size: 13px; font-weight: bold;">${service.title}</h4>
                <p style="margin: 0; font-size: 11px; color: #444;">${service.description}</p>
            </div>`;
    });
    servicesHtml += '</div>';

    // Conteúdo do PDF com os espaços para preenchimento manual
    var pdfContent = `
    <div style="font-family: Arial, sans-serif; color: #333; padding: 40px; width: 750px; background: #fff; line-height: 1.5;">
        <div style="text-align: center; border-bottom: 2px solid #007bff; padding-bottom: 10px; margin-bottom: 20px;">
            <h1 style="font-size: 18px; margin: 0; color: #007bff; text-transform: uppercase;">Contrato de Prestação de Serviços Técnicos</h1>
            <p style="font-size: 10px; color: #666; margin: 5px 0 0 0;">DM Solution Connect - Inteligência Digital</p>
        </div>

        <div style="font-size: 12px;">
            <h2 style="font-size: 14px; border-bottom: 1px solid #eee; padding-bottom: 4px; margin-bottom: 10px; font-weight: bold;">1. PARTES CONTRATANTES</h2>
            <p><strong>CONTRATANTE:</strong> ${razaoSocial || '________________________________________________'}</p>
            <p><strong>CNPJ/CPF:</strong> ${cpfCnpj || '________________________'}</p>
            <p><strong>ENDEREÇO:</strong> ${endereco || '________________________________________________'}</p>
            <p><strong>REPRESENTANTE:</strong> ${representante || '________________________________'}</p>
            <p style="margin-top: 10px;"><strong>CONTRATADA:</strong> <strong>DM Solution</strong>, inscrita no CNPJ sob o nº 63.353.524/0001-86, com sede em Fortaleza-CE.</p>
        </div>

        <div style="margin-top: 15px; font-size: 12px; text-align: justify;">
            <h3 style="font-size: 13px; font-weight: bold; margin-bottom: 5px;">CLÁUSULA 1ª - DO OBJETO</h3>
            <p>1.1. O presente contrato tem por objeto a execução dos serviços de tecnologia descritos no escopo abaixo, selecionados conforme a necessidade da CONTRATANTE.</p>
            
            <div style="background: #f9f9f9; padding: 10px; border-radius: 5px; margin: 10px 0;">
                <h3 style="font-size: 12px; font-weight: bold; color: #007bff; margin: 0 0 5px 0;">ESCOPO TÉCNICO:</h3>
                ${servicesHtml}
            </div>

            <h3 style="font-size: 13px; font-weight: bold; margin-top: 15px;">CLÁUSULA 2ª - PRAZO E VIGÊNCIA</h3>
            <p>2.1. O contrato terá vigência de <strong>03 (três) meses</strong>. A renovação ocorre de forma automática por períodos iguais, salvo se houver aviso prévio de cancelamento de 30 dias por ambas as partes.</p>
            
            <h3 style="font-size: 13px; font-weight: bold; margin-top: 15px;">CLÁUSULA 3ª - RESCISÃO E MULTA</h3>
            <p>3.1. Em caso de rescisão antecipada por parte da CONTRATANTE antes do prazo de 3 meses, será aplicada multa de 50% sobre o valor das parcelas vincendas.</p>

            <h3 style="font-size: 13px; font-weight: bold; margin-top: 15px;">CLÁUSULA 4ª - VALORES E PAGAMENTO</h3>
            <p>4.1. Pelos serviços descritos, a CONTRATANTE pagará os seguintes valores:</p>
            <p style="margin-left: 20px; margin-top: 8px;"><strong>A) VALOR DE IMPLEMENTAÇÃO:</strong> R$ ________________________</p>
            <p style="margin-left: 20px; margin-top: 8px;"><strong>B) VALOR DA MENSALIDADE:</strong> R$ ________________________</p>
            <p style="margin-top: 10px;">4.2. O pagamento deverá ser efetuado via PIX ou Boleto até o dia 05 (cinco) de cada mês.</p>

            <h3 style="font-size: 13px; font-weight: bold; margin-top: 15px;">CLÁUSULA 5ª - CONFIDENCIALIDADE</h3>
            <p>5.1. A CONTRATADA compromete-se a manter sigilo absoluto sobre dados e estratégias da CONTRATANTE, em conformidade com a LGPD.</p>
        </div>
          <p style="margin-top: 30px;">Data: ____ de ____________ de 2026.</p>

        <div style="margin-top: 50px; font-size: 10px; text-align: center;">
            <p>Estando as partes de pleno acordo, assinam o presente em duas vias.</p>
            <br><br>
            <div style="display: flex; justify-content: space-around;">
                <div style="width: 300px; text-align: center; border-top: 1px solid #000; padding-top: 5px;">
                    CONTRATANTE
                </div>
                <div style="width: 300px; text-align: center; border-top: 1px solid #000; padding-top: 5px;">
                    DM SOLUTION CONNECT
                </div>
            </div>
            
        </div>
    </div>
    `;

    // Criar elemento temporário oculto
    var element = document.createElement('div');
    element.style.position = 'fixed';
    element.style.left = '-10000px';
    element.style.top = '0';
    element.innerHTML = pdfContent;
    document.body.appendChild(element);

    // Configuração para evitar cortes: Scale 2 para qualidade e ajuste de página
    html2canvas(element, { 
        scale: 2, 
        useCORS: true,
        backgroundColor: "#ffffff"
    }).then(canvas => {
        const { jsPDF } = window.jspdf;
        var pdf = new jsPDF('p', 'mm', 'a4');
        
        var imgData = canvas.toDataURL('image/png');
        var imgWidth = 210; // Largura do A4 em mm
        var pageHeight = 295; // Altura do A4 em mm
        var imgHeight = (canvas.height * imgWidth) / canvas.width;
        var heightLeft = imgHeight;
        var position = 0;

        // Adicionar imagem ao PDF tratando quebras de página
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft > 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }

        pdf.save(`Contrato_DM_${razaoSocial || 'Servicos'}.pdf`);
        document.body.removeChild(element);
    }).catch(error => {
        console.error('Erro na geração:', error);
        document.body.removeChild(element);
    });
}