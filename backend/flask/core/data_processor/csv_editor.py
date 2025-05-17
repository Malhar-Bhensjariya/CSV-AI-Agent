import pandas as pd
import logging
from typing import Dict, List

logger = logging.getLogger(__name__)

class CSVProcessor:
    def __init__(self, file_path: str):
        self.file_path = file_path
        self.df = self._safe_read_csv()

    def _safe_read_csv(self) -> pd.DataFrame:
        try:
            return pd.read_csv(self.file_path)
        except Exception as e:
            logger.error(f"Error reading CSV: {str(e)}")
            raise ValueError("Invalid CSV file format")

    def _validate_row_index(self, user_row: int) -> int:
        """Convert 1-based user row to 0-based index and validate."""
        index = user_row - 1
        if index < 0 or index >= len(self.df):
            raise ValueError(f"Invalid row number: {user_row} (valid range 1 to {len(self.df)})")
        return index

    def _validate_column(self, column: str):
        if column not in self.df.columns:
            raise ValueError(f"Column '{column}' not found")

    def save_changes(self):
        self.df.to_csv(self.file_path, index=False)

    def remove_row(self, user_row: int):
        index = self._validate_row_index(user_row)
        self.df = self.df.drop(index).reset_index(drop=True)
        self.save_changes()
        return f"Removed row {user_row}"

    def remove_column(self, column_name: str):
        self._validate_column(column_name)
        self.df = self.df.drop(columns=[column_name])
        self.save_changes()
        return f"Removed column '{column_name}'"

    def add_column(self, column_name: str, default_value: str = ""):
        if column_name in self.df.columns:
            raise ValueError(f"Column '{column_name}' already exists")
        self.df[column_name] = default_value
        self.save_changes()
        return f"Added column '{column_name}'"

    def add_row(self, row_values: List[str]):
        if len(row_values) != len(self.df.columns):
            raise ValueError("Row length must match number of columns")
        self.df.loc[len(self.df)] = row_values
        self.save_changes()
        return f"Added row: {row_values}"

    def set_cell_value(self, user_row: int, column_name: str, value: str):
        index = self._validate_row_index(user_row)
        self._validate_column(column_name)
        self.df.at[index, column_name] = value
        self.save_changes()
        return f"Set value at row {user_row}, column '{column_name}' to '{value}'"

    def set_row_values(self, user_row: int, new_values: List[str]):
        index = self._validate_row_index(user_row)
        if len(new_values) != len(self.df.columns):
            raise ValueError("Number of values must match number of columns")
        self.df.loc[index] = new_values
        self.save_changes()
        return f"Updated row {user_row} with {new_values}"

    def get_preview(self, rows: int = 5) -> Dict:
        return {
            "columns": self.df.columns.tolist(),
            "data": self.df.head(rows).fillna('').to_dict(orient='records'),
            "shape": self.df.shape
        }

    def get_summary(self) -> Dict:
        return {
            "stats": self.df.describe().to_dict(),
            "dtypes": self.df.dtypes.astype(str).to_dict(),
            "missing_values": self.df.isnull().sum().to_dict()
        }
