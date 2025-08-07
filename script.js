document.addEventListener('DOMContentLoaded', () => {
  fetch('./data/notebooks.json')
    .then(r => r.json())
    .then(d => {
      exibirNotebooks(d);
      document.getElementById('filtrar').addEventListener('click', () => filtrarPorPerfil(d));
    })
    .catch(e => console.error("Erro:", e));
});

function exibirNotebooks(nbs) {
  const cont = document.getElementById('notebooks-cont');
  cont.innerHTML = '';

  nbs.forEach(nb => {
    if (nb.nome && nb.nome.trim() !== '') {
      const row = document.createElement('tr');
      
      row.innerHTML = `
        <td>
          <img src="${nb.img || 'placeholder.jpg'}" alt="${nb.nome}" class="notebook-img">
          <h3>${nb.nome}</h3>
          <p class="desc">${nb.desc || ''}</p>
        </td>
        
        <td>
          <div class="especs">
            <div class="espec-item"><strong>CPU:</strong> ${nb.esp?.cpu || '-'}</div>
            <div class="espec-item"><strong>RAM:</strong> ${nb.esp?.ram || '-'}</div>
            <div class="espec-item"><strong>SSD:</strong> ${nb.esp?.ssd || '-'}</div>
            <div class="espec-item"><strong>Tela:</strong> ${nb.esp?.tela || '-'}</div>
            <div class="espec-item"><strong>GPU:</strong> ${nb.esp?.gpu || '-'}</div>
            <div class="espec-item"><strong>OS:</strong> ${nb.esp?.os || '-'}</div>
          </div>
        </td>
        
       
        
        
        <td>
          ${nb.perfil ? `<span class="perfil perfil-${nb.perfil.toLowerCase()}">${nb.perfil}</span>` : '-'}
        </td>
      `;
      
      cont.appendChild(row);
    }
  });
}

function filtrarPorPerfil(nbs) {
  const perfil = document.getElementById('perfil').value;
  
  if (perfil === 'todos') {
    exibirNotebooks(nbs);
    return;
  }
  
  const filtrados = nbs.filter(nb => {
    if (!nb.perfil) return false;
    return nb.perfil.toLowerCase().includes(perfil);
  });
  
  exibirNotebooks(filtrados);
}