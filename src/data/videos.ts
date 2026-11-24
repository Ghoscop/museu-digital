
export interface TopicVideo {
  videoId: string;
  title: string;
  channel: string;
  description: string;
}

export const videosByTopic: Record<string, TopicVideo> = {
  cloud: {
    videoId: 'IVeA6KcaX-w',
    title: 'O que é Computação em Nuvem?',
    channel: 'Felipe Santos - Know Stuff',
    description:
      'Entenda como a computação em nuvem fornece infraestrutura e recursos para aplicações modernas e sistemas de inteligência artificial.',
  },

  mobile: {
    videoId: 'wwrwglJ2bmE',
    title: 'Inteligência Artificial offline no celular',
    channel: 'Tech World BR',
    description:
      'Conheça modelos de IA que podem funcionar diretamente no smartphone, sem depender de uma conexão constante com a internet.',
  },

  'machine-learning': {
    videoId: '0mtXae5HhTE',
    title: 'Você sabe o que é Machine Learning?',
    channel: 'Curso em Vídeo',
    description:
      'Descubra como os sistemas aprendem com dados, identificam padrões e realizam previsões.',
  },

  'generative-ai': {
    videoId: '31HFCW5DuqI',
    title: 'IAs Generativas: Matemática, Metáforas e Mitos',
    channel: 'Curso em Vídeo',
    description:
      'Conheça os fundamentos da IA generativa, os modelos de linguagem e a criação de novos conteúdos.',
  },

  cybersecurity: {
    videoId: 'pWO6vTv3i8c',
    title: 'Fundamentos de IA para Cybersegurança',
    channel: 'TIexames',
    description:
      'Explore como a inteligência artificial pode ser utilizada para defender sistemas e também como pode criar novos riscos digitais.',
  },
};
