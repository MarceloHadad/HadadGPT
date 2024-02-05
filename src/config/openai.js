const OpenAI = require("openai");

module.exports = class openai {
  static configuration() {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
    return openai;
  }

  static textCompletion({ prompt }) {
    return {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: `${prompt}`,
        },
      ],
    };
  }
};
