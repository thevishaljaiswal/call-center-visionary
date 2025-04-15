
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, Calendar, Clock, MessageSquare, User } from "lucide-react";
import TodoSection from "../dashboard/sections/TodoSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CallDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  callData: any;
}

const CallDetailsModal: React.FC<CallDetailsModalProps> = ({
  isOpen,
  onClose,
  callData,
}) => {
  if (!callData) return null;

  // Helper function to render status badge
  const renderStatusBadge = (status: string) => {
    let color;
    switch (status) {
      case 'Resolved':
        color = 'bg-green-100 text-green-800';
        break;
      case 'Pending':
        color = 'bg-yellow-100 text-yellow-800';
        break;
      case 'Escalated':
        color = 'bg-red-100 text-red-800';
        break;
      default:
        color = 'bg-gray-100 text-gray-800';
    }
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${color}`}>
        {status}
      </span>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5" />
            Call Details - ID: {callData.id}
          </DialogTitle>
          <DialogDescription>
            Call information and customer details
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="details">
          <TabsList className="mb-4">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details">
            <div className="grid gap-4 py-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-muted-foreground">Call Information</h3>
                  <div className="flex items-start gap-2">
                    <Calendar className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Start Time</p>
                      <p className="text-sm text-muted-foreground">{callData.startTime}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Clock className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Duration</p>
                      <p className="text-sm text-muted-foreground">{callData.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <MessageSquare className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Issue Type</p>
                      <p className="text-sm text-muted-foreground">{callData.issueType}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-medium text-muted-foreground">Customer Information</h3>
                  <div className="flex items-start gap-2">
                    <User className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Name</p>
                      <p className="text-sm text-muted-foreground">{callData.customerName}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Phone className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Contact</p>
                      <p className="text-sm text-muted-foreground">{callData.contact}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                <div>
                  {renderStatusBadge(callData.status)}
                  <div className="mt-2">
                    <p className="text-sm font-medium">Customer Satisfaction</p>
                    <div className="flex mt-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          className={`h-4 w-4 ${i < callData.satisfaction ? 'text-yellow-400' : 'text-gray-300'}`}
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium text-muted-foreground">Notes</h3>
                <p className="text-sm text-muted-foreground">
                  {callData.notes || "No notes available for this call."}
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="tasks">
            <TodoSection callId={callData.id} />
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CallDetailsModal;
