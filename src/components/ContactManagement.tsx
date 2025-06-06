
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Mail, Eye, EyeOff, Trash2, Calendar } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  read: boolean;
  created_at: string;
}

const ContactManagement = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch messages",
        variant: "destructive",
      });
    } else {
      setMessages(data || []);
    }
  };

  const markAsRead = async (id: string) => {
    const { error } = await supabase
      .from('contact_messages')
      .update({ read: true })
      .eq('id', id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to mark as read",
        variant: "destructive",
      });
    } else {
      fetchMessages();
      toast({
        title: "Success",
        description: "Message marked as read",
      });
    }
  };

  const deleteMessage = async (id: string) => {
    const { error } = await supabase
      .from('contact_messages')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete message",
        variant: "destructive",
      });
    } else {
      fetchMessages();
      setSelectedMessage(null);
      toast({
        title: "Success",
        description: "Message deleted",
      });
    }
  };

  const unreadCount = messages.filter(m => !m.read).length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Mail className="w-6 h-6" />
          Contact Messages
          {unreadCount > 0 && (
            <Badge variant="destructive" className="ml-2">
              {unreadCount} unread
            </Badge>
          )}
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Messages List */}
        <Card className="bg-[#161b22] border-[#30363d]">
          <CardHeader>
            <CardTitle className="text-white">Recent Messages</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-[#30363d]">
                  <TableHead className="text-[#c9d1d9]">From</TableHead>
                  <TableHead className="text-[#c9d1d9]">Subject</TableHead>
                  <TableHead className="text-[#c9d1d9]">Date</TableHead>
                  <TableHead className="text-[#c9d1d9]">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {messages.map((message) => (
                  <TableRow
                    key={message.id}
                    className={`border-[#30363d] cursor-pointer hover:bg-[#21262d] ${
                      !message.read ? 'bg-[#0d1117]' : ''
                    }`}
                    onClick={() => setSelectedMessage(message)}
                  >
                    <TableCell className="text-[#c9d1d9]">
                      <div>
                        <div className="font-medium">{message.name}</div>
                        <div className="text-sm text-[#7d8590]">{message.email}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-[#c9d1d9]">
                      {message.subject || 'No subject'}
                    </TableCell>
                    <TableCell className="text-[#7d8590]">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(message.created_at).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      {message.read ? (
                        <Badge variant="secondary">Read</Badge>
                      ) : (
                        <Badge variant="destructive">Unread</Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Message Detail */}
        <Card className="bg-[#161b22] border-[#30363d]">
          <CardHeader>
            <CardTitle className="text-white">Message Details</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedMessage ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-[#7d8590]">From</label>
                    <p className="text-[#c9d1d9]">{selectedMessage.name}</p>
                  </div>
                  <div>
                    <label className="text-sm text-[#7d8590]">Email</label>
                    <p className="text-[#c9d1d9]">{selectedMessage.email}</p>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm text-[#7d8590]">Subject</label>
                  <p className="text-[#c9d1d9]">{selectedMessage.subject || 'No subject'}</p>
                </div>
                
                <div>
                  <label className="text-sm text-[#7d8590]">Date</label>
                  <p className="text-[#c9d1d9]">{new Date(selectedMessage.created_at).toLocaleString()}</p>
                </div>
                
                <div>
                  <label className="text-sm text-[#7d8590]">Message</label>
                  <div className="bg-[#0d1117] p-4 rounded border border-[#30363d] text-[#c9d1d9] whitespace-pre-wrap">
                    {selectedMessage.message}
                  </div>
                </div>
                
                <div className="flex gap-2">
                  {!selectedMessage.read && (
                    <Button
                      onClick={() => markAsRead(selectedMessage.id)}
                      variant="outline"
                      size="sm"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Mark as Read
                    </Button>
                  )}
                  <Button
                    onClick={() => deleteMessage(selectedMessage.id)}
                    variant="destructive"
                    size="sm"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            ) : (
              <p className="text-[#7d8590] text-center py-8">
                Select a message to view details
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ContactManagement;
