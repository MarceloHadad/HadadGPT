const inputPrompt = require("../models/input-prompt");
const openai = require("../config/openai");

module.exports = {
  async sendText(req, res) {
    const openaiApi = openai.configuration();
    const inputModel = new inputPrompt(req.body);

    try {
      const response = await openaiApi.createCompletion(
        openai.textCompletion(inputModel)
      );
      return res.status(200).json({
        success: true,
        data: response.data.choices[0].text,
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
