
// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

import {
  GoogleGenAI,
} from '@google/genai';

async function main(prompt) {
  const ai = new GoogleGenAI({
    apiKey: "AIzaSyCofXWjADPwMl2buLb___EwsRgwiyM0gnw",
  });
  const config = {
    responseMimeType: 'text/plain',
  };
  const model = 'gemini-2.0-flash-lite';
  const contents = [
    {
      role: 'user',
      parts: [
        {
          text: prompt,
        },
      ],
    },
  ];

  const response = await ai.models.generateContentStream({
    model,
    config,
    contents,
  });
  let resultText = '';
  for await (const chunk of response) {
    const text = chunk.candidates?.[0]?.content?.parts?.[0]?.text;
    if (text) {
      console.log(text);
      resultText += text;
    }
  }

  return resultText;
}

export default main;
