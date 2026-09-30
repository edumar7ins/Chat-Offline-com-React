# Chat Offline

Chat local de página única para compor e visualizar mensagens como `Usuário` ou `Robô`. O remetente é selecionado no campo de composição e cada tipo de mensagem tem uma apresentação própria.

## Funcionalidades

- Envio pelo botão ou com `Enter`; `Shift+Enter` insere uma quebra de linha.
- Campo de composição que cresce conforme o texto, com limite de altura.
- Toggle de remetente por mouse ou teclado, com indicação visual do modo ativo.
- Histórico cronológico com rolagem automática para a mensagem mais recente.
- Layout responsivo e controles com nomes acessíveis e foco visível.

As mensagens ficam apenas no estado da aplicação: não são enviadas a um servidor nem gravadas no navegador. Recarregar a página limpa a conversa. O modo `Robô` identifica mensagens manualmente; não gera respostas automáticas.

## Requisitos

- Node.js e npm

## Desenvolvimento

Instale as dependências e inicie o servidor local:

```sh
npm install
npm run dev
```

O Vite exibe no terminal o endereço local para abrir no navegador.

## Comandos

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento com HMR. |
| `npm run build` | Verifica os tipos TypeScript e gera a versão de produção em `dist/`. |
| `npm run preview` | Serve localmente a versão gerada em `dist/`. |
| `npm run lint` | Executa as regras configuradas no Oxlint. |

## Tecnologias

- React 19 e TypeScript
- Vite
- Tailwind CSS 4 e estilos CSS próprios
- Oxlint

## Estrutura

```text
src/
  components/       # Histórico, mensagens e composição
  types/            # Tipos das mensagens e remetentes
  App.tsx           # Estado e estrutura principal do chat
  App.css           # Identidade visual e layout responsivo
  index.css         # Estilos globais
```
