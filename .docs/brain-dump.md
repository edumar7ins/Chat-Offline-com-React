## Projeto Chat Offline

Projeto de uma janela única de chat em que eu consigo enviar mensagens como usuário e como robô(através de um toogle no input de mensagem)

## Apectos Técincos

Projeto feito em Vite + Typescript + Tailwind
Todos os types salvos na pasta src/types(usando types e não interfacces)
Todos os componentes salvos na pasta src/components
O histórico do Chat deve estar em um state sem persistência


## Aspectos Visuais

A tela vai ter um fundo marrom claro(ambar).
Todo o chat(incluindo histórico de mensagem e input) terão uma largura máxima(2XL), centralizado, em tela maior.
O input será em um card com fundo branco e altura ajustada conforme a mensagem
Dentro do card do input, do lado direito:
- Botão de enviar, que fica desabilitado quando não tiver mensagem digitada.
O card ficará no canto inferior o tempo inteiro.
Dentro do card do input, do lado esquerdo:
- Um botão que servirá como toogle para marcar se a mensagem enviada será via usuário que fica do lado direito do histórico, ou robô que fica do lado esquerdo do histórico.
- Quando o toogle estiver ativado (robô) o card do input terá uma borda roxa, indicando visualmente que a mensagem enviada será enviada como robô e não usuário.