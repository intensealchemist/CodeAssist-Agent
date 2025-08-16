const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Coding agent system prompt
const CODING_AGENT_PROMPT = `You are an expert coding assistant. You can:
1. Analyze code and find bugs
2. Generate code in various programming languages
3. Explain code concepts
4. Suggest improvements and optimizations
5. Help with debugging
6. Provide code reviews

Always provide clear, well-commented code and explanations. Format code blocks properly with language specification.`;

// Chat endpoint
app.post('/api/chat', async (req, res) => {
    try {
        const { message, conversationHistory = [] } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        // Get the generative model
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        // Build conversation context
        let fullPrompt = CODING_AGENT_PROMPT + '\n\n';
        
        // Add conversation history
        if (conversationHistory.length > 0) {
            fullPrompt += 'Previous conversation:\n';
            conversationHistory.forEach((msg, index) => {
                fullPrompt += `${msg.role}: ${msg.content}\n`;
            });
            fullPrompt += '\n';
        }

        fullPrompt += `User: ${message}\nAssistant:`;

        // Generate response
        const result = await model.generateContent(fullPrompt);
        const response = await result.response;
        const text = response.text();

        res.json({
            success: true,
            response: text,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to generate response',
            details: error.message
        });
    }
});

// Code analysis endpoint
app.post('/api/analyze-code', async (req, res) => {
    try {
        const { code, language, analysisType = 'general' } = req.body;

        if (!code) {
            return res.status(400).json({ error: 'Code is required' });
        }

        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        let analysisPrompt = '';
        switch (analysisType) {
            case 'bugs':
                analysisPrompt = `Analyze the following ${language || 'code'} for potential bugs, errors, and issues:\n\n${code}\n\nProvide a detailed analysis with suggestions for fixes.`;
                break;
            case 'optimization':
                analysisPrompt = `Analyze the following ${language || 'code'} for performance optimizations and improvements:\n\n${code}\n\nSuggest specific optimizations and explain why they would be beneficial.`;
                break;
            case 'review':
                analysisPrompt = `Perform a comprehensive code review of the following ${language || 'code'}:\n\n${code}\n\nEvaluate code quality, best practices, readability, and suggest improvements.`;
                break;
            default:
                analysisPrompt = `Analyze the following ${language || 'code'} and provide insights:\n\n${code}\n\nExplain what the code does, identify any issues, and suggest improvements.`;
        }

        const result = await model.generateContent(analysisPrompt);
        const response = await result.response;
        const analysis = response.text();

        res.json({
            success: true,
            analysis,
            analysisType,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to analyze code',
            details: error.message
        });
    }
});

// Code generation endpoint
app.post('/api/generate-code', async (req, res) => {
    try {
        const { prompt, language, framework } = req.body;

        if (!prompt) {
            return res.status(400).json({ error: 'Prompt is required' });
        }

        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        let generationPrompt = `Generate ${language || 'code'} ${framework ? `using ${framework}` : ''} for the following requirement:\n\n${prompt}\n\nProvide clean, well-commented, production-ready code with explanations.`;

        const result = await model.generateContent(generationPrompt);
        const response = await result.response;
        const code = response.text();

        res.json({
            success: true,
            generatedCode: code,
            language,
            framework,
            timestamp: new Date().toISOString()
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to generate code',
            details: error.message
        });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        geminiConfigured: !!process.env.GEMINI_API_KEY
    });
});

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(PORT, () => {
    console.log(`🚀 CodeAssist Agent server running on http://localhost:${PORT}`);
    console.log(`📝 Make sure to set your GEMINI_API_KEY in the .env file`);
});
