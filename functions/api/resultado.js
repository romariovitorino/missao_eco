import {avaliar,missoes} from '../../public/missoes.js';
const json=(data,status=200)=>Response.json(data,{status,headers:{'Cache-Control':'no-store'}});
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export async function onRequestPost({request,env}) {
 if(!env.RESEND_API_KEY||!env.EMAIL_FROM||!env.TURNSTILE_SECRET_KEY)return json({erro:'Envio de e-mail não configurado.'},503);
 if(request.headers.get('origin')!==new URL(request.url).origin)return json({erro:'Origem não permitida.'},403);
 if(!(request.headers.get('content-type')||'').startsWith('application/json'))return json({erro:'Formato inválido.'},415);
 const raw=await request.text();if(raw.length>4096)return json({erro:'Solicitação muito grande.'},413);
 let data,r;try{data=JSON.parse(raw);r=avaliar(data.respostas)}catch{return json({erro:'Respostas inválidas.'},400)}
 const {nome,email,token,requestId,consentimento}=data;
 if(typeof nome!=='string'||!nome.trim()||nome.length>80||typeof email!=='string'||email.length>254||! /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)||typeof token!=='string'||token.length>2048||!token||typeof requestId!=='string'||! /^[a-f0-9-]{36}$/.test(requestId)||consentimento!==true)return json({erro:'Confira nome, e-mail e autorização de envio.'},400);
 try {
 const check=await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify',{method:'POST',body:new URLSearchParams({secret:env.TURNSTILE_SECRET_KEY,response:token,remoteip:request.headers.get('CF-Connecting-IP')||''}),signal:AbortSignal.timeout(10000)});
 const verified=await check.json();if(!verified.success||verified.hostname!==new URL(request.url).hostname||verified.action!=='resultado')return json({erro:'Verificação de segurança expirou. Tente novamente.'},403);
 const detalhe=missoes.map((m,i)=>`${m.titulo}: ${data.respostas[i]===m.correta?'acerto':'revisar'}. ${m.explicacao}`);
 const text=`Olá, ${nome.trim()}!\n\nVocê concluiu a Missão Eco Ji-Paraná com ${r.pontos}/60 pontos (${r.acertos}/6 acertos).\n\nConquistas: ${r.conquistas.join(', ')||'Missão concluída'}.\n\nTrês ações:\n${r.prioridades.join('\n')}\n\n${detalhe.join('\n\n')}\n\nA pontuação representa o desempenho no jogo; não mede sua pegada ecológica.\n\nFontes:\n${missoes.map(m=>m.fonte).join('\n')}`;
 const sent=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${env.RESEND_API_KEY}`,'Content-Type':'application/json','Idempotency-Key':`missao-eco/${requestId}`},body:JSON.stringify({from:env.EMAIL_FROM,to:[email.trim()],subject:'Sua missão em Ji-Paraná: resultado e próximos passos',text,html:`<div style="font-family:Arial,sans-serif;max-width:640px;color:#123d35"><h1>Missão Eco Ji-Paraná</h1><p>Olá, ${esc(nome.trim())}!</p><h2>${r.pontos} de 60 pontos</h2><p>${r.acertos} de 6 acertos</p><p>Conquistas: ${esc(r.conquistas.join(', ')||'Missão concluída')}.</p><h2>Três ações para experimentar</h2><ul>${r.prioridades.map(a=>`<li>${esc(a)}</li>`).join('')}</ul><h2>Aprendizados</h2>${detalhe.map(d=>`<p>${esc(d)}</p>`).join('')}<p>A pontuação representa o desempenho no jogo; não mede sua pegada ecológica.</p><h2>Fontes</h2><ul>${missoes.map(m=>`<li><a href="${esc(m.fonte)}">${esc(m.titulo)}</a></li>`).join('')}</ul></div>`}),signal:AbortSignal.timeout(15000)});
 if(!sent.ok)return json({erro:sent.status===429?'Limite de envio atingido. Tente mais tarde.':'O serviço não aceitou o e-mail. Tente novamente mais tarde.'},502);
 return json({ok:true});
 }catch{return json({erro:'Serviço temporariamente indisponível. Tente novamente.'},503)}
}
