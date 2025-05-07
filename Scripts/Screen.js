// Variável global para o Firebase
let db;

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Inicializa o Firestore
    db = firebase.firestore();
    
    // Configura os eventos dos ícones
    document.querySelectorAll('.icone').forEach(icone => {
        icone.addEventListener('click', function() {
            const tipo = this.getAttribute('data-tipo');
            mostrarConteudo(tipo);
        });
    });

    // Configura o evento do botão registrar treino (delegation)
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('btn-registro')) {
            registrarTreino();
        }
    });
});

let iconeAtivo = null;

// Dados do Plano de Calistenia
const planoCalistenia = {
  objetivo: "Ganhar massa magra (5kg+) e aumentar o bíceps/braços",
  duracao: "8-12 semanas",
  dias: [
    {
      nome: "Dia 1: Push (Peito, Ombro, Tríceps)",
      exercicios: [
        "Flexões (Push-ups) – 4x até a falha (pés elevados)",
        "Dips entre bancos – 3x até a falha",
        "Flexões diamante – 3x até a falha",
        "Pike Push-ups – 3x até a falha",
        "Burpees – 3x 10 repetições"
      ]
    },
    {
      nome: "Dia 2: Pull (Costas e Bíceps)",
      exercicios: [
        "Barra fixa (Pull-ups) – 4x até a falha",
        "Australian Pull-ups – 3x até a falha",
        "Isometria na barra – 3x 20 segundos",
        "Bíceps com toalha – 3x 12 reps",
        "Superman holds – 3x 30 segundos"
      ]
    },
    {
      nome: "Dia 3: Pernas e Core",
      exercicios: [
        "Agachamentos pistola – 4x 10 reps",
        "Avanços (Lunges) – 3x 12 reps por perna",
        "Elevação de panturrilha – 4x 20 reps",
        "Prancha abdominal – 3x 1 minuto",
        "Russian twists – 3x 20 reps"
      ]
    },
    {
      nome: "Dia 4: Full Body + Intensidade",
      exercicios: [
        "Burpees + Flexão – 4x 10 reps",
        "Pull-ups – 3x até a falha",
        "Agachamento + Salto – 3x 15 reps",
        "Dips – 3x até a falha",
        "Abdominal remador – 3x 12 reps"
      ]
    }
  ],
  dicas: [
    "Adicione peso: Use mochila com livros ou garrafas d'água",
    "Aumente repetições: Sempre busque falhar na última série",
    "Diminua descanso: 45s a 1 minuto entre séries",
    "Faça variações mais difíceis: Ex: Flexão com 1 braço"
  ],
  nutricao: [
    "Pós-treino: Whey ou vitamina de banana + aveia + leite + pasta de amendoim",
    "Janta reforçada: Ovos + carboidrato (batata-doce, arroz) + vegetais"
  ]
};

function mostrarConteudo(tipo) {
    const conteudoDinamico = document.getElementById('conteudo-dinamico');

    switch (tipo) {
        case 'progresso':
            conteudoDinamico.innerHTML = `
                <div class="plano-container">
                    <h2>📅 Plano de Calistenia</h2>
                    <div class="meta-box">
                        <p><strong>Objetivo:</strong> ${planoCalistenia.objetivo}</p>
                        <p><strong>Duração:</strong> ${planoCalistenia.duracao}</p>
                    </div>
                    
                    <div class="dias-container">
                        ${planoCalistenia.dias.map(dia => `
                            <div class="dia-box">
                                <h3>${dia.nome}</h3>
                                <ul>
                                    ${dia.exercicios.map(ex => `<li>${ex}</li>`).join('')}
                                </ul>
                            </div>
                        `).join('')}
                    </div>
                    
                    <div class="dicas-box">
                        <h3>💡 Dicas para Progressão</h3>
                        <ul>
                            ${planoCalistenia.dicas.map(dica => `<li>${dica}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="nutricao-box">
                        <h3>🍗 Alimentação Recomendada</h3>
                        <ul>
                            ${planoCalistenia.nutricao.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>
                    
                    <div class="progresso-box">
                        <h3>📊 Seu Progresso</h3>
                        <div class="grafico-placeholder">
                            <!-- Espaço para gráficos futuros -->
                            <p>Seu progresso será exibido aqui</p>
                        </div>
<button class="btn-registro">
<div class="icone" data-tipo="progresso">

                            ✅ Registrar Treino de Hoje
                        </button>
                    </div>
                </div>
            `;
            break;
            
        case 'aulas':
            conteudoDinamico.innerHTML = `
                <h2>Aulas</h2>
                <p>Agenda de aulas disponíveis...</p>
            `;
            break;
            
        case 'sobre':
            conteudoDinamico.innerHTML = `
                <h2>Sobre a Academia</h2>
                <p>Descrição da academia...</p>
            `;
            break;
            
        case 'contato':
            conteudoDinamico.innerHTML = `
                <h2>Contato</h2>
                <p>Formulário de contato...</p>
            `;
            break;
            
        case 'usuario':
            const loggedInUser = localStorage.getItem('loggedInUser');
            conteudoDinamico.innerHTML = `
                <h2>Área do Usuário</h2>
                <p>Bem-vindo, ${loggedInUser}!</p>
                <p>Informações pessoais e próximas aulas...</p>
            `;
            break;
            
        default:
            conteudoDinamico.innerHTML = `
                <h2>Bem-vindo ao SistemForGym</h2>
                <p>Criado para auxiliar seu corpo com dicas de treinos e dietas.</p>
            `;
    }
    
    // Atualiza o ícone ativo
    if (iconeAtivo) {
        iconeAtivo.classList.remove('ativo');
    }
    iconeAtivo = document.querySelector(`.icone[onclick="mostrarConteudo('${tipo}')"]`);
    iconeAtivo.classList.add('ativo');
}
function registrarTreino() {
    const hoje = new Date().toLocaleDateString();
    
    if (db) {
        const user = firebase.auth().currentUser;
        if (user) {
            db.collection("treinos").add({
                userId: user.uid,
                data: new Date(),
                tipo: "Calistenia",
                concluido: true
            })
            .then(() => {
                alert(`Treino do dia ${hoje} registrado com sucesso!`);
            })
            .catch(error => {
                console.error("Erro ao registrar treino: ", error);
                alert("Erro ao registrar treino. Consulte o console.");
            });
        } else {
            alert("Você precisa estar logado para registrar treinos!");
        }
    } else {
        alert("Banco de dados não inicializado!");
    }
}
// Torna as funções disponíveis globalmente
window.mostrarConteudo = mostrarConteudo;
window.registrarTreino = registrarTreino;
