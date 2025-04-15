
import React from 'react';
import { TodoItem as TodoItemType } from '@/hooks/useTodoData';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, CheckCircle, AlertTriangle, AlarmClock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TodoItemProps {
  todo: TodoItemType;
  onToggle: (id: string) => void;
  onEdit?: (todo: TodoItemType) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onEdit }) => {
  const isOverdue = todo.status === 'pending' && todo.dueDate && new Date(todo.dueDate) < new Date();
  
  const priorityColors = {
    low: 'bg-blue-100 text-blue-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800'
  };

  return (
    <div 
      className={cn(
        "p-4 border rounded-lg transition-all",
        todo.status === 'completed' ? "bg-muted/30" : "bg-card",
        isOverdue ? "border-red-300" : "border-border",
        "hover:border-primary/50"
      )}
    >
      <div className="flex items-start gap-3">
        <Checkbox 
          checked={todo.status === 'completed'}
          onCheckedChange={() => onToggle(todo.id)}
          className="mt-1"
        />
        
        <div className="flex-1 space-y-2">
          <div 
            className={cn(
              "font-medium cursor-pointer",
              todo.status === 'completed' ? "line-through text-muted-foreground" : ""
            )}
            onClick={() => onEdit && onEdit(todo)}
          >
            {todo.title}
          </div>
          
          {todo.description && (
            <p className={cn(
              "text-sm text-muted-foreground",
              todo.status === 'completed' ? "line-through" : ""
            )}>
              {todo.description}
            </p>
          )}
          
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {todo.callId && (
              <Badge variant="outline" className="flex items-center gap-1">
                <AlarmClock className="h-3 w-3" />
                Call #{todo.callId}
              </Badge>
            )}
            
            {todo.dueDate && (
              <Badge 
                variant="outline" 
                className={cn(
                  "flex items-center gap-1",
                  isOverdue ? "text-red-500 border-red-200" : ""
                )}
              >
                <Calendar className="h-3 w-3" />
                {isOverdue ? "Overdue" : "Due"}: {todo.dueDate}
              </Badge>
            )}
            
            <Badge className={cn("flex items-center gap-1", priorityColors[todo.priority])}>
              {todo.priority === 'high' ? (
                <AlertTriangle className="h-3 w-3" />
              ) : (
                <Clock className="h-3 w-3" />
              )}
              {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)} Priority
            </Badge>
            
            {todo.status === 'completed' && (
              <Badge variant="outline" className="flex items-center gap-1 text-green-500 border-green-200">
                <CheckCircle className="h-3 w-3" />
                Completed
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
