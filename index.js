



 import { startUdpServer, createResponse, createTxtAnswer } from "denamed";

import  {GoogleGenerativeAI} from "@google/generative-ai"


const GEMINI_OPEN_AI = 'AIzaSyAa6JuIYRykPxnFu8yo9r5ZHeyMTZ3qXH4';



const genAI = new GoogleGenerativeAI(GEMINI_OPEN_AI);
const model = genAI.getGenerativeModel({model:"gemini-1.5-flash-8b"});



startUdpServer(
   async (query) => {
    console.log("Received Query:", query);

    const question = query.questions[0]; // Get the first question
    console.log(question)

    const prompt = `
     Answer the question in one word sentence .
    Question : ${question.name.split('.').join(' ')}`;  /// thsi will convert dots  used in the qustion in the spaces

    const result = await model.generateContent(prompt);
    if (question && question.type === "TXT") {
      console.log(`Responding to TXT query for: ${question.name}`);
      return createResponse(query, [
        createTxtAnswer(question, result.response.text()),
        
      ]);
    } else {
      console.log("Ignoring non-TXT query.");
      return createResponse(query, []); // Empty response for non-TXT queries
    }
  },
  { port: 53 } // Bind to port 53
);
 

 



/* onst express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { startUdpServer, createResponse, createTxtAnswer } = require('denamed');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const GEMINI_OPEN_AI = 'AIzaSyAa6JuIYRykPxnFu8yo9r5ZHeyMTZ3qXH4';
const genAI = new GoogleGenerativeAI(GEMINI_OPEN_AI);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-8b' });

const app = express();
app.use(cors());
app.use(bodyParser.json());

// API Endpoint for frontend
app.post('/query', async (req, res) => {
  const { domain } = req.body;

  if (!domain) {
    return res.status(400).json({ error: 'Domain name is required.' });
  }

  try {
    const prompt = `
      Answer the question in one word sentence.
      Question: ${domain.split('.').join(' ')}
    `;

    const result = await model.generateContent(prompt);
    const answer = result.response.text();

    res.json({ answer });
  } catch (error) {
    console.error('Error querying AI:', error);
    res.status(500).json({ error: 'Failed to resolve domain.' });
  }
});

// Start UDP server
startUdpServer(
  async (query) => {
    console.log('Received Query:', query);

    const question = query.questions[0]; // Get the first question
    if (question && question.type === 'TXT') {
      console.log(`Responding to TXT query for: ${question.name}`);
      const prompt = `
        Answer the question in one word sentence.
        Question: ${question.name.split('.').join(' ')}
      `;

      const result = await model.generateContent(prompt);
      return createResponse(query, [createTxtAnswer(question, result.response.text())]);
    } else {
      console.log('Ignoring non-TXT query.');
      return createResponse(query, []);
    }
  },
  { port: 53 }
);

// Start HTTP server
app.listen(3000, () => {
  console.log('HTTP server running on http://localhost:3000');
});

 */