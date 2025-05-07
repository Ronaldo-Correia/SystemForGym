// Importe as funções necessárias do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";

// Configuração do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCNgGzmzuTXGuWKNSYHlwdf3Smj-unr-cY",
    authDomain: "system-for-gym.firebaseapp.com",
    projectId: "system-for-gym",
    storageBucket: "system-for-gym.appspot.com",
    messagingSenderId: "243494675657",
    appId: "1:243494675657:web:2578fc5727faa84e499918",
    measurementId: "G-NVF79TLDEK"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Função para exibir mensagens na tela
function mostrarMensagem(texto, tipo) {
    const mensagem = document.getElementById('mensagem');
    if (mensagem) {
        mensagem.textContent = texto;
        mensagem.classList.remove('erro', 'sucesso'); // Remove classes antigas
        mensagem.classList.add(tipo); // Adiciona a classe correta
        mensagem.style.display = 'block';
    } else {
        console.error("Elemento #mensagem não encontrado!");
    }
}

// Captura do formulário
document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault(); // Previne envio padrão

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const mensagem = document.getElementById('mensagem');

    // Verifica campos vazios
    if (!nome || !email || !password) {
        mostrarMensagem('Por favor, preencha todos os campos.', 'erro');
        return;
    }

    // Verifica senha
    const erroSenha = validarSenha(password);
    if (erroSenha) {
        mostrarMensagem(erroSenha, 'erro');
        return;
    }

    // Criar usuário no Firebase
    createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
            mostrarMensagem('Cadastro realizado com sucesso!', 'sucesso');
        })
        .catch((error) => {
            mostrarMensagem('Erro no cadastro: ' + error.message, 'erro');
        });
});
