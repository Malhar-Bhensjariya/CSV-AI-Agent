import React, { useState, useEffect } from 'react';
import { ArrowDown, ArrowUp, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { useFileContext } from '../context/FileContext';

export const TableView = () => {
  const { activeFile } = useFileContext();
  console.log('Active file:', activeFile);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // Reset table state when data changes
  useEffect(() => {
    setSearchTerm('');
    setSortColumn(null);
    setSortDirection('asc');
    setCurrentPage(1);
  }, [activeFile?.data]);

  const headers = activeFile?.data?.headers || [];
  const rows = activeFile?.data?.rows || [];

  const filteredRows = rows.filter(row =>
    row.some(cell =>
      cell?.toString().toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const sortedRows = [...filteredRows].sort((a, b) => {
    if (sortColumn === null) return 0;
    
    const valueA = a[sortColumn];
    const valueB = b[sortColumn];
    
    // Handle null/undefined values
    if (valueA === null || valueA === undefined) return 1;
    if (valueB === null || valueB === undefined) return -1;

    // Improved sorting logic
    if (typeof valueA === 'number' && typeof valueB === 'number') {
      return sortDirection === 'asc' ? valueA - valueB : valueB - valueA;
    }
    
    return sortDirection === 'asc' 
      ? String(valueA).localeCompare(String(valueB))
      : String(valueB).localeCompare(String(valueA));
  });

  const totalPages = Math.ceil(sortedRows.length / rowsPerPage);
  const paginatedRows = sortedRows.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleSort = (columnIndex) => {
    if (sortColumn === columnIndex) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnIndex);
      setSortDirection('asc');
    }
  };

  return (
    <div className="w-full md:w-1/2 border-t md:border-t-0 border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden dark:bg-gray-700">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-white">
          Data View
          {activeFile && (
            <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
              ({rows.length} rows)
            </span>
          )}
        </h2>
        
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search all columns..."
            className="pl-8 pr-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            aria-label="Search table data"
          />
          <Search 
            size={16} 
            className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" 
          />
        </div>
      </div>

      {!activeFile ? (
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center text-gray-500 dark:text-gray-400">
          <div className="mb-4">
            <Search size={32} className="text-gray-400 dark:text-gray-500" />
          </div>
          <p className="text-lg">No file selected</p>
          <p className="text-sm mt-2">Upload and select a CSV file to view data</p>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800 sticky top-0">
                <tr>
                  {headers.map((header, index) => (
                    <th
                      key={index}
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      onClick={() => handleSort(index)}
                      aria-sort={
                        sortColumn === index 
                          ? sortDirection === 'asc' ? 'ascending' : 'descending'
                          : 'none'
                      }
                    >
                      <div className="flex items-center space-x-2">
                        <span>{header}</span>
                        {sortColumn === index && (
                          sortDirection === 'asc' ? (
                            <ArrowUp size={14} className="text-blue-500 dark:text-blue-400" />
                          ) : (
                            <ArrowDown size={14} className="text-blue-500 dark:text-blue-400" />
                          )
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                {paginatedRows.map((row, rowIndex) => (
                  <tr 
                    key={rowIndex} 
                    className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                  >
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className="px-4 py-2 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300"
                      >
                        {cell ?? <span className="text-gray-400 dark:text-gray-500">-</span>}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between bg-gray-50 dark:bg-gray-800">
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Page {currentPage} of {totalPages} •{' '}
                {(currentPage - 1) * rowsPerPage + 1} -{' '}
                {Math.min(currentPage * rowsPerPage, sortedRows.length)} of{' '}
                {sortedRows.length} results
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded-md ${
                    currentPage === 1
                      ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  } transition-colors`}
                  aria-label="Previous page"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded-md ${
                    currentPage === totalPages
                      ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  } transition-colors`}
                  aria-label="Next page"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};