#!/usr/bin/env node

import { program } from 'commander';
import { chromium } from 'playwright';
import ollama from 'ollama';
import * as readline from 'readline';

// CLI configuration
program
  .name('sartre')
  .description("l'enfer, c'est les autres - AI-powered web browsing assistant")
  .version('1.0.0')
  .option('-u, --url <url>', 'Initial URL to browse')
  .option('-m, --model <model>', 'Ollama model to use', 'llama2')
  .option('-h, --headless', 'Run browser in headless mode', false)
  .parse(process.argv);

const options = program.opts();

// Main application class
class SartreAgent {
  constructor(model = 'llama2', headless = false) {
    this.model = model;
    this.headless = headless;
    this.browser = null;
    this.page = null;
    this.conversationHistory = [];
  }

  async initialize() {
    console.log('🎭 Project Sartre initializing...');
    console.log("l'enfer, c'est les autres\n");

    // Launch browser
    console.log('🌐 Launching browser...');
    this.browser = await chromium.launch({ 
      headless: this.headless,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    this.page = await this.browser.newPage();
    console.log('✓ Browser ready\n');

    // Check Ollama connection
    try {
      console.log(`🤖 Connecting to Ollama (model: ${this.model})...`);
      await ollama.list();
      console.log('✓ Ollama connected\n');
    } catch (error) {
      console.error('❌ Cannot connect to Ollama. Please ensure Ollama is running.');
      console.error('   Run: ollama serve');
      await this.cleanup();
      process.exit(1);
    }
  }

  async browse(url) {
    console.log(`📍 Navigating to: ${url}`);
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
    const title = await this.page.title();
    console.log(`✓ Page loaded: ${title}\n`);
    return title;
  }

  async getPageContent() {
    // Get text content from the page
    const content = await this.page.evaluate(() => {
      // Remove script and style elements
      const clone = document.body.cloneNode(true);
      const scripts = clone.querySelectorAll('script, style, noscript');
      scripts.forEach(el => el.remove());
      
      // Get text content, limit to reasonable size
      const text = clone.innerText || clone.textContent;
      return text.substring(0, 5000); // Limit to avoid token overflow
    });
    
    return content;
  }

  async getPageInfo() {
    const info = await this.page.evaluate(() => {
      return {
        title: document.title,
        url: window.location.href,
        headings: Array.from(document.querySelectorAll('h1, h2, h3')).map(h => h.textContent.trim()).slice(0, 10),
        links: Array.from(document.querySelectorAll('a')).map(a => ({ text: a.textContent.trim(), href: a.href })).slice(0, 20)
      };
    });
    
    return info;
  }

  async chat(userMessage) {
    // Get current page context
    const pageInfo = await this.getPageInfo();
    const pageContent = await this.getPageContent();

    // Build context for LLM
    const systemContext = `You are Sartre, a philosophical web browsing assistant. You're currently viewing a webpage.

Current page information:
- Title: ${pageInfo.title}
- URL: ${pageInfo.url}
- Main headings: ${pageInfo.headings.join(', ')}

Page content excerpt:
${pageContent.substring(0, 2000)}

You can help the user:
1. Understand and summarize webpage content
2. Navigate to links (suggest URLs)
3. Extract specific information
4. Analyze and interpret the content

Be concise but insightful. Reference Sartre's existentialist philosophy when appropriate.`;

    // Add to conversation history
    this.conversationHistory.push({
      role: 'system',
      content: systemContext
    });
    
    this.conversationHistory.push({
      role: 'user',
      content: userMessage
    });

    console.log('🤔 Thinking...\n');

    try {
      // Call Ollama
      const response = await ollama.chat({
        model: this.model,
        messages: this.conversationHistory,
        stream: false
      });

      const assistantMessage = response.message.content;
      
      // Add response to history
      this.conversationHistory.push({
        role: 'assistant',
        content: assistantMessage
      });

      // Keep conversation history manageable
      if (this.conversationHistory.length > 10) {
        this.conversationHistory = this.conversationHistory.slice(-8);
      }

      return assistantMessage;
    } catch (error) {
      console.error('❌ Error communicating with Ollama:', error.message);
      return 'I apologize, but I encountered an error while processing your request.';
    }
  }

  async handleCommand(input) {
    const trimmedInput = input.trim().toLowerCase();
    
    // Special commands
    if (trimmedInput === 'exit' || trimmedInput === 'quit') {
      return null; // Signal to exit
    }
    
    if (trimmedInput === 'help') {
      return `Available commands:
- Type any question or request about the current page
- 'goto <url>' - Navigate to a URL
- 'screenshot' - Take a screenshot
- 'help' - Show this help
- 'exit' or 'quit' - Exit the application`;
    }
    
    if (trimmedInput.startsWith('goto ')) {
      const url = input.substring(5).trim();
      try {
        await this.browse(url);
        return `Successfully navigated to ${url}`;
      } catch (error) {
        return `Failed to navigate to ${url}: ${error.message}`;
      }
    }
    
    if (trimmedInput === 'screenshot') {
      const filename = `screenshot-${Date.now()}.png`;
      await this.page.screenshot({ path: filename, fullPage: true });
      return `Screenshot saved to ${filename}`;
    }
    
    // Otherwise, treat as a chat message
    return await this.chat(input);
  }

  async startInteractive() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: '🎭 sartre> '
    });

    console.log('💬 Interactive mode started. Type "help" for commands, "exit" to quit.\n');
    rl.prompt();

    rl.on('line', async (line) => {
      const input = line.trim();
      
      if (!input) {
        rl.prompt();
        return;
      }

      const response = await this.handleCommand(input);
      
      if (response === null) {
        console.log('\n👋 Au revoir!\n');
        rl.close();
        await this.cleanup();
        process.exit(0);
      }
      
      console.log(`\n${response}\n`);
      rl.prompt();
    });

    rl.on('close', async () => {
      await this.cleanup();
      process.exit(0);
    });
  }

  async cleanup() {
    console.log('\n🧹 Cleaning up...');
    if (this.browser) {
      await this.browser.close();
    }
  }
}

// Main execution
async function main() {
  const agent = new SartreAgent(options.model, options.headless);
  
  try {
    await agent.initialize();
    
    // Navigate to initial URL if provided
    if (options.url) {
      await agent.browse(options.url);
    } else {
      // Default to a simple page
      await agent.browse('https://example.com');
    }
    
    // Start interactive session
    await agent.startInteractive();
  } catch (error) {
    console.error('❌ Fatal error:', error.message);
    await agent.cleanup();
    process.exit(1);
  }
}

// Handle process termination
process.on('SIGINT', async () => {
  console.log('\n\n👋 Interrupted. Exiting...');
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n\n👋 Terminated. Exiting...');
  process.exit(0);
});

main();
