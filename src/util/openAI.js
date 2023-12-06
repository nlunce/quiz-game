// import OpenAI from "openai";

// export async function openAISetup(apiKey) {
//   try {
//     if (!apiKey) {
//       throw new Error("API key is missing");
//     }

//     // Log the API key to ensure it's correct
//     console.log("API Key:", apiKey);

//     // Set dangerouslyAllowBrowser to true to allow usage in browser-like environments
//     const openai = new OpenAI({ apiKey, dangerouslyAllowBrowser: true });

//     // Log the OpenAI instance to ensure it's created
//     console.log("OpenAI Instance:", openai);

//     // Check if the Completion object is available

//     const completion = await openai.chat.completions.create({
//       messages: [{ role: "system", content: "You are a helpful assistant." }],
//       model: "gpt-3.5-turbo",
//     });

//     // If the request is successful, log the response
//     console.log("API Test Response:", completion.choices[0]);

//     // Return the openai instance
//     return openai;
//   } catch (error) {
//     // If there's an error, log it and return null or throw an error
//     console.error("Error during OpenAI setup:", error);
//     return null;
//   }
// }

// //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
