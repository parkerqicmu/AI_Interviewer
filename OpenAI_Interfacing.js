async function fetchGPT(message, temperature = 1) {
  const apiUrl = "https://api.openai.com/v1/chat/completions";

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${openaiApiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "system", content: "You are a helpful assistant." }, { role: "user", content: message }],
        temperature: temperature,
      }),
    });
    const data = await response.json();

    if (data.choices && data.choices.length > 0) {
      return data.choices[0].message.content;
    } else {
      console.error("Failed to retrieve reply from OpenAI API");
      throw new Error("Failed to retrieve reply from OpenAI API");
    }
  } catch (error) {
    console.error("Error fetching GPT reply:", error);
    return "Error: Failed to fetch GPT reply";
  }
}

// Transcribe audio, file_dir must be an local audio file
async function transcribeAudio_openai(file_dir) {
  try {
    const resp = await openai.createTranscription(
      fs.createReadStream(file_dir),
      "whisper-1"
    );
    return resp.data.text;
  } catch (Exception) {
    console.log("Exception: ", Exception);
  }
}

// JUST A DEMO, DO NOT PUT YOUR KEY HERE
// THIS REPO IS PUBLIC
// USE GITIGNORE
const openaiApiKey = 'YOUR_API_KEY'; // Replace with your actual OpenAI API key
userMessage = [
  {
    role: "system", content: "" 
  }, {
    role: "assistant", content: ""
  }, {
    role: "user", content: ""
  }];

const reply = await fetchGPT(userMessage);

console.log(reply);
