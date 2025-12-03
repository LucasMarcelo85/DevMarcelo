function gerarPDF() {
    // Contratante Info
    var razaoSocial = document.getElementById('contratante-razao-social').value || '';
    var cpfCnpj = document.getElementById('contratante-cpf-cnpj').value || '';
    var endereco = document.getElementById('contratante-endereco').value || '';
    var representante = document.getElementById('contratante-representante').value || '';

    // Valores
    var valorMensal = document.getElementById('valor-mensal').value || '0,00';
    var valorIntegracao = document.getElementById('valor-integracao').value || '0,00';

    // Assinatura Info
    var dataContratante = document.getElementById('data-contratante').value || '';

    // Serviços
    var checked = document.querySelectorAll('input[name="servicos"]:checked');
    var selected = [];
    for (var i = 0; i < checked.length; i++) {
      var t = checked[i].getAttribute('data-title') || checked[i].value;
      selected.push(t);
    }

    if (selected.length === 0) {
      alert('Por favor, selecione pelo menos um serviço antes de gerar o PDF.');
      return;
    }

    var now = new Date().toLocaleString();

    var servicesHTML = '<ul style="padding-left: 20px;">';
    for (var j = 0; j < selected.length; j++) {
      servicesHTML += '<li style="margin-bottom: 8px;">' + selected[j] + '</li>';
    }
    servicesHTML += '</ul>';

    var docHTML = '<div style="font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; color: #333;">';
    docHTML += '<h1 style="text-align: center; color: #333; margin-bottom: 10px;">Contrato de Prestação de Serviços</h1>';
    docHTML += '<h2 style="text-align: center; font-size: 14px; color: #666; margin-top: 0;">DM Solution</h2>';
    docHTML += '<hr style="margin: 20px 0; border: none; border-top: 1px solid #999;">';

    // Detalhes do Contratante e Contratada
    docHTML += '<h2 style="font-size: 14px; margin-top: 20px;">Partes Envolvidas</h2>';
    docHTML += '<p><strong>Contratante:</strong></p>';
    docHTML += '<p style="padding-left: 15px;"><strong>Nome/Razão Social:</strong> ' + (razaoSocial || '___________________________') + '</p>';
    docHTML += '<p style="padding-left: 15px;"><strong>CPF/CNPJ:</strong> ' + (cpfCnpj || '___________________________') + '</p>';
    docHTML += '<p style="padding-left: 15px;"><strong>Endereço:</strong> ' + (endereco || '___________________________') + '</p>';
    docHTML += '<p style="padding-left: 15px;"><strong>Representante Legal:</strong> ' + (representante || '___________________________') + '</p>';
    docHTML += '<p style="margin-top: 10px;"><strong>Contratada:</strong> DM Solution - CNPJ: 63.353.524/0001-86</p>';
    docHTML += '<p><strong>Representante:</strong> Lucas Marcelo Nascimento de Souza</p>';
    docHTML += '<hr style="margin: 20px 0; border: none; border-top: 1px solid #999;">';

    // Valores
    docHTML += '<h2 style="font-size: 14px; margin-top: 20px;">Valores</h2>';
    docHTML += '<p><strong>Valor Mensal:</strong> R$ ' + valorMensal + '</p>';
    docHTML += '<p><strong>Valor da Integração/Implantação:</strong> R$ ' + valorIntegracao + '</p>';
    docHTML += '<hr style="margin: 20px 0; border: none; border-top: 1px solid #999;">';

    // Serviços
    docHTML += '<h2 style="font-size: 14px; margin-top: 20px;">Serviços Contratados</h2>';
    docHTML += servicesHTML;
    docHTML += '<hr style="margin: 20px 0; border: none; border-top: 1px solid #999;">';

    // Assinaturas
    docHTML += '<h2 style="font-size: 14px; margin-top: 30px;">Assinaturas</h2>';
    docHTML += '<p style="margin-top: 40px;"><strong>Contratante</strong></p>';
    docHTML += '<p style="margin-top: 60px;">Assinatura: _______________________________</p>';
    docHTML += '<p>Nome: ' + (representante || '___________________________') + '</p>'; // Usa o representante legal
    docHTML += '<p>Data: ' + (dataContratante || '______________') + '</p>';
    docHTML += '<p style="margin-top: 40px;"><strong>Contratada - DM Solution</strong></p>';
    docHTML += '<p>Lucas Marcelo Nascimento de Souza</p>';
    docHTML += '<p style="margin-top: 40px;">Assinatura: _______________________________</p>';
    docHTML += '<p>Data: ______________</p>';
    docHTML += '<p style="margin-top: 40px; text-align: center; font-size: 11px; color: #999;">Gerado em ' + now + '</p>';
    docHTML += '</div>';

    if (typeof html2canvas === 'undefined' || typeof window.jspdf === 'undefined') {
      console.error('Bibliotecas nao carregaram. Usando impressao...');
      var w = window.open('', '_blank');
      if (w) {
        w.document.write('<!DOCTYPE html><html><head><meta charset="utf-8"><style>body { font-family: Arial; padding: 20px; }</style></head><body>');
        w.document.write(docHTML);
        w.document.write('</body></html>');
        w.document.close();
        setTimeout(function() { w.print(); }, 500);
      }
      return;
    }

    var element = document.createElement('div');
    element.innerHTML = docHTML;
    element.style.position = 'absolute';
    element.style.left = '-9999px';
    element.style.width = '210mm';
    element.style.padding = '0';
    document.body.appendChild(element);

    html2canvas(element, { scale: 2, useCORS: true }).then(function(canvas) {
      var imgData = canvas.toDataURL('image/png');
      const { jsPDF } = window.jspdf;
      var pdf = new jsPDF('p', 'mm', 'a4');
      var imgWidth = 210;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      var heightLeft = imgHeight;
      var position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= 297;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= 297;
      }

      var nomeArquivo = 'Contrato_' + (razaoSocial.replace(/[^a-z0-9]/gi, '_') || 'DM_Solution') + '.pdf';
      pdf.save(nomeArquivo);
      document.body.removeChild(element);
    }).catch(function(err) {
      console.error('Erro ao gerar PDF:', err);
      document.body.removeChild(element);
      alert('Erro ao gerar PDF. Tentando modo impressao...');
      var w = window.open('', '_blank');
      if (w) {
        w.document.write('<!DOCTYPE html><html><head><meta charset="utf-8"></head><body>');
        w.document.write(docHTML);
        w.document.write('</body></html>');
        w.document.close();
        setTimeout(function() { w.print(); }, 500);
      }
    });
  }

  document.getElementById('gerarPdf').addEventListener('click', gerarPDF);