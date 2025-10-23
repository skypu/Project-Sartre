# Usage Examples

## Example 1: Browse Hacker News

```bash
npm start -- --url https://news.ycombinator.com
```

Interactive session:
```
🎭 sartre> What are the top 3 stories on this page?
🎭 sartre> Can you summarize the first story?
🎭 sartre> goto https://github.com
🎭 sartre> What is this website about?
```

## Example 2: Research a Topic

```bash
npm start -- --url https://en.wikipedia.org/wiki/Existentialism --model mistral
```

Interactive session:
```
🎭 sartre> Summarize the main points of existentialism
🎭 sartre> Who are the key philosophers mentioned?
🎭 sartre> screenshot
```

## Example 3: Headless Mode (for automation)

```bash
npm start -- --url https://example.com --headless
```

## Example 4: Different LLM Models

Using Mistral:
```bash
npm start -- --model mistral
```

Using Phi:
```bash
npm start -- --model phi
```

Make sure to pull the model first:
```bash
ollama pull mistral
ollama pull phi
```

## Example Session Output

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

🎭 sartre> What is this page about?

🤔 Thinking...

This is Hacker News, a social news website focusing on computer science 
and entrepreneurship. It's run by Y Combinator and features user-submitted 
stories about technology, startups, and programming. Users can vote on 
submissions and engage in discussions.

The page currently shows:
- Top Stories section
- Links to various technology articles
- Comment discussions
- User engagement metrics

🎭 sartre> Can you list the top 5 story titles?

🤔 Thinking...

Based on the current page content, here are 5 story titles:
1. [First story title]
2. [Second story title]
3. [Third story title]
...

🎭 sartre> goto https://github.com

📍 Navigating to: https://github.com
✓ Page loaded: GitHub: Let's build from here

Successfully navigated to https://github.com

🎭 sartre> What does this website offer?

🤔 Thinking...

GitHub is a development platform that provides:
- Version control using Git
- Code collaboration features
- Project management tools
- CI/CD automation
- Code review capabilities
- Open source hosting

It's where millions of developers build, share, and collaborate on software.

🎭 sartre> screenshot

Screenshot saved to screenshot-1729674321234.png

🎭 sartre> exit

👋 Au revoir!

🧹 Cleaning up...
```

## Tips

1. **Ask specific questions** - The LLM works better with focused queries
2. **Navigate thoughtfully** - Use `goto` to move to relevant pages
3. **Save information** - Use `screenshot` to capture important content
4. **Different models** - Try different Ollama models for varied responses
5. **Existential queries** - The agent is themed after Sartre, so philosophical questions are welcome!
