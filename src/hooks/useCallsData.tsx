
import { useState } from 'react';

// Initial call data
const initialCallsData = [
  {
    id: '1001',
    startTime: '09:45 AM',
    duration: '5m 23s',
    customerName: 'John Smith',
    contact: '+1 (555) 123-4567',
    issueType: 'Billing Inquiry',
    status: 'Resolved',
    satisfaction: 5,
    notes: 'Customer had questions about recent charges. Explained the billing cycle and resolved their concerns.'
  },
  {
    id: '1002',
    startTime: '10:12 AM',
    duration: '3m 45s',
    customerName: 'Sarah Johnson',
    contact: '+1 (555) 987-6543',
    issueType: 'Technical Support',
    status: 'Pending',
    satisfaction: 4,
    notes: 'Customer experiencing intermittent connection issues. Provided basic troubleshooting steps.'
  },
  {
    id: '1003',
    startTime: '11:05 AM',
    duration: '8m 12s',
    customerName: 'Michael Brown',
    contact: '+1 (555) 456-7890',
    issueType: 'Product Information',
    status: 'Resolved',
    satisfaction: 5,
    notes: 'Customer inquired about product features. Provided detailed information and answered all questions.'
  },
  {
    id: '1004',
    startTime: '12:30 PM',
    duration: '4m 18s',
    customerName: 'Emily Davis',
    contact: '+1 (555) 789-0123',
    issueType: 'Account Access',
    status: 'Escalated',
    satisfaction: 3,
    notes: 'Customer unable to access their account. Basic troubleshooting failed. Escalated to technical team.'
  },
  {
    id: '1005',
    startTime: '01:15 PM',
    duration: '6m 57s',
    customerName: 'David Wilson',
    contact: '+1 (555) 321-6547',
    issueType: 'Billing Inquiry',
    status: 'Resolved',
    satisfaction: 4,
    notes: 'Customer had questions about a specific charge. Explained the service and resolved the inquiry.'
  },
  {
    id: '1006',
    startTime: '02:05 PM',
    duration: '2m 34s',
    customerName: 'Jennifer Martinez',
    contact: '+1 (555) 654-7891',
    issueType: 'Technical Support',
    status: 'Pending',
    satisfaction: 4,
    notes: 'Customer reporting slow performance. Provided initial guidance and will follow up tomorrow.'
  }
];

export interface CallData {
  id: string;
  startTime: string;
  duration: string;
  customerName: string;
  contact: string;
  issueType: string;
  status: string;
  satisfaction: number;
  notes: string;
}

export type CallStatus = "Resolved" | "Pending" | "Escalated";

export function useCallsData() {
  const [callsData, setCallsData] = useState<CallData[]>(initialCallsData);

  const handleStatusUpdate = (selectedCall: CallData, data: { status: string; notes?: string }) => {
    setCallsData(callsData.map(call => 
      call.id === selectedCall.id 
        ? { 
            ...call, 
            status: data.status, 
            notes: data.notes ? `${call.notes}\n\nUpdate: ${data.notes}` : call.notes 
          } 
        : call
    ));
    
    return true;
  };

  return {
    callsData,
    handleStatusUpdate
  };
}
