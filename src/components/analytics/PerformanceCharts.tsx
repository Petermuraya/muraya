
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const PerformanceCharts = () => {
  const productivityData = [
    { day: 'Mon', productivity: 85, tasks: 8, focus: 6.5 },
    { day: 'Tue', productivity: 92, tasks: 12, focus: 7.2 },
    { day: 'Wed', productivity: 78, tasks: 6, focus: 5.8 },
    { day: 'Thu', productivity: 88, tasks: 10, focus: 6.8 },
    { day: 'Fri', productivity: 95, tasks: 14, focus: 8.1 },
    { day: 'Sat', productivity: 72, tasks: 4, focus: 4.2 },
    { day: 'Sun', productivity: 68, tasks: 3, focus: 3.8 }
  ];

  const socialData = [
    { month: 'Jan', linkedin: 120, twitter: 89, instagram: 67 },
    { month: 'Feb', linkedin: 145, twitter: 102, instagram: 78 },
    { month: 'Mar', linkedin: 132, twitter: 95, instagram: 85 },
    { month: 'Apr', linkedin: 167, twitter: 118, instagram: 92 },
    { month: 'May', linkedin: 189, twitter: 134, instagram: 105 },
    { month: 'Jun', linkedin: 203, twitter: 156, instagram: 118 }
  ];

  const goalsData = [
    { name: 'Completed', value: 68, color: '#10b981' },
    { name: 'In Progress', value: 24, color: '#f59e0b' },
    { name: 'Pending', value: 8, color: '#ef4444' }
  ];

  return (
    <Card className="bg-white dark:bg-gray-800">
      <CardHeader>
        <CardTitle>Performance Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="productivity" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="productivity">Productivity</TabsTrigger>
            <TabsTrigger value="social">Social Media</TabsTrigger>
            <TabsTrigger value="goals">Goals</TabsTrigger>
          </TabsList>
          
          <TabsContent value="productivity" className="mt-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  Weekly Productivity Trend
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={productivityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="productivity" 
                      stroke="#3b82f6" 
                      fill="#3b82f6" 
                      fillOpacity={0.2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                  Tasks vs Focus Hours
                </h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={productivityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="tasks" fill="#10b981" />
                    <Bar dataKey="focus" fill="#f59e0b" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="social" className="mt-6">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                Social Media Growth
              </h3>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={socialData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="linkedin" stroke="#0077b5" strokeWidth={2} />
                  <Line type="monotone" dataKey="twitter" stroke="#1da1f2" strokeWidth={2} />
                  <Line type="monotone" dataKey="instagram" stroke="#e4405f" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          
          <TabsContent value="goals" className="mt-6">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                Goal Completion Status
              </h3>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={goalsData}
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {goalsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PerformanceCharts;
