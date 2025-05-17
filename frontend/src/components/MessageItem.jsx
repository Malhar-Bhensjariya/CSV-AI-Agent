import React from 'react';
import { User, Bot } from 'lucide-react';

export const MessageItem = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`flex max-w-[80%] ${
          isUser
            ? 'bg-blue-500 text-white rounded-t-lg rounded-bl-lg'
            : 'bg-gray-700 text-white rounded-t-lg rounded-br-lg'
        } p-3 shadow-sm`}
      >
        <div className="flex-shrink-0 mr-2">
          {isUser ? (
            <User size={20} className="text-white" />
          ) : (
            <Bot size={20} className="text-blue-400" />
          )}
        </div>
        <div className="flex-1">
          {message.content}

          {message.data && message.data.type === 'table' && (
            <div className="mt-2 overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-600 text-sm">
                <thead className="bg-gray-800">
                  <tr>
                    {message.data.headers.map((header, i) => (
                      <th
                        key={i}
                        className="px-4 py-2 text-left text-gray-300 font-semibold uppercase tracking-wide"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-gray-900 divide-y divide-gray-700">
                  {message.data.rows.map((row, i) => (
                    <tr key={i} className="hover:bg-gray-800">
                      {row.map((cell, j) => (
                        <td key={j} className="px-4 py-2 text-gray-300">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
