import os
from google import genai
from google.genai import types

# Initialize Gemini client once globally
client = genai.Client(api_key=os.environ.get("GEMINI_API_KEY"))
MODEL_NAME = "gemini-2.5-pro-preview-05-06"

def generate_gemini_response(prompt: str) -> str:
    contents = [
        types.Content(
            role="user",
            parts=[types.Part.from_text(text=prompt)],
        ),
    ]
    generate_content_config = types.GenerateContentConfig(response_mime_type="text/plain")
    result_text = ""

    for chunk in client.models.generate_content_stream(
        model=MODEL_NAME,
        contents=contents,
        config=generate_content_config,
    ):
        result_text += chunk.text
    return result_text

def answer_question(file_path, question):
    # Load CSV content as text (basic for demo)
    with open(file_path, 'r', encoding='utf-8') as f:
        csv_text = f.read()

    prompt = f"""You are an expert CSV data assistant. Here is the CSV data:
{csv_text}

Answer the following question based on the CSV data above:
{question}

Provide a concise and accurate response."""
    response = generate_gemini_response(prompt)
    return response
