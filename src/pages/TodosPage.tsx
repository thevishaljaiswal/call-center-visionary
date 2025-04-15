
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import TodoSection from '@/components/dashboard/sections/TodoSection';

const TodosPage: React.FC = () => {
  return (
    <DashboardLayout title="Task Management">
      <div className="space-y-6">
        <TodoSection />
      </div>
    </DashboardLayout>
  );
};

export default TodosPage;
