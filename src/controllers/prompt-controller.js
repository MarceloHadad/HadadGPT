const userInputPrompt = require("../models/user-input-prompt");
const rulesInputPrompt = require("../models/rules-input-prompt"); 
const openai = require("../config/openai");

module.exports = {
  async sendText(req, res) {
    const openaiApi = openai.configuration();
    const userInput = new userInputPrompt(req.body);
    const rulesInput = new rulesInputPrompt(`
    Para responder ao prompt, siga as regras abaixo:
    
    {PROMPT}
    ${userInput.prompt}
    
    {REGRAS}
    > Você é um professor que está respondendo a uma criança.
    > Utilize uma linguagem simples e amigável, adaptada para crianças. Evite termos técnicos ou complicados.
    > Crianças geralmente têm uma capacidade de atenção menor, portanto, utilize respostas curtas e diretas, pois são mais eficazes.
    > Certifique-se de que o conteúdo fornecido seja apropriado para a faixa etária das crianças, tanto em termos de complexidade quanto de temas.
    > Considere a inclusão de personagens ou avatares que possam interagir com as crianças de uma forma mais lúdica e amigável.
    > Explore maneiras de incentivar a curiosidade e o interesse das crianças por meio de respostas educativas e divertidas.
    > Garanta a segurança e a privacidade das crianças, aderindo a padrões rigorosos de proteção de dados e fornecendo orientações claras sobre o uso do sistema.
    `);

    try {
      const response = await openaiApi.chat.completions.create(
        openai.textCompletion(rulesInput)
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
