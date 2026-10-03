# Missão Eco Ji-Paraná

## Objetivo e escopo
MVP universitário de educação ambiental com 12 missões em quatro ambientes: campus Afya Ji-Paraná, bairro, rios Machado e Urupá e áreas verdes. Entrada por apelido e avatar, sem e-mail obrigatório. Progresso local, conquistas, reflexão e resumo imprimível. Turmas, contas, ranking e certificados institucionais ficam para outra fase.

## Conteúdo e identidade
- Cenários fictícios e educativos: não atribuir problemas reais à Afya ou a locais da cidade.
- Não usar a marca institucional da Afya sem autorização. Preservar a logo Missão Eco.
- Mapas são ilustrativos, sem pretensão cartográfica.
- Fontes ambientais oficiais com links e data de consulta; confirmar serviços locais antes de indicá-los.
- Nunca incentivar entrada em rios, contato com resíduos perigosos, captura de animais ou ações sem orientação.

## Gamificação
- 10 pontos por missão correta na primeira tentativa; máximo 120.
- Tentativas ilimitadas. Missão concluída após resposta adequada, mesmo sem pontos.
- Distintivo por ambiente concluído; conquista final por 12 missões concluídas.
- Conclusão não comprova mudança de comportamento nem mede impacto ambiental real.

## UX e acessibilidade
- Interface em português, para público universitário, celular e desktop.
- Feedback por texto e cor, controles por teclado, foco visível e rótulos acessíveis.
- Nenhuma interação depende exclusivamente de arrastar, cor ou hover.
- Informar persistência no navegador e limitações em dispositivos compartilhados.
- Reinício destrutivo exige confirmação na interface. Nunca inserir apelido/reflexão com innerHTML.

## Desenvolvimento e validação
- JavaScript nativo e CSS; manter compatibilidade com hospedagem estática Cloudflare Pages.
- `npm test`; `npm run dev` para desenvolvimento. Conferir fluxos, recarga, armazenamento inválido/bloqueado, pontuação e resumo.
- Testar layout em 375, 768 e 1280 pixels quando navegador estiver disponível; relatar limitações com clareza.
- Não publicar no Cloudflare durante desenvolvimento local sem solicitação.
- APIs de e-mail antigas são legadas; a jornada do MVP não depende delas.
