from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.agents import AgentExecutor, create_tool_calling_agent
from langchain_core.prompts import ChatPromptTemplate
from tools.csv_operations import get_tools
import google.generativeai as genai  # Add direct Gemini imports
import os

class CSVAgentExecutor:
    def __init__(self):
        # Initialize Gemini first with proper credentials
        genai.configure(api_key=os.environ["GEMINI_API_KEY"])  # Direct configuration
        
        # Create Langchain LLM wrapper
        self.llm = ChatGoogleGenerativeAI(
            model="gemini-2.5-pro-preview-05-06",
            temperature=0,
            convert_system_message_to_human=True,
            google_api_key=os.environ["GEMINI_API_KEY"]  # Explicit key pass
        )
        
        # Rest of the initialization remains the same
        self.prompt = ChatPromptTemplate.from_messages([
            ("system", """Analyze CSV requests with these rules:
1. Use tools for data modifications
2. For analytical questions, first get summary with csv_get_summary
3. Always verify data existence before operations
4. Report errors clearly"""),
            ("human", "{input}"),
            ("placeholder", "{agent_scratchpad}"),
        ])
        
        self.tools = get_tools()
        self.agent = create_tool_calling_agent(self.llm, self.tools, self.prompt)
        self.executor = AgentExecutor(
            agent=self.agent, 
            tools=self.tools,
            verbose=True,
            handle_parsing_errors=True,
            return_intermediate_steps=True
        )

    def execute(self, file_path: str, question: str):
        try:
            result = self.executor.invoke({
                "input": f"CSV Path: {file_path}\nQuestion: {question}",
                "file_path": file_path
            })
            
            if result.get('intermediate_steps'):
                return self._format_steps(result['intermediate_steps'])
            return result.get('output', 'Operation completed successfully')
        except Exception as e:
            return f"Processing error: {str(e)}"

    def _format_steps(self, steps):
        return "\n".join([
            f"Step {i+1}: {action.tool} - {result}"
            for i, (action, result) in enumerate(steps)
        ])