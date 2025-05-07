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
const db = firebase.firestore();
const storage = firebase.storage();

// Referências aos elementos do formulário
const formPerfil = document.getElementById('formPerfil');
const fotoInput = document.getElementById('foto');
const fotoUsuario = document.getElementById('foto-usuario');
const nomeInput = document.getElementById('nome');
const dateNascInput = document.getElementById('dateNasc');
const alturaInput = document.getElementById('altura');
const pesoInput = document.getElementById('peso');
const mensagem = document.getElementById('mensagem');

// Carregar dados do perfil ao abrir a tela
auth.onAuthStateChanged((user) => {
    if (user) {
        db.collection('usuarios').doc(user.uid).get()
            .then((doc) => {
                if (doc.exists) {
                    const data = doc.data();
                    nomeInput.value = data.nome || '';
                    dateNascInput.value = data.dataNasc || '';
                    alturaInput.value = data.altura || '';
                    pesoInput.value = data.peso || '';
                    if (data.fotoURL) {
                        fotoUsuario.src = data.fotoURL;
                    }
                }
            })
            .catch((error) => {
                console.error("Erro ao carregar perfil:", error);
            });
    }
});

// Upload da foto de perfil
fotoInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            fotoUsuario.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// Salvar perfil
formPerfil.addEventListener('submit', async (event) => {
    event.preventDefault();

    const user = auth.currentUser;
    if (!user) {
        alert('Usuário não autenticado.');
        return;
    }

    const nome = nomeInput.value;
    const dataNasc = dateNascInput.value;
    const altura = alturaInput.value;
    const peso = pesoInput.value;
    const foto = fotoInput.files[0];

    try {
        // Atualizar nome no Firebase Authentication
        await user.updateProfile({ displayName: nome });

        // Upload da foto de perfil (se houver)
        let fotoURL = user.photoURL;
        if (foto) {
            const storageRef = storage.ref(`perfil/${user.uid}`);
            await storageRef.put(foto);
            fotoURL = await storageRef.getDownloadURL();
            await user.updateProfile({ photoURL: fotoURL });
        }

        // Salvar dados no Firestore
        await db.collection('usuarios').doc(user.uid).set({
            nome,
            dataNasc,
            altura,
            peso,
            fotoURL
        }, { merge: true });

        mensagem.textContent = 'Perfil atualizado com sucesso!';
        mensagem.classList.remove('erro');
        mensagem.classList.add('sucesso');
    } catch (error) {
        console.error("Erro ao atualizar perfil:", error);
        mensagem.textContent = 'Erro ao atualizar perfil: ' + error.message;
        mensagem.classList.remove('sucesso');
        mensagem.classList.add('erro');
    }
});