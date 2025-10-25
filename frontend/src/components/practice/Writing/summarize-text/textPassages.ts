import { SummarizeTextTopic } from "../../common/types";

// Mock data for Summarize Written Text passages
export const textPassages:SummarizeTextTopic[] = [
    {
      id: 1,
      title: 'Bullwhip Effect',
      category: 'Business & Economics',
      difficulty: 'Intermediate',
      timeLimit: 10, // minutes
      wordLimit: { min: 25, max: 50 },
      passage: `The term bullwhip effect was coined in 1961 by MIT computer scientist Jay Forrester in his seminal book "Industrial Dynamics." It describes what happens when fluctuations in retail demand get amplified throughout the supply chain, leading to larger and larger shortages. Imagine the physics of cracking a whip: It starts with a small flick of the wrist, but the whip's wave patterns grow exponentially in a chain reaction, leading to the tip, a snap — and a sharp pain for anyone on the receiving end.
  
  The same thing can happen in supply chains when orders for a product from a retailer go up or down by some amount and that gets amplified by wholesalers, distributors and raw material suppliers.
  
  The onset of the COVID-19 pandemic, which led to lengthy lockdowns, massive unemployment and a whole host of other effects that messed up global supply chains, essentially supercharged the bullwhip's snap.`,
      sampleAnswer: 'The bullwhip effect, coined by MIT\'s Jay Forrester in 1961, describes how small retail demand fluctuations amplify throughout supply chains, creating larger shortages. Like cracking a whip, small changes grow exponentially through wholesalers and suppliers, with COVID-19 pandemic significantly intensifying this phenomenon.',
      tags: ['supply chain', 'business', 'economics', 'management'],
      isNew: true,
      isMarked: false,
      pracStatus: 'Undone',
      hasExplanation: true,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15'
    },
    {
      id: 2,
      title: 'Renewable Energy Revolution',
      category: 'Environment & Technology',
      difficulty: 'Advanced',
      timeLimit: 10,
      wordLimit: { min: 25, max: 50 },
      passage: `The global transition to renewable energy sources represents one of the most significant technological and economic shifts of the 21st century. Solar photovoltaic technology has experienced dramatic cost reductions, falling by over 90% since 2010, making it the cheapest source of electricity in many regions. Wind power has similarly benefited from technological improvements and economies of scale, with offshore wind farms now capable of generating electricity at unprecedented efficiencies.
  
  This renewable energy revolution is driven not only by environmental concerns but also by economic imperatives. Countries that invest heavily in renewable infrastructure are positioning themselves for energy independence and long-term economic competitiveness. The integration of smart grid technologies and energy storage systems is addressing traditional concerns about renewable energy's intermittency, making clean energy a reliable alternative to fossil fuels.`,
      sampleAnswer: 'The 21st century renewable energy revolution features dramatic cost reductions in solar and wind technologies, driven by environmental and economic factors. Countries investing in renewable infrastructure achieve energy independence while smart grids and storage systems solve intermittency issues.',
      tags: ['renewable energy', 'technology', 'environment', 'economics'],
      isNew: false,
      isMarked: true,
      pracStatus: 'In Progress',
      hasExplanation: true,
      createdAt: '2024-01-12',
      updatedAt: '2024-01-20'
    },
    {
      id: 3,
      title: 'Artificial Intelligence in Healthcare',
      category: 'Technology & Medicine',
      difficulty: 'Advanced',
      timeLimit: 10,
      wordLimit: { min: 25, max: 50 },
      passage: `Artificial intelligence is revolutionizing healthcare delivery through advanced diagnostic capabilities and treatment optimization. Machine learning algorithms can now analyze medical imaging with accuracy that matches or exceeds human radiologists, particularly in detecting early-stage cancers and identifying subtle patterns in X-rays, MRIs, and CT scans.
  
  Beyond diagnostics, AI is transforming drug discovery processes that traditionally took decades and billions of dollars. By analyzing vast molecular databases and predicting compound interactions, AI systems can identify promising drug candidates in months rather than years. Personalized medicine is another frontier where AI excels, using genetic data and patient history to tailor treatments for optimal outcomes.
  
  The integration of AI in electronic health records and clinical decision support systems is reducing medical errors and improving patient safety. However, challenges remain regarding data privacy, algorithmic bias, and the need for extensive validation before widespread clinical deployment.`,
      sampleAnswer: 'AI revolutionizes healthcare through diagnostic accuracy matching human experts, accelerating drug discovery from decades to months, and enabling personalized medicine. Integration in health records improves safety, though privacy and bias challenges require attention.',
      tags: ['artificial intelligence', 'healthcare', 'medicine', 'technology'],
      isNew: true,
      isMarked: false,
      pracStatus: 'Undone',
      hasExplanation: false,
      createdAt: '2024-01-18',
      updatedAt: '2024-01-18'
    },
    {
      id: 4,
      title: 'Urban Vertical Farming',
      category: 'Agriculture & Sustainability',
      difficulty: 'Beginner',
      timeLimit: 10,
      wordLimit: { min: 25, max: 50 },
      passage: `Vertical farming represents a revolutionary approach to agriculture that addresses the growing challenges of urbanization and food security. By growing crops in vertically stacked layers within controlled environments, this method can produce significantly more food per square foot than traditional farming while using up to 95% less water.
  
  LED lighting systems provide optimal wavelengths for plant growth, while hydroponic and aeroponic systems deliver precise nutrition directly to plant roots. These controlled environments eliminate the need for pesticides and herbicides, producing cleaner, more nutritious crops year-round regardless of weather conditions.
  
  As urban populations continue to grow, vertical farms located within cities can reduce transportation costs and carbon emissions associated with moving food from rural areas to urban centers. The technology also offers the potential for fresh produce in regions with poor soil quality or harsh climates.`,
      sampleAnswer: 'Vertical farming grows crops in stacked layers using controlled environments, producing more food per square foot with 95% less water. LED lighting and hydroponic systems enable pesticide-free, year-round production, reducing transportation costs and emissions.',
      tags: ['vertical farming', 'agriculture', 'sustainability', 'urban planning'],
      isNew: false,
      isMarked: false,
      pracStatus: 'Done',
      hasExplanation: true,
      createdAt: '2024-01-08',
      updatedAt: '2024-01-15'
    },
    {
      id: 5,
      title: 'Quantum Computing Breakthrough',
      category: 'Technology & Physics',
      difficulty: 'Advanced',
      timeLimit: 10,
      wordLimit: { min: 25, max: 50 },
      passage: `Quantum computing represents a paradigm shift in computational power, leveraging quantum mechanical properties like superposition and entanglement to process information in fundamentally new ways. Unlike classical computers that use binary bits, quantum computers use quantum bits or "qubits" that can exist in multiple states simultaneously, enabling exponentially faster processing for specific types of problems.
  
  Recent breakthroughs in quantum error correction and qubit stability have brought practical quantum computing closer to reality. Major technology companies and research institutions have achieved quantum supremacy in specialized tasks, demonstrating calculations that would take classical computers thousands of years to complete.
  
  The implications for cybersecurity, drug discovery, financial modeling, and artificial intelligence are profound. Quantum computers could break current encryption methods while simultaneously enabling new forms of secure communication through quantum cryptography. However, widespread practical applications remain years away due to technical challenges in maintaining quantum coherence at scale.`,
      sampleAnswer: 'Quantum computing uses qubits and quantum mechanics to achieve exponential processing speeds for specific problems. Recent breakthroughs in error correction bring practical applications closer, with profound implications for cybersecurity, drug discovery, and AI.',
      tags: ['quantum computing', 'technology', 'physics', 'cybersecurity'],
      isNew: false,
      isMarked: true,
      pracStatus: 'Undone',
      hasExplanation: true,
      createdAt: '2024-01-10',
      updatedAt: '2024-01-12'
    },
    {
      id: 6,
      title: 'Ocean Plastic Pollution Solutions',
      category: 'Environment & Innovation',
      difficulty: 'Intermediate',
      timeLimit: 10,
      wordLimit: { min: 25, max: 50 },
      passage: `Ocean plastic pollution has become one of the most pressing environmental challenges of our time, with over 8 million tons of plastic waste entering the oceans annually. This pollution threatens marine ecosystems, enters the food chain through microplastics, and creates massive garbage patches that persist for decades.
  
  Innovative solutions are emerging to address this crisis. Ocean cleanup technologies use floating barriers and natural currents to collect plastic debris, while advanced recycling methods convert ocean plastic into new materials. Biodegradable alternatives to traditional plastics are being developed from seaweed, corn starch, and other organic materials.
  
  Prevention strategies focus on improving waste management systems in developing countries, where much ocean plastic originates, and implementing circular economy principles that minimize single-use plastics. Consumer awareness campaigns and corporate responsibility initiatives are also driving changes in packaging and manufacturing practices worldwide.`,
      sampleAnswer: 'Ocean plastic pollution, affecting marine ecosystems with 8 million tons annually, is being addressed through cleanup technologies, biodegradable alternatives, improved waste management, and circular economy principles driving corporate and consumer behavior changes.',
      tags: ['ocean pollution', 'environment', 'sustainability', 'innovation'],
      isNew: true,
      isMarked: false,
      pracStatus: 'In Progress',
      hasExplanation: false,
      createdAt: '2024-01-20',
      updatedAt: '2024-01-22'
    }
  ];