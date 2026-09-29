'use strict';
const tracks = [
  {name:'OFF THE CLOCK',time:'20:30',tag:'OPENING / 02:40',scene:'잘 보이려 애쓰던 하루를 내려놓고, 내 박자를 찾는다.',description:'타인의 기대에서 잠시 벗어나는 뉴잭스윙·팝 펑크 브리프. 반복 가능한 기타 리프와 짧은 콜 앤드 리스폰스로 팀의 움직임을 먼저 제시한다.',sonic:'Pop funk / new jack swing texture · 108 BPM · clean guitar · dry snare',vocal:'멤버 간 짧은 문답형 프레이즈. 코러스에서 유니슨을 쌓고 과한 보컬 레이어는 마지막 반복에 집중.',check:'첫 15초의 캐릭터 / 2번 트랙과 다른 리듬 패턴 / 공연 오프닝으로 이어지는 전환을 확인한다.'},
  {name:'LONG WAY HOME',time:'21:10',tag:'TITLE / 03:08',scene:'네 앞에서는, 괜찮은 척하던 표정이 풀린다.',description:'낯선 기대에 맞추며 지낸 긴 시간을 지나, 네 곁에서 자연스러운 나를 발견한다. 벌스의 짧게 끊긴 프레이즈가 후렴의 열린 선율로 풀리며, 경계에서 편안함으로 변하는 감정을 들려준다.',sonic:'Pop R&B · 112 BPM · muted guitar · round bass · swung drums',vocal:'낮은 벌스 → 2인 교차 프리코러스 → 전원 유니슨 훅. 후렴 마지막 박에 짧은 숨 공간.',check:'2회 청취 후 후렴 회상 / 가사 명료도 / 스텝과 가창의 동시 수행을 데모 심사에서 확인한다.'},
  {name:'ONE MORE BLOCK',time:'22:00',tag:'PERFORMANCE B-SIDE / 02:54',scene:'조금 어색한 내 모습까지, 네 앞에서는 웃음이 된다.',description:'발걸음이 가장 빨라지는 수록곡. 서툰 동작을 함께 웃고 받아 주는 두 사람을 잘게 쪼갠 드럼과 짧은 보컬 문답으로 표현한다. ONE MORE BLOCK은 관계를 한 단계 더 열어 보는 작은 용기를 뜻한다.',sonic:'UK garage / 2-step pop · 128 BPM · shuffled hats · clipped bass · sparse synth',vocal:'싱코페이션을 살린 짧은 가사, 2인 교차 훅. 드롭에서도 한 문장의 멜로디를 유지.',check:'타이틀과 다른 훅 형태 / 빠른 박자에서 발음 선명도 / 15초 퍼포먼스 구간의 독립성을 확인한다.'},
  {name:'WINDOW SEAT',time:'23:10',tag:'VOCAL B-SIDE / 03:20',scene:'창가에 앉아, 말보다 긴 침묵을 나눈다.',description:'말을 채우려 애쓰지 않아도 편안한 관계를 그린다. WINDOW SEAT은 누군가 옆을 비워 둔 자리의 이미지다. 악기 밀도를 낮추고 가까운 보컬과 반응하는 화음에 청취의 중심을 둔다.',sonic:'Neo-soul / warm R&B · 86 BPM · Rhodes · soft bass · light percussion',vocal:'솔로 프레이즈 뒤 2~3성 화음. 낮은 악기 밀도와 짧은 잔향으로 발음·호흡을 전면 배치.',check:'앞선 3곡과의 감정 전환 / 화음 튜닝·자음 정렬 / 라이브 클립에서의 가창 전달력을 확인한다.'},
  {name:'LEAVE THE LIGHT ON',time:'00:10',tag:'CLOSING / 03:32',scene:'말을 다 끝내지 못한 날에도, 네 곁에는 내 자리가 있다.',description:'서로에게 다시 마음을 열 수 있다는 신뢰를 남기는 엔딩. LIGHT는 상대를 받아들일 여유의 은유다. 마지막 후렴에서 여섯 목소리가 모이고, 짧은 악기 잔향으로 마무리한다.',sonic:'Acoustic soul pop · 74 BPM · felt piano · restrained guitar · group harmony',vocal:'솔로·듀오·그룹 순으로 인원을 넓히는 구성. 마지막 유니슨과 화음을 비교해 가장 선명한 버전을 택한다.',check:'가사와 제목의 감정 일치 / 과도한 감정 고조 여부 / 1번 트랙 재청취로 이어지는 엔딩 길이를 확인한다.'}
];
const trackVisuals = [
 {image:'anton.jpg',alt:'앤톤의 겨울 도시 인물 사진 레퍼런스',state:'OFF DUTY',quote:'누구의 기대도 없이,\n내 박자를 찾는 시간.'},
 {image:'group-genie.jpg',alt:'겨울 도시에서 함께 선 RIIZE 단체 사진 레퍼런스',state:'SEEN',quote:'네 앞에서는,\n괜찮은 척하지 않아도.'},
 {image:'shotaro.jpg',alt:'편안한 표정의 쇼타로 인물 사진 레퍼런스',state:'PLAY',quote:'어색한 나까지,\n너와는 웃음이 된다.'},
 {image:'wonbin.jpg',alt:'겨울 도시의 원빈 인물 사진 레퍼런스',state:'CLOSER',quote:'말을 채우지 않아도,\n편안한 사이.'},
 {image:'snow-rest.jpg',alt:'눈 위에 함께 누운 RIIZE 여섯 멤버의 사진 레퍼런스',state:'AT EASE',quote:'어떤 모습이어도,\n네 곁에는 내 자리가.'}
];
const tabs = Array.from(document.querySelectorAll('.track-tab'));
const ids = ['track-title','track-time','track-tag','track-scene','track-description','track-sonic','track-vocal','track-check'];
const keys = ['name','time','tag','scene','description','sonic','vocal','check'];
function selectTrack(index, focus=false) {
  const selected = tracks[index];
  tabs.forEach((tab,i)=>{tab.classList.toggle('active',i===index);tab.setAttribute('aria-selected',String(i===index));tab.tabIndex=i===index?0:-1;});
  ids.forEach((id,i)=>{document.getElementById(id).textContent=selected[keys[i]];});
  document.getElementById('track-panel').setAttribute('aria-labelledby','track-tab-'+index);
  document.querySelectorAll('.track-diagram span').forEach((dot,i)=>{dot.style.background=i===index?'var(--hot)':'var(--ink)';dot.style.borderColor=i===index?'var(--hot)':'#91a4bb';});
  const visual=trackVisuals[index];
  const artImage=document.getElementById('track-image');
  artImage.setAttribute('src','assets/'+visual.image);
  artImage.setAttribute('alt',visual.alt);
  document.getElementById('track-art-number').textContent=String(index+1).padStart(2,'0')+' — 05';
  document.getElementById('track-art-state').textContent=visual.state;
  document.getElementById('track-art-quote').textContent=visual.quote;
  if(focus) tabs[index].focus();
}
tabs.forEach((tab,i)=>{
  tab.addEventListener('click',()=>selectTrack(i));
  tab.addEventListener('keydown',event=>{
    let next=i;
    if(event.key==='ArrowDown'||event.key==='ArrowRight') next=(i+1)%tabs.length;
    else if(event.key==='ArrowUp'||event.key==='ArrowLeft') next=(i-1+tabs.length)%tabs.length;
    else if(event.key==='Home') next=0;
    else if(event.key==='End') next=tabs.length-1;
    else return;
    event.preventDefault();selectTrack(next,true);
  });
});
const menuButton=document.querySelector('.menu-toggle');
const mobileMenu=document.getElementById('mobile-menu');
function closeMenu(){menuButton.setAttribute('aria-expanded','false');mobileMenu.hidden=true;menuButton.querySelector('span').textContent='＋';}
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';menuButton.setAttribute('aria-expanded',String(open));mobileMenu.hidden=!open;menuButton.querySelector('span').textContent=open?'−':'＋';});
mobileMenu.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!mobileMenu.hidden){closeMenu();menuButton.focus();}});
document.addEventListener('pointerdown',event=>{if(!mobileMenu.hidden&&!mobileMenu.contains(event.target)&&!menuButton.contains(event.target))closeMenu();});
const unitsInput=document.getElementById('units');
const formatter=new Intl.NumberFormat('ko-KR');
function wonLabel(amount){const eok=Math.floor(amount/100000000);const man=(amount%100000000)/10000;return(eok?eok+'억 ':'')+(man?formatter.format(man)+'만원':(eok?'원':'0원'));}
function updateBudget(){const units=Number(unitsInput.value);const manufacture=units*6000;const subtotal=180000000+manufacture;const contingency=Math.round(subtotal*.1);const total=subtotal+contingency;document.getElementById('units-label').textContent=formatter.format(units)+'장';document.getElementById('budget-total').textContent=formatter.format(total);document.getElementById('manufacture-formula').textContent=formatter.format(units)+'장 × 6,000원';document.getElementById('manufacture-cost').textContent=wonLabel(manufacture);document.getElementById('contingency-cost').textContent=wonLabel(contingency);document.getElementById('budget-table-total').textContent=wonLabel(total);}
unitsInput.addEventListener('input',updateBudget);updateBudget();
let framePending=false;
function updateProgress(){const max=document.documentElement.scrollHeight-window.innerHeight;document.querySelector('.reading-progress span').style.width=(max>0?Math.min(100,Math.max(0,window.scrollY/max*100)):0)+'%';framePending=false;}
window.addEventListener('scroll',()=>{if(!framePending){framePending=true;requestAnimationFrame(updateProgress);}},{passive:true});
window.addEventListener('resize',updateProgress);updateProgress();
if('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('js');const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.remove('pending');observer.unobserve(entry.target);}});},{threshold:.06});document.querySelectorAll('.section-heading,.intro-grid,.evidence-grid,.positioning,.voice-grid,.visual-heading,.package-grid,.closing h2').forEach(el=>{el.classList.add('reveal','pending');observer.observe(el);});}

// Still-image references illustrate the planned emotional composition, not finished MV footage.
const scenes=[
 {image:'anton.jpg',alt:'도시를 배경으로 한 앤톤의 인물 사진 레퍼런스',time:'00:00 — 00:20',word:'GUARD UP.',stage:'OPENING / 환경음 → 킥 진입',title:'OFF THE CLOCK',copy:'유리창에 비친 얼굴을 정돈하는 여섯 인물. 어긋난 시선과 분리된 프레임으로 하루의 긴장을 보여준다.'},
 {image:'shotaro.jpg',alt:'웃음이 번지는 쇼타로의 인물 사진 레퍼런스',time:'00:20 — 00:50',word:'FIRST SMILE.',stage:'VERSE / 관찰 숏',title:'SAME DIRECTION',copy:'한 사람의 어색한 동작에 옆 사람이 웃으며 박자를 맞춘다. 실수를 숨기던 표정이 잠깐 풀린다. 상대의 반응을 얼굴 높이의 짧은 리액션 숏으로 잇는다.'},
 {image:'group-genie.jpg',alt:'같은 프레임에서 함께 선 RIIZE의 단체 사진 레퍼런스',time:'00:50 — 01:25',word:'IN SYNC.',stage:'CHORUS / 키 퍼포먼스',title:'THE LONG WAY',copy:'서로를 발견한 여섯 동선이 같은 프레임에 들어온다. 두 걸음 뒤 눈을 맞추는 후렴 군무로 관계의 변화를 드러낸다. 마지막 박에는 각자의 작은 동작을 남긴다.'},
 {image:'wonbin.jpg',alt:'가까운 거리의 원빈 인물 사진 레퍼런스',time:'01:25 — 02:30',word:'STAY CLOSE.',stage:'VERSE 2 → BRIDGE / 긴 호흡',title:'ONE MORE STOP',copy:'정류장 벤치에서 말을 꺼내다 멈춘 사람 곁에 다른 사람이 그대로 앉는다. 기다려 주는 시간과 자연스러운 침묵을 길게 담는다. 시선과 고개가 같은 높이에서 머문다.'},
 {image:'snow-rest.jpg',alt:'긴장을 풀고 눈 위에 나란히 누운 RIIZE 단체 사진 레퍼런스',time:'02:30 — 03:08',word:'AT EASE.',stage:'LAST CHORUS / 아웃트로',title:'LIGHTS STILL ON',copy:'첫 장면의 거리를 같은 구도로 반복한다. 이제 인물은 유리창 속 얼굴 대신 서로를 바라본다. 누군가 비워 둔 옆자리에 앉는 순간 HOME 자막이 남는다.'}
];
const sceneButtons=Array.from(document.querySelectorAll('[data-scene]'));
function selectScene(index){
 const scene=scenes[index];
 sceneButtons.forEach((button,i)=>button.setAttribute('aria-pressed',String(i===index)));
 const img=document.getElementById('scene-image');img.setAttribute('src','assets/'+scene.image);img.setAttribute('alt',scene.alt);
 for(const key of ['time','word','stage','title','copy'])document.getElementById('scene-'+key).textContent=scene[key];
 document.getElementById('scene-number').textContent=String(index+1).padStart(2,'0');
}
sceneButtons.forEach((button,index)=>button.addEventListener('click',()=>selectScene(index)));
const packageButton=document.querySelector('.package-toggle');
packageButton.addEventListener('click',()=>{
 const expanded=packageButton.getAttribute('aria-expanded')!=='true';
 packageButton.setAttribute('aria-expanded',String(expanded));
 document.getElementById('package-objects').classList.toggle('expanded',expanded);
 packageButton.firstChild.textContent=expanded?'패키지 모아 보기 ':'패키지 펼쳐 보기 ';
});
