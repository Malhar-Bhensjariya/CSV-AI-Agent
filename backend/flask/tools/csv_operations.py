from typing import List
from langchain_core.tools import tool
from core.data_processor.csv_editor import CSVProcessor

@tool
def csv_remove_row(file_path: str, row_index: int):
    """Remove a specific row from CSV. Row indices start at 0."""
    try:
        return CSVProcessor(file_path).remove_row(row_index)
    except Exception as e:
        return f"Error: {str(e)}"

@tool
def csv_remove_column(file_path: str, column_name: str):
    """Remove a specific column from CSV."""
    try:
        return CSVProcessor(file_path).remove_column(column_name)
    except Exception as e:
        return f"Error: {str(e)}"

@tool
def csv_add_column(file_path: str, column_name: str, default_value: str = ""):
    """Add new column to CSV with optional default values."""
    try:
        return CSVProcessor(file_path).add_column(column_name, default_value)
    except Exception as e:
        return f"Error: {str(e)}"

@tool
def csv_add_row(file_path: str, row_values: List[str]):
    """Add a new row to CSV. Provide values in order of existing columns."""
    try:
        return CSVProcessor(file_path).add_row(row_values)
    except Exception as e:
        return f"Error: {str(e)}"

@tool
def csv_set_cell(file_path: str, row_index: int, column_name: str, value: str):
    """Set value of a specific cell."""
    try:
        return CSVProcessor(file_path).set_cell_value(row_index, column_name, value)
    except Exception as e:
        return f"Error: {str(e)}"

@tool
def csv_set_row(file_path: str, row_index: int, new_values: List[str]):
    """Set an entire row with new values."""
    try:
        return CSVProcessor(file_path).set_row_values(row_index, new_values)
    except Exception as e:
        return f"Error: {str(e)}"

@tool
def csv_get_summary(file_path: str):
    """Get detailed statistics and structure of CSV data."""
    try:
        return CSVProcessor(file_path).get_summary()
    except Exception as e:
        return f"Error: {str(e)}"

def get_tools():
    return [
        csv_remove_row,
        csv_remove_column,
        csv_add_column,
        csv_add_row,
        csv_set_cell,
        csv_set_row,
        csv_get_summary
    ]
