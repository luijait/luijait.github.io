import * as spanish from './content';

const caseText = [
  {
    category: 'Open research',
    title: 'Building matters. So does knowing how to measure.',
    intro:
      'An open AI framework for cybersecurity, and the question that comes with it: how do we know what it can actually do?',
    role: 'Coauthor · Team research at Alias Robotics',
    chapters: [
      {
        label: '01 / The question',
        title: 'From systems to evidence',
        text: 'CAI brings together models, tools and oversight to study AI in cybersecurity. Building the framework raises another question: how to compare capabilities without mistaking a good answer for the completion of an entire task.',
      },
      {
        label: '02 / Working together',
        title: 'One research direction, several perspectives',
        text: 'At Alias Robotics I worked on CAI and coauthored seven papers in this research line. The work grew from the system into new questions: how to help people use it, how to evaluate it, and what changes when strategy comes into play. CAIBench organizes evaluations of individual skills and integrated tasks.',
      },
      {
        label: '03 / What interests me',
        title: 'Read, implement, test ideas',
        text: 'Papers, implementations and experiments with the team fed the research. The competition studies document what the system achieved in those settings. The Dragos OT CTF 2025 study, for example, reports 32 of 34 challenges solved and a sixth-place finish for the team.',
      },
    ],
    links: [
      'CAI · the original paper',
      'CAIBench · evaluation',
      'CAI at Dragos OT CTF · team results',
    ],
  },
  {
    category: 'Machine learning · Open models',
    title: 'From fine-tuning to open weights. From model to product.',
    intro:
      'I was cofounder and CTO of 0dAI and am the author of its open models: work with Mistral and Mixtral, quantized variants and Hugging Face releases as luijait.',
    role: 'Cofounder and CTO · Author of the open 0dAI models',
    chapters: [
      {
        label: '01 / The beginning',
        title: 'An idea that came from the work',
        text: '0dAI started with a practical security need at Omega AI. Conversations with Omega about models, followed by early experiments, shaped the idea. It grew through shared work, using resources and infrastructure that were already part of that environment.',
      },
      {
        label: '02 / My contribution',
        title: 'Building the models and leading the technical work',
        text: 'I am the author of the open models published by 0dAI as luijait: 0dAI-7B, the 7.5B-v2 family with 4 and 8 bpw variants, and 0dAI-8x7b-0761. Built on Mistral and Mixtral, the work includes fine-tuning, iteration with DPO and quantization. The cards acknowledge Omega AI infrastructure, and the public history documents my releases. As cofounder and CTO, I also worked on technical direction and Zerodapi.',
      },
      {
        label: '03 / Beyond the prototype',
        title: 'When users arrive',
        text: 'Users changed our priorities. Their feedback led us to refine the responses and the experience, and to reconsider what people actually expected from the tool. I learned that a working prototype was only the beginning of product development.',
      },
    ],
    links: [
      'My open models on Hugging Face',
      'The origin, told with Omega',
      'Zerodapi · contribution',
      'A conversation about product development',
    ],
  },
  {
    category: 'The current chapter',
    period: 'Now',
    title: 'Technology that reaches the people who use it.',
    intro:
      'I now work at TryHackMe as an AI engineer on the NoScope team. I research and develop artificial intelligence for cybersecurity.',
    role: 'AI engineer · TryHackMe / NoScope',
    chapters: [
      {
        label: '01 / Coming back in a different role',
        title: 'I used to solve its machines. Now I work here.',
        text: 'Before moving into AI, I completed hundreds of machines on TryHackMe and other platforms. They were a way to learn, get things wrong and try again. I never imagined I would end up working at one of them. Today, on the NoScope team, I help build the technology that other people will use.',
      },
      {
        label: '02 / What we are building',
        title: 'AI to assess and improve security',
        text: 'NoScope is building a fully autonomous, continuous pentesting product powered by AI agents. I am part of the AI engineering team, where research, development and product meet.',
      },
      {
        label: '03 / What drives me',
        title: 'Making the technology useful to more teams',
        text: 'I want this technology to be useful to organizations that do not have the resources of a large company, too. It is one of the ideas I discussed on La Jaula in 2026: thinking about who uses what we build, how they access it and what value it brings them.',
      },
      {
        label: '04 / From work to learning',
        title: 'It can become a room, too',
        text: 'In July 2026 I shared how a finding by our agent had become a TryHackMe room. It is a way to connect the team’s work with an experience that other people can learn from.',
      },
    ],
    links: [
      'NoScope · the product',
      'My team at NoScope',
      'The room, in my July post',
      'My current work on La Jaula · August 2026',
    ],
  },
  {
    category: 'An everyday utility',
    title: 'Share your screen. Choose what is visible.',
    intro:
      'A small macOS app born out of a very specific annoyance: showing your work without putting everything else on display.',
    role: 'Personal project · macOS',
    chapters: [
      {
        label: '01 / The annoyance',
        title: 'Not everything belongs on screen',
        text: 'You share your screen on a call or post a picture of your desktop, and something you did not mean to show slips into view. It happened to me with terminals, work paths and open conversations. Blurtain lets me hide those areas while keeping the important part visible.',
      },
      {
        label: '02 / The scale',
        title: 'An idea that deserved an app',
        text: 'I released it in September 2026. It is a macOS app and an example of the things I build on my own: something bothers me, I try a solution, and turn it into something I can use and share.',
      },
      {
        label: '03 / The project',
        title: 'The code is open',
        text: 'The code and instructions are on GitHub. The demonstration on this page illustrates the idea of hiding a detail; the actual project works on the macOS desktop.',
      },
    ],
    links: ['Explore Blurtain', 'The project announcement'],
  },
];

export const cases = spanish.cases.map((item, i) => ({
  ...item,
  ...caseText[i],
  links: item.links.map((link, j) => ({
    ...link,
    label: caseText[i].links[j],
  })),
}));

const chapterText = [
  {
    era: '2012—2020',
    title: 'From my sister’s PC to a notebook full of C.',
    paragraphs: [
      'I am from Villanueva del Arzobispo, Jaén. I wanted to make video games and understand how a small screen could hold an entire world. One of my first obsessions was getting unlimited coins in Facebook games. I even booted Windows from a USB drive on my sister’s PC, trying to get around permission restrictions so I could install Cheat Engine.',
      'That opened up many more questions. I became obsessed with Linux, installing virtual machines and discovering what every component of a computer did. Having something work was no longer enough: I wanted to know why.',
      'In secondary school I took a notebook to class to write C code by hand. I spent the day looking forward to getting home and compiling it in the afternoon. Before the models and agents, there was a notebook and the urge to try what I had written.',
    ],
    source: 'A personal memory',
  },
  {
    era: '2019—2021',
    title: 'Learning on my own. Learning with others.',
    paragraphs: [
      'My vocational studies in computer systems and networking at IES Sierra de las Villas gave that curiosity a foundation. Systems, networks and programming became part of the same conversation. Cisco Networking Academy, Python and Linux courses document some of that journey.',
      'In 2021 I took part in Andalucía Skills in IT network systems administration. Learning also happened outside the classroom: finding documentation, writing summaries and talking with people trying to understand similar things.',
    ],
    source: 'Taking part in Andalucía Skills',
  },
  {
    era: 'Before AI',
    title: 'From the machines to the code inside them.',
    paragraphs: [
      'Before moving into AI, I completed hundreds of machines on TryHackMe and other platforms. Each one was a reason to investigate, get stuck, read and try again. I learned as much from what did not work as from what I managed to solve.',
      'I used Kali Linux, Gentoo and Qubes OS. I loved experimenting with Metasploit, but running tools was not enough: I wanted to read their code and understand what they did. That way of learning, by looking inside, came before the models and agents.',
      'In 2021 I announced a group for sharing documentation, courses and help with projects, as well as programming classes on Twitch. Teaching grew alongside my own learning. That summer I published my personal website on GitHub.',
      'Tools and experiments with systems and different languages followed, including GONET Scanner in Go. Publishing and exchanging technical ideas were already part of my life before 0dAI. Making something accessible lets other people use it, question it and teach you something in return.',
    ],
    source: 'The programming classes announcement, in 2021',
  },
  {
    era: '2023—2024',
    title: 'When a question becomes a product.',
    paragraphs: [
      'At Omega AI, a practical security need opened the path to 0dAI. With Omega and the team, we went from discussing an idea to building a prototype and a service. I was cofounder and CTO, and also worked on its development.',
      'I am also the author of the open 0dAI models published on Hugging Face as luijait: fine-tuning on Mistral and Mixtral, iteration with DPO and quantized variants. That machine learning work was as central as the product experience. Users changed priorities and brought decisions about infrastructure, models and experience. That chapter gave me a lot of questions about what it means to bring technology into real use.',
    ],
    source: 'The origin of 0dAI, told with Omega',
  },
  {
    era: 'Research · 2025—2026',
    title: 'A team to keep exploring with.',
    paragraphs: [
      'My time at Alias Robotics let me continue bringing artificial intelligence and cybersecurity together with a research team. Conversations with Víctor and other members of the team were part of that transition.',
      'CAI opened a research direction that expanded into education, evaluation, specialized settings and strategy. I coauthored seven papers published on arXiv between April 2025 and January 2026. Reading, implementing and testing ideas were central to the method.',
    ],
    source: 'The team and the method, on xHubAI',
  },
  {
    era: 'Along the way',
    title: 'Sharing what I am learning.',
    paragraphs: [
      'Speaking and writing have accompanied the technical work: HACKÉN, AiBirras, Morteruelo, the CAI article on Deep Hacking, and a session with students at IES Virgen del Carmen in May 2025. A different audience calls for a different explanation.',
      'I also serve on the BLISS Expert Board. I want knowledge to travel between research, building and learning. Explaining something forces you to organize what you know and recognize what you are still trying to understand.',
    ],
    source: 'The session at IES Virgen del Carmen',
  },
  {
    era: 'Now · 2026',
    title: 'The story is still open.',
    paragraphs: [
      'Today I work at TryHackMe as an AI engineer on the NoScope team. One of the platforms where I used to solve machines has become the place where I work. I would never have guessed that while spending hours trying to figure out the next challenge.',
      'I continue to research and develop AI for cybersecurity. I also think about who uses the technology, how it reaches them and what it makes possible for their team. I know that curiosity from the other side of the screen.',
      'Outside that work, ideas keep turning up: Blurtain for macOS, experiments with models and a weekend MOBA in Unity. Sometimes a question needs a paper. Other times, you just have to start building.',
    ],
    source: 'The current chapter, on La Jaula',
  },
];
export const chapters = spanish.chapters.map((item, i) => ({
  ...item,
  ...chapterText[i],
}));

const paperText = [
  {
    short: 'CAI',
    question: 'How do we build an open AI framework for cybersecurity?',
    description:
      'The open-source framework that starts this research line: models, tools and oversight brought together to study AI in cybersecurity. The paper presents its design and evaluation results.',
    tag: 'Build',
  },
  {
    short: 'CAI Fluency',
    question: 'What does a person need to understand to use these tools?',
    description:
      'An educational perspective on judgment, transparency and understanding, adapting the AI Fluency framework to cybersecurity. Revised in October 2025.',
    tag: 'Learn',
  },
  {
    short: 'CAIBench',
    question:
      'How do we distinguish knowledge from the ability to complete tasks?',
    description:
      'A meta-benchmark for evaluating cybersecurity agents. It separates individual skills from integrated tasks and studies how both the model and the agent framework affect results.',
    tag: 'Measure',
  },
  {
    short: 'CAI in operational technology',
    question: 'What changes in a specialized competition?',
    description:
      'A study of the team’s participation in Dragos OT CTF 2025: 32 of 34 challenges solved and a sixth-place finish. It examines CAI’s performance in this operational technology setting.',
    tag: 'Test',
  },
  {
    short: 'Learning from competitions',
    question:
      'What can we learn by testing the system across different events?',
    description:
      'An overview of CAI’s participation in several CTF events. It brings together the team’s results and lessons from evaluating the system in different competition settings.',
    tag: 'Compare',
  },
  {
    short: 'A game-theoretic perspective',
    question: 'How can strategy inform an agent’s decisions?',
    description:
      'Explores game theory as a way to reason about strategic decisions in cybersecurity. It extends the research into the relationship between objectives, decisions and context.',
    tag: 'Reason',
  },
  {
    short: 'Where the research could go',
    question: 'What role should human judgment and oversight play?',
    description:
      'A proposed direction for the evolution of AI in cybersecurity. It should be read as a research proposal, with its assumptions and conditions.',
    tag: 'Explore',
  },
];
export const papers = spanish.papers.map((item, i) => ({
  ...item,
  ...paperText[i],
}));

const topics = [
  'Technology, teams and product value',
  'CAI: research and collective work',
  'Read, implement and keep learning',
  '0dAI: what changes when users arrive',
  'Learning, AI and how 0dAI began',
  'The curiosity that came before all of this',
  'The present and future of AI in cybersecurity',
  'Programming, abstraction and agents',
  'Power and safety in artificial intelligence',
  'The path towards AI and cybersecurity',
];
export const media = spanish.media.map((item, i) => ({
  ...item,
  topic: topics[i],
  date: item.date.replace('Mayo', 'May'),
  note: item.note
    ? 'Event held on 17–18 May; video published on 1 September.'
    : undefined,
}));

const courseTitles = [
  'CCNA Routing and Switching: Introduction to Networks',
  'CCNAv7: Switching, Routing and Wireless Essentials',
  'Introduction to Auditing Industrial Control Systems',
  'PCAP: Programming Essentials in Python',
  'Introduction to Cybersecurity',
  'Cybersecurity Essentials',
  'NDG Linux Unhatched',
  'CCNA: Enterprise Networking, Security, and Automation',
];
export const courses = spanish.courses.map((item, i) => ({
  ...item,
  title: courseTitles[i],
  issuer: item.issuer.replace('credencial de estudiante', 'student credential'),
  date: item.date === 'Sin fecha recuperada' ? 'Date unavailable' : item.date,
}));

const experimentText = [
  {
    kind: 'Unity · Experiment, 2026',
    text: 'A Unity MOBA, dedicated to the junglers I get in solo queue. A weekend project.',
  },
  {
    kind: 'Foundations · Learning',
    text: 'Implementing a language model to understand what happens inside it.',
  },
  {
    kind: 'Reinforcement learning · 2025',
    text: 'An agent trained to land. Rewards, decisions and learning with Stable Baselines3.',
  },
  {
    kind: 'Agents that play · 2025',
    text: 'Training an Atari agent for one million steps. An experiment from the Hugging Face Deep RL course.',
  },
  {
    kind: 'Go · Networking',
    text: 'My networking chapter, written in Go: host discovery and a custom parser to explore how systems communicate.',
  },
];
export const experiments = spanish.experiments.map((item, i) => ({
  ...item,
  ...experimentText[i],
}));

const writingTitles = [
  'CAI: AI applied to cybersecurity',
  'Quantizing AI: from your GPU to your pocket',
  'Can Devin hack and solve CTFs?',
];
export const writings = spanish.writings.map((item, i) => ({
  ...item,
  title: writingTitles[i],
  date: item.date.replace('Mayo', 'May').replace('Agosto', 'August'),
}));
