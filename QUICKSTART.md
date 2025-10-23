# Quick Start Guide

## Prerequisites Setup

### 1. Install Ollama
Download and install from https://ollama.ai

For Linux:
```bash
curl -fsSL https://ollama.ai/install.sh | sh
```

For macOS:
```bash
brew install ollama
```

### 2. Start Ollama Server
```bash
ollama serve
```

### 3. Pull a Language Model
```bash
# Recommended models (choose one):
ollama pull llama2        # ~3.8GB, good balance
ollama pull mistral       # ~4.1GB, faster
ollama pull phi           # ~1.6GB, smaller/faster
```

## Project Setup

### 1. Clone and Install
```bash
git clone https://github.com/skypu/Project-Sartre.git
cd Project-Sartre
npm install
npm run install-browsers
```

### 2. Verify Installation
```bash
npm test
```

You should see:
```
✅ All basic structure tests passed!
```

## First Run

### Simple Example
```bash
npm start -- --url https://example.com
```

Expected output:
```
🎭 Project Sartre initializing...
l'enfer, c'est les autres

🌐 Launching browser...
✓ Browser ready

🤖 Connecting to Ollama (model: llama2)...
✓ Ollama connected

📍 Navigating to: https://example.com
✓ Page loaded: Example Domain

💬 Interactive mode started. Type "help" for commands, "exit" to quit.

🎭 sartre> 
```

### Try These Commands
```
🎭 sartre> What is this website about?
🎭 sartre> goto https://news.ycombinator.com
🎭 sartre> What are the top stories?
🎭 sartre> screenshot
🎭 sartre> help
🎭 sartre> exit
```

## Troubleshooting

### Error: Cannot connect to Ollama
**Solution:** Make sure Ollama is running
```bash
ollama serve
```

### Error: Model not found
**Solution:** Pull the model first
```bash
ollama pull llama2
```

### Error: Browser installation failed
**Solution:** Manually install browsers
```bash
npx playwright install chromium
```

### Browser doesn't open (headless mode)
**Solution:** Run without headless flag (default behavior)
```bash
npm start -- --url https://example.com
```

## Common Use Cases

### Research a Topic
```bash
npm start -- --url https://en.wikipedia.org/wiki/Artificial_Intelligence
```

### Browse News
```bash
npm start -- --url https://news.ycombinator.com --model mistral
```

### Headless Automation
```bash
npm start -- --url https://example.com --headless
```

## Next Steps

- Read [README.md](README.md) for full documentation
- Check [EXAMPLES.md](EXAMPLES.md) for more usage examples
- See [CONTRIBUTING.md](CONTRIBUTING.md) to contribute

## Getting Help

- Run `npm start -- --help` for CLI options
- Type `help` in interactive mode for commands
- Open an issue on GitHub for bugs or questions

Enjoy exploring the web with Sartre! 🎭
