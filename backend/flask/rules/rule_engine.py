import re

def parse_command(question):
    patterns = {
        'remove_row': r'remove row (\d+)',
        'remove_column': r'remove column (\w+)',
        'add_row': r'add row (.+)',
        'add_column': r'add column (\w+)',
        'set_cell': r'set cell (\d+),(\w+) to (.+)',
        'set_row': r'set row (\d+) to (.+)',
    }
    for command, pattern in patterns.items():
        match = re.match(pattern, question, re.IGNORECASE)
        if match:
            return {'action': command, 'args': match.groups()}
    return None
