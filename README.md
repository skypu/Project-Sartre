# Project Sartre

> l'enfer, c'est les autres

An AI-powered web browsing assistant that combines Playwright for browser automation with Ollama for LLM-based interaction. Named in tribute to Jean-Paul Sartre, the famous playwright and philosopher.

## Features

- 🎭 **CLI-style communication** - Interactive command-line interface
- 🌐 **Web browsing** - Automated web browsing with Playwright
- 🤖 **LLM integration** - Powered by Ollama for intelligent responses
- 💬 **Conversational** - Chat about web content naturally
- 📸 **Screenshots** - Capture webpage screenshots
- 🔍 **Information extraction** - Get summaries and specific information from websites

## Prerequisites

- **Node.js** (v18 or higher)
- **Ollama** - Download and install from [https://ollama.ai](https://ollama.ai)
- A language model (e.g., `llama2`, `mistral`, `phi`)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/skypu/Project-Sartre.git
cd Project-Sartre
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npm run install-browsers
```

4. Make sure Ollama is running:
```bash
ollama serve
```

5. Pull a language model (if you haven't already):
```bash
ollama pull llama2
```

## Usage

### Basic Usage

Start with the default model and navigate to a URL:

```bash
npm start -- --url https://example.com
```

Or use the binary directly (after `npm link`):

```bash
sartre --url https://example.com
```

### Options

- `-u, --url <url>` - Initial URL to browse
- `-m, --model <model>` - Ollama model to use (default: llama2)
- `-h, --headless` - Run browser in headless mode
- `-V, --version` - Output version number
- `--help` - Display help

### Interactive Commands

Once in interactive mode, you can use the following commands:

- **Ask questions** - Just type your question about the current page
- `goto <url>` - Navigate to a new URL
- `screenshot` - Take a screenshot of the current page
- `help` - Show available commands
- `exit` or `quit` - Exit the application

### Example Session

```
$ npm start -- --url https://news.ycombinator.com

🎭 Project Sartre initializing...
l'enfer, c'est les autres

🌐 Launching browser...
✓ Browser ready

🤖 Connecting to Ollama (model: llama2)...
✓ Ollama connected

📍 Navigating to: https://news.ycombinator.com
✓ Page loaded: Hacker News

💬 Interactive mode started. Type "help" for commands, "exit" to quit.

🎭 sartre> What are the top stories on this page?

🤔 Thinking...

The current page shows Hacker News, a popular technology and startup forum...
[Response continues]

🎭 sartre> goto https://github.com

📍 Navigating to: https://github.com
✓ Page loaded: GitHub

🎭 sartre> summarize what this website is about

🤔 Thinking...

GitHub is a platform for version control and collaboration...
[Response continues]

🎭 sartre> exit

👋 Au revoir!
```

## Architecture

- **index.js** - Main application entry point
- **SartreAgent** - Core class handling browser automation and LLM interaction
- **Playwright** - Browser automation for web navigation
- **Ollama** - Local LLM for intelligent responses
- **Commander** - CLI argument parsing

## Philosophy

Named after Jean-Paul Sartre, the existentialist philosopher and playwright, this project embodies the idea that meaning is created through interaction. The famous quote "l'enfer, c'est les autres" (hell is other people) from his play "No Exit" reminds us that our perception of the world is shaped by our interactions with it.

## Troubleshooting

### Ollama not connected
Make sure Ollama is running:
```bash
ollama serve
```

### Browser installation failed
Manually install browsers:
```bash
npx playwright install chromium
```

### Model not found
Pull the model you want to use:
```bash
ollama pull llama2
```

## License

ISC

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
