import openai

# Read the API key from the "secret-api-key.txt" file
with open("secret-api-key.txt", "r") as file:
    api_key = file.read().strip()

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