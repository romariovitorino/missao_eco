# Missão Eco Ji-Paraná

MVP de educação ambiental para o público universitário: 12 missões em campus Afya Ji-Paraná, bairro, rios Machado e Urupá e áreas verdes. O campus é referência de contexto, sem parceria institucional presumida. Cenários e mapa são fictícios e ilustrativos.

## Desenvolvimento local

Com Node.js e npm instalados:

```bash
npm install
npm test
npm run dev
```

Abra o endereço indicado pelo Wrangler. Não é necessário criar conta Cloudflare ou Resend para testar a jornada. Também funciona com qualquer servidor estático que sirva `public/` como raiz; abrir o HTML diretamente por `file://` não é recomendado, pois usa módulos JavaScript.

## Experiência

- Apelido e quatro avatares, sem e-mail ou login.
- Quatro trilhas, três missões em cada, com decisões, cenas de seleção múltipla e classificação.
- 10 pontos por resposta adequada na primeira tentativa; máximo 120.
- Tentativas ilimitadas para concluir. Repetição não recupera pontos nem duplica conquistas.
- Missões em sequência dentro de cada ambiente; todos os ambientes disponíveis desde o início.
- Distintivo por ambiente e conquista final.
- Progresso e reflexão salvos em `localStorage`, no mesmo navegador.
- Resumo imprimível: escolher “Salvar como PDF” na janela de impressão do navegador.
- Guia de uso para condução individual ou projeção coletiva.

## Privacidade

A jornada não chama APIs nem envia apelido, respostas ou reflexão ao servidor. Armazenamento bloqueado gera aviso e permite continuar na sessão. Não há sincronização entre aparelhos. Em computadores compartilhados, apagar a jornada ao concluir. Limpar dados do navegador apaga o progresso.

## Organização

- `public/jornada-dados.js`: ambientes, conteúdo, avatares e fontes.
- `public/jornada-estado.js`: validação, pontuação, persistência e desbloqueios.
- `public/jornada.js`: interface e navegação.
- `public/jornada.css`: apresentação responsiva e impressão.
- `AGENTS.md`: regras do projeto para o Codex no VS Code.
- `docs/mvp.md`: escopo, roteiro de aula e limites.
- `public/jogo.js`, `public/missoes.js` e `functions/api/*`: implementação legada de seis questões e envio por e-mail, mantida para referência, sem uso pela nova interface.

Hospedagem continua compatível com Cloudflare Pages, pasta `public`. Nenhuma publicação é feita automaticamente por estes comandos de teste. Turmas, contas, ranking e certificados institucionais ficam para a segunda fase.
