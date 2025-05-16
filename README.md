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
│   ├── node/                    # Node.js middleware/API
│   │   ├── routes/
│   │   │   └── chatbotRoutes.js
│   │   ├── controllers/
│   │   │   └── chatbotController.js
│   │   ├── utils/
│   │   │   └── fileHandler.js
│   │   ├── server.js
│   │   └── .env
│
│   ├── flask/                   # Python Flask + LangChain backend
│   │   ├── agents/
│   │   │   └── csv_agent.py     # LangChain LLM logic
│   │   ├── rules/
│   │   │   └── rule_engine.py   # Regex & simple command handler
│   │   ├── core/
│   │   │   ├── csv_editor.py    # CSV manipulation logic (add/remove/set)
│   │   │   └── router.py        # Routes query → rule_engine or LLM agent
│   │   ├── data/
│   │   │   └── uploaded/        # Stored CSVs
│   │   ├── app.py               # Flask entrypoint
│   │   ├── requirements.txt
│   │   └── .env
│
├── README.md
└── .gitignore
