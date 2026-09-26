// js/templates.js

// 1. Array de dados dos projetos sociais
const listaProjetos = [
    {
        id: "educacao",
        titulo: "Educação e Capacitação",
        imagem: "../img/educacao.jpg",
        alt: "Crianças e jovens participando de uma aula comunitária",
        descricao: "Oferecemos oficinas de alfabetização, reforço escolar e cursos de capacitação profissional para jovens e adultos."
    },
    {
        id: "saude",
        titulo: "Projeto Prato Cheio",
        imagem: "../img/saude.jpg",
        alt: "Atendimento comunitário e distribuição de kits de alimentos",
        descricao: "Arrecadação de alimentos não perecíveis e distribuição de refeições diárias para famílias em situação de vulnerabilidade."
    },
    {
        id: "comunitario",
        titulo: "Oficinas Profissionalizantes",
        imagem: "../img/comunitario.jpg",
        alt: "Voluntários fornecendo cursos profissionalizantes à comunidade.",
        descricao: "Cursos rápidos e workshops de capacitação para inserção de adultos no mercado de trabalho."
    }
];

window.templates = {
    // TELA INICIAL
    inicio: `
        <section id="apresentacao">
            <h1>Bem-vindos à ONG Ação Solidária</h1>
            <p>Nossa missão é transformar vidas por meio da inclusão social, educação e apoio a comunidades em situação de vulnerabilidade.</p>
            <img src="../img/voluntarios.jpg" alt="Grupo de voluntários sorrindo e organizando cestas de alimentos para doação">
        </section>

        <section id="sobre">
            <h2>Quem Somos</h2>
            <p>Fundada com o propósito de impactar positivamente a sociedade, atuamos no desenvolvimento de projetos comunitários e arrecadação de mantimentos.</p>
        </section>

        <section id="contato">
            <h2>Entre em Contato</h2>
            <address>
                <p><strong>E-mail:</strong> contato@acaosolidaria.solidariedade</p>
                <p><strong>Telefone:</strong> (00) 99999-9999</p>
                <p><strong>Endereço:</strong> Rua da Solidariedade, 123 - Centro</p>
            </address>
        </section>
    `,

    // TELA DE PROJETOS (Gerada dinamicamente com .map() e .join())
    projetos: `
        <section id="projetos-sociais">
            <h1>Nossos Projetos Sociais</h1>
            <p>Conheça nossas frentes de atuação e escolha como você pode transformar vidas conosco.</p>
            
            ${listaProjetos.map(projeto => `
                <article id="${projeto.id}">
                    <img src="${projeto.imagem}" alt="${projeto.alt}">
                    <h2>${projeto.titulo}</h2>
                    <p>${projeto.descricao}</p>
                </article>
            `).join('')}
        </section>
    `,

    // TELA DE CADASTRO
    cadastro: `
        <section id="area-cadastro">
            <div id="alerta-sucesso" class="alerta alerta-sucesso" style="display: none;">
                <strong>Cadastro concluído com sucesso!</strong> Seus dados foram registrados e estão ativos em nosso sistema.
            </div>

            <h1>Formulário de Engajamento e Cadastro</h1>
            <p>Preencha os dados abaixo para se voluntariar ou apoiar nossos projetos.</p>

            <form id="form-cadastro">
                <fieldset>
                    <legend>Dados Pessoais</legend>
                    
                    <label for="nome">Nome Completo:</label>
                    <input type="text" id="nome" name="nome" required minlength="3" placeholder="Seu nome completo">

                    <label for="email">E-mail:</label>
                    <input type="email" id="email" name="email" required placeholder="seuemail@exemplo.com">

                    <label for="cpf">CPF:</label>
                    <input type="text" id="cpf" name="cpf" required placeholder="000.000.000-00">

                    <label for="telefone">Telefone:</label>
                    <input type="tel" id="telefone" name="telefone" required placeholder="(00) 00000-0000">

                    <label for="cep">CEP:</label>
                    <input type="text" id="cep" name="cep" required placeholder="00000-000">
                </fieldset>

                <fieldset>
                    <legend>Como Deseja Colaborar</legend>

                    <label for="tipo_apoio">Tipo de Apoio:</label>
                    <select id="tipo_apoio" name="tipo_apoio" required>
                        <option value="">Selecione uma opção</option>
                        <option value="voluntario">Desejo ser Voluntário</option>
                        <option value="doador">Desejo fazer Doações</option>
                        <option value="parceiro">Quero ser Empresa Parceira</option>
                    </select>

                    <label for="mensagem">Mensagem / Observações:</label>
                    <textarea id="mensagem" name="mensagem" rows="4" placeholder="Escreva como gostaria de colaborar..."></textarea>
                </fieldset>

                <button type="submit">Enviar Cadastro</button>
            </form>

            <div id="modal-pendente" class="modal-overlay" style="display: none;">
                <div class="modal-content">
                    <h2>Atenção</h2>
                    <p>Seu cadastro ainda está <strong>Pendente</strong>. Por favor, preencha o formulário para ativar sua participação.</p>
                    <button type="button" id="btn-fechar-pendente" style="background-color: var(--primary-color, #007bff); color: white; padding: 8px 16px; border: none; border-radius: 4px; cursor: pointer; margin-top: 10px;">Entendido</button>
                </div>
            </div>
        </section>
    `
};