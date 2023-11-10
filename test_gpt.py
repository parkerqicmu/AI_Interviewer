import openai
from queue import Queue

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

model_id="gpt-4-1106-preview"

conversation_queue = Queue()

while True:
    prompt = input("Enter a prompt: ")
    if prompt.lower() == "stop":
        break

    conversation_queue.put({"role": "user", "content": prompt})

    messages = list(conversation_queue.queue)
    # print(messages)

    response = openai.ChatCompletion.create(
        model=model_id,
        messages=messages)
    
    message_str=response['choices'][0]['message']['content']
    print(message_str)
    
    conversation_queue.put({"role": "assistant", "content": message_str})

