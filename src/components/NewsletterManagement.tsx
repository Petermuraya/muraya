
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Mail, Download, Users, Trash2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface NewsletterSubscription {
  id: string;
  email: string;
  name: string | null;
  subscribed: boolean;
  created_at: string;
}

const NewsletterManagement = () => {
  const [subscriptions, setSubscriptions] = useState<NewsletterSubscription[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
    const { data, error } = await supabase
      .from('newsletter_subscriptions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch subscriptions",
        variant: "destructive",
      });
    } else {
      setSubscriptions(data || []);
    }
  };

  const deleteSubscription = async (id: string) => {
    const { error } = await supabase
      .from('newsletter_subscriptions')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete subscription",
        variant: "destructive",
      });
    } else {
      fetchSubscriptions();
      toast({
        title: "Success",
        description: "Subscription deleted",
      });
    }
  };

  const exportSubscriptions = () => {
    const csvContent = [
      ['Email', 'Name', 'Subscribed', 'Date'],
      ...subscriptions.map(sub => [
        sub.email,
        sub.name || '',
        sub.subscribed ? 'Yes' : 'No',
        new Date(sub.created_at).toLocaleDateString()
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'newsletter_subscriptions.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const activeSubscriptions = subscriptions.filter(s => s.subscribed);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Mail className="w-6 h-6" />
          Newsletter Subscribers
        </h2>
        <Button onClick={exportSubscriptions} variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-[#161b22] border-[#30363d]">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-green-400" />
              <div>
                <p className="text-2xl font-bold text-green-400">{activeSubscriptions.length}</p>
                <p className="text-[#7d8590] text-sm">Active Subscribers</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#161b22] border-[#30363d]">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-blue-400" />
              <div>
                <p className="text-2xl font-bold text-blue-400">{subscriptions.length}</p>
                <p className="text-[#7d8590] text-sm">Total Subscriptions</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#161b22] border-[#30363d]">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-400" />
              <div>
                <p className="text-2xl font-bold text-purple-400">
                  {activeSubscriptions.length > 0 ? Math.round((activeSubscriptions.length / subscriptions.length) * 100) : 0}%
                </p>
                <p className="text-[#7d8590] text-sm">Subscription Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Subscribers Table */}
      <Card className="bg-[#161b22] border-[#30363d]">
        <CardHeader>
          <CardTitle className="text-white">Subscribers List</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-[#30363d]">
                <TableHead className="text-[#c9d1d9]">Email</TableHead>
                <TableHead className="text-[#c9d1d9]">Name</TableHead>
                <TableHead className="text-[#c9d1d9]">Status</TableHead>
                <TableHead className="text-[#c9d1d9]">Subscribed Date</TableHead>
                <TableHead className="text-[#c9d1d9]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subscriptions.map((subscription) => (
                <TableRow key={subscription.id} className="border-[#30363d]">
                  <TableCell className="text-[#c9d1d9]">{subscription.email}</TableCell>
                  <TableCell className="text-[#c9d1d9]">{subscription.name || 'N/A'}</TableCell>
                  <TableCell>
                    {subscription.subscribed ? (
                      <Badge variant="default">Active</Badge>
                    ) : (
                      <Badge variant="secondary">Unsubscribed</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-[#7d8590]">
                    {new Date(subscription.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => deleteSubscription(subscription.id)}
                      variant="destructive"
                      size="sm"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewsletterManagement;
