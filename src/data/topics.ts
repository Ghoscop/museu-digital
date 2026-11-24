export interface Topic {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  axis: string;
  year: string;
  icon: string;
  content: string[];
}

export const topics: Topic[] = [
  {
    id: "cloud",
    title: "Computação em Nuvem",
    subtitle: "A informação em qualquer lugar",
    description:
      "A tecnologia que permite armazenar e acessar dados pela internet.",
    axis: "Software",
    year: "2010–presente",
    icon: "cloud-outline",
    content: [
      "A computação em nuvem transformou a maneira como pessoas e empresas utilizam recursos computacionais.",
      "Serviços como AWS, Microsoft Azure e Google Cloud permitem armazenar arquivos, hospedar sistemas e processar grandes quantidades de dados pela internet.",
      "Essa tecnologia possibilitou maior flexibilidade, escalabilidade e acesso remoto aos recursos digitais."
    ]
  },
  {
    id: "mobile",
    title: "Dispositivos Móveis",
    subtitle: "A tecnologia na palma da mão",
    description:
      "A evolução dos smartphones e dos aplicativos móveis.",
    axis: "Hardware",
    year: "2010–presente",
    icon: "smartphone-outline",
    content: [
      "Os dispositivos móveis passaram a desempenhar um papel central na vida cotidiana.",
      "Smartphones modernos incorporaram processadores mais rápidos, câmeras avançadas, sensores e conexão permanente à internet.",
      "Aplicativos móveis transformaram a comunicação, o comércio, a educação e o entretenimento."
    ]
  },
  {
    id: "machine-learning",
    title: "Aprendizagem de Máquina",
    subtitle: "Máquinas aprendendo com dados",
    description:
      "Como algoritmos identificam padrões e realizam previsões.",
    axis: "Inteligência Artificial",
    year: "2010–presente",
    icon: "brain",
    content: [
      "Machine Learning é uma área da inteligência artificial que permite aos sistemas aprender padrões a partir de dados.",
      "A tecnologia é utilizada em recomendações de produtos, reconhecimento facial, análise de informações e detecção de fraudes.",
      "O crescimento da capacidade computacional e da disponibilidade de dados impulsionou seu desenvolvimento."
    ]
  },
  {
    id: "generative-ai",
    title: "IA Generativa",
    subtitle: "A criação de conteúdo por máquinas",
    description:
      "Sistemas capazes de produzir textos, imagens, sons e vídeos.",
    axis: "Inteligência Artificial",
    year: "2022–presente",
    icon: "sparkles",
    content: [
      "A inteligência artificial generativa ganhou grande destaque com a popularização de ferramentas capazes de criar conteúdo.",
      "Modelos como ChatGPT e geradores de imagens utilizam grandes volumes de dados para produzir respostas e conteúdos.",
      "Essas ferramentas apresentam oportunidades na educação, programação, comunicação e criatividade, mas também levantam questões éticas."
    ]
  },
  {
    id: "cybersecurity",
    title: "Segurança Digital",
    subtitle: "Protegendo o mundo conectado",
    description:
      "Os desafios de privacidade, proteção de dados e ataques digitais.",
    axis: "Segurança da Computação",
    year: "2010–presente",
    icon: "shield-checkmark-outline",
    content: [
      "Com a expansão dos serviços digitais, a proteção de informações tornou-se uma preocupação fundamental.",
      "Ataques de ransomware, phishing, vazamentos de dados e fraudes digitais representam riscos para pessoas e organizações.",
      "Medidas como autenticação multifator, criptografia, backups e conscientização ajudam a proteger os ambientes digitais."
    ]
  }
];
