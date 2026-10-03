import {missoesJornada,ambientes,avatares} from './jornada-dados.js';
export const CHAVE='missao-eco-jornada-v1';
export function novoEstado(nome,avatar){return {versao:1,nome:nome.trim().slice(0,40),avatar:avatares.some(a=>a.id===avatar)?avatar:'folha',missoes:{},reflexao:''};}
export function validarEstado(value){
 if(!value||value.versao!==1||typeof value.nome!=='string'||!value.nome.trim()||value.nome.length>40||!avatares.some(a=>a.id===value.avatar)||!value.missoes||typeof value.missoes!=='object'||Array.isArray(value.missoes))return null;
 const estado=novoEstado(value.nome,value.avatar);
 for(const m of missoesJornada){const r=value.missoes[m.id];if(r&&Number.isInteger(r.tentativas)&&r.tentativas>=1&&typeof r.concluida==='boolean'&&(r.pontos===0||r.pontos===10)&&((r.pontos===0)||r.concluida))estado.missoes[m.id]={tentativas:r.tentativas,concluida:true,pontos:r.pontos};}
 estado.reflexao=typeof value.reflexao==='string'?value.reflexao.slice(0,1000):'';return estado;
}
export function respostaCorreta(m,resposta){
 if(m.tipo==='escolha')return Number.isInteger(resposta)&&resposta===m.correta;
 if(m.tipo==='cena')return Array.isArray(resposta)&&resposta.length===m.itens.length&&resposta.every((r,i)=>typeof r==='boolean'&&r===m.itens[i].problema);
 if(m.tipo==='classificar')return Array.isArray(resposta)&&resposta.length===m.itens.length&&resposta.every((r,i)=>Number.isInteger(r)&&r===m.itens[i].correta);
 return false;
}
export function registrar(estado,m,resposta){const antes=estado.missoes[m.id];if(antes?.concluida)return antes;const correta=respostaCorreta(m,resposta);const registro={tentativas:(antes?.tentativas||0)+1,concluida:true,pontos:!antes&&correta?10:0};estado.missoes[m.id]=registro;return registro;}
export function resumo(estado){const completas=missoesJornada.filter(m=>estado?.missoes[m.id]?.concluida);return {concluidas:completas.length,pontos:missoesJornada.reduce((n,m)=>n+(estado?.missoes[m.id]?.pontos||0),0),selos:ambientes.filter(a=>missoesJornada.filter(m=>m.ambiente===a.id).every(m=>estado?.missoes[m.id]?.concluida)),revisar:missoesJornada.filter(m=>estado?.missoes[m.id]?.concluida&&estado.missoes[m.id].pontos===0)};}
export function disponivel(estado,m){const lista=missoesJornada.filter(x=>x.ambiente===m.ambiente);const index=lista.findIndex(x=>x.id===m.id);return index===0||!!estado?.missoes[lista[index-1].id]?.concluida;}
export function carregar(storage){try{const raw=storage.getItem(CHAVE);return {estado:raw?validarEstado(JSON.parse(raw)):null,erro:false};}catch{return {estado:null,erro:true};}}
export function salvar(storage,estado){try{storage.setItem(CHAVE,JSON.stringify(estado));return true;}catch{return false;}}
