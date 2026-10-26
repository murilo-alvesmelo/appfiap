# Login e sessão

## Objetivo
Autenticar o responsável com CPF e senha do JSON e manter a sessão entre aberturas do app.

## Fonte (requisito do teste)
- Usar o CPF e a senha do responsável como credenciais.
- Aplicar a máscara `XXX.XXX.XXX-XX` ao campo de CPF.
- Exibir uma mensagem de erro quando o CPF ou a senha forem inválidos.
- Não incluir links de recuperação de senha ou de cadastro.
- Manter a autenticação ao fechar e reabrir o app. Se já estiver autenticado, exibir **Aulas** em vez do login.
- Header com botão de logout (já que o login existe).

## Regras de negócio
1. O CPF é digitado com máscara, e a comparação usa só os 11 dígitos (`onlyDigits`).
2. A validação local roda antes de consultar os dados: CPF com 11 dígitos e senha não vazia (`validateSignIn`).
3. Qualquer falha (validação, CPF inexistente ou senha errada) mostra a **mesma mensagem**: "Usuário ou senha inválida.\nPode tentar novamente?". Assim o app não revela se o CPF existe.
4. O repository de `auth` procura o responsável por CPF, compara a senha internamente e devolve o `Guardian` (sem senha).
5. A sessão persistida guarda só o **id do responsável** (nunca a senha). No boot, o app reidrata o `Guardian` pelo id a partir do JSON.
6. Enquanto a sessão é restaurada, mostrar loading (ou splash). Não piscar a tela de login.
7. O logout limpa a sessão persistida (e o aluno selecionado), e a navegação volta ao login sozinha (`isSignedIn`).

## Critérios de aceite
- [x] **CA1** **Dado** CPF `969.294.560-04` e senha `123456`, **quando** toco em entrar, **então** vou para **Aulas**.
- [x] **CA2** **Dado** CPF `508.795.670-07` e senha `987654`, **quando** entro, **então** vou para **Aulas** com a aluna Bianca selecionada.
- [x] **CA3** **Dado** que digito `96929456004`, **então** o campo exibe `969.294.560-04`, o teclado é numérico e dígitos além de 11 são descartados.
- [x] **CA4** **Dado** um CPF incompleto, um CPF inexistente ou uma senha errada, **quando** entro, **então** vejo a mensagem única de erro e continuo no login.
- [x] **CA5** A tela não tem links de cadastro nem de recuperação de senha.
- [x] **CA6** A senha usa `secureTextEntry`.
- [x] **CA7** **Dado** que estou logado, **quando** fecho e reabro o app, **então** ele abre direto em **Aulas**.
- [x] **CA8** **Dado** que fiz logout, **quando** reabro o app, **então** vejo o login.
- [x] **CA9** Durante o submit, o botão mostra loading e não aceita toques repetidos.
- [x] **CA10** O repository e o hook de login têm testes (credencial válida, CPF inexistente, senha errada).

## Cenários de erro / vazio
- **Sessão persistida inválida** (o id não existe mais no JSON ou o dado está corrompido): limpar o storage e mostrar o login, sem crash.
- Falha ao ler o storage no boot: logar via `logger` e seguir para o login.


## Fora de escopo
- Recuperação de senha, cadastro, biometria.
- Validação do dígito verificador do CPF.

## Arquivos / camadas envolvidos
- `src/features/auth/`: `utils/cpf.ts` (`formatCpf`, `isCpfComplete`, `onlyDigits`), `utils/validation.ts`, `hooks/useSignIn.ts`, `api/auth.repository.ts`, `screens/SignInScreen.tsx`.
- `src/providers/session/`: estado da sessão + persistência + restauração no boot.
- `src/navigation/RootNavigator.tsx`: `SignIn` ou área logada conforme `isSignedIn`.
- Persistência: AsyncStorage via `@/lib/storage` (`src/lib/storage.ts`).

