import express from 'express';
import path from 'path';
import fs from 'fs/promises';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
app.use(express.json());

// Lazy-loaded Gemini Client to prevent crash on startup if API key is missing
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
      aiClient = new GoogleGenAI({ apiKey });
    }
  }
  return aiClient;
}

const PORTFOLIO_CONTEXT = `
Karthikeya Veeramallu's Resume & Portfolio Information:

CONTACT DETAILS:
- Name: Karthikeya Veeramallu
- Title: B.Tech Computer Science & Engineering Student | AI Engineer & Full Stack Developer Candidate
- Email: karthikeya39g@gmail.com
- Phone: +91 9666356509
- Location: Hyderabad, Amberpet, India
- LinkedIn: linkedin.com/in/karthikeya-datascience
- GitHub: github.com/karthikeya39g-af
- Portfolio Website: Karthikeya's Interactive Portfolio

CAREER OBJECTIVE:
Motivated B.Tech Computer Science student seeking internship roles in AI Engineering, Frontend, Backend, or Full Stack Development. Proficient in Python, JavaScript, React.js, Node.js, and AI/ML concepts, with hands-on experience building intelligent applications and scalable web systems. Eager to contribute technical skills and drive meaningful impact.

EDUCATION:
- B.Tech in Computer Science & Engineering (2023 - 2027)
- College: Nalla Narasimha Reddy Engineering College, Hyderabad
- CGPA: 7.98

TECHNICAL SKILLS:
- Languages: Python, JavaScript (ES6+), Java, SQL
- Frontend: React.js, HTML5, CSS3, Responsive Design, Tailwind CSS, Bootstrap
- Backend: Node.js, Express.js, REST APIs, FastAPI, Flask
- Databases: MySQL, MongoDB, PostgreSQL, ChromaDB (Vector DB)
- AI / ML: NLP, Machine Learning, Data Preprocessing, Model Evaluation, Recommendation Systems, TensorFlow, PyTorch, Scikit-Learn, Pandas, NumPy, Librosa, OpenCV, Google Gemini API, LangChain
- DevOps & Cloud: Docker, Git, GitHub, GitLab, Linux, CI/CD, Vercel, Render, Railway, Firebase
- Soft Skills: Problem Solving, Teamwork, Leadership, Communication, Critical Thinking, Time Management, Project Management, Public Speaking

SERVICES CARRIED OUT:
- AI Development (LLM fine-tuning, RAG, prompt engineering)
- Web Development (React, Full Stack, responsive apps)
- Dashboard Development (data visualization, interactive metrics)
- API Development (REST APIs with Express, FastAPI)
- Data Analysis (pandas, numpy, machine learning models)
- Machine Learning Solutions (classification, predictive engines)
- UI Development (Tailwind CSS, clean interactive designs)

WORK EXPERIENCE:
- AI & ML Model Design Intern at Indian Servers (Software Development Company)
  * Duration: 2023 (2 Months)
  * Designed and delivered 3+ AI/ML classification models, improving prediction accuracy by ~20% over baseline benchmarks.
  * Assessed and cleaned 5,000+ data records through feature engineering and preprocessing, reducing training noise significantly.
  * Conducted research into supervised learning algorithms and text processing techniques, producing 2 working prototypes.
  * Implemented automation scripts in Python that reduced manual data handling time by 40% within the team workflow.

PROJECTS:
1. AI Fitness Assistant (Python, NLP, Recommendation System)
   - Description: Architected an end-to-end fitness planning system that generates personalised workout and diet plans for 5+ user profiles.
   - Key Feature: Adaptive recommendation engine that adjusts suggestions weekly, improving goal-adherence by 35%.
   - Challenges: Handling high-variance user data and diet restrictions.
   - Solution: Designed a rule-based constraint system combined with a text representation model to refine recipes.
   - Learning Outcomes: Learned custom scoring heuristics, data pipelines, and user-centric constraint matching.
2. AI Voice Assistant Application (Python, Speech Recognition, NLP)
   - Description: Voice-enabled assistant designed targeting elderly users to improve speech clarity and connectivity.
   - Key Feature: Real-time grammar correction and vocal feedback to reduce miscommunication errors by 30%.
   - Challenges: Noise cancellation and variable accent handling.
   - Solution: Implemented speech-to-text with post-processing filters to clean transcription noise.
   - Learning Outcomes: Gained proficiency with audio APIs, Librosa, and user experience for elder accessibility.
3. AI Study Guide Generator (Python, NLP, PDF Processing)
   - Description: Text parsing pipeline that extracts key concepts from long PDF documents (up to 100 pages).
   - Key Feature: Sentence-ranking algorithm identifying the top 15% most relevant lines in under 10 seconds, making guides 70% shorter.
   - Challenges: Extracting structured sections from complex PDF layouts.
   - Solution: Integrated clean text parsers and semantic scoring based on tf-idf and sentence embeddings.
   - Learning Outcomes: Mastered NLP text tokenization, document summarization, and building rapid local summaries.
4. Vending Machine System (Java, Personal Project)
   - Description: Simulated billing and dispensing logic for an ice cream store.
   - Key Feature: Automated billing, change calculation, and product management.

ACHIEVEMENTS:
- Department Coordinator (managed 50+ students and coordinated 8 events during the annual college technical fest).
- Awarded Best Stall at inter-department college fest for outstanding design and collaborative presentation.

CERTIFICATIONS:
- Programming Fundamentals (NxtWave)
- Frontend Development (NxtWave)

CODING PROFILES:
- GitHub: github.com/karthikeya39g-af (Over 12 active repositories)
- LeetCode: Profile active, solved 450+ questions, focused on Arrays, Strings, Trees, and Dynamic Programming.
- HackerRank, Kaggle, CodeChef, GeeksforGeeks profiles active.

WORK PROCESS:
Requirement Analysis -> Research -> Planning -> UI Design -> Development -> Testing -> Deployment -> Maintenance.
`;

// API Route for Portfolio Chatbot
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required.' });
    }

    const ai = getGeminiClient();
    if (!ai) {
      // Friendly mockup / fallback responses if Gemini API Key is not set up yet
      const lastMsg = (messages[messages.length - 1]?.content || '').toLowerCase();
      let fallbackReply = "Hi! I am Karthikeya's AI Assistant. How can I help you today? Ask me about his projects, experience, education, or how to contact him!";
      
      if (lastMsg.includes('project') || lastMsg.includes('fitness') || lastMsg.includes('voice') || lastMsg.includes('study')) {
        fallbackReply = "Karthikeya has built several amazing projects including:\n1. **AI Fitness Assistant** (diet/workout recommender)\n2. **AI Voice Assistant** (accessible grammar-correcting app for the elderly)\n3. **AI Study Guide Generator** (summarizes long PDFs in seconds).\nWhich one would you like to hear more about?";
      } else if (lastMsg.includes('experience') || lastMsg.includes('intern') || lastMsg.includes('indian servers')) {
        fallbackReply = "Karthikeya worked as an AI & ML Model Design Intern at Indian Servers, where he designed 3+ ML models, processed 5,000+ data records, and built text-processing automation scripts that improved team efficiency by 40%!";
      } else if (lastMsg.includes('education') || lastMsg.includes('college') || lastMsg.includes('cgpa')) {
        fallbackReply = "Karthikeya is pursuing his B.Tech in Computer Science & Engineering (2023-2027) at Nalla Narasimha Reddy Engineering College. He has an outstanding CGPA of 7.98!";
      } else if (lastMsg.includes('contact') || lastMsg.includes('email') || lastMsg.includes('phone') || lastMsg.includes('linkedin')) {
        fallbackReply = "You can contact Karthikeya directly via Email at **karthikeya39g@gmail.com**, Phone at **+91 9666356509**, or LinkedIn at **linkedin.com/in/karthikeya-datascience**.";
      } else if (lastMsg.includes('skill') || lastMsg.includes('languages') || lastMsg.includes('python')) {
        fallbackReply = "Karthikeya specializes in Python, JavaScript, Java, SQL, React.js, Node.js, FastAPI, TensorFlow, PyTorch, Scikit-Learn, and NLP techniques.";
      }
      
      return res.status(200).json({ message: fallbackReply + "\n\n*(Note: Set up your GEMINI_API_KEY in Secrets to power me with full generative AI!)*" });
    }

    const lastMessage = messages[messages.length - 1]?.content || '';
    
    // Setup prompt for Gemini model
    const contents = [
      {
        role: 'user',
        parts: [{
          text: `You are the virtual AI Assistant representative of Karthikeya Veeramallu (B.Tech student & AI Engineering candidate).
Your job is to answer questions from recruiters and visitors about Karthikeya.
Be professional, warm, concise, and helpful. Always respond in first-person as Karthikeya's assistant ("Karthikeya built...", "He has...").
Keep your responses to 2 or 3 sentences maximum. Format lists or bullet points cleanly if needed.

Here is Karthikeya's complete portfolio context:
${PORTFOLIO_CONTEXT}

Visitor is asking: "${lastMessage}"
`
        }]
      }
    ];

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: contents,
      config: {
        maxOutputTokens: 250,
        temperature: 0.7,
      }
    });

    const reply = response.text || "I apologize, but I could not formulate a response at the moment. Please feel free to email Karthikeya at karthikeya39g@gmail.com!";
    res.json({ message: reply });
  } catch (err: any) {
    console.error('Error in chat API:', err);
    res.status(500).json({ error: 'Failed to generate response', details: err.message });
  }
});

// Setup static and Vite integration
const startServer = async () => {
  const isProd = process.env.NODE_ENV === 'production';
  const __dirname = path.resolve();

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    console.log('Vite development server middleware loaded.');
  } else {
    // Serve static files from the dist folder
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
    console.log('Production static files route loaded.');
  }

  const port = 3000;
  app.listen(port, '0.0.0.0', () => {
    console.log(`[Server] Running at http://0.0.0.0:${port}`);
  });
};

startServer().catch((err) => {
  console.error('[Server] Failed to start:', err);
});
