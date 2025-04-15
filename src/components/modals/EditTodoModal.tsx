
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { TodoItem } from '@/hooks/useTodoData';
import TodoForm from '../todo/TodoForm';
import { AlertTriangle } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface EditTodoModalProps {
  isOpen: boolean;
  onClose: () => void;
  todo: TodoItem | null;
  onUpdate: (updates: Partial<TodoItem>) => void;
  onDelete: (id: string) => void;
}

const EditTodoModal: React.FC<EditTodoModalProps> = ({
  isOpen,
  onClose,
  todo,
  onUpdate,
  onDelete,
}) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);

  if (!todo) return null;

  const handleSubmit = (data: Omit<TodoItem, 'id' | 'createdAt'>) => {
    onUpdate({
      title: data.title,
      description: data.description,
      dueDate: data.dueDate,
      priority: data.priority,
      callId: data.callId,
    });
    onClose();
  };

  const handleDelete = () => {
    onDelete(todo.id);
    setIsDeleteDialogOpen(false);
    onClose();
  };

  const handleToggleStatus = () => {
    onUpdate({
      status: todo.status === 'completed' ? 'pending' : 'completed',
    });
    onClose();
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
          </DialogHeader>

          <div className="py-4">
            <TodoForm
              onSubmit={handleSubmit}
              initialValues={todo}
              callId={todo.callId}
            />
          </div>

          <DialogFooter className="flex justify-between gap-4 sm:justify-between">
            <div className="flex gap-2">
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => setIsDeleteDialogOpen(true)}
              >
                Delete
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleToggleStatus}
              >
                Mark as {todo.status === 'completed' ? 'Pending' : 'Completed'}
              </Button>
            </div>
            <Button type="button" onClick={onClose}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Delete Task
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this task? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default EditTodoModal;
