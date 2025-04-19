document.querySelector('#app').innerHTML = `
  <div id="resume">
    <h1 id="name">Иван Иванов</h1>
    <div class="contact" id="contact">📧 example@mail.com | 📱 +7 999-123-45-67</div>
    
    <div class="section">
      <h2>Опыт работы</h2>
      <div id="experience" class="editable">
        • Senior Developer в XYZ Corp (2020-настоящее время)
      </div>
    </div>

    <div class="section">
      <h2>Образование</h2>
      <div id="education" class="editable">
        • МГУ, Факультет вычислительной математики и кибернетики
      </div>
    </div>

    <div class="section">
      <h2>Навыки</h2>
      <div id="skills" class="editable">
        JavaScript, HTML/CSS, React, Node.js
      </div>
    </div>

    <button id="downloadBtn">Скачать PDF</button>
  </div>
`;
// Включение редактирования
document.querySelectorAll('.editable').forEach(element => {
    element.addEventListener('click', () => {
      element.contentEditable = true;
      element.focus();
      element.classList.add('editing');
    });
  
    element.addEventListener('blur', () => {
      element.contentEditable = false;
      element.classList.remove('editing');
      element.classList.add('updated');
      setTimeout(() => element.classList.remove('updated'), 1000);
    });
  });
  
  // Генерация PDF
  document.getElementById('downloadBtn').addEventListener('click', () => {
    html2canvas(document.querySelector("#resume")).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jspdf.jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('resume.pdf');
    });
  });
