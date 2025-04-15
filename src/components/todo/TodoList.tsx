
import React, { useState } from 'react';
import { TodoItem as TodoItemType } from '@/hooks/useTodoData';
import TodoItem from './TodoItem';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, CheckSquare, ListTodo } from 'lucide-react';
import TodoForm from './TodoForm';
import EditTodoModal from '../modals/EditTodoModal';

interface TodoListProps {
  todos: TodoItemType[];
  onToggle: (id: string) => void;
  onUpdate: (id: string, updates: Partial<TodoItemType>) => void;
  onDelete: (id: string) => void;
  onAdd: (todo: Omit<TodoItemType, 'id' | 'createdAt'>) => void;
  showAddForm?: boolean;
  callId?: string;
}

const TodoList: React.FC<TodoListProps> = ({ 
  todos, 
  onToggle, 
  onUpdate, 
  onDelete, 
  onAdd, 
  showAddForm = true,
  callId 
}) => {
  const [filter, setFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'low' | 'medium' | 'high'>('all');
  const [editingTodo, setEditingTodo] = useState<TodoItemType | null>(null);

  // Filter todos
  const filteredTodos = todos.filter(todo => {
    // Text filter
    const matchesText = todo.title.toLowerCase().includes(filter.toLowerCase()) ||
                       (todo.description?.toLowerCase().includes(filter.toLowerCase()) || false);
    
    // Status filter
    const matchesStatus = statusFilter === 'all' || todo.status === statusFilter;
    
    // Priority filter
    const matchesPriority = priorityFilter === 'all' || todo.priority === priorityFilter;
    
    return matchesText && matchesStatus && matchesPriority;
  });

  const handleEdit = (todo: TodoItemType) => {
    setEditingTodo(todo);
  };

  const handleUpdate = (updates: Partial<TodoItemType>) => {
    if (editingTodo) {
      onUpdate(editingTodo.id, updates);
      setEditingTodo(null);
    }
  };

  return (
    <div className="space-y-4">
      {showAddForm && (
        <div className="p-4 border rounded-lg bg-card/50">
          <TodoForm onSubmit={onAdd} callId={callId} />
        </div>
      )}
      
      {/* Filters */}
      {todos.length > 0 && (
        <div className="flex flex-wrap gap-2 items-center">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search todos..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="pl-8"
            />
          </div>
          
          <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as any)}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={priorityFilter} onValueChange={(value) => setPriorityFilter(value as any)}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
      
      {/* Todo list */}
      {filteredTodos.length > 0 ? (
        <div className="space-y-2">
          {filteredTodos.map(todo => (
            <TodoItem 
              key={todo.id} 
              todo={todo} 
              onToggle={onToggle}
              onEdit={handleEdit}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          {filter || statusFilter !== 'all' || priorityFilter !== 'all' ? (
            <>
              <Search className="h-12 w-12 text-muted-foreground mb-2" />
              <h3 className="text-lg font-medium">No matching tasks</h3>
              <p className="text-muted-foreground">Try adjusting your filters</p>
            </>
          ) : (
            <>
              {todos.length === 0 ? (
                <>
                  <ListTodo className="h-12 w-12 text-muted-foreground mb-2" />
                  <h3 className="text-lg font-medium">No tasks yet</h3>
                  <p className="text-muted-foreground">Add your first task above</p>
                </>
              ) : (
                <>
                  <CheckSquare className="h-12 w-12 text-muted-foreground mb-2" />
                  <h3 className="text-lg font-medium">All tasks complete!</h3>
                  <p className="text-muted-foreground">Great job!</p>
                </>
              )}
            </>
          )}
        </div>
      )}
      
      {/* Edit Modal */}
      <EditTodoModal
        isOpen={!!editingTodo}
        onClose={() => setEditingTodo(null)}
        todo={editingTodo}
        onUpdate={handleUpdate}
        onDelete={onDelete}
      />
    </div>
  );
};

export default TodoList;
