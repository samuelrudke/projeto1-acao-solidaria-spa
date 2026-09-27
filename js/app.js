// js/app.js

document.addEventListener('DOMContentLoaded', () => {
    const appContainer = document.getElementById('app');
    const linksNavegacao = document.querySelectorAll('nav a[data-rota]');
    const btnTema = document.getElementById('btn-tema');

    // 1. ROTEAMENTO DA SPA COM ACESSIBILIDADE (WCAG 2.1)
    function navegarPara(rota) {
        if (!window.templates || !window.templates[rota]) {
            appContainer.innerHTML = '<h2>Página não encontrada.</h2>';
            return;
        }

        // Renderiza o HTML do template escolhido
        appContainer.innerHTML = window.templates[rota];
        
        // Atualiza o título do documento para leitores de ecrã
        const titulos = {
            inicio: 'Início - ONG Ação Solidária',
            projetos: 'Projetos Sociais - ONG Ação Solidária',
            cadastro: 'Quero Ajudar - ONG Ação Solidária'
        };
        document.title = titulos[rota] || 'ONG Ação Solidária';

        // Move o foco do teclado para a área principal do novo conteúdo
        appContainer.focus();
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Se for a tela de cadastro, inicializa as máscaras e eventos do formulário
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

    // 2. TEMA CLARO / ALTO CONTRASTE (ACCESSIBILITY & LOCALSTORAGE)
    function atualizarAtributosBotaoTema(ehEscuro) {
        btnTema.textContent = ehEscuro ? '🌙 Modo Escuro' : '☀️ Tema Claro';
        btnTema.setAttribute('aria-label', ehEscuro ? 'Desativar modo de alto contraste' : 'Ativar modo de alto contraste');
        btnTema.setAttribute('aria-pressed', ehEscuro);
    }

    if (btnTema) {
        btnTema.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const ehEscuro = document.body.classList.contains('dark-mode');
            atualizarAtributosBotaoTema(ehEscuro);
            localStorage.setItem('tema', ehEscuro ? 'dark' : 'light');
        });

        // Carrega a preferência salva no navegador
        if (localStorage.getItem('tema') === 'dark') {
            document.body.classList.add('dark-mode');
            atualizarAtributosBotaoTema(true);
        } else {
            atualizarAtributosBotaoTema(false);
        }
    }

    // 3. MÁSCARAS E EVENTOS DO FORMULÁRIO DE CADASTRO
    function inicializarCadastro() {
        const form = document.getElementById('form-cadastro');
        const modalPendente = document.getElementById('modal-pendente');
        const btnFechar = document.getElementById('btn-fechar-pendente');

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

        // Aplicação das Máscaras via IMask (Biblioteca externa)
        if (inputCpf && typeof IMask !== 'undefined') {
            IMask(inputCpf, { mask: '000.000.000-00' });
        }

        if (inputTelefone && typeof IMask !== 'undefined') {
            IMask(inputTelefone, { mask: '(00) 00000-0000' });
        }

        if (inputCep && typeof IMask !== 'undefined') {
            IMask(inputCep, { mask: '00000-000' });
        }

        // Submissão do formulário com Feedback de Sucesso (SweetAlert2)
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();

                if (typeof Swal !== 'undefined') {
                    Swal.fire({
                        title: 'Sucesso!',
                        text: 'Seu cadastro foi realizado com sucesso.',
                        icon: 'success',
                        confirmButtonText: 'Entendido',
                        confirmButtonColor: '#1b4d3e'
                    });
                } else {
                    alert('Cadastro realizado com sucesso!');
                }

                form.reset();
            });
        }
    }

    // Inicialização da primeira rota
    const rotaInicial = window.location.hash.replace('#', '') || 'inicio';
    navegarPara(rotaInicial);
});