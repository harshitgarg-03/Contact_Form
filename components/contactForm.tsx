"use client"
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { FormAction } from "@/actions/ContactAction";
import { useRouter } from "next/navigation";
  
function contactForm() {
  const [isSubmit, setisSubmit] = useState<boolean>(false);
  const [isGetContact, setisGetContact] = useState<boolean>(false);
  const [message, setmessage] = useState<string>("");

  const router = useRouter();

  async function onsubmit(formdata: FormData) {
    setisSubmit(true);
    setmessage("message sent success 🎫");

    await FormAction(formdata);
    setisSubmit(false);
  }

  return (
    <>
      <Card className="max-w-xl mx-auto shadow-xl rounded-2xl border bg-white p-6 md:p-8">
        <CardHeader className="text-center space-y-2 pb-6">
          <CardTitle className="text-3xl font-semibold tracking-tight">
            Contact Us
          </CardTitle>
          <p className="text-gray-500 text-sm">
            We'd love to hear from you. Fill out the form below.
          </p>
        </CardHeader>

        {message && (
          <div>
            <h3>{message}</h3>
          </div>
        )}

        <CardContent className="px-2">
          <form id="conact-form" action={onsubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  className="py-2"
                  required
                  // onChange={(e) => setname(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="py-2"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject" className="text-sm font-medium">
                Subject
              </Label>
              <Input
                id="subject"
                name="subject"
                type="text"
                placeholder="Subject of your message"
                className="py-2"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-sm font-medium">
                Message
              </Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Write your message..."
                required
                className="w-full min-h-32.5 rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <Button
              type="submit"
              className="w-full py-2 text-base font-medium tracking-wide"
            >
              {isSubmit ? "Sending message..." : "Send Message"}
            </Button>
          </form>
        </CardContent>
        <Button
          className="w-full py-2 text-base font-medium tracking-wide"
          onClick={() => {
            (setisGetContact(!isGetContact),
              router.push("/getContacts"),
              setisGetContact(!isGetContact));
          }}
        >
          {isGetContact ? "Fetching contacts..." : "Contacts list"}
        </Button>
      </Card>
    </>
  );
}

export default contactForm;
