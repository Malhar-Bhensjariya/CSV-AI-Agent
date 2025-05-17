# CSV-AI-Agent

A powerful AI assistant for CSV data analysis built with a React + TailwindCSS frontend and a Flask + LangChain backend.

---

## Project Structure
<pre> ``` csv-ai-agent/ │ ├── frontend/ # React frontend + TailwindCSS │ ├── public/ │ ├── src/ │ │ ├── assets/ │ │ ├── components/ │ │ │ ├── AppHeader.jsx │ │ │ ├── ChatWindow.jsx │ │ │ ├── FileUploader.jsx │ │ │ ├── MessageItem.jsx │ │ │ └── TableView.jsx │ │ ├── context/ │ │ │ ├── ChatContext.jsx │ │ │ └── FileContext.jsx │ │ ├── App.jsx │ │ ├── index.js │ │ └── config.js │ ├── package.json │ └── tailwind.config.js │ ├── backend/ │ ├── flask/ # Python Flask + LangChain backend │ │ ├── agents/ │ │ │ └── agent_executor.py # LangChain LLM logic │ │ ├── tools/ │ │ │ └── csv_operations.py # LangChain CSV operation tools │ │ ├── core/ │ │ │ ├── data_processor/ │ │ │ │ └── csv_editor.py # CSV manipulation logic (add/remove/set) │ │ │ └── router.py # Routes query → LLM agent │ │ ├── data/ │ │ │ └── uploaded/ # Stored CSVs │ │ ├── app.py # Flask entrypoint │ │ ├── requirements.txt │ │ └── .env │ ├── README.md └── .gitignore ``` </pre>

---

## Description

CSV-AI-Agent enables you to upload CSV files and interact with your data through natural language queries. Powered by LangChain and a custom Flask backend, it analyzes data on the fly, delivering insights in chat format.

---

## Features

- Upload and manage CSV files
- Ask natural language questions about your data
- Interactive chat interface with real-time responses
- View data in table format
- Backend powered by LangChain for flexible AI query handling

---

## Getting Started

### Frontend

```bash
cd frontend
npm install
npm start

cd backend/flask
pip install -r requirements.txt
python app.py

