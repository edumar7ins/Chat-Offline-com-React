# PRD: Chat Offline

## 1. Visão geral

Construir uma interface de chat local, de página única, na qual a pessoa usuária pode enviar mensagens com o remetente `Usuário` ou `Robô`. O remetente é escolhido por um toggle no campo de composição. As mensagens existem somente no estado da aplicação e são descartadas ao recarregar a página.

O projeto já está configurado com Vite, React, TypeScript e Tailwind CSS. A implementação deve substituir a tela inicial padrão do Vite, sem refazer essa configuração.

## 2. Objetivos

- Permitir compor, enviar e visualizar mensagens de ambos os remetentes.
- Diferenciar visualmente os remetentes pela posição das mensagens e pelo estado do campo de composição.
- Manter o campo de composição acessível na parte inferior da janela enquanto o histórico ocupa o espaço disponível.
- Oferecer uma interface responsiva e utilizável por teclado.
- Manter o histórico somente em memória, sem API, banco de dados ou armazenamento no navegador.

## 3. Fora de escopo

- Respostas automáticas, inteligência artificial ou comportamento autônomo do robô.
- Comunicação com servidor, contas de usuário ou sincronização entre dispositivos.
- Persistência em `localStorage`, `sessionStorage` ou banco de dados.
- Conversas múltiplas, anexos, edição ou exclusão de mensagens.
- Reconfiguração de Vite, TypeScript ou Tailwind.

## 4. Requisitos funcionais

### RF-01: Histórico de mensagens

- A conversa começa vazia.
- Mensagens enviadas são adicionadas ao histórico em ordem cronológica.
- O histórico é guardado em estado React e não sobrevive ao recarregamento da página.
- Ao adicionar uma mensagem, o histórico deve acompanhar a mensagem mais recente.

### RF-02: Composição e envio

- O campo de texto aceita mensagens com várias linhas e aumenta de altura conforme o conteúdo, até um limite visual razoável; após esse limite, o campo pode rolar internamente.
- O botão de envio fica desabilitado quando o campo estiver vazio ou contiver somente espaços em branco.
- Ao enviar, o texto é aparado nas extremidades e o campo é limpo.
- `Enter` envia a mensagem; `Shift+Enter` insere uma quebra de linha.
- O envio deve funcionar pelo botão e pelo teclado, sem recarregar a página.

### RF-03: Seleção de remetente

- Um toggle no lado esquerdo do card de composição alterna entre `Usuário` e `Robô`.
- O toggle inicia em `Usuário`.
- O remetente ativo é aplicado à próxima mensagem enviada; o toggle não altera mensagens já existentes.
- No modo `Robô`, o card de composição recebe uma borda roxa como indicação visual.
- O toggle deve expor seu estado e sua finalidade a tecnologias assistivas.

### RF-04: Apresentação de mensagens

- Mensagens de `Usuário` aparecem alinhadas à direita.
- Mensagens de `Robô` aparecem alinhadas à esquerda.
- O conteúdo preserva quebras de linha e pode quebrar linhas longas para não causar rolagem horizontal.
- A diferença de remetente deve continuar perceptível sem depender somente da posição.

## 5. Requisitos visuais e responsivos

- Fundo geral em tom marrom claro/âmbar.
- O conteúdo do chat, incluindo histórico e composição, usa largura máxima equivalente a `2XL` e fica centralizado em telas maiores.
- A composição fica ancorada na parte inferior da janela; o histórico ocupa o espaço restante e rola independentemente quando necessário.
- O card de composição tem fundo branco e altura que acompanha o texto.
- O botão de envio fica no lado direito do card; o toggle de remetente fica no lado esquerdo.
- No modo Robô, a borda roxa do card comunica claramente o modo ativo.
- Em telas estreitas, o layout permanece dentro da viewport, sem rolagem horizontal ou sobreposição entre histórico e composição.
- Respeitar preferências de movimento reduzido caso sejam adicionadas transições.

## 6. Requisitos técnicos

- Manter a implementação em React + TypeScript + Tailwind CSS conforme a configuração existente.
- Colocar componentes reutilizáveis em `src/components` e definições de tipos em `src/types`.
- Definir tipos com `type`, não `interface`.
- Representar a mensagem com, no mínimo, identificador estável, conteúdo e remetente (`user` ou `bot`). Não é necessário incluir horário enquanto não houver requisito de produto para ele.
- Manter o estado da conversa no cliente, sem camada de persistência.
- Usar elementos semânticos, rótulos acessíveis, estados de foco visíveis e botões operáveis por teclado.
- Evitar instalar dependências adicionais sem necessidade demonstrável. O projeto não declara atualmente uma ferramenta de testes automatizados.

## 7. Critérios de aceite

- [x] A página inicial exibe a interface do chat, não o conteúdo padrão do Vite.
- [ ] O estado inicial apresenta conversa vazia e modo Usuário selecionado.
- [ ] É possível enviar uma mensagem como Usuário e vê-la alinhada à direita.
- [ ] É possível alternar para Robô, observar a borda roxa no card e enviar uma mensagem alinhada à esquerda.
- [ ] As mensagens permanecem em ordem e o histórico rola até a mais recente.
- [ ] O botão permanece desabilitado para conteúdo vazio ou composto apenas por espaços.
- [ ] `Enter` envia e `Shift+Enter` insere nova linha.
- [ ] O campo limpa após envio e mensagens antigas mantêm conteúdo e remetente.
- [ ] Recarregar a página remove o histórico.
- [ ] O layout funciona em viewport móvel e desktop, sem sobreposição ou rolagem horizontal.
- [ ] Os controles principais podem ser usados por teclado e têm nomes/estados acessíveis.
- [ ] `npm run build` e `npm run lint` concluem sem erros.

## 8. Plano de implementação

As tarefas estão ordenadas para que cada etapa deixe uma base funcional para a seguinte.

### Etapa 1: Remover a tela inicial do Vite [x]

- Substituir o conteúdo de demonstração em `src/App.tsx` pela estrutura principal do chat.
- Remover estilos de demonstração que deixarem de ser usados em `src/App.css` e ajustar estilos globais somente onde necessário.
- Confirmar que a aplicação continua iniciando com `npm run dev`.

**Pronto quando:** a página renderiza a estrutura vazia do chat sem conteúdo ou assets de demonstração do Vite.

### Etapa 2: Definir o modelo de mensagem

- Criar em `src/types` o tipo da mensagem e o tipo/união para os remetentes `user` e `bot`.
- Implementar no componente principal o estado em memória para mensagens e remetente selecionado.
- Garantir identificadores estáveis para as mensagens renderizadas.

**Pronto quando:** o estado representa uma conversa vazia e permite armazenar conteúdo e remetente sem persistência.

### Etapa 3: Construir o layout responsivo

- Criar a estrutura visual com fundo âmbar, coluna centralizada até `2XL`, histórico rolável e área de composição ancorada embaixo.
- Aplicar regras responsivas para celular e desktop.
- Preparar um estado vazio simples, sem mensagem inicial inventada.

**Pronto quando:** a estrutura mantém dimensões e rolagem corretas nas larguras móvel e desktop.

### Etapa 4: Implementar o histórico

- Criar o componente de histórico e o componente de mensagem em `src/components`.
- Renderizar conteúdo preservando quebras de linha, remetente e alinhamento correspondente.
- Fazer o histórico acompanhar a mensagem mais recente após novos envios.

**Pronto quando:** mensagens inseridas no estado aparecem na ordem correta, alinhadas conforme o remetente.

### Etapa 5: Implementar a composição e o toggle

- Criar o card de composição com campo de altura ajustável, toggle Usuário/Robô e botão de envio.
- Implementar envio por botão e por `Enter`, preservando `Shift+Enter` para quebra de linha.
- Bloquear mensagens vazias ou compostas apenas por espaços; aparar texto no envio e limpar o campo.
- Refletir o modo Robô no estado acessível do toggle e na borda roxa do card.

**Pronto quando:** todos os critérios de composição, validação e seleção de remetente são atendidos.

### Etapa 6: Revisar acessibilidade e estados de interface

- Verificar nomes acessíveis, foco visível, operação por teclado e semântica dos controles.
- Verificar campo vazio, botão desabilitado, troca de remetente, mensagens multilinha e histórico longo.
- Corrigir overflow e sobreposição em telas estreitas.

**Pronto quando:** os controles e estados são compreensíveis sem depender exclusivamente de cor ou mouse.

### Etapa 7: Validar a implementação

- Executar `npm run build` e `npm run lint`.
- Fazer uma verificação manual dos fluxos de envio, troca de remetente, rolagem e responsividade.
- Confirmar que recarregar a página limpa o histórico.

**Pronto quando:** os comandos existentes passam e todos os critérios de aceite foram verificados.
