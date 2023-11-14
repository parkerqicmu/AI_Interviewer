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

# input example
number_of_questions = "3"
company_name = input("Enter the company name: ")
company_description = input("Enter the company description: ")
position_name = input("Enter the position name: ")
position_responsibilities = input("Enter the position responsibilities: ")
position_requirements = input("Enter the position requirements: ")
user_experience = input("Enter your experience: ")
question_type = "general"
difficulty = "easy"

# generate all questions at once
# input: an new conversation array, all job description, user experience, question type etc. in string
# output: array of questions
def generate_questions(history_conversation, number_of_questions, company_name, company_description, position_name, position_responsibilities, position_requirements, user_experience, question_type, difficulty):
    prompt_list = []
    question_list = []
    initial_prompt = f"Act like an experienced interviewer and job hunting coach. Your task is to generate {number_of_questions} likely interview questions based on the information about the {position_name} in {company_name}. Company information is: {company_description}; Position responsibilities are: {position_responsibilities} and position requirements are: {position_requirements}. Question type is {question_type}, difficulty in {difficulty}. Please incorporate personal information about the interviewee, whose experience is {user_experience}. Only present your interview questions, do not include any explanation or answer. Make sure the questions and answers are specific to the particular job description and user experience provided. If user did not provide any detail information, generate general questions."
    history_conversation.append({"role": "user", "content": initial_prompt})
    prompt_list.append({"role": "user", "content": initial_prompt})
    messages = prompt_list
    response = openai.ChatCompletion.create(
        model=model_id,
        messages=messages)
    openai_output=response['choices'][0]['message']['content']
    history_conversation.append({"role": "assistant", "content": openai_output})
    prompt_list.append({"role": "assistant", "content": openai_output})

    for i in range(int(number_of_questions)):
        question_prompt = f"please show me the question number {i+1}. Only show the question, no explanation or answer. "
        prompt_list.append({"role": "user", "content": question_prompt})
        messages = prompt_list
        response = openai.ChatCompletion.create(
            model=model_id,
            messages=messages)

        openai_output=response['choices'][0]['message']['content']
        prompt_list.append({"role": "assistant", "content": openai_output})
        question_list.append(openai_output)
    return question_list


# read history conversation and generate follow up questions
# input: array of conversation in {"role": xxx, "content": xxx} structure, company name, position name, question, answer
# output: string
def follow_up_questions(history_conversation, company_name, position_name, question, answer):
    feedback_prompt = f"Act like the interviewer and manager of {company_name} {position_name}, How would you respond to the interviewee's {answer} to the {question}, please give one follow up question, related to the previous question and user answer. If the interviewee asks you a question, answer the right question. Make sure the questions and answers are specific to the particular job description and user experience provided. Just reply user's question, do not include any explanation or answer."
    history_conversation.append({"role": "user", "content": feedback_prompt})
    messages = history_conversation
   
    response = openai.ChatCompletion.create(
        model=model_id,
        messages=messages)
    follow_up_question=response['choices'][0]['message']['content']
    history_conversation.append({"role": "assistant", "content": follow_up_question})
    return follow_up_question

# read history conversation and give feedback    
# input: array of conversation in {"role": xxx, "content": xxx} structure
# output: string
def generate_feedback(history_conversation):
    feedback_prompt = f"You are now a professional job search coach, please give a fair evaluation of the user's answers to the above questions and suggestions for improvement. If you are confused with users answer, you can ask follow-up questions. If you can't understand the user's answers, offer interview preparation advice for the position"
    history_conversation.append({"role": "user", "content": feedback_prompt})
    messages = history_conversation
   
    response = openai.ChatCompletion.create(
        model=model_id,
        messages=messages)
    feedback=response['choices'][0]['message']['content']
    history_conversation.append({"role": "assistant", "content": feedback})
    return feedback

############################################################################################################
# example of calling the functions

# new a empty conversation list
conversation_list = []
# generate questions
questions=generate_questions(conversation_list, number_of_questions, company_name, company_description, position_name, position_responsibilities, position_requirements, user_experience, question_type, difficulty)

# ask questions and get answers
for i in range(len(questions)):
    print(questions[i])
    user_input = input("Enter your answer: ")
    while user_input == "":
        user_input = input("Please enter your answer: ")
    conversation_list.append({"role": "assistant", "content":questions[i]})
    conversation_list.append({"role": "user", "content":user_input})

# give feedback
print(generate_feedback(conversation_list))

# ask follow up questions
while True:
    question = follow_up_questions(conversation_list, company_name, position_name, questions[i], user_input)
    print(question)
    prompt = input("Enter a your ansewer: ")
    if prompt.lower() == "stop":
        break
   