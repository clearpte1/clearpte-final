export interface Paragraph {
  id: string;
  text: string;
  originalOrder: number;
}

export interface Question {
  id: number;
  title: string;
  paragraphs: Paragraph[];
}

export const QUESTIONS: Question[] = [
  {
    id: 1,
    title: 'Climate Change and Its Effects',
    paragraphs: [
      {
        id: 'a',
        text: 'The consequences of climate change are becoming increasingly evident worldwide. Rising sea levels threaten coastal communities, while extreme weather events occur with greater frequency and intensity.',
        originalOrder: 3,
      },
      {
        id: 'b',
        text: 'Climate change refers to long-term shifts in global temperatures and weather patterns. While these shifts can be natural, human activities have been the main driver since the 1800s.',
        originalOrder: 1,
      },
      {
        id: 'c',
        text: 'To address these challenges, governments and organizations worldwide are implementing various strategies. These include transitioning to renewable energy sources, improving energy efficiency, and developing climate adaptation plans.',
        originalOrder: 4,
      },
      {
        id: 'd',
        text: 'The primary cause of recent climate change is the increase in greenhouse gases in the atmosphere. Burning fossil fuels releases carbon dioxide and other gases that trap heat from the sun.',
        originalOrder: 2,
      },
    ],
  },
  {
    id: 2,
    title: 'The Evolution of Artificial Intelligence',
    paragraphs: [
      {
        id: 'a',
        text: 'Today, AI applications are ubiquitous, from smartphone assistants to recommendation systems. Machine learning algorithms can now perform tasks that were once thought to be exclusively human.',
        originalOrder: 4,
      },
      {
        id: 'b',
        text: 'The journey began in the 1950s when scientists first proposed that machines could simulate human intelligence. Early AI programs could solve algebra problems and speak English.',
        originalOrder: 2,
      },
      {
        id: 'c',
        text: 'Artificial Intelligence (AI) has evolved from a science fiction concept to a transformative technology that shapes our daily lives. Its development spans several decades of innovation and research.',
        originalOrder: 1,
      },
      {
        id: 'd',
        text: 'The 1980s and 1990s saw significant advances with the development of expert systems and neural networks. These technologies laid the foundation for modern AI capabilities.',
        originalOrder: 3,
      },
    ],
  },
  {
    id: 3,
    title: 'The History of the Internet',
    paragraphs: [
      {
        id: 'a',
        text: 'By the late 1990s, the internet had become a global phenomenon, transforming communication, commerce, and entertainment worldwide.',
        originalOrder: 4,
      },
      {
        id: 'b',
        text: 'The internet’s origins trace back to the 1960s with the development of ARPANET, a project funded by the U.S. Department of Defense.',
        originalOrder: 1,
      },
      {
        id: 'c',
        text: 'The 1980s saw the introduction of TCP/IP protocols, which enabled different networks to interconnect and form the basis of the modern internet.',
        originalOrder: 2,
      },
      {
        id: 'd',
        text: 'The World Wide Web, introduced in 1989 by Tim Berners-Lee, revolutionized how information is accessed and shared online.',
        originalOrder: 3,
      },
    ],
  },
  {
    id: 4,
    title: 'Renewable Energy Innovations',
    paragraphs: [
      {
        id: 'a',
        text: 'Solar panels and wind turbines are now more efficient, thanks to advancements in materials and design.',
        originalOrder: 3,
      },
      {
        id: 'b',
        text: 'The push for renewable energy began as a response to the environmental impact of fossil fuels in the mid-20th century.',
        originalOrder: 1,
      },
      {
        id: 'c',
        text: 'Governments are increasingly investing in research to make renewable energy sources more affordable and accessible.',
        originalOrder: 4,
      },
      {
        id: 'd',
        text: 'In the 1970s, the oil crisis spurred interest in alternative energy sources, laying the groundwork for future innovations.',
        originalOrder: 2,
      },
    ],
  },
  {
    id: 5,
    title: 'The Development of Space Exploration',
    paragraphs: [
      {
        id: 'a',
        text: 'Today, private companies like SpaceX are driving new missions to Mars and beyond, expanding human presence in space.',
        originalOrder: 4,
      },
      {
        id: 'b',
        text: 'Space exploration began in the late 1950s with the launch of Sputnik by the Soviet Union, marking the start of the Space Race.',
        originalOrder: 1,
      },
      {
        id: 'c',
        text: 'The 1969 Apollo 11 mission successfully landed humans on the moon, a monumental achievement in space history.',
        originalOrder: 2,
      },
      {
        id: 'd',
        text: 'The 1980s and 1990s focused on space stations like Mir and the International Space Station, fostering international cooperation.',
        originalOrder: 3,
      },
    ],
  },
];