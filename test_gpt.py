import openai
import pymongo
from pymongo import MongoClient
from queue import Queue

from main_routes import db

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

# create a queue to store the prompt conversation

number_of_questions = "2"
company_name = input("Enter the company name: ")
company_description = input("Enter the company description: ")
position_name = input("Enter the position name: ")
position_responsibilities = input("Enter the position responsibilities: ")
position_requirements = input("Enter the position requirements: ")
user_experience = input("Enter your experience: ")
question_type = "general"
difficulty = "easy"

def question_generation(number_of_questions, company_name, company_description, position_name, position_responsibilities, position_requirements, user_experience, question_type, difficulty):
    conversation_queue = Queue()

    # initial prompt, tell ai its role and the task. generate all the questions
    initial_prompt = f"Act like an experienced interviewer and job hunting coach. Your task is to generate {number_of_questions} likely interview questions based on the information about the {position_name} in {company_name}. Company information is: {company_description}; Position responsibilities are: {position_responsibilities} and position requirements are: {position_requirements}. Question type is {question_type}, difficulty in {difficulty}. Please incorporate personal information about the interviewee, whose experience is {user_experience}. Only present your interview questions, do not include any explanation or answer. Make sure the questions and answers are specific to the particular job description and user experience provided. If user did not provide any detail information, generate general questions."
    conversation_queue.put({"role": "user", "content": initial_prompt})
    messages = list(conversation_queue.queue)
        # print(messages)
    response = openai.ChatCompletion.create(
        model=model_id,
        messages=messages)
    openai_output=response['choices'][0]['message']['content']
    conversation_queue.put({"role": "assistant", "content": openai_output})

    # display the questions and ask user to answer
    for i in range(int(number_of_questions)):
        question_prompt = f"please show me the question number {i+1}. Only show the question, no explanation or answer. "
        conversation_queue.put({"role": "user", "content": question_prompt})
        messages = list(conversation_queue.queue)
        response = openai.ChatCompletion.create(
            model=model_id,
            messages=messages)

        openai_output=response['choices'][0]['message']['content']
        print(openai_output)
        conversation_queue.put({"role": "assistant", "content": openai_output})

    # user answer the questions
        user_input = input("Enter your answer: ")
        while user_input == "":
            user_input = input("Please enter your answer: ")
        user_prompt = f"please mark the answer to the question number {i} is {user_input}"
        conversation_queue.put({"role": "user", "content": user_prompt})
        messages = list(conversation_queue.queue)
        response = openai.ChatCompletion.create(
            model=model_id,
            messages=messages)
        
    # generate feedback
    feedback_prompt = f"You are now a professional job search coach, please give a fair evaluation of the user's answers to the above questions and suggestions for improvement. If you are confused with users answer, you can ask follow-up questions. If you can't understand the user's answers, offer interview preparation advice for the position"
    conversation_queue.put({"role": "user", "content": feedback_prompt})
    messages = list(conversation_queue.queue)
    # print(messages)
    response = openai.ChatCompletion.create(
        model=model_id,
        messages=messages)
    openai_output=response['choices'][0]['message']['content']
    print(openai_output)
    conversation_queue.put({"role": "assistant", "content": openai_output})

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

question_generation(number_of_questions, company_name, company_description, position_name, position_responsibilities, position_requirements, user_experience, question_type, difficulty)