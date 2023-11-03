import openai

# Open the "secret-api-key.txt" file and read the API key line
with open("secret-api-key.txt", "r") as file:
    lines = file.readlines()
    api_key = None

    for i in range(len(lines) - 1):
        if lines[i].strip() == "OpenAI_key":
            api_key = lines[i + 1].strip()
            break

# Set the API key
openai.api_key = api_key

response = openai.ChatCompletion.create(
    model="gpt-4",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Who won the world series in 2020?"},
        {"role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020."},
        {"role": "user", "content": "Where was it played?"}
    ]
)

# Extract the generated text
generated_text = response.choices[0].message
print(generated_text)
