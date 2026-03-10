import { Mail, MailCheck, MailOpen, BarChart3 } from "lucide-react";
import { GetContactStats } from "@/actions/ContactAction";
import React from "react";        
import { CardContent, CardHeader, CardTitle } from "./ui/card";
import { Card } from "./ui/card";

async function ContactStats() {
  const stats = await GetContactStats();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {/* Total */}
      <Card className="shadow-md hover:shadow-lg transition">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total
          </CardTitle>
          <BarChart3 className="h-5 w-5 text-gray-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.total}</div>
        </CardContent>
      </Card>

      {/* New */}
      <Card className="shadow-md hover:shadow-lg transition">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            New
          </CardTitle>
          <Mail className="h-5 w-5 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.newCount}</div>
        </CardContent>
      </Card>

      {/* Replied */}
      <Card className="shadow-md hover:shadow-lg transition">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Replied
          </CardTitle>
          <MailCheck className="h-5 w-5 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.repliedCount}</div>
        </CardContent>
      </Card>

      {/* Read */}
      <Card className="shadow-md hover:shadow-lg transition">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Read
          </CardTitle>
          <MailOpen className="h-5 w-5 text-purple-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.readCount}</div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ContactStats;
