
import React, { useState } from 'react';
import { TodoItem } from '@/hooks/useTodoData';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarIcon, Plus } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface TodoFormProps {
  onSubmit: (todo: Omit<TodoItem, 'id' | 'createdAt'>) => void;
  callId?: string;
  initialValues?: Partial<TodoItem>;
}

const TodoForm: React.FC<TodoFormProps> = ({ onSubmit, callId, initialValues }) => {
  const [title, setTitle] = useState(initialValues?.title || '');
  const [description, setDescription] = useState(initialValues?.description || '');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>(initialValues?.priority || 'medium');
  const [date, setDate] = useState<Date | undefined>(
    initialValues?.dueDate ? new Date(initialValues.dueDate) : undefined
  );
  const [showDetails, setShowDetails] = useState(!!initialValues);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) return;
    
    onSubmit({
      title: title.trim(),
      description: description.trim() || undefined,
      dueDate: date ? format(date, 'yyyy-MM-dd') : undefined,
      status: 'pending',
      priority,
      callId
    });
    
    // Reset form
    setTitle('');
    setDescription('');
    setPriority('medium');
    setDate(undefined);
    setShowDetails(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex gap-2">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1"
        />
        <Button type="submit" size="sm">
          <Plus className="h-4 w-4 mr-1" />
          Add
        </Button>
      </div>
      
      {!showDetails && (
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          onClick={() => setShowDetails(true)}
          className="text-xs text-muted-foreground"
        >
          + Add details
        </Button>
      )}
      
      {showDetails && (
        <div className="space-y-3 pt-2 animate-in fade-in-50 duration-150">
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description (optional)"
            className="resize-none"
            rows={2}
          />
          
          <div className="flex flex-wrap gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className={cn(
                    "justify-start text-left font-normal w-[170px]",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "MMM d, yyyy") : "Set due date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            
            <Select value={priority} onValueChange={(value: 'low' | 'medium' | 'high') => setPriority(value)}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low Priority</SelectItem>
                <SelectItem value="medium">Medium Priority</SelectItem>
                <SelectItem value="high">High Priority</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    </form>
  );
};

export default TodoForm;
