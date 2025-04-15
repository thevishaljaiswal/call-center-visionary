
import React from 'react';
import { TodoItem, useTodoData } from '@/hooks/useTodoData';
import TodoList from '@/components/todo/TodoList';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { PlusCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface TodoSectionProps {
  callId?: string;
  showAddForm?: boolean;
  limit?: number;
}

const TodoSection: React.FC<TodoSectionProps> = ({ 
  callId, 
  showAddForm = true,
  limit
}) => {
  const { 
    todoItems, 
    addTodoItem, 
    updateTodoItem, 
    deleteTodoItem,
    toggleTodoStatus,
    getTodosByCallId
  } = useTodoData();
  const { toast } = useToast();
  const navigate = useNavigate();

  const displayTodos = callId 
    ? getTodosByCallId(callId)
    : limit 
      ? todoItems.slice(0, limit)
      : todoItems;

  const handleToggle = (id: string) => {
    toggleTodoStatus(id);
    toast({
      description: "Task status updated",
    });
  };

  const handleAdd = (todo: Omit<TodoItem, 'id' | 'createdAt'>) => {
    const newTodo = addTodoItem(todo);
    toast({
      title: "Task added",
      description: `"${newTodo.title}" added to your tasks`,
    });
  };

  const handleUpdate = (id: string, updates: Partial<TodoItem>) => {
    updateTodoItem(id, updates);
    toast({
      description: "Task updated successfully",
    });
  };

  const handleDelete = (id: string) => {
    deleteTodoItem(id);
    toast({
      variant: "destructive",
      description: "Task deleted",
    });
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle>
            {callId ? 'Call Tasks' : 'To-Do List'}
          </CardTitle>
          <CardDescription>
            {callId 
              ? 'Tasks related to this call' 
              : 'Manage your upcoming tasks'}
          </CardDescription>
        </div>
        
        {limit && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate('/todos')}
            className="flex items-center gap-1"
          >
            <PlusCircle className="h-4 w-4" />
            View All
          </Button>
        )}
      </CardHeader>
      
      <CardContent>
        {!callId && !limit ? (
          <Tabs defaultValue="pending" className="mt-2">
            <TabsList className="mb-4">
              <TabsTrigger value="pending">Active</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="all">All</TabsTrigger>
            </TabsList>
            
            <TabsContent value="pending">
              <TodoList 
                todos={todoItems.filter(todo => todo.status === 'pending')}
                onToggle={handleToggle}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
                onAdd={handleAdd}
                showAddForm={showAddForm}
              />
            </TabsContent>
            
            <TabsContent value="completed">
              <TodoList 
                todos={todoItems.filter(todo => todo.status === 'completed')}
                onToggle={handleToggle}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
                onAdd={handleAdd}
                showAddForm={false}
              />
            </TabsContent>
            
            <TabsContent value="all">
              <TodoList 
                todos={todoItems}
                onToggle={handleToggle}
                onUpdate={handleUpdate}
                onDelete={handleDelete}
                onAdd={handleAdd}
                showAddForm={showAddForm}
              />
            </TabsContent>
          </Tabs>
        ) : (
          <TodoList 
            todos={displayTodos}
            onToggle={handleToggle}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            onAdd={handleAdd}
            showAddForm={showAddForm}
            callId={callId}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default TodoSection;
