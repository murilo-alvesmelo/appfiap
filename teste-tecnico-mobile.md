**Teste técnico de Mobile – FIAP** 

**Desafio** 

Você foi selecionado para desenvolver um aplicativo para que os responsáveis dos alunos da  **FIAP School** possam acompanhar quais aulas o aluno terá no dia, e o boletim anual, contendo as  notas e faltas. 

O aplicativo deve seguir o layout criado pela equipe no **Figma** e utilizar o arquivo **JSON**  disponibilizado, que contém informações de alguns responsáveis. 

O desafio contempla: 

• Uma tela de **autenticação**; 

• Duas telas principais: **aulas** e **boletim**; 

• Uma tela secundária para **selecionar** o aluno vinculado ao responsável. 

**Materiais necessários** 

• **Figma:** https\://www\.figma.com/design/lWgkJr0vc9ZiQQylY2J4Zt/Teste-T%C3%A9cnico Mobile---FIAP?node-id=4001-2\&t=JTZw2rQw28IkWue6-1 

• **JSON:** 

https\://drive.google.com/file/d/1Ys7Eujs5291Dr6Z1GhMrhAhxjgAaSa3V/view?usp=drive\_link 

**Requisitos dos Fluxos** 

**Telas não autenticadas** 

**1\. Tela de Login** 

o Utilizar o CPF e a senha do responsável como credenciais de autenticação; o Aplicar a máscara XXX.XXX.XXX-XX ao campo de CPF; 

o Exibir uma mensagem de erro quando o CPF ou a senha forem inválidos; o Não é necessário incluir links de recuperação de senha ou de cadastro; 

o Manter a autenticação ao fechar e reabrir o aplicativo. Se o responsável já estiver  autenticado, exibir a tela de aulas em vez da tela de login. 

**Telas autenticadas** 

• **Requisitos gerais** 

o Exibir, em todas as telas autenticadas, um cabeçalho com: 

▪ O primeiro nome do responsável; 

▪ O primeiro nome, o RM, a turma e o período do aluno selecionado;  
▪ Um botão de acesso à tela de seleção de aluno, caso o responsável tenha  mais de um aluno vinculado; 

▪ Um botão de logout, caso a tela de login seja implementada. 

o Incluir, no rodapé, a navegação entre as telas de **aulas** e **boletim**. 

**1\. Tela de Visualização das aulas dos alunos:** 

o Ao acessar a tela, exibir as aulas de um dia, com as seguintes informações: ▪ Horários de início e término de cada aula; 

▪ Disciplina correspondente. 

o Permitir a navegação entre os dias da semana. 

**2\. Tela de Visualização do boletim dos alunos:** 

o Ao acessar a tela, exibir o boletim de 2025, considerando apenas o 1º trimestre como  avaliado; 

o Apresentar o ano, a turma e os trimestres, com as respectivas disciplinas, notas gerais  e faltas; 

o **Bônus:** permitir a navegação entre anos anteriores, caso haja dados disponíveis. **3\. Tela de Escolha dos alunos do responsável:** 

o Não é necessário exibir esta tela quando o responsável tiver apenas um aluno  vinculado; 

o Exibir uma lista dos alunos vinculados ao responsável, contendo: 

▪ Nome completo; 

▪ RM; 

▪ Turma. 

o Após a seleção do aluno, retornar à tela em que o responsável estava anteriormente. o **Obs.:** Esta tela não deve integrar a navegação do rodapé. 

**Requisitos do desenvolvimento** 

1\. **Todas as telas devem conter animações.** Os efeitos e complexidade de cada uma ficam ao  seu critério, mas tenha em mente desenvolver um aplicativo fluído e com efeitos visuais  interessantes, que aprimoram a experiência do usuário sem prejudicar a performance. 

2\. O desenvolvimento do aplicativo deve ser **feito com IA**, de forma **estruturada**. A ferramenta que será utilizada, o modelo e a IDE são escolhas suas. O importante é que seja desenvolvido  com base em **SDD** (Spec-Driven Development). É ideal que os arquivos de configuração do  uso da IA estejam dentro do projeto. 

**Tecnologias obrigatórias** 

• React Native CLI;  
• Typescript; 

• Restyle. 

A escolha das demais dependências fica a seu critério. Procure utilizar apenas as necessárias  para o desenvolvimento do aplicativo. 

Utilizamos **yarn** como gerenciador de pacotes, mas o uso de **npm** também é permitido. 

**Orientação para a entrega do projeto** 

• Adicionar toda a orientação necessária para a instalação do aplicativo e as dependências  utilizadas em um arquivo chamado **README.md**. Se quiser também, pode adicionar  demonstrações do app em fotos/vídeos dentro do README; 

• Aplicativo deve funcionar em **iOS** e **Android**; 

• Colocar o projeto no **GitHub** em um **repositório público** e mandar um e-mail para  **liderancadev@fiap.com.br** com o link do projeto. 

• Qualquer implementação adicional é bem-vinda, desde que cumpra os requisitos acima.  Seguem algumas sugestões: 

o Splash screen; 

o Testes unitários; 

o Cenários de erro de informações faltando (por exemplo, responsável sem alunos); o Usar Firebase ou API própria ao invés de usar o JSON. Caso use, deixar um passo a  passo detalhado no README de como configurar a ferramenta, e no caso do  Firebase, pode usar e-mail ao invés de CPF como método de login.