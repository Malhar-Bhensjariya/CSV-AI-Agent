from rules.rule_engine import parse_command
from agents.csv_agent import answer_question

def route_query(file_path, question):
    command = parse_command(question)
    if command:
        # Placeholder: You will implement command-based CSV editing here.
        return f"Executed command: {command}"
    else:
        return answer_question(file_path, question)
