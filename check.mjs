import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const html = fs.readFileSync(path.join(root,'index.html'),'utf8');
const css = fs.readFileSync(path.join(root,'styles.css'),'utf8');
const script = fs.readFileSync(path.join(root,'app.js'),'utf8');
const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]);
assert.equal(ids.length,new Set(ids).size,'duplicate IDs');
for(const [,id] of html.matchAll(/href="#([^"]+)"/g)) assert(ids.includes(id),'broken anchor '+id);
for(const [,src] of html.matchAll(/(?:src|href)="([^"#]+)"/g)) {
  if(!/^(?:https?:|data:)/.test(src)) assert(fs.existsSync(path.join(root,src)),'missing asset '+src);
}
for(const [,link] of html.matchAll(/<a\b([^>]*target="_blank"[^>]*)>/g)) assert(link.includes('noopener noreferrer'),'unsafe external tab');
assert(css.includes('max-width:700px') && css.includes('max-width:380px'),'responsive breakpoints');
assert(css.includes('prefers-reduced-motion'),'reduced motion');
assert.equal((css.match(/{/g)||[]).length,(css.match(/}/g)||[]).length,'CSS brace count');
assert(!/https?:\/\//.test(css),'unexpected CSS dependency');

class Element {
  constructor(id=''){this.id=id;this.style={};this.attrs={};this.listeners={};this.textContent='';this.firstChild={textContent:''};this.hidden=false;this.value='';this.classes=new Set();this.tabIndex=-1;this.classList={add:(...x)=>x.forEach(y=>this.classes.add(y)),remove:(...x)=>x.forEach(y=>this.classes.delete(y)),toggle:(x,b)=>b?this.classes.add(x):this.classes.delete(x)};}
  setAttribute(k,v){this.attrs[k]=v;}
  getAttribute(k){return this.attrs[k];}
  addEventListener(k,f){this.listeners[k]=f;}
  focus(){this.focused=true;}
  querySelector(){return this.child || (this.child=new Element());}
  querySelectorAll(){return this.children||[];}
}
const elements = new Map(ids.map(id=>[id,new Element(id)]));
const tabs = Array.from({length:5},(_,i)=>elements.get('track-tab-'+i));
const sceneButtons=Array.from({length:5},()=>new Element());
const studyButtons=Array.from({length:5},()=>new Element());
const packageButton=new Element();
packageButton.setAttribute('aria-expanded','false');
const dots = Array.from({length:5},()=>new Element());
const menuButton = new Element();
menuButton.setAttribute('aria-expanded','false');
const mobileMenu=elements.get('mobile-menu');
mobileMenu.hidden=true;
mobileMenu.children=Array.from({length:7},()=>new Element());
elements.get('units').value='10000';
const progress=new Element();
const documentListeners={};
const windowListeners={};
const document={getElementById:id=>{assert(elements.has(id),'missing DOM element '+id);return elements.get(id);},querySelector:sel=>{if(sel==='.package-toggle')return packageButton;if(sel==='.menu-toggle')return menuButton;if(sel==='.reading-progress span')return progress;throw new Error('Unexpected selector '+sel);},querySelectorAll:sel=>{if(sel==='[data-scene]')return sceneButtons;if(sel==='[data-study-stage]')return studyButtons;if(sel==='.track-tab')return tabs;if(sel==='.track-diagram span')return dots;return [];},addEventListener:(k,f)=>documentListeners[k]=f,documentElement:{scrollHeight:10000,classList:{add(){}}}};
const window={innerHeight:1000,scrollY:0,addEventListener:(k,f)=>windowListeners[k]=f,matchMedia:()=>({matches:true})};
const context=vm.createContext({document,window,Intl,Number,Math,Array,String,requestAnimationFrame:f=>f()});
vm.runInContext(script,context,{timeout:1000});
const tracks=vm.runInContext('tracks',context);
assert.equal(tracks.length,5);
assert.equal(tracks.reduce((n,t)=>{const duration=t.tag.split(' / ').at(-1).split(':').map(Number);return n+duration[0]*60+duration[1];},0),934,'duration must equal 15:34');
for(let i=0;i<5;i++){
  tabs[i].listeners.click();
  assert.equal(elements.get('track-title').textContent,tracks[i].name);
  assert.equal(elements.get('track-panel').attrs['aria-labelledby'],'track-tab-'+i);
  assert.equal(elements.get('track-art').attrs['data-stage'],String(i+1));
  assert.equal(tabs.filter(x=>x.attrs['aria-selected']==='true').length,1);
  assert.equal(tabs.filter(x=>x.tabIndex===0).length,1);
  for(const field of ['track-sonic','track-vocal','track-check']) assert(elements.get(field).textContent.length>10);
}
tabs[4].listeners.keydown({key:'ArrowDown',preventDefault(){}});
assert.equal(tabs[0].attrs['aria-selected'],'true','keyboard wrap');
tabs[0].listeners.keydown({key:'End',preventDefault(){}});
assert.equal(tabs[4].attrs['aria-selected'],'true','End key');
tabs[4].listeners.keydown({key:'Home',preventDefault(){}});
assert.equal(tabs[0].attrs['aria-selected'],'true','Home key');
const budgets=[];
for(let units=5000;units<=30000;units+=5000){
  elements.get('units').value=String(units);
  elements.get('units').listeners.input();
  const expected=(180000000+units*6000)*1.1;
  const actual=Number(elements.get('budget-total').textContent.replaceAll(',',''));
  assert.equal(actual,Math.round(expected));
  budgets.push({units,total:actual});
}
menuButton.listeners.click();
assert.equal(mobileMenu.hidden,false);
assert.equal(menuButton.getAttribute('aria-expanded'),'true');
mobileMenu.children[0].listeners.click();
assert.equal(mobileMenu.hidden,true);
menuButton.listeners.click();
documentListeners.keydown({key:'Escape'});
assert.equal(mobileMenu.hidden,true);
window.scrollY=4500;
windowListeners.scroll();
assert.equal(progress.style.width,'50%');
for(let i=0;i<5;i++){sceneButtons[i].listeners.click();assert.equal(sceneButtons.filter(b=>b.attrs['aria-pressed']==='true').length,1);assert.equal(elements.get('scene-number').textContent,String(i+1).padStart(2,'0'));assert.equal(elements.get('scene-screen').attrs['data-stage'],String(i+1));assert(fs.existsSync(path.join(root,elements.get('scene-image').attrs.src)));}
for(let i=0;i<5;i++){studyButtons[i].listeners.click();assert.equal(studyButtons.filter(b=>b.attrs['aria-pressed']==='true').length,1);assert(elements.get('study-stage-copy').textContent.length>20);assert(fs.existsSync(path.join(root,elements.get('study-image').attrs.src)));}
packageButton.listeners.click();assert.equal(packageButton.attrs['aria-expanded'],'true');assert(elements.get('package-objects').classes.has('expanded'));assert.equal(elements.get('package-foldout').hidden,false);packageButton.listeners.click();assert.equal(packageButton.attrs['aria-expanded'],'false');assert.equal(elements.get('package-foldout').hidden,true);
console.log(JSON.stringify({result:'PASS',checks:['IDs / internal anchors / assets','responsive CSS declarations / brace balance','JavaScript initialization','5 track switches / keyboard navigation','budget arithmetic at 6 quantity settings','menu open / anchor close / Escape','reading progress','five MV scene states and image assets','five visual stages and image assets','package expansion and collapse'],budgets,browserRendering:'Static and DOM behavior checks only; live browser verification follows deployment'},null,2));
