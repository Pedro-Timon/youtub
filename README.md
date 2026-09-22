# YouTube Clone 👋

Projeto mobile para reprodução visual da interface do YouTube, desenvolvido com React Native, Expo Router e TypeScript.

## 🚀 Get started

Instale as dependências:

npm install

Instale os pacotes de suporte e ícones do projeto:

npx expo install @expo/vector-icons

npm install --save-dev @types/react-native-vector-icons

Inicie o servidor de desenvolvimento:

npx expo start

No terminal, você terá as opções padrão para abrir o aplicativo no:
- **Development build**
- **Android emulator**
- **iOS simulator**
- **Expo Go**, ambiente para testes em dispositivos físicos.

---

## 📁 Estrutura de Arquivos e Navegação

Este projeto utiliza o sistema de rotas baseado em arquivos (*file-based routing*) do Expo Router dentro de `src/app`:

- `src/app/index.tsx`: Feed principal e cabeçalho do aplicativo.
- `src/app/shorts.tsx`: Exibição do feed de vídeos curtos (Shorts) no formato vertical.
- `src/app/inscricoes.tsx`: Lista de canais inscritos pelo usuário.
- `src/app/voce.tsx`: Tela de perfil do usuário, histórico e opções da conta.
- `src/app/video/[id].tsx`: Reprodução de vídeo, dados do canal e lista de recomendados.
- `src/app/channel/[id].tsx`: Perfil do canal, banner e aba de vídeos do autor.
- `src/constants/mockData.ts`: Centralização dos dados tipados de canais e vídeos.

---

## 🛠️ Notas de Desenvolvimento

- **Vector Icons:** Para contornar limitações locais do autocompletar de tipos do TypeScript ao utilizar `@expo/vector-icons`, utiliza-se a instrução `// @ts-ignore` acima do import do pacote.
- **Roteamento Dinâmico:** Durante a criação inicial das páginas dinâmicas, utiliza-se a sintaxe `as any` em chamadas `router.push` para compatibilidade com o gerador temporário de rotas do Expo Router.

---

## 🧼 Comandos Adicionais

- **Reset do Projeto:** Para limpar a pasta de código e retornar ao template básico, rode `npm run reset-project`.
- **Linting:** Para rodar verificações de código com ESLint, utilize `npx expo lint`.

---

## 📚 Learn more

- [Expo documentation](https://docs.expo.dev/)
- [Expo Router Guide](https://docs.expo.dev/router/introduction/)
