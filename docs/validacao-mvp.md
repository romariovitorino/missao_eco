# Validação do MVP

## Verificações executadas
- `node --check public/jornada.js` e `node --check public/jornada-dados.js`.
- `npm test`: 10 testes aprovados (5 da jornada e 5 legados).
- Verificação de interface com DOM em ambiente de QA: entrada, quatro ambientes, bloqueios, 12 missões, três formatos de interação, erro/repetição, recarga na quinta missão, pontuação final de 110 com uma repetição, conquistas, reflexão persistida, conteúdo para impressão, guia/voltar e exclusão com cancelamento/confirmação.

## Conferência local pendente
Não foi possível instalar o Chromium de teste neste ambiente. A verificação de DOM não avalia layout, contraste renderizado, comportamento real de impressão ou navegação visual.

No VS Code, executar `npm install`, `npm test` e `npm run dev`. Conferir:
1. Layout e ausência de rolagem horizontal em 375, 768 e 1280 pixels.
2. Navegação por Tab, escolha de avatar, radios, checkboxes e selects.
3. Efeito do foco e anúncios de feedback no leitor de tela.
4. Recarga, retorno e recuperação do progresso no navegador real.
5. Bloqueio de armazenamento e aviso correspondente.
6. Impressão/PDF de resumo com reflexão longa.
7. Cancelamento e confirmação de apagar a jornada.

Conteúdo precisa de revisão pedagógica antes de aplicação formal em turma. Os símbolos atuais de avatar e objetos são recursos visuais iniciais, sem representar uma instituição ou local real.
