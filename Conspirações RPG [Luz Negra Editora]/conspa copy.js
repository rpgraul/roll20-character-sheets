// Load archetype sheet #archetype
document.addEventListener("DOMContentLoaded", function(e) {
    var select = document.getElementById('archetype');
    var option = select.options[select.selectedIndex];
    var content = document.querySelector('body');
  
    var newClass = option.value
    content.classList.add(newClass);
  
    //Btn - Popup Montar Rolagem
    const abrirPopup = document.getElementById('abrir-popup');
    const popup = document.getElementById('popup');
    const fecharPopup = document.getElementById('fechar-popup');
    const formDados = document.getElementById('form-dados');
    const checkboxes = document.getElementById('dinamic');
    const botaoRolar = document.getElementById('rolar-dados');
  
    // Array com os IDs dos checkboxes a serem criados
    const idsCheckbox = [];

    // Adiciona IDs para 'ocupacao'
    for (let i = 1; i <= 3; i++) {
    idsCheckbox.push(`ocupacao-${i}`);
    }

    // Adiciona IDs para 'aspc' e 'espc'
    ['aspc', 'espc'].forEach(prefix => {
    for (let i = 1; i <= 10; i++) {
        idsCheckbox.push(`${prefix}${i}`);
    }
    });

    // Função para adicionar checkboxes no formulário
    function adicionarCheckboxes() {
    checkboxes.innerHTML = '';
    idsCheckbox.forEach(id => {
        const input = document.getElementById(id);
        if (input && input.value) { // Adiciona a condição para o valor do input
        const li = document.createElement('li');

        const label = document.createElement('label');
        label.classList.add('checkbox');
        label.setAttribute('for', id);
        label.appendChild(document.createTextNode(input.value)); // Altera o texto exibido

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.name = 'dados';
        checkbox.value = id;
        checkbox.id = id;

        li.appendChild(checkbox);
        li.appendChild(label);
        checkboxes.appendChild(li);
        }
    });
    }

  
    // Adiciona os checkboxes no formulário ao carregar a página
    adicionarCheckboxes();
  
    // Abre o popup ao clicar no botão
    abrirPopup.addEventListener('click', () => {
      popup.style.display = 'block';
      popup.classList.add('open');
    });
  
    // Fecha o popup ao clicar no botão "close"
    fecharPopup.addEventListener('click', () => {
      popup.style.display = 'none';
    });
    

    // Código para rolar os dados
    
  
  });
  
  // Change archetype sheet #archetype
  function archetype() {
    var select = document.getElementById('archetype');
    var option = select.options[select.selectedIndex];
    var content = document.querySelector('body');
    var newClass = option.value
    content.classList.add(newClass);
  
    if (newClass == 'consp') {
      content.classList.remove('agent', 'unwary');
    };
    if (newClass == 'agent') {
      content.classList.remove('consp', 'unwary');
    };
    if (newClass == 'unwary') {
      content.classList.remove('consp', 'agent');
    };
  
  };
  


// Fecha o popup quando o usuário clica dentro do popup aberto
function fecharPopupDentroDoContainer(event) {
    const openDiv = document.querySelector('.open');
    if (event.target === openDiv) {
      popup.style.display = 'none';
    }
  }
  
  // Adiciona o event listener ao document
  document.addEventListener('click', fecharPopupDentroDoContainer);
  
  


