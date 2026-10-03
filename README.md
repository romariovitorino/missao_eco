# Missão Eco Ji-Paraná
Jogo educativo em JavaScript, HTML e CSS. Seis missões, feedback imediato, até 60 pontos, conquistas e resultado por e-mail. Sem banco de dados, login ou ranking.

## Executar
Requer Node.js 22 ou superior.

```sh
npm install
npm test
npm run dev
```
Abra o endereço informado pelo Wrangler. Para testar somente o jogo, a ausência de credenciais não impede a conclusão; o resultado informa que o e-mail não está configurado.

## Publicar com GitHub e Cloudflare Pages
1. Criar conta Cloudflare e abrir Workers & Pages → criar aplicação → Pages → importar repositório Git.
2. Autorizar apenas o repositório `romariovitorino/missao_eco` e selecionar a branch `main`.
3. Framework: None; comando de build: vazio; diretório de saída: `public`; diretório raiz: raiz do repositório.
4. Publicar. O nome disponível determina o endereço `*.pages.dev`.
5. As alterações na branch de produção geram novas publicações. A pasta `functions/` precisa permanecer na raiz.

## E-mail e proteção contra abuso
1. Criar conta Resend. Para enviar a participantes, verificar um domínio sob seu controle. O endereço gratuito `pages.dev` não pode ser usado como domínio remetente verificado. O remetente de teste do Resend é restrito e não substitui essa etapa.
2. Pode-se usar domínio próprio comprado ou um subdomínio institucional cedido e configurado pela faculdade. Hospedagem gratuita não inclui aquisição de domínio.
3. Criar uma chave Resend com permissão de envio e desativar rastreamento de abertura/cliques no provedor.
4. Criar um widget Cloudflare Turnstile e autorizar o hostname efetivo da aplicação. Usar modo Managed.
5. Em Settings → Variables and Secrets, configurar `RESEND_API_KEY` e `TURNSTILE_SECRET_KEY` como segredos; `EMAIL_FROM` (por exemplo, `Missão Eco <resultado@seu-dominio>`), `TURNSTILE_SITE_KEY` como variáveis. Republicar.
6. Separar configuração de produção e preview. Usar credenciais de teste nos previews.
7. Testar uma entrega real para um destinatário autorizado e verificar spam. Resend Free limita atualmente 100 e-mails/dia: considerar público e testes no planejamento do evento.

Localmente, copiar `.dev.vars.example` para `.dev.vars` e preencher sem versionar segredos. Configurar Turnstile para ambiente de teste conforme sua documentação. A chave pública do widget é exposta intencionalmente; a chave secreta e a chave Resend nunca vão ao navegador.

## Funcionamento e limites
O navegador calcula o resultado imediato. A função recalcula pontos a partir das respostas, valida origem e dados, verifica Turnstile no servidor e envia pelo Resend. O identificador do envio é usado para idempotência. Há timeout e erros visíveis. “Aceito pelo serviço” não garante chegada à caixa de entrada.

Turnstile reduz abuso, mas não impõe uma cota individual permanente: acompanhar o uso do provedor. Nenhum envio real foi realizado nesta implementação sem credenciais e domínio.

O aplicativo não persiste nome/e-mail/respostas. Provedores podem reter registros operacionais; revisar condições e comunicar retenção antes do evento. A pontuação não mede pegada ecológica nem comprova aprendizagem. Conquistas: pelo menos um acerto no tema. Recomendações: erros primeiro, depois acertos até completar três.

Fontes estão no arquivo `public/missoes.js` e na tela Sobre. Os cenários não indicam pontos de coleta locais não verificados. Documentação de testes: `docs/testes.md`.
