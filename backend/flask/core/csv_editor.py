import csv
from typing import List

def read_csv(file_path: str) -> List[List[str]]:
    with open(file_path, newline='', encoding='utf-8') as csvfile:
        return list(csv.reader(csvfile))

def write_csv(file_path: str, data: List[List[str]]) -> None:
    with open(file_path, 'w', newline='', encoding='utf-8') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerows(data)

def remove_row(file_path: str, row_index: int) -> None:
    data = read_csv(file_path)
    if 0 <= row_index < len(data):
        data.pop(row_index)
        write_csv(file_path, data)

def remove_column(file_path: str, col_index: int) -> None:
    data = read_csv(file_path)
    if data and 0 <= col_index < len(data[0]):
        for row in data:
            row.pop(col_index)
        write_csv(file_path, data)

def add_row(file_path: str, row_data: List[str]) -> None:
    data = read_csv(file_path)
    data.append(row_data)
    write_csv(file_path, data)

def add_column(file_path: str, col_data: List[str], header: str = "") -> None:
    data = read_csv(file_path)
    if header:
        data[0].append(header)
    for i, row in enumerate(data[1:], start=0):
        if i < len(col_data):
            row.append(col_data[i])
        else:
            row.append("")
    write_csv(file_path, data)

def set_cell(file_path: str, row_index: int, col_index: int, value: str) -> None:
    data = read_csv(file_path)
    if 0 <= row_index < len(data) and 0 <= col_index < len(data[0]):
        data[row_index][col_index] = value
        write_csv(file_path, data)

def set_row(file_path: str, row_index: int, row_data: List[str]) -> None:
    data = read_csv(file_path)
    if 0 <= row_index < len(data):
        data[row_index] = row_data
        write_csv(file_path, data)
