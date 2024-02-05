const userInputPrompt = require("../models/user-input-prompt");
const openai = require("../config/openai");

module.exports = {
  async sendText(req, res) {
    const openaiApi = openai.configuration();
    const userInput = new userInputPrompt(req.body);

    try {
      const response = await openaiApi.chat.completions.create(
        openai.textCompletion(inputModel)
      );
      return res.status(200).json({
        success: true,
        data: response.choices[0].message.content,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.response
          ? error.response.data
          : "An error occurred while sending the text to OpenAI. Please try again.",
      });
    }
  },
};
