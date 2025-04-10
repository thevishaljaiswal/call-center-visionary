
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Form validation schema
const formSchema = z.object({
  status: z.enum(["Resolved", "Pending", "Escalated"], {
    required_error: "Please select a status.",
  }),
  notes: z.string().optional(),
});

interface UpdateStatusFormProps {
  isOpen: boolean;
  onClose: () => void;
  callData: any;
  onUpdateStatus: (data: z.infer<typeof formSchema>) => void;
}

const UpdateStatusForm: React.FC<UpdateStatusFormProps> = ({
  isOpen,
  onClose,
  callData,
  onUpdateStatus,
}) => {
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: callData?.status || "Pending",
      notes: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    onUpdateStatus(data);
    toast({
      title: "Status updated",
      description: `Call #${callData?.id} status has been updated to ${data.status}`,
      action: (
        <div className="h-8 w-8 bg-green-500/20 rounded-full flex items-center justify-center">
          <CheckCircle2 className="h-4 w-4 text-green-500" />
        </div>
      ),
    });
    onClose();
  };

  if (!callData) return null;

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Update Call Status</SheetTitle>
          <SheetDescription>
            Call ID: {callData.id} - {callData.customerName}
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-6">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Resolved" />
                        </FormControl>
                        <FormLabel className="font-normal text-green-600">
                          Resolved
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Pending" />
                        </FormControl>
                        <FormLabel className="font-normal text-yellow-600">
                          Pending
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Escalated" />
                        </FormControl>
                        <FormLabel className="font-normal text-red-600">
                          Escalated
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Add notes about this status update..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <SheetFooter>
              <Button variant="outline" onClick={onClose} type="button">
                Cancel
              </Button>
              <Button type="submit">Update Status</Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
};

export default UpdateStatusForm;
