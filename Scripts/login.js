import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";

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
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Aguarde o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', function () {
    // Alternar visibilidade da senha
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');

    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', function () {
            const tipoAtual = passwordInput.type;
            const icon = togglePassword.querySelector('i');

            if (tipoAtual === 'password') {
                passwordInput.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    }

    // Função para limpar mensagens
    function limparMensagem() {
        const mensagem = document.getElementById('mensagem');
        if (mensagem) {
            mensagem.textContent = '';
            mensagem.classList.remove('erro', 'sucesso');
            mensagem.style.display = 'none';
        }
    }

    // Função para mostrar mensagens
    function mostrarMensagem(texto, tipo) {
        const mensagem = document.getElementById('mensagem');
        if (mensagem) {
            mensagem.textContent = texto;
            mensagem.classList.remove('erro', 'sucesso');
            mensagem.classList.add(tipo);
            mensagem.style.display = 'block';
        } else {
            console.error("Elemento #mensagem não encontrado!");
        }
    }

    // Validação de senha
    function validarSenha(senha) {
        if (senha.length < 6) {
            return 'A senha deve ter pelo menos 6 caracteres.';
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(senha)) {
            return 'A senha deve conter pelo menos um caractere especial (ex: !, @, #, $).';
        }
        return null; // Senha válida
    }

    // Manipule o envio do formulário
    document.querySelector('form').addEventListener('submit', function (event) {
        event.preventDefault(); // Impede o envio do formulário
        limparMensagem(); // Limpa mensagens anteriores

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Validações
        if (!email || !password) {
            mostrarMensagem('Por favor, preencha todos os campos.', 'erro');
            return;
        }
        if (!email.includes('@')) {
            mostrarMensagem('Por favor, insira um e-mail válido.', 'erro');
            return;
        }

        const erroSenha = validarSenha(password);
        if (erroSenha) {
            mostrarMensagem(erroSenha, 'erro');
            return;
        }

        // Login no Firebase
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                console.log("Usuário logado:", userCredential.user);
                mostrarMensagem('Login realizado com sucesso!', 'sucesso');
                setTimeout(() => {
                    window.location.href = 'ScreenInitial.html';
                }, 2000);
            })
            .catch((error) => {
                console.error("Erro ao fazer login:", error);
                mostrarMensagem('Erro ao fazer login: ' + error.message, 'erro');
            });
    });

    // Redirecionar para a tela de "Esqueci minha senha"
    document.getElementById('esqueciSenhaLink').addEventListener('click', function (event) {
        event.preventDefault();
        window.location.href = 'esqueciSenha.html';
    });
});