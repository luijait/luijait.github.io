"use client";

import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import { ArrowDown, ArrowUpRight, ArrowRight, Plus, X, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetClose } from '@/components/ui/sheet';
import { cases, chapters, papers, media, courses, experiments, writings } from './content';

const LETTERS = Array.from('entender.');
const orderedMedia = [...media].sort((a,b)=>{
  const date=(x:typeof a)=>x.id==='4gQ3pW752EY' ? '20240518' : x.date.split('.').reverse().join('');
  return date(b).localeCompare(date(a));
});

function OutLink({href,children,className=''}:{href:string;children:ReactNode;className?:string}) {
  return <a className={className} href={href} target="_blank" rel="noopener noreferrer">{children}<ArrowUpRight size={16} aria-hidden="true"/></a>;
}
function SectionLabel({number,title,note}:{number:string;title:string;note:string}) {
  return <div className="section-label"><span>{number} / {title}</span><span>{note}</span></div>;
}

export default function Home() {
  const [encoded,setEncoded]=useState(false);
  const [inspecting,setInspecting]=useState(false);
  const [selectedCase,setSelectedCase]=useState(cases[0]);
  const [caseOpen,setCaseOpen]=useState(false);
  const [activeChapter,setActiveChapter]=useState(0);
  const openCase=(id:string)=>{setSelectedCase(cases.find(item=>item.id===id)||cases[0]);setCaseOpen(true);};

  useEffect(()=>{
    const storyObserver=new IntersectionObserver(entries=>{
      for(const entry of entries) if(entry.isIntersecting) setActiveChapter(Number((entry.target as HTMLElement).dataset.storyChapter));
    },{rootMargin:'-15% 0px -55% 0px',threshold:0});
    document.querySelectorAll('[data-story-chapter]').forEach(el=>storyObserver.observe(el));
    let revealObserver:IntersectionObserver|undefined;
    if(!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
      document.documentElement.classList.add('motion-ready');
      revealObserver=new IntersectionObserver(entries=>{
        for(const entry of entries) if(entry.isIntersecting){entry.target.classList.add('is-visible');revealObserver?.unobserve(entry.target);}
      },{threshold:0.08});
      document.querySelectorAll('[data-reveal]').forEach(el=>revealObserver?.observe(el));
    }
    let raf=0;
    const updateProgress=()=>{
      cancelAnimationFrame(raf);
      raf=requestAnimationFrame(()=>{
        const length=document.documentElement.scrollHeight-window.innerHeight;
        document.documentElement.style.setProperty('--reading-progress',String(length>0 ? Math.min(1,Math.max(0,window.scrollY/length)) : 0));
      });
    };
    window.addEventListener('scroll',updateProgress,{passive:true});
    window.addEventListener('resize',updateProgress);
    updateProgress();
    return ()=>{storyObserver.disconnect();revealObserver?.disconnect();document.documentElement.classList.remove('motion-ready');cancelAnimationFrame(raf);window.removeEventListener('scroll',updateProgress);window.removeEventListener('resize',updateProgress);};
  },[]);

  return <>
    <div className="reading-progress" aria-hidden="true"/>
    <a className="skip-link" href="#contenido">Saltar al contenido</a>
    <header className="site-header wrap">
      <Button variant="ghost" className={`wordmark ${encoded?'wordmark-encoded':''}`} onClick={()=>setEncoded(!encoded)} aria-label={encoded?'Mostrar el alias luijait':'Mostrar luijait en hexadecimal'} aria-pressed={encoded}>{encoded?'0x6c75696a616974':<>luijait<span>_</span></>}</Button>
      <nav aria-label="Principal"><a href="#trabajo">Trabajo</a><a href="#historia">Mi historia</a><a href="#investigacion">Papers</a><a href="#conversaciones">Conversaciones</a><a href="#contacto">Hablemos <ArrowUpRight size={15}/></a></nav>
    </header>
    <main id="contenido">
      <section className="hero wrap" aria-labelledby="hero-title">
        <div className="hero-meta"><span className="eyebrow">Luis Javier Navarrete Lozano</span><span className="eyebrow status"><i/> Actualmente en TryHackMe</span></div>
        <h1 id="hero-title" aria-label="Hace falta entender.">Hace falta<br/><em className={`word-inspection ${inspecting?'is-inspecting':''}`} aria-hidden="true">{LETTERS.map((letter,index)=><span className={`letter letter-${letter==='.'?'dot':letter}`} key={index} style={{'--letter-index':index} as CSSProperties}><span className="letter-main">{letter}</span><span className="letter-code">{letter.charCodeAt(0).toString(16)}</span></span>)}</em><span className="hero-mark" aria-hidden="true">↳</span></h1>
        <div className="hero-control"><Button variant="ghost" className="inspection-toggle" onClick={()=>setInspecting(!inspecting)} aria-pressed={inspecting}><span aria-hidden="true">[{inspecting?'−':'+'}]</span>{inspecting?'Volver a las letras':'Ver lo que hay dentro'}</Button><span className="encoding-note" aria-live="polite">{inspecting?'entender. → bytes en hexadecimal':'Una misma cosa. Otra forma de mirarla.'}</span></div>
        <div className="hero-bottom"><div className="hero-intro"><p>Soy Luija. Investigo inteligencia artificial y ciberseguridad en TryHackMe. Me gusta entender cómo funcionan las cosas y convertir esa curiosidad en algo que se pueda usar.</p><a className="text-link" href="#trabajo">Explorar mi trabajo <ArrowDown size={17}/></a></div><div className="hero-now"><span className="eyebrow">Actualmente</span><p className="current-company"><a href="https://tryhackme.com/" target="_blank" rel="noopener noreferrer">TryHackMe ↗</a></p><span className="current-role">AI engineer · NoScope</span></div><figure className="portrait"><img src="/luija.png" alt="Luis Javier Navarrete Lozano" width={460} height={460} fetchPriority="high"/><figcaption>Luija, al otro lado de la pantalla.</figcaption></figure></div>
      </section>

      <section id="trabajo" className="section wrap" aria-labelledby="work-title">
        <SectionLabel number="01" title="Trabajo elegido" note="De una pregunta a algo que funciona"/>
        <article className="featured-case" data-reveal>
          <div className="featured-work"><span className="eyebrow">Mi trabajo actual · 2026</span><h2 id="work-title">Ahora, en<br/><em>TryHackMe.</em></h2><p>IA y ciberseguridad con una mirada de producto. Trabajo como AI engineer en NoScope, dentro del entorno de TryHackMe.</p><Button variant="ghost" className="open-case" onClick={()=>openCase('noscope')} aria-label="Conocer mi trabajo actual en TryHackMe y NoScope">Mi etapa actual <Plus size={18}/></Button><span className="work-credit">TryHackMe / NoScope · Tecnología, equipos y producto</span></div>
          <div className="present-spine"><div className="spine-top"><span>TRYHACKME / NOSCOPE</span><span>AHORA</span></div><span className="spine-title" aria-hidden="true">AI<span>↗</span></span><div className="spine-questions"><span>Inteligencia artificial</span><span>Ciberseguridad</span><span>Producto</span></div><OutLink href="https://www.noscope.com/company" className="spine-link">El equipo del que formo parte</OutLink></div>
        </article>
        <div className="project-grid">{cases.filter(item=>item.id!=='noscope').map((item,index)=><article className="project" key={item.id} data-reveal style={{'--reveal-delay':`${index*70}ms`} as CSSProperties}><div className="project-meta"><span>{item.period}</span><span>0{index+2}</span></div><h3>{item.name}</h3><span className="project-category">{item.category}</span><p>{item.intro}</p><Button variant="ghost" className="open-case" onClick={()=>openCase(item.id)} aria-label={`Mirar dentro de ${item.name}`}>Mirar dentro <Plus size={18}/></Button></article>)}</div>
      </section>

      <section id="historia" className="section story-section wrap" aria-labelledby="story-title">
        <SectionLabel number="02" title="Mi historia" note="Origen: Villanueva del Arzobispo, Jaén"/>
        <div className="story-heading" data-reveal><h2 id="story-title">La curiosidad<br/><em>viene de antes.</em></h2><p>No empecé queriendo escribir una biografía.<br/>Empecé queriendo saber qué había dentro.</p></div>
        <div className="story-layout"><aside className="story-index" aria-label="Capítulos de mi historia"><span className="eyebrow">El recorrido</span>{chapters.map((chapter,index)=><a key={chapter.era} href={`#capitulo-${index}`} className={activeChapter===index?'active':''} aria-current={activeChapter===index?'location':undefined}><span className="chapter-dot"/><span>{chapter.era}</span><span className="chapter-number">0{index+1}</span></a>)}<div className="story-index-note">Una historia hecha de personas,<br/>preguntas y cosas por aprender.</div></aside>
          <div className="story-chapters">{chapters.map((chapter,index)=><article className="story-chapter" id={`capitulo-${index}`} data-story-chapter={index} key={chapter.era}><span className="eyebrow chapter-era">0{index+1} / {chapter.era}</span><h3>{chapter.title}</h3>{chapter.paragraphs.map(text=><p key={text}>{text}</p>)}<OutLink href={chapter.url} className="source-link">{chapter.source}</OutLink></article>)}
            <Accordion className="training-accordion"><AccordionItem value="formacion"><AccordionTrigger className="training-trigger"><span>La formación que acompaña el camino<small>Redes, Python, Linux y seguridad</small></span></AccordionTrigger><AccordionContent className="training-content"><p>Cursos y credenciales de estudiante documentados. Los cursos CCNA y Programming Essentials in Python se distinguen de sus correspondientes exámenes profesionales.</p><div className="course-list">{courses.map(course=><OutLink key={course.title} href={course.url} className="course"><span><strong>{course.title}</strong><small>{course.issuer} · {course.date}</small></span></OutLink>)}</div></AccordionContent></AccordionItem></Accordion>
          </div>
        </div>
      </section>

      <section id="investigacion" className="papers-section" aria-labelledby="papers-title"><div className="wrap">
        <SectionLabel number="03" title="Investigación publicada" note="7 preprints · Coautoría · arXiv"/>
        <div className="papers-heading" data-reveal><h2 id="papers-title">Las preguntas<br/><em>también se publican.</em></h2><p>Siete trabajos conectados: del marco inicial a cómo formar, evaluar y pensar con estos sistemas.</p></div>
        <Accordion className="papers-list">{papers.map((paper,index)=><AccordionItem key={paper.id} value={paper.id} className="paper-item"><AccordionTrigger className="paper-trigger"><span className="paper-index">0{index+1}</span><span className="paper-name"><strong>{paper.short}</strong><span>{paper.question}</span></span><span className="paper-date">{paper.date}</span></AccordionTrigger><AccordionContent className="paper-content"><div className="paper-detail"><span className="eyebrow">{paper.tag} · En coautoría</span><h3>{paper.title}</h3><p>{paper.description}</p><OutLink href={`https://arxiv.org/abs/${paper.id}`} className="text-link">Leer el paper en arXiv</OutLink></div></AccordionContent></AccordionItem>)}</Accordion>
        <div className="research-note"><span className="eyebrow">Más allá del preprint</span><p>CAI cuenta también con una versión vinculada al taller AICS 2026, asociado a AAAI. Una misma investigación que continúa la conversación en otros espacios.</p><OutLink href="https://aics.site/" className="source-link">AICS 2026</OutLink></div>
      </div></section>

      <section id="conversaciones" className="section media-section wrap" aria-labelledby="media-title">
        <SectionLabel number="04" title="Conversaciones y charlas" note="2023—2026"/>
        <div className="media-heading" data-reveal><h2 id="media-title">Con tiempo<br/><em>para contarlo.</em></h2><p>El contexto que no cabe en una bio.<br/>Ideas, comienzos, desacuerdos y aprendizajes.</p></div>
        <div className="media-list">{orderedMedia.map((episode,index)=><a key={episode.id} className={`media-row ${index===0?'latest-episode':''}`} href={`https://www.youtube.com/watch?v=${episode.id}${episode.start?'&t='+episode.start+'s':''}`} target="_blank" rel="noopener noreferrer" title={episode.note||`${episode.show} · ${episode.date}`}><span className="media-date">{episode.date}</span><span className="media-copy"><span>{episode.show}{index===0&&<span className="latest-label">Más reciente</span>}</span><strong>{episode.topic}</strong>{episode.note&&<small>{episode.note}</small>}</span><span className="media-duration">{episode.duration}</span><span className="play-link"><Play size={16} aria-hidden="true"/><span className="sr-only">Abrir conversación</span></span></a>)}</div>
        <div className="talks-note"><span className="eyebrow">También nos hemos encontrado en</span><div><OutLink href="https://aibirras.org/events">AiBirras</OutLink><OutLink href="https://github.com/luijait/0dAI-Morteruelo-CON">Morteruelo 2024</OutLink><OutLink href="https://www.iesvirgendelcarmen.com/charla-pentesting-curso-de-especializacion-en-ciberseguridad-y-asir/">IES Virgen del Carmen</OutLink><OutLink href="https://www.gradobliss.com/profesionales/expert-board">Expert Board · BLISS</OutLink></div></div>
      </section>

      <section id="laboratorio" className="section lab-section wrap" aria-labelledby="lab-title">
        <SectionLabel number="05" title="Fuera del guion" note="Ideas de distintas escalas"/>
        <div className="lab-heading" data-reveal><div><h2 id="lab-title">No todo empieza<br/><em>con un paper.</em></h2><p>A veces empieza un fin de semana, con demasiadas pestañas abiertas y ganas de probar una idea.</p></div><span className="lab-aside">EN CONSTRUCCIÓN<br/>POR CURIOSIDAD<br/><span aria-hidden="true">↙</span></span></div>
        <div className="experiment-list">{experiments.map((item,index)=><a key={item.name} href={item.url} target="_blank" rel="noopener noreferrer" className="experiment"><span className="experiment-number">[{String(index+1).padStart(2,'0')}]</span><span className="experiment-name"><strong>{item.name}</strong><small>{item.kind}</small></span><p>{item.text}</p><ArrowUpRight size={20} aria-hidden="true"/></a>)}</div>
        <OutLink href="https://github.com/luijait" className="text-link">Seguir explorando en GitHub</OutLink>
      </section>

      <section id="notas" className="section notes-section wrap" aria-labelledby="notes-title"><SectionLabel number="06" title="Por escrito" note="Explicar también ordena las ideas"/><div className="notes-layout"><h2 id="notes-title">Notas<br/><em>compartidas.</em></h2><div>{writings.map(item=><a className="writing" href={item.url} key={item.title} target="_blank" rel="noopener noreferrer"><span><small>{item.publisher} · {item.date}</small><strong>{item.title}</strong></span><ArrowUpRight size={20}/></a>)}</div></div></section>

      <footer id="contacto" className="contact wrap"><span className="eyebrow">07 / Sigamos la conversación</span><h2>¿Qué estás<br/><em>intentando entender?</em></h2><p className="contact-intro">Si estás investigando algo parecido, construyendo un producto o preparando una conversación interesante, podemos hablar.</p><div className="contact-links"><OutLink href="https://es.linkedin.com/in/luis-javier-navarrete-lozano-9187852b9">LinkedIn</OutLink><OutLink href="https://x.com/luijait_">X / @luijait_</OutLink></div><div className="footer-line"><span>© 2026 Luis Javier Navarrete Lozano</span><a href="https://x.com/luijait_/status/2095907175721734495" target="_blank" rel="noopener noreferrer">Hace falta entender. ↗</a><a href="#">Volver arriba ↑</a></div></footer>
    </main>

    <Sheet open={caseOpen} onOpenChange={setCaseOpen}><SheetContent className="case-sheet" showCloseButton={false}><div className="sheet-top"><span className="eyebrow">Mirar dentro / {selectedCase.period}</span><SheetClose className="close-sheet"><span>Cerrar</span><X size={18}/></SheetClose></div><div className="sheet-scroll"><SheetHeader className="case-header"><span className="eyebrow">{selectedCase.category}</span><SheetTitle className="case-title">{selectedCase.name}</SheetTitle><SheetDescription className="case-description">{selectedCase.intro}</SheetDescription><p className="case-role">{selectedCase.role}</p></SheetHeader><div className="case-chapters">{selectedCase.chapters.map((chapter,index)=><section key={chapter.label} className="case-chapter" style={{'--chapter-delay':`${index*80+100}ms`} as CSSProperties}><span className="eyebrow">{chapter.label}</span><h3>{chapter.title}</h3><p>{chapter.text}</p></section>)}</div><div className="case-sources"><span className="eyebrow">El trabajo y su contexto</span>{selectedCase.links.map(link=><OutLink href={link.url} key={link.url}>{link.label}</OutLink>)}</div><SheetClose className="case-back"><ArrowRight size={16}/> Volver al portfolio</SheetClose></div></SheetContent></Sheet>
  </>;
}
