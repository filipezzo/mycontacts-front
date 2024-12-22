import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { Separator } from "../../components/separator";
import { ContactList } from "./components/contact-list";
import { HomeHeader } from "./components/home-header";

export function Home() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const numberOfContacts = contacts.length;
  const hasNoContacts = numberOfContacts === 0;
  const fetchData = async () => {
    setError(null);
    try {
      const response = await fetch("http://localhost:3000/contacts");
      if (!response.ok) {
        throw new Error("Algo deu errado");
      }
      const data = await response.json();
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          resolve();
        }, 500);
      });
      setContacts(data);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
      setError("Algo deu errado");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <section>
      {!hasNoContacts && (
        <input
          className="mb-8 h-[50px] w-full rounded-2xl bg-white px-4 py-3 text-black shadow-sm outline-none"
          placeholder="Pesquisar contato..."
        />
      )}
      <HomeHeader numberOfContacts={numberOfContacts} />
      <Separator />
      <div className="space-y-1.5">
        {!hasNoContacts && (
          <button className="flex items-center gap-0.5 text-lg text-indigo-500">
            Nome
            <ArrowUp size={20} className="font-bold text-indigo-500" />
          </button>
        )}
        <ContactList
          contacts={contacts}
          isLoading={loading}
          isError={!!error}
          onTryAgain={fetchData}
          numberOfContacts={numberOfContacts}
        />
      </div>
    </section>
  );
}
