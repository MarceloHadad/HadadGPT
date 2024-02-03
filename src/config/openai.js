const openai = require("openai");

module.exports = class openai {
  static configuration() {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    return new OpenAiApi(configuration);
  }

  static textCompletion({ prompt }) {
    return {
      engine: "text-davinci-003",
      prompt: `${prompt}`,
      maxTokens: 256,
      temperature: 0,
    };
  }
};

const response = await openai.createCompletion();
