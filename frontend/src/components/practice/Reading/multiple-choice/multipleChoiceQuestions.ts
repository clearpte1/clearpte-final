import { MultipleChoiceQuestion } from "./multipleChoiceTypes";

export const multipleChoiceQuestions: MultipleChoiceQuestion[] = [
  {
    id: 1,
    title: 'Taste Sensitivity and Nutrition',
    category: 'Health & Science',
    difficulty: 'Intermediate',
    timeLimit: 5,
    testSensitivity: 'Text',
    passage: `What you eat influences your taste for what you might want to eat next. So claims a University of California, Riverside, study performed on fruit flies. The study offers a better understanding of neuropsychological plasticity of the taste system in flies. To maintain ideal health, animals require a balanced diet with optimum amounts of different nutrients. Macronutrients like carbohydrates and proteins are essential; indeed, an unbalanced intake of these nutrients can be detrimental to health. Flies require micronutrients such as sugars and amino acids for survival. They use the gustatory system, the sensory system responsible for the perception of taste, to sense these nutrients and begin feeding.

In their experiments in the lab, the researchers Anindya Ganguly and Manali Dey, led by Anupama Dahanukar, fed adult flies different diets for a balanced diet a sugar-enriched and protein-enriched diet, and a sugar-enriched and insulin signaling in the brain which, in turn, affects the flies' peripheral sensory response, which is composed of neurons directly involved in detecting external stimuli. This response then influences what the flies eat next.`,
    question: 'Which of the following statements about the study are true?',
    options: [
      {
        id: 'A',
        text: 'What you eat has little to do with what you want to eat next.',
        isCorrect: false
      },
      {
        id: 'B',
        text: 'An unbalanced intake of micronutrients such as carbohydrates and proteins is essential.',
        isCorrect: false
      },
      {
        id: 'C',
        text: 'The flies sense macronutrients through the taste systems.',
        isCorrect: true
      },
      {
        id: 'D',
        text: 'In the experiment, the researchers made sure the total calories in all three diets were the same.',
        isCorrect: true
      },
      {
        id: 'E',
        text: 'The researchers tested the flies every two days for a week.',
        isCorrect: true
      },
      {
        id: 'F',
        text: 'Dopamine in the brain is closely related to diet.',
        isCorrect: true
      }
    ],
    explanation: 'The correct answers are C, D, E, and F. The passage supports that flies use their gustatory system to sense nutrients (C), the experiment controlled for total calories (D), testing occurred over time periods (E), and dopamine signaling in the brain affects taste response (F).',
    tags: ['nutrition', 'biology', 'taste', 'research'],
    isNew: true,
    isMarked: false,
    pracStatus: 'Undone',
    hasExplanation: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15'
  },
  {
    id: 2,
    title: 'Climate Change and Agriculture',
    category: 'Environment & Science',
    difficulty: 'Advanced',
    timeLimit: 5,
    testSensitivity: 'Text',
    passage: `Climate change poses significant challenges to global agriculture, affecting crop yields, water availability, and soil quality. Rising temperatures and changing precipitation patterns are altering growing seasons and crop distributions worldwide. Many regions are experiencing more frequent droughts, while others face increased flooding and extreme weather events.

Research indicates that major food crops like wheat, rice, and maize are particularly vulnerable to temperature increases. Higher temperatures can reduce grain filling periods and increase water stress, leading to decreased yields. Additionally, elevated carbon dioxide levels in the atmosphere, while potentially beneficial for some crops through enhanced photosynthesis, may reduce the nutritional content of grains and vegetables.

Farmers are adapting through various strategies including drought-resistant crop varieties, improved irrigation systems, and altered planting schedules. However, these adaptations require significant investment and technical knowledge. International cooperation and policy support are essential for ensuring food security in the face of climate change.`,
    question: 'According to the passage, which statements about climate change and agriculture are accurate?',
    options: [
      {
        id: 'A',
        text: 'Climate change only affects agriculture through temperature increases.',
        isCorrect: false
      },
      {
        id: 'B',
        text: 'All regions experience the same climate-related agricultural challenges.',
        isCorrect: false
      },
      {
        id: 'C',
        text: 'Major food crops like wheat, rice, and maize are vulnerable to temperature increases.',
        isCorrect: true
      },
      {
        id: 'D',
        text: 'Higher CO2 levels always improve crop productivity and nutrition.',
        isCorrect: false
      },
      {
        id: 'E',
        text: 'Farmers are developing adaptation strategies to address climate challenges.',
        isCorrect: true
      },
      {
        id: 'F',
        text: 'International cooperation is important for ensuring food security.',
        isCorrect: true
      }
    ],
    explanation: 'The correct answers are C, E, and F. The passage states that major crops are vulnerable to temperature increases, farmers are adapting with various strategies, and international cooperation is essential for food security.',
    tags: ['climate change', 'agriculture', 'environment', 'food security'],
    isNew: false,
    isMarked: true,
    pracStatus: 'In Progress',
    hasExplanation: true,
    createdAt: '2024-01-12',
    updatedAt: '2024-01-20'
  },
  {
    id: 3,
    title: 'Digital Learning and Student Performance',
    category: 'Education & Technology',
    difficulty: 'Beginner',
    timeLimit: 5,
    testSensitivity: 'Text',
    passage: `The integration of digital technology in education has transformed how students learn and teachers instruct. Online learning platforms, interactive software, and digital resources have become increasingly common in classrooms worldwide. These technologies offer numerous benefits including personalized learning experiences, access to vast information resources, and flexible learning schedules.

However, research shows mixed results regarding the effectiveness of digital learning. Some studies indicate that students using digital tools show improved engagement and retention rates. Other research suggests that excessive screen time and reduced face-to-face interaction may negatively impact social skills and deep learning processes. The effectiveness often depends on how the technology is implemented and the specific needs of individual learners.

Successful digital learning requires proper training for educators, adequate technological infrastructure, and careful consideration of pedagogical approaches. Schools must balance the benefits of technology with traditional teaching methods to create optimal learning environments for all students.`,
    question: 'Which of the following statements about digital learning are supported by the passage?',
    options: [
      {
        id: 'A',
        text: 'Digital technology has completely replaced traditional teaching methods.',
        isCorrect: false
      },
      {
        id: 'B',
        text: 'Research unanimously supports the effectiveness of digital learning.',
        isCorrect: false
      },
      {
        id: 'C',
        text: 'Digital tools can provide personalized learning experiences.',
        isCorrect: true
      },
      {
        id: 'D',
        text: 'Some studies show improved engagement with digital tools.',
        isCorrect: true
      },
      {
        id: 'E',
        text: 'Excessive screen time may have negative impacts on learning.',
        isCorrect: true
      },
      {
        id: 'F',
        text: 'Successful implementation requires proper educator training.',
        isCorrect: true
      }
    ],
    explanation: 'The correct answers are C, D, E, and F. The passage mentions personalized learning experiences, studies showing improved engagement, potential negative impacts of excessive screen time, and the need for proper educator training.',
    tags: ['digital learning', 'education', 'technology', 'student performance'],
    isNew: true,
    isMarked: false,
    pracStatus: 'Undone',
    hasExplanation: false,
    createdAt: '2024-01-18',
    updatedAt: '2024-01-18'
  },
  {
    id: 4,
    title: 'Urban Planning and Sustainability',
    category: 'Urban Development',
    difficulty: 'Advanced',
    timeLimit: 5,
    testSensitivity: 'Text',
    passage: `Sustainable urban planning has become crucial as cities worldwide face rapid population growth and environmental challenges. Modern urban planners focus on creating livable, environmentally friendly cities that can accommodate growing populations while minimizing ecological impact. Key strategies include promoting public transportation, creating green spaces, implementing renewable energy systems, and designing compact, mixed-use developments.

The concept of "smart cities" integrates technology with urban planning to improve efficiency and quality of life. Smart traffic management systems reduce congestion and emissions, while intelligent energy grids optimize power distribution. Digital infrastructure enables better city services and citizen engagement through mobile applications and online platforms.

However, sustainable urban development faces significant challenges including funding constraints, political resistance, and the need to retrofit existing infrastructure. Successful projects require collaboration between government agencies, private sector partners, community organizations, and residents. Long-term planning and commitment are essential for creating truly sustainable urban environments.`,
    question: 'Based on the passage, which statements about sustainable urban planning are correct?',
    options: [
      {
        id: 'A',
        text: 'Sustainable urban planning only focuses on environmental concerns.',
        isCorrect: false
      },
      {
        id: 'B',
        text: 'Smart cities eliminate all urban planning challenges.',
        isCorrect: false
      },
      {
        id: 'C',
        text: 'Public transportation promotion is a key strategy in sustainable planning.',
        isCorrect: true
      },
      {
        id: 'D',
        text: 'Technology integration can improve city efficiency and quality of life.',
        isCorrect: true
      },
      {
        id: 'E',
        text: 'Funding constraints pose challenges to sustainable development.',
        isCorrect: true
      },
      {
        id: 'F',
        text: 'Successful projects require collaboration among multiple stakeholders.',
        isCorrect: true
      }
    ],
    explanation: 'The correct answers are C, D, E, and F. The passage mentions public transportation as a key strategy, technology improving efficiency, funding as a challenge, and the need for multi-stakeholder collaboration.',
    tags: ['urban planning', 'sustainability', 'smart cities', 'development'],
    isNew: false,
    isMarked: false,
    pracStatus: 'Done',
    hasExplanation: true,
    createdAt: '2024-01-08',
    updatedAt: '2024-01-15'
  },
  {
    id: 5,
    title: 'Artificial Intelligence in Healthcare',
    category: 'Technology & Medicine',
    difficulty: 'Intermediate',
    timeLimit: 5,
    testSensitivity: 'Text',
    passage: `Artificial intelligence is revolutionizing healthcare through applications in diagnosis, treatment planning, and drug discovery. Machine learning algorithms can analyze medical images with remarkable accuracy, often detecting conditions that human doctors might miss. AI systems are particularly effective in radiology, pathology, and ophthalmology, where pattern recognition is crucial for accurate diagnosis.

In treatment planning, AI helps doctors make more informed decisions by analyzing patient data, medical histories, and treatment outcomes from similar cases. Predictive analytics can identify patients at risk of complications, enabling preventive interventions. Additionally, AI accelerates drug discovery by identifying promising compounds and predicting their effectiveness, potentially reducing development time from decades to years.

Despite these advances, AI in healthcare faces important challenges including data privacy concerns, regulatory requirements, and the need for extensive validation. Healthcare professionals must be trained to work with AI systems effectively, and patients need to understand how AI is being used in their care. Ethical considerations around AI decision-making in healthcare remain an ongoing area of discussion and development.`,
    question: 'According to the passage, which statements about AI in healthcare are accurate?',
    options: [
      {
        id: 'A',
        text: 'AI is only useful for administrative tasks in healthcare.',
        isCorrect: false
      },
      {
        id: 'B',
        text: 'Machine learning can detect conditions that doctors might miss.',
        isCorrect: true
      },
      {
        id: 'C',
        text: 'AI eliminates all challenges in healthcare delivery.',
        isCorrect: false
      },
      {
        id: 'D',
        text: 'Predictive analytics can help identify at-risk patients.',
        isCorrect: true
      },
      {
        id: 'E',
        text: 'AI can accelerate drug discovery processes.',
        isCorrect: true
      },
      {
        id: 'F',
        text: 'Healthcare professionals need training to work with AI systems.',
        isCorrect: true
      }
    ],
    explanation: 'The correct answers are B, D, E, and F. The passage states that ML can detect missed conditions, predictive analytics identifies at-risk patients, AI accelerates drug discovery, and professionals need training.',
    tags: ['artificial intelligence', 'healthcare', 'machine learning', 'medicine'],
    isNew: false,
    isMarked: true,
    pracStatus: 'Undone',
    hasExplanation: true,
    createdAt: '2024-01-10',
    updatedAt: '2024-01-12'
  },
  {
    id: 6,
    title: 'Renewable Energy Economics',
    category: 'Economics & Environment',
    difficulty: 'Beginner',
    timeLimit: 5,
    testSensitivity: 'Text',
    passage: `The economics of renewable energy have changed dramatically over the past decade, making clean energy increasingly competitive with fossil fuels. Solar and wind power costs have dropped by over 80% since 2010, driven by technological improvements, economies of scale, and increased competition. This cost reduction has made renewable energy the cheapest source of electricity in many regions worldwide.

Government policies have played a crucial role in renewable energy adoption through subsidies, tax incentives, and mandates for clean energy usage. These policies have helped create stable markets for renewable technologies and encouraged private investment. However, the intermittent nature of renewable sources like solar and wind requires investment in energy storage and grid infrastructure to ensure reliable power supply.

The transition to renewable energy creates both economic opportunities and challenges. New jobs are being created in manufacturing, installation, and maintenance of renewable energy systems. At the same time, traditional energy sectors face disruption, requiring workforce retraining and economic transition support for affected communities.`,
    question: 'Which statements about renewable energy economics are supported by the passage?',
    options: [
      {
        id: 'A',
        text: 'Renewable energy costs have remained constant over the past decade.',
        isCorrect: false
      },
      {
        id: 'B',
        text: 'Solar and wind power costs have dropped significantly since 2010.',
        isCorrect: true
      },
      {
        id: 'C',
        text: 'Government policies have had no impact on renewable energy adoption.',
        isCorrect: false
      },
      {
        id: 'D',
        text: 'Renewable energy requires investment in storage and grid infrastructure.',
        isCorrect: true
      },
      {
        id: 'E',
        text: 'The transition creates new job opportunities in renewable sectors.',
        isCorrect: true
      },
      {
        id: 'F',
        text: 'Traditional energy sectors face no challenges from renewable energy.',
        isCorrect: false
      }
    ],
    explanation: 'The correct answers are B, D, and E. The passage states that solar and wind costs dropped significantly, renewable energy requires infrastructure investment, and the transition creates new jobs.',
    tags: ['renewable energy', 'economics', 'environment', 'policy'],
    isNew: true,
    isMarked: false,
    pracStatus: 'In Progress',
    hasExplanation: false,
    createdAt: '2024-01-20',
    updatedAt: '2024-01-22'
  }
];