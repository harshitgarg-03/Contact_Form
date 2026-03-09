import dbConnection from "@/lib/db";
import Image from "next/image";
import ContactForm from "../components/contactForm";
export default async function Home() {
  await dbConnection();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-xl p-8 space-y-4">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Server Actions Demo
        </h1>

        <p className="text-center text-gray-500">
          With MongoDB & Revalidations
        </p>

        <div className="mt-6">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
