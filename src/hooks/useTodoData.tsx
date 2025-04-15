
import { useState } from 'react';

export interface TodoItem {
  id: string;
  callId?: string;
  title: string;
  description?: string;
  dueDate?: string;
  status: 'pending' | 'completed';
  createdAt: string;
  priority: 'low' | 'medium' | 'high';
}

export function useTodoData() {
  // Initial sample data
  const [todoItems, setTodoItems] = useState<TodoItem[]>([
    {
      id: '1',
      callId: '1002',
      title: 'Follow up on technical issue',
      description: 'Check if the customer was able to resolve their connection problems',
      dueDate: '2025-04-17',
      status: 'pending',
      createdAt: '2025-04-15',
      priority: 'high'
    },
    {
      id: '2',
      callId: '1004',
      title: 'Escalation follow-up',
      description: 'Follow up with technical team about account access issue',
      dueDate: '2025-04-16',
      status: 'pending',
      createdAt: '2025-04-15',
      priority: 'high'
    },
    {
      id: '3',
      title: 'Update product documentation',
      description: 'Review and update customer-facing product documentation',
      dueDate: '2025-04-20',
      status: 'pending',
      createdAt: '2025-04-15',
      priority: 'medium'
    }
  ]);

  // Add a new to-do item
  const addTodoItem = (todo: Omit<TodoItem, 'id' | 'createdAt'>) => {
    const newTodo: TodoItem = {
      ...todo,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    setTodoItems(current => [newTodo, ...current]);
    return newTodo;
  };

  // Update a to-do item
  const updateTodoItem = (id: string, updates: Partial<TodoItem>) => {
    setTodoItems(current => 
      current.map(item => 
        item.id === id ? { ...item, ...updates } : item
      )
    );
  };

  // Delete a to-do item
  const deleteTodoItem = (id: string) => {
    setTodoItems(current => current.filter(item => item.id !== id));
  };

  // Toggle to-do status
  const toggleTodoStatus = (id: string) => {
    setTodoItems(current => 
      current.map(item => 
        item.id === id 
          ? { ...item, status: item.status === 'completed' ? 'pending' : 'completed' } 
          : item
      )
    );
  };

  // Get to-do items for a specific call
  const getTodosByCallId = (callId: string) => {
    return todoItems.filter(item => item.callId === callId);
  };

  return {
    todoItems,
    addTodoItem,
    updateTodoItem,
    deleteTodoItem,
    toggleTodoStatus,
    getTodosByCallId
  };
}
