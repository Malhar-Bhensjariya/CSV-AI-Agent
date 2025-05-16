from agents.agent_executor import CSVAgentExecutor
from core.data_processor.csv_editor import CSVProcessor

class QueryRouter:
    def __init__(self):
        self.agent = CSVAgentExecutor()

    def route_query(self, file_path: str, question: str):
        try:
            return self.agent.execute(file_path, question)
        except FileNotFoundError:
            return "Error: File not found"
        except Exception as e:
            return f"Unexpected error: {str(e)}"

    def get_preview(self, file_path: str, rows: int):
        processor = CSVProcessor(file_path)
        return processor.get_preview(rows)