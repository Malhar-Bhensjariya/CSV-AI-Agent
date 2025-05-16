from langchain_core.tools import tool
from core.data_processor.csv_editor import CSVProcessor

@tool
def csv_remove_row(file_path: str, row_index: int):
    """Remove a specific row from CSV. Row indices start at 0."""
    try:
        processor = CSVProcessor(file_path)
        return processor.remove_row(row_index)
    except Exception as e:
        return f"Error: {str(e)}"

@tool
def csv_add_column(file_path: str, column_name: str, default_value: str = ""):
    """Add new column to CSV with optional default values."""
    try:
        processor = CSVProcessor(file_path)
        return processor.add_column(column_name, default_value)
    except Exception as e:
        return f"Error: {str(e)}"

@tool
def csv_get_summary(file_path: str):
    """Get detailed statistics and structure of CSV data."""
    try:
        processor = CSVProcessor(file_path)
        return processor.get_summary()
    except Exception as e:
        return f"Error: {str(e)}"

def get_tools():
    return [csv_remove_row, csv_add_column, csv_get_summary]