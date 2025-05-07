// Carregar a foto do usuário
document.getElementById('foto').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('foto-usuario').src = e.target.result;
            // Salva a foto no localStorage
            const usuario = JSON.parse(localStorage.getItem('usuario'));
            if (usuario) {
                usuario.foto = e.target.result;
                localStorage.setItem('usuario', JSON.stringify(usuario));
            }
        };
        reader.readAsDataURL(file);
    }
});

// Carregar dados do usuário ao abrir a página
function carregarDadosUsuario() {
    const usuario = JSON.parse(localStorage.getItem('usuario')); // Pega os dados do usuário do localStorage

    if (usuario) {
        // Preenche os campos do formulário com os dados do usuário
        document.getElementById('nome').value = usuario.nome || '';
        document.getElementById('dateNasc').value = usuario.dataNasc || '';
        document.getElementById('altura').value = usuario.altura || '';
        document.getElementById('peso').value = usuario.peso || '';
        document.getElementById('foto-usuario').src = usuario.foto || 'assets/Styles/IMGs/perfil.png';
    } else {
        // Se não houver usuário logado, redireciona para a tela de login
    }
}

// Salvar dados do perfil
document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita o envio do formulário

    const nome = document.getElementById('nome').value;
    const dataNasc = document.getElementById('dateNasc').value;
    const altura = document.getElementById('altura').value;
    const peso = document.getElementById('peso').value;
    const mensagem = document.getElementById('mensagem');

    if (!nome || !dataNasc || !altura || !peso) {
        mensagem.textContent = 'Por favor, preencha todos os campos.';
        mensagem.classList.add('erro');
        return;
    }

    // Atualiza os dados do usuário no localStorage
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    if (usuario) {
        usuario.nome = nome;
        usuario.dataNasc = dataNasc;
        usuario.altura = altura;
        usuario.peso = peso;
        localStorage.setItem('usuario', JSON.stringify(usuario));

        mensagem.textContent = 'Perfil atualizado com sucesso!';
        mensagem.classList.remove('erro');
        mensagem.classList.add('sucesso');
    } else {
        mensagem.textContent = 'Erro: Usuário não encontrado.';
        mensagem.classList.add('erro');
    }
});


// Carrega os dados do usuário quando a página é aberta
window.onload = carregarDadosUsuario;