# CSV-AI-Agent

csv-agent-chatbot/
│
├── frontend/                    # React frontend
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── ChatWindow.jsx
│   │   │   ├── FileUploader.jsx
│   │   │   └── TableView.jsx
│   │   ├── theme/
│   │   │   └── useTheme.js
│   │   ├── api/
│   │   │   └── chatbot.js
│   │   ├── pages/
│   │   │   └── Home.jsx
│   │   ├── App.jsx
│   │   ├── index.js
│   │   └── config.js
│   ├── package.json
│   └── tailwind.config.js
│
├── backend/
│   ├── flask/                   # Python Flask + LangChain backend
│   │   ├── agents/
│   │   │   └── agent_executor.py     # LangChain LLM logic
│   │   ├── tools/
│   │   │   └── csv_operations.py   # Lanchain CSV operation tools
│   │   ├── core/
│   │   │   ├── data_processor
|   |   |   |   ├── csv_editor.py   # CSV manipulation logic (add/remove/set)
│   │   │   └── router.py        # Routes query → LLM agent
│   │   ├── data/
│   │   │   └── uploaded/        # Stored CSVs
│   │   ├── app.py               # Flask entrypoint
│   │   ├── requirements.txt
│   │   └── .env
│
├── README.md
└── .gitignore
