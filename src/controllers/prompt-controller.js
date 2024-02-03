const openai = require("../config/openai");

module.exports = class OpenAI {
  async sendText(req, res) {
    const openaiApi = openai.configuration();

    try {
        const response = await openaiApi.createCompletion(openai.textCompletion(req.body));
        return res.status(200).json({
            success: true,
            data: response.data.choices[0].text,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.response ? error.response : "An error occurred while sending the text to OpenAI. Please try again.",
        });
    }
  }
};
