"use server";
       
import dbConnection from "@/lib/db";
import { Contact } from "@/models/contact";
import { revalidateTag, unstable_cache } from "next/cache";

export const FormAction = async (formdata: FormData) => {
  await dbConnection();

  try {
    const data = {
      name: formdata.get("name") as string,
      email: formdata.get("email") as string,
      message: formdata.get("message") as string,
      subject: formdata.get("subject") as string,
    };

    if (!data.name || !data.email || !data.message || !data.subject) {
      return {
        success: false,
        message: "All fields are required!",
        status: 404,
      };
    }
    console.log("data is ", data);

    const result = await Contact.create({
      name: data.name,
      email: data.email,
      message: data.message,
      subject: data.subject,
    });
    revalidateTag("contact-stats", "max");
    await GetContactStats();
    return {
      success: true,
      message: "message sent success!",
      status: 200,
      contactId: result._id.toString(),
    };
  } catch (error) {
    return {
      success: false,
      message: "server get failed",
      status: 404,
    };
  }
};

export const getContacts = async () => {
  await dbConnection();
  try {
    const contaclist = await Contact.find({}).sort({ createdAt: -1 }).lean();

    if (!contaclist) {
      console.log("no one contact contain in contact list");
    }

    return contaclist.map((contact) => ({
      ...contact,
      _id: contact._id.toString(),
    }));

  } catch (error: any) {
    console.log("error to fetch contact list !", error);
    
    return [];
  }
};


export const UpdateContacts = async (contactId: string, status: string) => {
  await dbConnection();
  try {
    const contaclist = await Contact.findByIdAndUpdate(contactId, {status})

    if (!contaclist) {
      console.log("no one contact contain in contact list");
    }
    revalidateTag("contact-stats", "max")
    await GetContactStats()

    return {
      success: true,
      message: "update success!"
    }

  } catch (error: any) {
    console.log("error to fetch contact list !", error);
    return [];
  }
};

const getCachedStats = unstable_cache(
  async () => {
    await dbConnection();

    const total = await Contact.countDocuments();
    const newCount = await Contact.countDocuments({ status: "new" });
    const repliedCount = await Contact.countDocuments({ status: "replied" });
    const readCount = await Contact.countDocuments({ status: "read" });

    return { total, newCount, repliedCount, readCount };
  },
  ["contact-stats"],
  { tags: ["contact-stats"] }
);

export const GetContactStats = async () => {
  return getCachedStats();
};
