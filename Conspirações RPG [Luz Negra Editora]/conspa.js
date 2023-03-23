// Load archetype sheet #archetype
document.addEventListener("DOMContentLoaded", function(e) {
    var select = document.getElementById('archetype');
    var option = select.options[select.selectedIndex];
    var content = document.querySelector('.main');
    
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
  
    const config = {
        'ocupacao': 3,
        'aspc': 10,
        'espc': 10,
      };
      
      for (const [prefix, count] of Object.entries(config)) {
        for (let i = 1; i <= count; i++) {
          idsCheckbox.push(`${prefix}-${i}`);
        }
      }
  

    function adicionarCheckboxes() {
        checkboxes.innerHTML = '';
        const prefixLast = {}; // Objeto para armazenar o último item de cada prefixo
        idsCheckbox.forEach((id, i) => {
          const input = document.getElementById(id);
          if (input && input.value) { // Adiciona a condição para o valor do input
            const li = document.createElement('li');
            const prefix = id.split('-')[0];
            li.classList.add(prefix);
      
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
      
            if (!prefixLast[prefix]) { // Verifica se é o primeiro item do prefixo
              li.classList.add('last');
            } else { // Se não for o primeiro, adiciona 'last' ao último item
              prefixLast[prefix].classList.remove('last');
              li.classList.add('last');
            }
            prefixLast[prefix] = li; // Atualiza o último item do prefixo
      
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
    
    // Adiciona event listeners para os inputs que precisam atualizar os checkboxes
    idsCheckbox.forEach(id => {
      const input = document.getElementById(id);
      if (input) { // Adiciona a condição para verificar se o input existe
        input.addEventListener('input', adicionarCheckboxes);
      }
    });
  
  });
  
  // Change archetype sheet #archetype
  function archetype() {
    var select = document.getElementById('archetype');
    var option = select.options[select.selectedIndex];
    var content = document.querySelector('.main');
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





  //Rolar dado
  document.getElementById("rolar-dados").addEventListener("click", rollDice);
  function rollDice() {
    // Get the checked checkboxes in the form
    var checkboxes = document.querySelectorAll("#form-dados input[type='checkbox']:checked");
  
    // Determine the number of dice to roll based on the checked checkboxes
    var numDice = checkboxes.length;
    if (document.getElementById("humano").checked) {
      numDice += 1;
    }
    if (document.getElementById("ajuda").checked) {
      numDice += 1;
    }
    if (document.getElementById("paranoia").checked) {
      numDice += 1;
    }
    if (document.getElementById("ocupacao-1").checked) {
      numDice += 1;
    }
    if (document.getElementById("ocupacao-2").checked) {
      numDice += 1;
    }
    if (document.getElementById("ocupacao-3").checked) {
      numDice += 1;
    }
    if (document.querySelectorAll("[id^='aspc-']:checked").length > 0) {
      numDice += 1;
    }
    if (document.querySelectorAll("[id^='espc-']:checked").length > 0) {
      numDice += 2;
    }
  
    // Get the modifier value from the radio buttons
    var modifier = parseInt(document.querySelector("#form-dados input[name='modificador']:checked").value);
  
    // Roll the dice using the Roll20 API
    var diceRoll = "/roll " + numDice + "d6" + modifier;
  
    // Output the roll to the chat
    sendChat("Roll20", diceRoll);
  }
  