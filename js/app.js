// js/app.js

document.addEventListener('DOMContentLoaded', () => {
    const appContainer = document.getElementById('app');
    const linksNavegacao = document.querySelectorAll('nav a[data-rota]');
    const btnTema = document.getElementById('btn-tema');

    // 1. ROTEAMENTO DA SPA
    function navegarPara(rota) {
        if (!window.templates || !window.templates[rota]) {
            appContainer.innerHTML = '<h2>Página não encontrada.</h2>';
            return;
        }

        // Renderiza o HTML do template escolhido
        appContainer.innerHTML = window.templates[rota];
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Se for a tela de cadastro, inicializa os eventos do formulário e máscaras
        if (rota === 'cadastro') {
            inicializarCadastro();
        }
    }

    // Clique nos links do menu
    linksNavegacao.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const rota = link.getAttribute('data-rota');
            if (rota) {
                window.location.hash = rota;
                navegarPara(rota);
            }
        });
    });

    // Detecta navegação retroceder/avançar no navegador ou alteração de #
    window.addEventListener('hashchange', () => {
        const rotaHash = window.location.hash.replace('#', '');
        if (rotaHash) {
            navegarPara(rotaHash);
        }
    });

    // 2. TEMA CLARO / ESCURO
    if (btnTema) {
        btnTema.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const ehEscuro = document.body.classList.contains('dark-mode');
            btnTema.textContent = ehEscuro ? '🌙 Modo Escuro' : '☀️ Tema Claro';
            localStorage.setItem('tema', ehEscuro ? 'dark' : 'light');
        });

        if (localStorage.getItem('tema') === 'dark') {
            document.body.classList.add('dark-mode');
            btnTema.textContent = '🌙 Modo Escuro';
        }
    }

    // 3. MÁSCARAS E EVENTOS DO FORMULÁRIO DE CADASTRO
    function inicializarCadastro() {
        const form = document.getElementById('form-cadastro');
        const modalPendente = document.getElementById('modal-pendente');
        const btnFechar = document.getElementById('btn-fechar-pendente');
        const alertaSucesso = document.getElementById('alerta-sucesso');

        const inputCpf = document.getElementById('cpf');
        const inputTelefone = document.getElementById('telefone');
        const inputCep = document.getElementById('cep');

        // Modal inicial
        if (modalPendente) {
            modalPendente.style.display = 'flex';
        }

        if (btnFechar) {
            btnFechar.addEventListener('click', () => {
                modalPendente.style.display = 'none';
            });
        }

        // Máscara CPF: 000.000.000-00
        if (inputCpf) {
            inputCpf.addEventListener('input', (e) => {
                let v = e.target.value.replace(/\D/g, '');
                v = v.replace(/(\d{3})(\d)/, '$1.$2');
                v = v.replace(/(\d{3})(\d)/, '$1.$2');
                v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
                e.target.value = v.substring(0, 14);
            });
        }

        // Máscara Telefone: (00) 00000-0000
        if (inputTelefone) {
            inputTelefone.addEventListener('input', (e) => {
                let v = e.target.value.replace(/\D/g, '');
                v = v.replace(/^(\d{2})(\d)/g, '($1) $2');
                v = v.replace(/(\d{5})(\d)/, '$1-$2');
                e.target.value = v.substring(0, 15);
            });
        }

        // Máscara CEP: 00000-000
        if (inputCep) {
            inputCep.addEventListener('input', (e) => {
                let v = e.target.value.replace(/\D/g, '');
                v = v.replace(/^(\d{5})(\d)/, '$1-$2');
                e.target.value = v.substring(0, 9);
            });
        }

        // Submissão do formulário
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                if (alertaSucesso) {
                    alertaSucesso.style.display = 'block';
                    alertaSucesso.scrollIntoView({ behavior: 'smooth' });
                }
                form.reset();
            });
        }
    }

    // Inicialização da primeira rota
    const rotaInicial = window.location.hash.replace('#', '') || 'inicio';
    navegarPara(rotaInicial);
});
IMask(document.getElementById('cpf'), { mask: '000.000.000-00' });
IMask(document.getElementById('telefone'), { mask: '(00) 00000-0000' });
IMask(document.getElementById('cep'), { mask: '00000-000' });
Swal.fire({
  title: 'Sucesso!',
  text: 'Seu cadastro foi realizado com sucesso.',
  icon: 'success',
  confirmButtonText: 'Entendido'
});