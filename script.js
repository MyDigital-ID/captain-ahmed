        const T={
          ar:{d:'rtl',w:'مرحباً بك في صفحة الكابتن<br><span>أحمد المرزوقي</span>',s:'في الوقت الحالي أنا خارج البلاد،<br>سيتواصل معك المساعد الشخصي',h:'يسعدني التواصل معك'},
          en:{d:'ltr',w:'Welcome to the page of Captain<br><span>Ahmed Al Marzooqi</span>',s:'I am currently abroad,<br>my personal assistant will be in touch with you',h:'Chat with my assistant'},
          ur:{d:'rtl',w:'کیپٹن کے صفحے پر خوش آمدید<br><span>احمد المرزوقی</span>',s:'اس وقت میں ملک سے باہر ہوں،<br>میرا ذاتی اسسٹنٹ آپ سے رابطہ کرے گا',h:'میرے اسسٹنٹ سے بات کریں'}
        };
        function changeLang(l){
            const t=T[l];
            document.documentElement.lang=l;
            document.documentElement.dir=t.d;
            document.querySelector('.welcome-text').innerHTML=t.w;
            document.querySelector('.status-card p').innerHTML=t.s;
            document.getElementById('chatHint').innerHTML=t.h;
            document.querySelectorAll('.lang-btn').forEach(b=>b.classList.toggle('active',b.dataset.l===l));
            try{localStorage.setItem('lang',l)}catch(e){}
            window.dispatchEvent(new Event('langchange'));
        }
        let saved;try{saved=localStorage.getItem('lang')}catch(e){}
        changeLang(saved||({ar:'ar',ur:'ur'})[(navigator.language||'').slice(0,2)]||'en');
    

(()=>{
// رابط الـ Worker على كلاودفلير (التوكن محفوظ هناك، مش هنا)
const API='https://captain-bot.download-my-app.workers.dev';
const DEBUG=true; // لما نخلّص التجربة نخليها false

const L={
ar:{title:'المساعد الشخصي',sub:'متاح الآن',
greet:'مرحباً بك، أنا المساعد الشخصي للكابتن أحمد المرزوقي. تشرفني بمعرفة اسمك الكريم؟',namePh:'الاسم',
topic:'هلا بك يا {n}. أرجو أن تكون بخير. تواصلك بخصوص:',personal:'أمر شخصي',work:'بخصوص العمل',
pr:'عساه خير بإذن الله، تفضّل بكتابة رسالتك.',
wr:'خير بإذن الله، فالك طيب. اكتب لي التفاصيل وسأوصلها للكابتن ليتواصل معك بأسرع وقت إن شاء الله.',msgPh:'الرسالة',xp:'سأقوم بالتواصل مع كابتن أحمد بمجرد أن يكون الاتصال به متاحاً وسأنقل له رسالتك، هل هناك أي تفاصيل أخرى تود إضافتها؟',xw:'سأقوم بالتواصل مع كابتن أحمد بمجرد أن يكون الاتصال به متاحاً وسأنقل له رسالتك، هل هناك أي تفاصيل أخرى تود إضافتها؟',addB:'إضافة تفاصيل',nextB:'لا، متابعة',more:'هل هناك المزيد؟',
attachQ:'قبل إنهاء المحادثة، إذا كانت هناك أي مرفقات (صور أو ملفات PDF أو مستندات) برجاء رفعها الآن.',attach:'رفع مرفق',skip:'لا توجد مرفقات',pick:'اختيار ملفات',go:'متابعة',big:'الملف أكبر من 10 ميجا',many:'الحد الأقصى 5 ملفات',
contactQ:'كيف تفضّل أن يتواصل معك الكابتن؟',msgs:'رسائل',call:'اتصال هاتفي',meet:'موعد مقابلة شخصية',
w1:'ما اليوم والوقت المناسبين لاتصال الكابتن؟',w2:'ما اليوم والوقت المناسبين للمقابلة؟',ok:'تأكيد',dl:'التاريخ',tl:'الوقت',am:'ص',pm:'م',
phoneQ:'تفضّل رقم هاتفك للتواصل',phPh:'رقم الهاتف',
rv:'راجع بياناتك قبل الإرسال:',send:'إرسال',edit:'تعديل',editQ:'ما الذي تريد تعديله؟',fName:'الاسم',fMsg:'الرسالة',fContact:'طريقة التواصل',fPhone:'الهاتف',
sending:'جارٍ الإرسال...',err:'تعذّر الإرسال، تأكد من الاتصال بالإنترنت وحاول مرة أخرى.',wait:'أرسلت رسالة قبل قليل، انتظر دقيقة ثم حاول مرة أخرى.',retry:'إعادة المحاولة',again:'رسالة جديدة',
done:'خير بإذن الله، سأنقل كافة التفاصيل للكابتن أحمد المرزوقي وسيتم الرد عليك في أقرب وقت إن شاء الله. تحياتي',
night:'ليلة سعيدة إن شاء الله',morn:'يومك جميل بإذن الله',aft:'أرجو لك وقتاً طيباً بإذن الله',
lbl:['الاسم','الموضوع','الرسالة','المرفقات','التواصل','الموعد','الهاتف']},
en:{title:'Personal Assistant',sub:'Available now',
greet:"Welcome, I'm the personal assistant of Captain Ahmed Al Marzooqi. May I know your name?",namePh:'Name',
topic:'Hello {n}. I hope you are doing well. Your message is about:',personal:'Personal matter',work:'Work-related',
pr:'Hopefully all is well, God willing. Please feel free to write your message.',
wr:'God willing, all will be good. Please write the details and I will pass them to the Captain, who will contact you as soon as possible.',msgPh:'Message',xp:'I will contact Captain Ahmed as soon as he is available and pass on your message. Is there any other detail you would like to add?',xw:'I will contact Captain Ahmed as soon as he is available and pass on your message. Is there any other detail you would like to add?',addB:'Add details',nextB:'No, continue',more:'Anything more?',
attachQ:'Before we finish, if you have any attachments (photos, PDFs or documents), please upload them now.',attach:'Upload attachment',skip:'No attachments',pick:'Choose files',go:'Continue',big:'File is larger than 10 MB',many:'Maximum 5 files',
contactQ:'How would you prefer the Captain to contact you?',msgs:'Messages',call:'Phone call',meet:'In-person meeting',
w1:"What day and time suit you for the Captain's call?",w2:'What day and time suit you for the meeting?',ok:'Confirm',dl:'Date',tl:'Time',am:'AM',pm:'PM',
phoneQ:'Please enter your phone number',phPh:'Phone number',
rv:'Please review your details before sending:',send:'Send',edit:'Edit',editQ:'What would you like to edit?',fName:'Name',fMsg:'Message',fContact:'Contact method',fPhone:'Phone',
sending:'Sending...',err:'Could not send. Check your internet connection and try again.',wait:'You sent a message a moment ago. Please wait a minute and try again.',retry:'Try again',again:'New message',
done:"God willing, I will pass all the details to Captain Ahmed Al Marzooqi and you will receive a reply as soon as possible. Kind regards.",
night:'Have a pleasant night!',morn:'Have a wonderful day!',aft:'Wishing you a lovely time!',
lbl:['Name','Topic','Message','Files','Contact','When','Phone']},
ur:{title:'ذاتی اسسٹنٹ',sub:'ابھی دستیاب',
greet:'خوش آمدید، میں کیپٹن احمد المرزوقی کا ذاتی اسسٹنٹ ہوں۔ براہِ کرم اپنا نام بتائیں؟',namePh:'نام',
topic:'خوش آمدید {n}۔ امید ہے آپ خیریت سے ہوں گے۔ آپ کا رابطہ کس سلسلے میں ہے؟',personal:'ذاتی معاملہ',work:'کام سے متعلق',
pr:'ان شاء اللہ خیر ہو، براہِ کرم اپنا پیغام لکھیں۔',
wr:'ان شاء اللہ سب بہتر ہو گا۔ براہِ کرم تفصیلات لکھیں، انہیں کیپٹن تک پہنچا دیا جائے گا تاکہ وہ جلد از جلد آپ سے رابطہ کریں۔',msgPh:'پیغام',xp:'کیپٹن احمد کے دستیاب ہوتے ہی آپ کا پیغام ان تک پہنچا دیا جائے گا۔ کیا آپ کوئی اور تفصیل شامل کرنا چاہیں گے؟',xw:'کیپٹن احمد کے دستیاب ہوتے ہی آپ کا پیغام ان تک پہنچا دیا جائے گا۔ کیا آپ کوئی اور تفصیل شامل کرنا چاہیں گے؟',addB:'تفصیل شامل کریں',nextB:'نہیں، آگے بڑھیں',more:'کیا کچھ اور؟',
attachQ:'گفتگو ختم کرنے سے پہلے، اگر کوئی منسلکات (تصاویر، پی ڈی ایف یا دستاویزات) ہیں تو براہِ کرم ابھی اپلوڈ کریں۔',attach:'فائل اپلوڈ کریں',skip:'کوئی فائل نہیں',pick:'فائلیں منتخب کریں',go:'آگے بڑھیں',big:'فائل 10 ایم بی سے بڑی ہے',many:'زیادہ سے زیادہ 5 فائلیں',
contactQ:'آپ چاہیں گے کہ کیپٹن آپ سے کس طرح رابطہ کریں؟',msgs:'پیغامات',call:'فون کال',meet:'ذاتی ملاقات',
w1:'کیپٹن کی کال کے لیے آپ کو کون سا دن اور وقت مناسب ہے؟',w2:'ملاقات کے لیے آپ کو کون سا دن اور وقت مناسب ہے؟',ok:'تصدیق',dl:'تاریخ',tl:'وقت',am:'صبح',pm:'شام',
phoneQ:'براہِ کرم اپنا فون نمبر لکھیں',phPh:'فون نمبر',
rv:'بھیجنے سے پہلے اپنی معلومات دیکھ لیں:',send:'بھیجیں',edit:'ترمیم',editQ:'آپ کیا تبدیل کرنا چاہتے ہیں؟',fName:'نام',fMsg:'پیغام',fContact:'رابطے کا طریقہ',fPhone:'فون',
sending:'بھیجا جا رہا ہے...',err:'بھیجنا ممکن نہیں ہوا۔ انٹرنیٹ چیک کریں اور دوبارہ کوشش کریں۔',wait:'آپ نے ابھی پیغام بھیجا ہے۔ ایک منٹ بعد دوبارہ کوشش کریں۔',retry:'دوبارہ کوشش کریں',again:'نیا پیغام',
done:'ان شاء اللہ تمام تفصیلات کیپٹن احمد المرزوقی تک پہنچا دی جائیں گی اور جلد از جلد آپ کو جواب دیا جائے گا۔ شکریہ',
night:'آپ کی رات خوشگوار گزرے',morn:'آپ کا دن اچھا گزرے',aft:'آپ کا وقت اچھا گزرے',
lbl:['نام','موضوع','پیغام','فائلیں','رابطہ','وقت','فون']}
};
const CC=[['+971','🇦🇪'],['+966','🇸🇦'],['+968','🇴🇲'],['+974','🇶🇦'],['+973','🇧🇭'],['+965','🇰🇼'],['+20','🇪🇬'],['+92','🇵🇰'],['+91','🇮🇳'],['+880','🇧🇩'],['+63','🇵🇭'],['+44','🇬🇧'],['+1','🇺🇸']];
const steps=['name','topic','msg','extra','contact','when','phone','files','review'];
const need=c=>c==='c'||c==='v';
let S,lang,el=null;
const T=()=>L[lang];
const mk=(t,c,h)=>{const e=document.createElement(t);if(c)e.className=c;if(h!=null)e.innerHTML=h;return e};
const esc=s=>String(s).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
const wait=ms=>new Promise(r=>setTimeout(r,ms));
const down=()=>{el.b.scrollTop=el.b.scrollHeight};
const ctl=n=>{if(el.k){el.k.remove();el.k=null}if(n){n.classList.add('cb-ctl');el.b.append(n);el.k=n;down()}};

async function bot(t){const d=mk('div','cb-m cb-bot cb-typing','<i></i><i></i><i></i>');el.b.append(d);down();await wait(550);d.classList.remove('cb-typing');d.textContent=t;down()}
function me(t){const d=mk('div','cb-m cb-me');d.textContent=t;el.b.append(d);down()}

const choose=o=>new Promise(r=>{const g=mk('div','cb-opts');o.forEach(([v,i,t])=>{const b=mk('button','cb-opt',`<span>${i}</span>${t}`);b.onclick=()=>{g.remove();r(v)};g.append(b)});el.b.append(g);down()});
async function pick(o){const v=await choose(o);me(o.find(x=>x[0]===v)[2]);return v}

const ask=(ph,multi)=>new Promise(r=>{
 const f=mk('div','cb-row'),i=mk(multi?'textarea':'input','cb-in'),b=mk('button','cb-go','➤');
 i.placeholder=ph;if(multi)i.rows=3;
 const go=()=>{const v=i.value.trim();if(!v){i.classList.add('cb-bad');return}ctl();r(v)};
 b.onclick=go;if(!multi)i.onkeydown=e=>{if(e.key==='Enter')go()};
 f.append(i,b);ctl(f)});

const when=()=>new Promise(r=>{
 const t=T(),f=mk('div','cb-box'),dw=mk('div','cb-field'),face=mk('div','cb-face','<span>📅</span><b>'+t.dl+'</b>'),d=mk('input');
 d.type='date';d.min=new Date().toISOString().slice(0,10);
 face.onclick=()=>{try{d.showPicker()}catch(e){d.click()}};
 d.onchange=()=>{if(d.value){const[y,m,x]=d.value.split('-');face.lastChild.textContent=x+'/'+m+'/'+y;face.classList.remove('cb-bad')}};
 dw.append(face,d);
 let hh='',mm='',ap=0;
 const tf=mk('div','cb-face','<span>⏰</span><b>'+t.tl+'</b>'),cp=mk('div','cb-clock'),dp=mk('div','cb-disp','--:--');
 const upd=()=>{const s=(hh||'--')+':'+(mm||'--')+' '+(ap?t.pm:t.am);dp.textContent=s;if(hh&&mm){tf.lastChild.textContent=s;tf.classList.remove('cb-bad')}};
 const grid=(k,set)=>{const g=mk('div','cb-g2');for(let i=0;i<12;i++){const v=String(k(i)).padStart(2,'0'),b=mk('button','cb-chip',v);b.onclick=()=>{set(v);[...g.children].forEach(x=>x.classList.toggle('on',x===b));upd()};g.append(b)}return g};
 const ar=mk('div','cb-row'),pm=[mk('button','cb-ap on',t.am),mk('button','cb-ap',t.pm)];
 pm.forEach((x,i)=>x.onclick=()=>{ap=i;pm.forEach((y,j)=>y.classList.toggle('on',j===i));upd()});
 ar.append(...pm);cp.append(dp,grid(i=>i+1,v=>hh=v),grid(i=>i*5,v=>mm=v),ar);
 tf.onclick=()=>{cp.classList.toggle('open');setTimeout(down,50)};
 const b=mk('button','cb-pri',t.ok);
 b.onclick=()=>{let ok=1;if(!d.value){face.classList.add('cb-bad');ok=0}if(!hh||!mm){tf.classList.add('cb-bad');ok=0}if(!ok)return;ctl();r(face.lastChild.textContent+'  '+hh+':'+mm+' '+(ap?t.pm:t.am))};
 f.append(dw,tf,cp,b);ctl(f)});

const phone=()=>new Promise(r=>{
 const t=T(),f=mk('div','cb-row'),s=mk('select','cb-in cb-cc'),i=mk('input','cb-in'),b=mk('button','cb-go','➤');
 CC.forEach(([c,fl])=>s.append(new Option(fl+' '+c,c)));
 s.value=lang==='ur'?'+92':'+971';
 i.type='tel';i.inputMode='tel';i.placeholder=t.phPh;i.dir='ltr';s.dir='ltr';
 b.onclick=()=>{const n=i.value.replace(/\D/g,'').replace(/^0+/,'');if(n.length<6||n.length>14){i.classList.add('cb-bad');return}ctl();r(s.value+n)};
 f.append(s,i,b);ctl(f)});

const files=()=>new Promise(r=>{
 const t=T(),f=mk('div','cb-box'),i=mk('input'),l=mk('div','cb-files'),p=mk('button','cb-sec','📎 '+t.pick),g=mk('button','cb-pri',t.go);
 let fs=[];i.type='file';i.multiple=true;i.accept='image/*,.pdf,.doc,.docx';i.hidden=true;
 p.onclick=()=>i.click();
 i.onchange=()=>{let n='';for(const x of i.files){if(x.size>1e7)n=t.big;else if(fs.length>=5)n=t.many;else fs.push(x)}l.textContent=(n?n+' — ':'')+fs.map(x=>x.name).join('، ');i.value=''};
 g.onclick=()=>{ctl();r(fs)};
 f.append(l,p,g,i);ctl(f)});

const H={
async name(){if(!S.edit)await bot(T().greet);S.name=await ask(T().namePh);me(S.name)},
async topic(){const t=T();await bot(t.topic.replace('{n}',S.name));S.topic=await pick([['p','👤',t.personal],['w','💼',t.work]]);await bot(S.topic==='p'?t.pr:t.wr)},
async msg(){S.msg=await ask(T().msgPh,1);me(S.msg)},
async extra(){const t=T();await bot(S.topic==='p'?t.xp:t.xw);for(;;){if(await pick([['a','✍️',t.addB],['n','✅',t.nextB]])!=='a')break;const x=await ask(t.msgPh,1);me(x);S.msg+='\n'+x;await bot(t.more)}},
async files(){const t=T();await bot(t.attachQ);S.files=[];if(await pick([['y','📎',t.attach],['n','✅',t.skip]])==='y'){S.files=await files();me(S.files.length?'📎 '+S.files.length:t.skip)}},
async contact(){const t=T();await bot(t.contactQ);S.contact=await pick([['m','💬',t.msgs],['c','📞',t.call],['v','🤝',t.meet]]);if(!need(S.contact))S.when=''},
async when(){await bot(S.contact==='c'?T().w1:T().w2);S.when=await when();me(S.when)},
async phone(){await bot(T().phoneQ);S.phone=await phone();me(S.phone)},
async review(){
 const t=T(),l=t.lbl,tp=S.topic==='p'?t.personal:t.work,ct={m:t.msgs,c:t.call,v:t.meet}[S.contact];
 const rows=[[l[0],S.name],[l[1],tp],[l[2],S.msg],S.files.length&&[l[3],S.files.length],[l[4],ct],S.when&&[l[5],S.when],[l[6],S.phone]].filter(Boolean);
 await bot(t.rv);const d=mk('div','cb-m cb-bot');d.textContent=rows.map(x=>x[0]+': '+x[1]).join('\n');el.b.append(d);down();
 if(await pick([['s','✅',t.send],['e','✏️',t.edit]])==='e'){
  await bot(t.editQ);const f=await pick([['name','👤',t.fName],['msg','💬',t.fMsg],['contact','📞',t.fContact],['phone','☎️',t.fPhone]]);
  S.edit=1;return steps.indexOf(f)}
 for(;;){
  ctl(mk('div','cb-wait',t.sending));
  try{if(Date.now()-(+localStorage.getItem('cbLast')||0)<6e4)throw'wait';await send();break}
  catch(e){await bot(e==='wait'?t.wait:t.err+(DEBUG?' ['+(e&&e.message||e)+']':''));await choose([['r','🔄',t.retry]])}}
 ctl();await bot(t.done);const h=new Date().getHours();
 await bot(h>=19||h<5?t.night:h<13?t.morn:t.aft);
 await choose([['n','✉️',t.again]]);begin();return steps.length}
};

async function send(){
 const u=API+'/',j=async r=>{const x=await r.json().catch(()=>({}));if(!x.ok)throw r.status+' '+(x.description||'')};
 if(!S.sent){
  const txt=['📩 <b>رسالة جديدة من الموقع</b>','👤 الاسم: '+esc(S.name),'📌 الموضوع: '+(S.topic==='p'?'شخصي':'بخصوص العمل'),'💬 الرسالة: '+esc(S.msg),
  '📞 التواصل المفضل: '+{m:'رسائل',c:'اتصال هاتفي',v:'مقابلة شخصية'}[S.contact],S.when&&'🗓 الموعد المناسب: '+esc(S.when),'☎️ الهاتف: '+esc(S.phone),
  '🌐 لغة الزائر: '+{ar:'عربي',en:'English',ur:'اردو'}[lang],'🕐 وقت الزائر: '+new Date().toLocaleString('ar-AE')+' ('+Intl.DateTimeFormat().resolvedOptions().timeZone+')',
  S.files.length&&'📎 مرفقات: '+S.files.length].filter(Boolean).join('\n');
  await j(await fetch(u+'sendMessage',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({text:txt})}));
  S.sent=1}
 while(S.files.length){const fd=new FormData();fd.append('document',S.files[0]);fd.append('caption',S.name);
  await j(await fetch(u+'sendDocument',{method:'POST',body:fd}));S.files.shift()}
 try{localStorage.setItem('cbLast',Date.now())}catch(e){}
}

async function run(i){
 while(i<steps.length){
  const s=steps[i],j=await H[s]();
  if(typeof j==='number'){i=j;continue}
  let n=i+1;
  if(s==='contact'&&!need(S.contact))n=i+2;
  if(S.edit&&!(s==='contact'&&need(S.contact))){S.edit=0;n=steps.length-1}
  i=n}
}

function begin(){
 lang=document.documentElement.lang in L?document.documentElement.lang:'en';
 S={files:[]};
 el.r.lang=lang;el.r.dir=lang==='en'?'ltr':'rtl';
 el.t.textContent=T().title;el.s.textContent=T().sub;
 el.b.replaceChildren();el.k=null;run(0)
}
function fit(){
 if(!el||!el.r.classList.contains('open'))return;
 const v=window.visualViewport;
 if(!v||innerWidth>=768){el.r.style.top=el.r.style.height=el.r.style.bottom='';return}
 el.r.style.top=(v.offsetTop+10)+'px';el.r.style.height=(v.height-20)+'px';el.r.style.bottom='auto';down()
}
function build(){
 const r=mk('div','cb-root','<div class="cb-h"><div class="cb-av"><img src="assets/images/assistant.jpg" alt="" onerror="this.style.display=\'none\'"></div><div><b></b><small></small></div><button class="cb-x" aria-label="Close">✕</button></div><div class="cb-b"></div>');
 document.body.append(r);
 el={r,b:r.querySelector('.cb-b'),k:null,t:r.querySelector('b'),s:r.querySelector('small')};
 r.querySelector('.cb-x').onclick=()=>{r.classList.remove('open');document.documentElement.style.overflow=''};
 r.addEventListener('focusin',()=>setTimeout(down,350));
 if(window.visualViewport){visualViewport.addEventListener('resize',fit);visualViewport.addEventListener('scroll',fit)}
 begin()
}
window.openChat=()=>{
 const h=document.getElementById('chatHint');if(h)h.classList.add('hide');
 if(!el)build();
 el.r.classList.add('open');document.documentElement.style.overflow='hidden';fit();down()
};
// لو الزائر غيّر اللغة قبل ما يكتب اسمه، الشات يبدأ من جديد بلغته
window.addEventListener('langchange',()=>{if(el&&S&&!S.name)begin()});
})();
