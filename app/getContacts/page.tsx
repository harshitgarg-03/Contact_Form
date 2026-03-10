import { getContacts, GetContactStats, UpdateContacts } from "@/actions/ContactAction";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,   
} from "../../components/ui/card"; 
import ContactStats from "../../components/ContactStatsitics";
import Link from "next/link";
// import { revalidatePath } from "next/cache";

export default async function page() {
  await GetContactStats();
  const fetchContacts: ContactGetProp[] = await getContacts();

  async function handleStaus(formdata: FormData) {
    "use server";

    const id = formdata.get("id") as string;
    const status = formdata.get("status") as string;
    const data = await UpdateContacts(id, status);
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-semibold text-center mb-8">
          Contact Messages
        </h1>
        <ContactStats />
        <div className="max-w-3xl mx-auto grid gap-5">
          {fetchContacts.map((contact: ContactGetProp) => (
            <Card
              key={contact._id}
              className="shadow-md hover:shadow-lg transition rounded-xl"
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold">
                    {contact.name}
                  </CardTitle>

                  <span className="text-sm text-muted-foreground">
                    {contact.email}
                  </span>
                </div>
              </CardHeader>

              <CardContent className="space-y-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      Subject
                    </p>
                    <p className="text-base font-semibold">{contact.subject}</p>
                  </div>

                  <Button
                    size="sm"
                    className="bg-black text-white cursor-pointer hover:bg-black/80"
                  >
                    {contact.status}
                  </Button>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">
                    Message
                  </p>

                  <p className="text-sm leading-relaxed text-gray-700">
                    {contact.message}
                  </p>
                </div>

                <div className="flex justify-end">
                  {contact.status === "new" ? (
                    <form action={handleStaus}>
                      <input type="hidden" name="id" value={contact._id} />
                      <input type="hidden" name="status" value={"replied"} />
                      <Button
                        type="submit"
                        size="sm"
                        variant="outline"
                        className="text-gray-700 cursor-pointer "
                      >
                        Mark as replied
                      </Button>
                    </form>
                  ) : (
                    ""
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <Link href={"/"}>
          <Button className="w-full py-2 text-base font-medium cursor-pointer tracking-wide">
            Back Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
