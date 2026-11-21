# YouTube Clone

Aplicativo mobile que reproduz a interface do YouTube, feito com **React Native**, **Expo Router** e **TypeScript**. Trabalho da disciplina de desenvolvimento mobile (P2), em dupla.

O app combina telas estáticas com dados de exemplo e telas que consomem a **YouTube Data API v3** em tempo real.

## Funcionalidades

- **Início:** feed com os vídeos mais populares do Brasil, vindos da API.
- **Vídeo:** detalhes do vídeo, canal e lista de recomendados.
- **Canal:** banner, inscritos e vídeos publicados.
- **Pesquisa:** busca de vídeos pela API, com carregamento e tratamento de erro. Ao tocar num resultado, o vídeo abre dentro do app.
- **Notificações:** lista com estado de lida/não lida, salvo no aparelho.
- **Você:** histórico dos vídeos assistidos, salvo no aparelho.
- **Demais telas:** Shorts, Inscrições, Música, Ao vivo, Mais, Mensagens e Criar.

## Requisitos do trabalho

| Requisito | Onde está |
| --- | --- |
| Expo Router (navegação) | `src/app/` (rotas por arquivo) e `src/app/_layout.tsx` |
| StyleSheet e Flexbox | Todas as telas |
| Consumo de API | `src/services/youtubeApi.ts` |
| Armazenamento local | `src/utils/watchHistory.ts` (histórico) e `src/app/notificacoes.tsx` (notificações lidas), ambos com AsyncStorage |
| Mínimo de 12 telas | 13 telas em `src/app/` |

## Como rodar

### 1. Instale as dependências

```bash
npm install
```

### 2. Configure a chave da API

O app usa a YouTube Data API v3. Crie um arquivo `.env` na raiz do projeto, copiando o modelo:

```bash
cp .env.example .env
```

Depois abra o `.env` e troque o valor pela sua chave:

```
EXPO_PUBLIC_YOUTUBE_API_KEY=sua_chave_aqui
```

Para gerar uma chave, acesse o [Google Cloud Console](https://console.cloud.google.com/), crie um projeto, ative a **YouTube Data API v3** e crie uma credencial do tipo "Chave de API".

> O arquivo `.env` não é enviado ao GitHub (está no `.gitignore`). Sem a chave, a home e a pesquisa mostram uma mensagem de erro; as telas de vídeo e canal usam dados de exemplo como alternativa.

### 3. Inicie o projeto

```bash
npx expo start -c
```

O `-c` limpa o cache, necessário para o Expo ler o `.env`. Em seguida, abra o app:

- no celular, com o aplicativo **Expo Go** (leia o QR Code exibido no terminal);
- no emulador Android ou simulador iOS, pelas opções do terminal.

## Estrutura do projeto

```
src/
├── app/                    # Telas (Expo Router)
│   ├── _layout.tsx         # Navegação principal e barra inferior
│   ├── index.tsx           # Início
│   ├── shorts.tsx          # Shorts
│   ├── inscricoes.tsx      # Inscrições
│   ├── voce.tsx            # Perfil e histórico
│   ├── criar.tsx           # Criar
│   ├── pesquisa.tsx        # Pesquisa
│   ├── notificacoes.tsx    # Notificações
│   ├── mensagens.tsx       # Mensagens
│   ├── musica.tsx          # Música
│   ├── ao-vivo.tsx         # Ao vivo
│   ├── mais.tsx            # Mais
│   ├── video/[id].tsx      # Vídeo
│   └── channel/[id].tsx    # Canal
├── constants/
│   └── mockData.ts         # Tipos e dados de exemplo
├── services/
│   └── youtubeApi.ts       # Chamadas à YouTube Data API
└── utils/
    └── watchHistory.ts     # Histórico salvo com AsyncStorage
```

## Tecnologias

- React Native 0.88 e Expo SDK 58 
- Expo Router 58
- TypeScript
- AsyncStorage (`@react-native-async-storage/async-storage`)
- YouTube Data API v3

## Comandos úteis

```bash
npx expo start -c    # inicia o projeto limpando o cache
npx expo lint        # verifica o código com ESLint
npx tsc --noEmit     # verifica os tipos do TypeScript
```
