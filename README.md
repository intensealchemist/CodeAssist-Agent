# CodeAssist Agent

A powerful coding assistant and chat application powered by Google's Gemini API. CodeAssist Agent provides an intelligent coding companion that can analyze code, generate solutions, and assist with programming tasks.

## Features

- **💬 Interactive Chat**: Natural language conversations with the AI coding assistant
- **🔍 Code Analysis**: Analyze code for bugs, optimizations, and general review
- **⚡ Code Generation**: Generate code snippets and complete solutions
- **🎨 Modern UI**: Beautiful, responsive interface with syntax highlighting
- **🚀 Real-time Processing**: Fast responses powered by Gemini Pro

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure API Key

1. Copy the environment template:
   ```bash
   copy .env.example .env
   ```

2. Get your Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)

3. Edit the `.env` file and add your API key:
   ```
   GEMINI_API_KEY=your_actual_api_key_here
   PORT=3000
   ```

### 3. Run the Application

```bash
npm start
```

Or for development with auto-reload:
```bash
npm run dev
```

### 4. Access the Application

Open your browser and navigate to: http://localhost:${PORT}

## Usage

### Chat Mode
- Ask questions about programming concepts
- Get help with debugging
- Request code explanations
- Discuss best practices

### Code Analysis
- Paste your code for analysis
- Choose analysis type:
  - General Analysis
  - Bug Detection
  - Performance Optimization
  - Code Review

### Code Generation
- Describe what you want to build
- Select programming language
- Optionally specify framework
- Get complete, working code solutions

## API Endpoints

- `POST /api/chat` - Chat with the coding assistant
- `POST /api/analyze-code` - Analyze code for issues and improvements
- `POST /api/generate-code` - Generate code based on requirements
- `GET /api/health` - Check server status

## Technologies Used

- **Backend**: Node.js, Express.js
- **AI**: Google Gemini Pro API
- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Styling**: Modern CSS with gradients and animations
- **Code Highlighting**: Prism.js
- **Markdown**: Marked.js

## Security Notes

- Never commit your `.env` file with real API keys
- The API key is stored server-side and never exposed to the client
- All API requests are processed through your backend server

## Troubleshooting

1. **"API Key Missing" status**: Make sure your `.env` file contains a valid `GEMINI_API_KEY`
2. **Connection Failed**: Check if the server is running on the correct port
3. **Server Error**: Check the console logs for detailed error messages

## Contributing

Feel free to submit issues and enhancement requests!

## License

MIT License - feel free to use this project for your own purposes.
