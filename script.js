<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Gestão Rural - Histórico</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <nav>
    <ul>
      <li><a href="index.html">🏠 Home</a></li>
      <li><a href="propriedades.html">🏡 Propriedades</a></li>
      <li><a href="animais.html">🐄 Animais</a></li>
      <li><a href="nascimento.html">🐮 Nascimento</a></li>
      <li><a href="calendario.html">📅 Calendário Sanitário</a></li>
      <li><a href="historico.html">📜 Histórico</a></li>
    </ul>
  </nav>

  <section class="conteudo">
    <div class="left">
      <h2>Histórico de Ações</h2>
      <table>
        <thead>
          <tr>
            <th>Data</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>

      <h3>Adicionar Novo Histórico</h3>
      <form id="formHistorico">
        <input type="date" id="dataHistorico" placeholder="Data" required>
        <input type="text" id="acaoHistorico" placeholder="Ação" required>
        <button type="submit">Adicionar</button>
      </form>
    </div>
  </section>

  <script src="script.js"></script>
</body>
</html>
7️⃣ script.js completo (formulários para todas páginas)
javascript
Copiar código
// ===== Inicialização =====
if (!localStorage.getItem('dadosRural')) {
    localStorage.setItem('dadosRural', JSON.stringify({
        propriedades: [],
        animais: [],
        nacimentos: [],
        vacinas: [],
        historico: []
    }));
}

const dados = () => JSON.parse(localStorage.getItem('dadosRural'));
const salvar = (d) => localStorage.setItem('dadosRural', JSON.stringify(d));

// ===== Função atualizar Home =====
function atualizarHome() {
    const d = dados();
    const totalPropriedades = document.getElementById('totalPropriedades');
    const totalAnimais = document.getElementById('totalAnimais');
    const nacimentosMes = document.getElementById('nascimentosMes');
    const vacinasMes = document.getElementById('vacinasMes');

    if(totalPropriedades) totalPropriedades.textContent = d.propriedades.length;
    if(totalAnimais) totalAnimais.textContent = d.animais.length;
    if(nacimentosMes) nacimentosMes.textContent = d.nacimentos.length;
    if(vacinasMes) vacinasMes.textContent = d.vacinas.length;

    // Preencher tabelas se existirem
    const tbodyProp = document.querySelector('.left table tbody');
    if(tbodyProp && document.title.includes("Home")) {
        tbodyProp.innerHTML = '';
        d.propriedades.forEach(p => {
            tbodyProp.innerHTML += `<tr>
                <td>${p.nome}</td>
                <td>${p.area}</td>
                <td>${p.proprietario}</td>
                <td>${p.totalAnimais}</td>
                <td>${p.local}</td>
            </tr>`;
        });
    }

    const ulNac = document.querySelector('.right ul:first-of-type');
    if(ulNac) {
        ulNac.innerHTML = '';
        d.nacimentos.slice(0,3).forEach(n => {
            ulNac.innerHTML += `<li>Brinco da Mãe: ${n.mae} | Data: ${n.data} | Sexo: ${n.sexo}</li>`;
        });
    }

    const ulVac = document.querySelector('.right ul:last-of-type');
    if(ulVac) {
        ulVac.innerHTML = '';
        d.vacinas.forEach(v => {
            ulVac.innerHTML += `<li>${v.animal} - ${v.vacina} | Vencimento: ${v.vencimento}</li>`;
        });
    }
}

// ===== Função para atualizar qualquer tabela =====
function atualizarTabela(tabela, tipo){
    const d = dados();
    const tbody = document.querySelector(`${tabela} tbody`);
    if(!tbody) return;
    tbody.innerHTML = '';
    if(tipo === 'propriedades') d.propriedades.forEach(p=>{
        tbody.innerHTML += `<tr>
            <td>${p.nome}</td>
            <td>${p.area}</td>
            <td>${p.proprietario}</td>
            <td>${p.totalAnimais}</td>
            <td>${p.local}</td>
        </tr>`;
    });
    if(tipo === 'animais') d.animais.forEach(a=>{
        tbody.innerHTML += `<tr>
            <td>${a.brinco}</td>
            <td>${a.idade}</td>
            <td>${a.sexo}</td>
            <td>${a.raca}</td>
            <td>${a.propriedade}</td>
        </tr>`;
    });
    if(tipo === 'nacimentos') d.nacimentos.forEach(n=>{
        tbody.innerHTML += `<tr>
            <td>${n.mae}</td>
            <td>${n.data}</td>
            <td>${n.sexo}</td>
        </tr>`;
    });
    if(tipo === 'vacinas') d.vacinas.forEach(v=>{
        tbody.innerHTML += `<tr>
            <td>${v.animal}</td>
            <td>${v.vacina}</td>
            <td>${v.vencimento}</td>
        </tr>`;
    });
    if(tipo === 'historico') d.historico.forEach(h=>{
        tbody.innerHTML += `<tr>
            <td>${h.data}</td>
            <td>${h.acao}</td>
        </tr>`;
    });
}

// ===== Funções cadastrar dados =====
function cadastrarPropriedade(){
    const form = document.getElementById('formPropriedade');
    if(!form) return;
    form.addEventListener('submit', e=>{
        e.preventDefault();
        const d = dados();
        d.propriedades.push({
            nome: document.getElementById('nome').value,
            area: parseFloat(document.getElementById('area').value),
            proprietario: document.getElementById('proprietario').value,
            totalAnimais: parseInt(document.getElementById('totalAnimaisInput').value),
            local: document.getElementById('local').value
        });
        salvar(d);
        form.reset();
        atualizarTabela('.left table','propriedades');
        atualizarHome();
    });
}

function cadastrarAnimais(){
    const form = document.getElementById('formAnimais');
    if(!form) return;
    form.addEventListener('submit', e=>{
        e.preventDefault();
        const d = dados();
        d.animais.push({
            brinco: parseInt(document.getElementById('brinco').value),
            idade: document.getElementById('idade').value,
            sexo: document.getElementById('sexo').value,
            raca: document.getElementById('raca').value,
            propriedade: document.getElementById('propriedadeAnimal').value
        });
        salvar(d);
        form.reset();
        atualizarTabela('.left table','animais');
        atualizarHome();
    });
}

function cadastrarNacimentos(){
    const form = document.getElementById('formNacimentos');
    if(!form) return;
    form.addEventListener('submit', e=>{
        e.preventDefault();
        const d = dados();
        d.nacimentos.push({
            mae: parseInt(document.getElementById('mae').value),
            data: document.getElementById('dataNascimento').value,
            sexo: document.getElementById('sexoNascimento').value
        });
        salvar(d);
        form.reset();
        atualizarTabela('.left table','nacimentos');
        atualizarHome();
    });
}

function cadastrarVacinas(){
    const form = document.getElementById('formVacinas');
    if(!form) return;
    form.addEventListener('submit', e=>{
        e.preventDefault();
        const d = dados();
        d.vacinas.push({
            animal: document.getElementById('animalVacina').value,
            vacina: document.getElementById('nomeVacina').value,
            vencimento: document.getElementById('vencimentoVacina').value
        });
        salvar(d);
        form.reset();
        atualizarTabela('.left table','vacinas');
        atualizarHome();
    });
}

function cadastrarHistorico(){
    const form = document.getElementById('formHistorico');
    if(!form) return;
    form.addEventListener('submit', e=>{
        e.preventDefault();
        const d = dados();
        d.historico.push({
            data: document.getElementById('dataHistorico').value,
            acao: document.getElementById('acaoHistorico').value
        });
        salvar(d);
        form.reset();
        atualizarTabela('.left table','historico');
        atualizarHome();
    });
}

// ===== Inicialização ao carregar página =====
window.addEventListener('DOMContentLoaded', ()=>{
    atualizarHome();
    atualizarTabela('.left table','propriedades');
    atualizarTabela('.left table','animais');
    atualizarTabela('.left table','nacimentos');
    atualizarTabela('.left table','vacinas');
    atualizarTabela('.left table','historico');

    cadastrarPropriedade();
    cadastrarAnimais();
    cadastrarNacimentos();
    cadastrarVacinas();
    cadastrarHistorico();
});