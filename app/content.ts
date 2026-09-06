export const cases = [
  {
    id: 'cai',
    name: 'CAI / CAIBench',
    category: 'Investigación abierta',
    period: '2025—2026',
    title: 'Construir es importante. Saber medir, también.',
    intro:
      'Una infraestructura abierta de IA para ciberseguridad y una pregunta que la acompaña: ¿cómo sabemos qué es capaz de hacer?',
    role: 'Coautor · Investigación en equipo en Alias Robotics',
    chapters: [
      {
        label: '01 / La pregunta',
        title: 'Del sistema a la evidencia',
        text: 'CAI reúne modelos, herramientas y supervisión para investigar el uso de IA en ciberseguridad. Construir el marco abre otra pregunta: cómo comparar capacidades sin confundir una buena respuesta con la resolución de una tarea completa.',
      },
      {
        label: '02 / El trabajo compartido',
        title: 'Una línea de investigación, varias perspectivas',
        text: 'En Alias Robotics trabajé en CAI y soy coautor de siete papers de esta línea. El trabajo fue creciendo desde el sistema hacia nuevas preguntas: cómo formar a quienes lo utilizan, cómo evaluarlo y qué cambia al introducir estrategia. CAIBench organiza evaluaciones de habilidades aisladas y tareas integradas.',
      },
      {
        label: '03 / Lo que me interesa',
        title: 'Leer, implementar, contrastar',
        text: 'La investigación se alimentó de papers, implementaciones y experimentos en equipo. Los trabajos sobre competiciones documentan lo que el sistema consiguió en esos escenarios; el estudio de Dragos OT CTF 2025, por ejemplo, recoge 32 de 34 retos resueltos y un sexto puesto final del equipo.',
      },
    ],
    links: [
      {
        label: 'CAI · paper original',
        url: 'https://arxiv.org/abs/2504.06017',
      },
      {
        label: 'CAIBench · evaluación',
        url: 'https://arxiv.org/abs/2510.24317',
      },
      {
        label: 'CAI en Dragos OT CTF · resultados del equipo',
        url: 'https://arxiv.org/abs/2511.05119',
      },
    ],
  },
  {
    id: '0dai',
    name: '0dAI',
    category: 'Machine learning · Modelos abiertos',
    period: '2023—2024',
    title: 'Del fine-tuning a los pesos abiertos. Del modelo al producto.',
    intro:
      'Fui cofundador y CTO de 0dAI y soy autor de sus modelos abiertos: trabajo con Mistral y Mixtral, variantes cuantizadas y publicaciones en Hugging Face como luijait.',
    role: 'Cofundador y CTO · Autor de los modelos abiertos de 0dAI',
    chapters: [
      {
        label: '01 / El comienzo',
        title: 'La idea aparece trabajando',
        text: 'El origen de 0dAI está en una necesidad práctica de seguridad en Omega AI. Con Omega, las conversaciones sobre modelos y las primeras pruebas dieron forma a una propuesta. La iniciativa creció mediante trabajo compartido, con recursos e infraestructura que ya formaban parte de ese entorno.',
      },
      {
        label: '02 / Mi aportación',
        title: 'Construir los modelos y dirigir la parte técnica',
        text: 'Soy autor de los modelos abiertos publicados por 0dAI como luijait: 0dAI-7B, la familia 7.5B-v2 con variantes cuantizadas a 4 y 8 bpw, y 0dAI-8x7b-0761. El trabajo parte de Mistral y Mixtral e incluye fine-tuning, iteración con DPO y cuantización. Las fichas reconocen la infraestructura de Omega AI, y el historial público documenta mis publicaciones. Como cofundador y CTO también trabajé en la dirección técnica y en Zerodapi.',
      },
      {
        label: '03 / Después del prototipo',
        title: 'Cuando llegan los usuarios',
        text: 'Los usuarios cambiaron las prioridades. Su feedback nos llevó a ajustar las respuestas y la experiencia, y a revisar qué esperaban realmente de la herramienta. Aprendí que hacer funcionar un prototipo era solo el principio del trabajo de producto.',
      },
    ],
    links: [
      {
        label: 'Mis modelos abiertos en Hugging Face',
        url: 'https://huggingface.co/0dAI',
      },
      {
        label: 'El origen, contado con Omega',
        url: 'https://www.elladodelmal.com/2024/03/0dai-un-modelo-ai-llm-para-hacer.html',
      },
      {
        label: 'Zerodapi · contribución',
        url: 'https://github.com/0dAI-ML/Zerodapi',
      },
      {
        label: 'Conversación sobre producto',
        url: 'https://www.youtube.com/watch?v=Ng7mfEv2o0g&t=60s',
      },
    ],
  },
  {
    id: 'noscope',
    name: 'TryHackMe / NoScope',
    category: 'La etapa actual',
    period: 'Ahora',
    title: 'Tecnología que llega a quienes la utilizan.',
    intro:
      'Ahora trabajo en TryHackMe, como AI engineer en el equipo de NoScope. Investigo y desarrollo inteligencia artificial aplicada a ciberseguridad.',
    role: 'AI engineer · TryHackMe / NoScope',
    chapters: [
      {
        label: '01 / Volver desde otro lugar',
        title: 'Antes resolvía sus máquinas. Hoy trabajo aquí.',
        text: 'Antes de dedicarme a la IA pasé cientos de máquinas de TryHackMe y otras plataformas. Eran una forma de aprender, equivocarme y volver a intentarlo. No imaginaba que un día acabaría trabajando en una de ellas. Hoy contribuyo desde el equipo de NoScope a construir la tecnología que otras personas van a utilizar.',
      },
      {
        label: '02 / Qué estamos construyendo',
        title: 'IA para evaluar y mejorar la seguridad',
        text: 'NoScope desarrolla un producto de pentesting totalmente autónomo y continuo, basado en agentes de IA. Formo parte del equipo de ingeniería de IA, en el punto donde investigación, desarrollo y producto se encuentran.',
      },
      {
        label: '03 / Lo que me mueve',
        title: 'Que la tecnología llegue a más equipos',
        text: 'Me interesa que esta tecnología sea útil también para organizaciones que no tienen los recursos de una gran empresa. Es una de las ideas que comenté en La Jaula en 2026: pensar en quién utiliza lo que construimos, cómo accede a ello y qué valor le aporta.',
      },
      {
        label: '04 / Del trabajo al aprendizaje',
        title: 'También se convierte en una room',
        text: 'En julio de 2026 compartí cómo un hallazgo de nuestro agente había dado lugar a una room de TryHackMe. Una forma de conectar el trabajo del equipo con una experiencia en la que otras personas pueden aprender.',
      },
    ],
    links: [
      {
        label: 'NoScope · el producto',
        url: 'https://www.noscope.com/',
      },
      {
        label: 'Mi equipo en NoScope',
        url: 'https://www.noscope.com/company',
      },
      {
        label: 'La room, en mi publicación de julio',
        url: 'https://x.com/luijait_/status/2072273529920201076',
      },
      {
        label: 'Mi etapa actual en La Jaula · agosto de 2026',
        url: 'https://www.youtube.com/watch?v=dEaqt29m0Gs&t=80s',
      },
    ],
  },
  {
    id: 'blurtain',
    name: 'Blurtain',
    category: 'Una utilidad cotidiana',
    period: '2026',
    title: 'Compartir pantalla. Elegir qué se ve.',
    intro:
      'Una pequeña aplicación de macOS nacida de una molestia muy concreta: mostrar tu trabajo sin dejar todo lo demás a la vista.',
    role: 'Proyecto personal · macOS',
    chapters: [
      {
        label: '01 / La molestia',
        title: 'No todo tiene que salir en pantalla',
        text: 'Compartes pantalla en una llamada o publicas una foto del escritorio y se cuela algo que no querías enseñar. Me pasaba con la terminal, rutas de trabajo o conversaciones abiertas. Blurtain nace para poder ocultar esas zonas sin dejar de mostrar lo que importa.',
      },
      {
        label: '02 / La escala',
        title: 'Una idea que merecía una aplicación',
        text: 'La publiqué en septiembre de 2026. Es una aplicación para macOS y un ejemplo de las herramientas que hago por mi cuenta: algo me molesta, pruebo una solución y la convierto en una pieza que puedo usar y compartir.',
      },
      {
        label: '03 / El proyecto',
        title: 'El código, abierto',
        text: 'El código y las instrucciones están en GitHub. La demostración de esta página ilustra la idea de ocultar un detalle; el proyecto real funciona sobre el escritorio de macOS.',
      },
    ],
    links: [
      {
        label: 'Explorar Blurtain',
        url: 'https://github.com/luijait/blurtain',
      },
      {
        label: 'La presentación del proyecto',
        url: 'https://x.com/luijait_/status/2094804159295787451',
      },
    ],
  },
];

export const chapters = [
  {
    era: '2012—2020',
    title: 'Del PC de mi hermana a una libreta llena de C.',
    paragraphs: [
      'Soy de Villanueva del Arzobispo, Jaén. Quería hacer videojuegos y entender cómo una pequeña pantalla podía contener un mundo. Una de mis primeras obsesiones fue conseguir monedas ilimitadas en los juegos de Facebook: llegué a arrancar Windows desde un USB en el PC de mi hermana, intentando sortear las restricciones de permisos para instalar Cheat Engine.',
      'Aquello abrió muchas más preguntas. Empecé a obsesionarme con Linux, a instalar máquinas virtuales y a descubrir qué hacía cada componente del ordenador. Ya no bastaba con que algo funcionara: quería saber por qué.',
      'En la ESO me llevaba una libreta a clase para escribir código C a mano. Me pasaba el día deseando llegar a casa y compilarlo por la tarde. Antes de los modelos y los agentes, había una libreta y muchas ganas de probar lo que había escrito.',
    ],
    source: 'Recuerdo personal',
    url: null,
  },
  {
    era: '2019—2021',
    title: 'Aprender por mi cuenta. Aprender con otros.',
    paragraphs: [
      'Mi formación en Sistemas Microinformáticos y Redes, en IES Sierra de las Villas, dio una base a la curiosidad. Sistemas, redes y programación fueron entrando en la misma conversación. Los cursos de Cisco Networking Academy, Python y Linux documentan parte de ese recorrido.',
      'En 2021 participé en Andalucía Skills, en administración de sistemas en red. El aprendizaje también sucedía fuera de clase: buscando documentación, preparando resúmenes y conversando con gente que estaba intentando comprender cosas parecidas.',
    ],
    source: 'Participación en Andalucía Skills',
    url: 'https://www.juntadeandalucia.es/educacion/portals/web/formacion-profesional-andaluza/skills2020-2021/retransmisiones/-/contenidos/detalle/andaluciaskills-20-21-retransmisiones-39-ti-administracion-de-sistemas-en-red-dia-16jpohy44xvhz',
  },
  {
    era: 'Antes de la IA',
    title: 'De las máquinas al código que había dentro.',
    paragraphs: [
      'Antes de dedicarme a la IA hice cientos de máquinas en TryHackMe y otras plataformas. Cada una era una excusa para investigar, atascarme, leer y volver a probar. Aprendía tanto de lo que no funcionaba como de lo que conseguía resolver.',
      'Utilicé Kali Linux, Gentoo y Qubes OS. Me encantaba trastear con Metasploit, pero no me bastaba con ejecutar herramientas: quería leer su código y entender qué hacían. Esa forma de aprender, mirando por dentro, llegó antes que los modelos y los agentes.',
      'En 2021 anuncié un grupo para compartir documentación, cursos y ayuda con proyectos; también clases de programación en Twitch. Enseñar convivía con mi propio aprendizaje. Ese verano publiqué mi web personal en GitHub.',
      'Después llegaron herramientas y experimentos con sistemas y distintos lenguajes, entre ellos GONET Scanner en Go. La publicación y el intercambio técnico ya estaban ahí antes de 0dAI: dejar una pieza accesible también permite que alguien la utilice, la cuestione y te enseñe algo.',
    ],
    source: 'El anuncio de las clases, en 2021',
    url: 'https://web.archive.org/web/20210524221444/https://twitter.com/luijait_asm/status/1396952581767839752',
  },
  {
    era: '2023—2024',
    title: 'Cuando una pregunta se convierte en un producto.',
    paragraphs: [
      'En Omega AI, una necesidad práctica de seguridad abrió el camino a 0dAI. Con Omega y el equipo pasamos de hablar sobre una idea a construir un prototipo y un servicio. Fui cofundador y CTO, además de participar en su desarrollo.',
      'También soy autor de los modelos abiertos de 0dAI publicados en Hugging Face como luijait: fine-tuning sobre Mistral y Mixtral, iteración con DPO y variantes cuantizadas. Esa parte de machine learning fue tan central como la experiencia de producto. Los usuarios cambiaron prioridades y trajeron decisiones sobre infraestructura, modelos y experiencia. Esa etapa me dio muchas preguntas sobre lo que significa llevar una tecnología a un uso real.',
    ],
    source: 'El origen de 0dAI, contado con Omega',
    url: 'https://www.elladodelmal.com/2024/03/0dai-un-modelo-ai-llm-para-hacer.html',
  },
  {
    era: 'Investigación · 2025—2026',
    title: 'Un equipo con el que seguir profundizando.',
    paragraphs: [
      'Mi paso por Alias Robotics me permitió continuar la combinación de inteligencia artificial y ciberseguridad con un equipo de investigación. Las conversaciones con Víctor y con otras personas del equipo forman parte de esa transición.',
      'CAI abrió una línea que después se extendió hacia formación, evaluación, escenarios especializados y estrategia. Soy coautor de siete trabajos publicados en arXiv entre abril de 2025 y enero de 2026. Leer, implementar y contrastar ideas fue parte central del método.',
    ],
    source: 'El equipo y el método, en xHubAI',
    url: 'https://www.youtube.com/watch?v=KDZXVnKsLnM&t=614s',
  },
  {
    era: 'A lo largo del camino',
    title: 'Compartir lo que voy entendiendo.',
    paragraphs: [
      'Las charlas y la escritura han acompañado al trabajo técnico: HACKÉN, AiBirras, Morteruelo, el artículo sobre CAI en Deep Hacking y una sesión con estudiantes de IES Virgen del Carmen en mayo de 2025. Cambia el público y cambia la manera de explicar.',
      'También participo en el Expert Board de BLISS. Me interesa que el conocimiento circule entre investigación, construcción y aprendizaje: una explicación obliga a ordenar lo que sabes y a reconocer lo que todavía estás intentando comprender.',
    ],
    source: 'La sesión en IES Virgen del Carmen',
    url: 'https://www.iesvirgendelcarmen.com/charla-pentesting-curso-de-especializacion-en-ciberseguridad-y-asir/',
  },
  {
    era: 'Ahora · 2026',
    title: 'La historia sigue abierta.',
    paragraphs: [
      'Hoy trabajo en TryHackMe, como AI engineer en el equipo de NoScope. Una de las plataformas en las que antes resolvía máquinas se ha convertido en el lugar donde trabajo. Quién me lo iba a decir cuando pasaba horas intentando entender el siguiente reto.',
      'Sigo investigando y desarrollando IA aplicada a ciberseguridad. Ahora pienso también en quién utiliza esa tecnología, cómo llega a sus manos y qué hace posible para su equipo. Conozco esa curiosidad desde el otro lado de la pantalla.',
      'Fuera de ese trabajo siguen apareciendo ideas: Blurtain para macOS, experimentos con modelos y un MOBA de fin de semana en Unity. A veces una pregunta necesita un paper. Otras veces, simplemente hay que ponerse a construir.',
    ],
    source: 'La etapa actual, en La Jaula',
    url: 'https://www.youtube.com/watch?v=dEaqt29m0Gs&t=80s',
  },
];

export const papers = [
  {
    id: '2504.06017',
    date: '08.04.2025',
    short: 'CAI',
    question:
      '¿Cómo construir una infraestructura abierta de IA para ciberseguridad?',
    title: 'CAI: An Open, Bug Bounty-Ready Cybersecurity AI',
    description:
      'El marco de código abierto con el que empieza esta línea: modelos, herramientas y supervisión reunidos para investigar IA aplicada a ciberseguridad. El paper presenta su diseño y los resultados de sus evaluaciones.',
    tag: 'Construir',
  },
  {
    id: '2508.13588',
    date: '19.08.2025',
    short: 'CAI Fluency',
    question:
      '¿Qué necesita entender una persona para utilizar estas herramientas?',
    title: 'CAI Fluency: A Framework for Cybersecurity AI Fluency',
    description:
      'Una perspectiva educativa sobre juicio, transparencia y comprensión, que adapta el marco de AI Fluency al dominio de la ciberseguridad. Revisado en octubre de 2025.',
    tag: 'Aprender',
  },
  {
    id: '2510.24317',
    date: '28.10.2025',
    short: 'CAIBench',
    question: '¿Cómo distinguir conocimiento y capacidad para resolver tareas?',
    title:
      'Cybersecurity AI Benchmark (CAIBench): A Meta-Benchmark for Evaluating Cybersecurity AI Agents',
    description:
      'Un metabenchmark para evaluar agentes de ciberseguridad. Separa habilidades aisladas de tareas integradas y estudia cómo influyen tanto el modelo como el marco de agentes en los resultados.',
    tag: 'Medir',
  },
  {
    id: '2511.05119',
    date: '07.11.2025',
    short: 'CAI en tecnología operacional',
    question:
      '¿Qué cambia cuando el escenario es una competición especializada?',
    title:
      'Cybersecurity AI in OT: Insights from an AI Top-10 Ranker in the Dragos OT CTF 2025',
    description:
      'El estudio de la participación del equipo en Dragos OT CTF 2025: 32 retos resueltos de 34 y sexto puesto final. Analiza el desempeño de CAI en este escenario de tecnología operacional.',
    tag: 'Contrastar',
  },
  {
    id: '2512.02654',
    date: '02.12.2025',
    short: 'Aprendizajes de las competiciones',
    question: '¿Qué se aprende al contrastar el sistema en distintos eventos?',
    title:
      'Cybersecurity AI: The World’s Top AI Agent for Security Capture-the-Flag (CTF)',
    description:
      'Una síntesis de la participación de CAI en distintos eventos CTF. Reúne los resultados del equipo y los aprendizajes al evaluar el sistema en varios contextos de competición.',
    tag: 'Comparar',
  },
  {
    id: '2601.05887',
    date: '09.01.2026',
    short: 'Una perspectiva de teoría de juegos',
    question: '¿Cómo incorporar estrategia a las decisiones de un agente?',
    title:
      'Cybersecurity AI: A Game-Theoretic AI for Guiding Attack and Defense',
    description:
      'Explora una perspectiva de teoría de juegos para razonar sobre decisiones estratégicas en ciberseguridad. Amplía la línea hacia la relación entre objetivos, decisiones y contexto.',
    tag: 'Razonar',
  },
  {
    id: '2601.14614',
    date: '21.01.2026',
    short: 'Hacia dónde podría evolucionar',
    question: '¿Qué papel deberían tener el criterio y la supervisión humana?',
    title:
      'Towards Cybersecurity Superintelligence: from AI-guided humans to human-guided AI',
    description:
      'Una visión de evolución de la IA aplicada a ciberseguridad. Una propuesta de dirección de investigación debe leerse como tal, con sus hipótesis y condiciones.',
    tag: 'Explorar',
  },
];

export const media = [
  {
    id: 'dEaqt29m0Gs',
    date: '12.08.2026',
    show: 'La Jaula del N00b',
    topic: 'Tecnología, equipos y valor de producto',
    duration: '1 h 13 min',
    start: 80,
  },
  {
    id: 'KD2_xzIOkWg',
    date: '16.10.2025',
    show: 'La Jaula del N00b',
    topic: 'CAI: la investigación y el trabajo colectivo',
    duration: '1 h 05 min',
    start: 0,
  },
  {
    id: 'KDZXVnKsLnM',
    date: '22.08.2025',
    show: 'xHubAI · Cyberseguridad.AI',
    topic: 'Leer, implementar y seguir aprendiendo',
    duration: '2 h 11 min',
    start: 614,
  },
  {
    id: 'Ng7mfEv2o0g',
    date: '11.07.2024',
    show: 'La Jaula del N00b',
    topic: '0dAI: lo que cambia cuando llegan los usuarios',
    duration: '49 min',
    start: 60,
  },
  {
    id: 'OqojlSRfZek',
    date: '06.06.2024',
    show: 'La Regla Dorada #33',
    topic: 'Aprendizaje, IA y cómo nació 0dAI',
    duration: '1 h 30 min',
    start: 4884,
  },
  {
    id: 'syFP3M1y_XE',
    date: '23.04.2024',
    show: 'Café & Pizza #21',
    topic: 'La curiosidad que estaba antes de todo esto',
    duration: '1 h 04 min',
    start: 157,
  },
  {
    id: '4gQ3pW752EY',
    date: 'Mayo 2024',
    show: 'HACKÉN',
    topic: 'El presente y el futuro de la IA en ciberseguridad',
    duration: '43 min',
    start: 0,
    note: 'Evento del 17–18 de mayo; vídeo publicado el 1 de septiembre.',
  },
  {
    id: 'm_r8XxgTKkE',
    date: '21.03.2024',
    show: 'xHubAI · DEVS',
    topic: 'Programación, abstracción y agentes',
    duration: '1 h 58 min',
    start: 0,
  },
  {
    id: 'UZnmA3ekuns',
    date: '29.11.2023',
    show: 'xHubAI',
    topic: 'Poder y seguridad en inteligencia artificial',
    duration: '2 h 49 min',
    start: 0,
  },
  {
    id: 'aDYTheB_ejs',
    date: '05.11.2023',
    show: 'La Jaula del N00b',
    topic: 'El camino hacia la IA y la ciberseguridad',
    duration: '1 h 19 min',
    start: 0,
  },
];

export const courses = [
  {
    title: 'CCNA Routing and Switching: Introducción a redes',
    issuer: 'Cisco Networking Academy',
    date: '16.06.2020',
    url: 'https://drive.google.com/file/d/1heAFezehvhkMy99apeq2khsHkeK4Ls7h/view?usp=sharing',
  },
  {
    title: 'CCNAv7: Switching, Routing and Wireless Essentials',
    issuer: 'Cisco Networking Academy',
    date: '17.03.2021',
    url: 'https://drive.google.com/file/d/1gWL0rZCVViGrk1h5wrjPgdUTYN10yjgf/view?usp=sharing',
  },
  {
    title: 'Introducción a la Auditoría de Sistemas de control industrial',
    issuer: 'OpenWebinars',
    date: '10.05.2021',
    url: 'https://openwebinars.net/cert/QDnk9',
  },
  {
    title: 'PCAP: Programming Essentials in Python',
    issuer: 'OpenEDG / Cisco Networking Academy',
    date: '29.07.2021',
    url: 'https://drive.google.com/file/d/1B9xt22u9AV5X_fucUvSiOzpqggNWl3B9/view?usp=sharing',
  },
  {
    title: 'Introducción a la Seguridad Cibernética',
    issuer: 'Cisco Networking Academy',
    date: '29.07.2021',
    url: 'https://drive.google.com/file/d/1TPPZc_78HSaekDuEpwqryvktqd4xLxYl/view?usp=sharing',
  },
  {
    title: 'Cybersecurity Essentials',
    issuer: 'Cisco Networking Academy',
    date: '03.08.2021',
    url: 'https://drive.google.com/file/d/1qSyhGZJLgvAGhNy1wpSlPPUSf2WAaTj1/view?usp=sharing',
  },
  {
    title: 'NDG Linux Unhatched',
    issuer: 'NDG / Cisco Networking Academy',
    date: '03.08.2021',
    url: 'https://drive.google.com/file/d/1rejV_2MVhAKGX8J4BWmgFRcaPY55MXvW/view?usp=sharing',
  },
  {
    title: 'CCNA: Enterprise Networking, Security, and Automation',
    issuer: 'Cisco · credencial de estudiante',
    date: 'Sin fecha recuperada',
    url: 'https://www.credly.com/badges/23947a85-7d1c-4dc3-a667-130ee5679e44',
  },
];

export const experiments = [
  {
    name: 'Animal Planet Rift',
    kind: 'Unity · Experimento, 2026',
    text: 'Un MOBA en Unity, en honor a los junglas que me tocan en soloQ. Un proyecto de finde.',
    url: 'https://x.com/luijait_/status/2096313693541650852',
  },
  {
    name: 'LLM From Scratch',
    kind: 'Fundamentos · Aprendizaje',
    text: 'Implementar para entender qué ocurre dentro de un modelo de lenguaje.',
    url: 'https://github.com/luijait/LLM_From_Scratch',
  },
  {
    name: 'LunarLander · PPO',
    kind: 'Aprendizaje por refuerzo · 2025',
    text: 'Un agente entrenado para aterrizar. Recompensas, decisiones y aprendizaje con Stable Baselines3.',
    url: 'https://huggingface.co/luijait/ppo-LunarLander-v2',
  },
  {
    name: 'Space Invaders · DQN',
    kind: 'Agentes que juegan · 2025',
    text: 'Entrenar un agente de Atari durante un millón de pasos. Un experimento del curso Deep RL de Hugging Face.',
    url: 'https://huggingface.co/luijait/dqn-SpaceInvadersNoFrameskip-v4',
  },
  {
    name: 'GONET Scanner',
    kind: 'Go · Redes',
    text: 'Mi etapa de redes, escrita en Go: descubrimiento de equipos y un parser propio para explorar cómo se comunican los sistemas.',
    url: 'https://github.com/luijait/GONET-Scanner',
  },
];

export const writings = [
  {
    title: 'CAI: IA aplicada a ciberseguridad',
    publisher: 'Deep Hacking',
    date: 'Mayo 2025',
    url: 'https://blog.deephacking.tech/es/posts/cai-ia-ciberseguridad/',
  },
  {
    title: 'Cuantiza la IA: de tu GPU a tu bolsillo',
    publisher: 'LinkedIn',
    date: 'Agosto 2024',
    url: 'https://www.linkedin.com/pulse/cuantiza-la-ia-de-gpu-tu-bolsillo-gguf-y-exl2-luis-javier-navarrete-v42nf',
  },
  {
    title: '¿Devin puede hackear y resolver CTFs?',
    publisher: 'LinkedIn',
    date: 'Agosto 2024',
    url: 'https://es.linkedin.com/pulse/devin-puede-hackear-y-resolver-ctfs-luis-javier-navarrete-op5cf',
  },
];
