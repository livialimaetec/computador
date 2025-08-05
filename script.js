document.addEventListener('DOMContentLoaded', () => {
  fetch('./data/notebooks.json')
    .then(response => response.json())
    .then(data => {
      exibirNotebooks(data);
      document.getElementById('filtrar').addEventListener('click', () => {
        filtrarPorPerfil(data);
      });
    })
    .catch(error => console.error("Erro ao carregar JSON:", error));
});

function exibirNotebooks(notebooks) {
  const container = document.getElementById('notebooks-container');
  container.innerHTML = '';

  notebooks.forEach(nb => {
    if (nb.nome && nb.nome.trim() !== '') {
      const row = document.createElement('tr');
      
      row.innerHTML = `
        <td>
          <img src="${nb.imagem || 'placeholder.jpg'}" alt="${nb.nome}" class="notebook-img">
          <h3>${nb.nome}</h3>
        </td>
        
        <td>
          <div class="especificacoes">
            <div class="especificacao-item"><strong>Processador:</strong> ${nb.especificacoes?.processador || 'N/A'}</div>
            <div class="especificacao-item"><strong>RAM:</strong> ${nb.especificacoes?.ram || 'N/A'}</div>
            <div class="especificacao-item"><strong>SSD:</strong> ${nb.especificacoes?.ssd || 'N/A'}</div>
            <div class="especificacao-item"><strong>Tela:</strong> ${nb.especificacoes?.tela || 'N/A'}</div>
            <div class="especificacao-item"><strong>GPU:</strong> ${nb.especificacoes?.gpu || 'N/A'}</div>
            <div class="especificacao-item"><strong>Sistema:</strong> ${nb.especificacoes?.sistema || 'N/A'}</div>
          </div>
        </td>
        
        <td>
          <ul class="lista">
            ${nb.positivos.filter(p => p && p.trim() !== '').map(p => `<li>${p}</li>`).join('')}
          </ul>
        </td>
        
        <td>
          <ul class="lista">
            ${nb.negativos.filter(n => n && n.trim() !== '').map(n => `<li>${n}</li>`).join('')}
          </ul>
        </td>
        
        <td>
          ${nb.perfil ? `<span class="perfil perfil-${nb.perfil.toLowerCase()}">${nb.perfil}</span>` : 'N/A'}
        </td>
      `;
      
      container.appendChild(row);
    }
  });
}

function filtrarPorPerfil(notebooks) {
  const perfilSelecionado = document.getElementById('perfil').value;
  
  if (perfilSelecionado === 'todos') {
    exibirNotebooks(notebooks);
    return;
  }
  
  const notebooksFiltrados = notebooks.filter(nb => {
    if (!nb.perfil) return false;
    return nb.perfil.toLowerCase().includes(perfilSelecionado);
  });
  
  exibirNotebooks(notebooksFiltrados);
}