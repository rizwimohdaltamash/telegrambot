import TelegramBot from 'node-telegram-bot-api'
import OpenAIApi from 'openai'

// Replace with your Telegram bot token
const botToken = '6074321677:AAHZdjfPieXZB_ier2SLPVStau9hJl40nsw';

// Replace with your OpenAI API key
const openaiApiKey = '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';

const bot = new TelegramBot(botToken, { polling: true });
const openai = new OpenAIApi({ apiKey: openaiApiKey });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Welcome to AI chatbot');
});

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const userMessage = msg.text;

  try {
    const chatCompletion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: userMessage },
      ],
    });

    const botResponse = chatCompletion.choices[0].message.content;

    bot.sendMessage(chatId, botResponse);
  } catch (error) {
    console.error('Error generating response:', error);
    bot.sendMessage(
      chatId,
      'Sorry, I encountered an error while processing your request.'
    );
  }
});
