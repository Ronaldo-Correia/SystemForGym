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

// Inicialize o Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Referências aos elementos do formulário
const formEsqueciSenha = document.getElementById('formEsqueciSenha');
const emailInput = document.getElementById('email');
const mensagem = document.getElementById('mensagem');

// Função para mostrar mensagens
function mostrarMensagem(texto, tipo) {
    mensagem.textContent = texto;
    mensagem.classList.remove('erro', 'sucesso'); // Remove classes anteriores
    mensagem.classList.add(tipo); // Adiciona a classe correspondente
    mensagem.style.display = 'block';
}

// Função para limpar mensagens
function limparMensagem() {
    mensagem.textContent = '';
    mensagem.classList.remove('erro', 'sucesso');
    mensagem.style.display = 'none';
}

// Manipule o envio do formulário
formEsqueciSenha.addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário
    limparMensagem(); // Limpa mensagens anteriores

    const email = emailInput.value;

    // Validação
    if (!email || !email.includes('@')) {
        mostrarMensagem('Por favor, insira um e-mail válido.', 'erro');
        return;
    }

    // Enviar e-mail de redefinição de senha
    auth.sendPasswordResetEmail(email)
        .then(() => {
            mostrarMensagem('E-mail de redefinição de senha enviado! Verifique sua caixa de entrada.', 'sucesso');
        })
        .catch((error) => {
            console.error("Erro ao enviar e-mail:", error);
            mostrarMensagem('Erro ao enviar e-mail: ' + error.message, 'erro');
        });
});