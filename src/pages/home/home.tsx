import { ArrowDown, ArrowUp } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { Contact } from "../../app/models/contact";
import { API } from "../../app/router/api";
import { Separator } from "../../components/separator";
import { ContactList } from "./components/contact-list";
import { HomeHeader } from "./components/home-header";

export function Home() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [orderBy, setOrderBy] = useState(searchParams.get("orderBy") || "ASC");
  const [query, setQuery] = useState(searchParams.get("query") || "");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const filteredContacts = useMemo(() => {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(query.toLowerCase()),
    );
  }, [contacts, query]);

  const numberOfContacts = contacts.length;
  const filteredNumberOfContacts = filteredContacts.length;
  const hasNoContacts = numberOfContacts === 0;

  const handleOrderBy = () => {
    const newValue = orderBy === "ASC" ? "DESC" : "ASC";
    setOrderBy(newValue);
    setSearchParams((state) => {
      const newParams = new URLSearchParams(state);
      newParams.set("orderBy", newValue);
      return newParams;
    });
  };

  const handleDeleteContact = async (id: string) => {
    try {
      const response = await fetch(`${API.BASEURL}${API.CONTACTS}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Erro ao deletar contato");
      }
      const filteredContact = contacts.filter((contact) => contact.id !== id);
      setContacts(filteredContact);
      toast.success("Usuário deletado com sucesso.");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  const fetchData = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3000/contacts?orderBy=${orderBy}`,
      );
      if (!response.ok) throw new Error("Algo deu errado");
      const data = await response.json();
      await new Promise((resolve) => setTimeout(resolve, 500));
      setContacts(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Algo deu errado");
    } finally {
      setLoading(false);
    }
  }, [orderBy]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    setSearchParams((state) => {
      const newParams = new URLSearchParams(state);
      if (query.trim().length > 2) {
        newParams.set("query", query.toLowerCase());
      } else {
        newParams.delete("query");
      }
      return newParams;
    });
  }, [query]);

  return (
    <section>
      {!hasNoContacts && (
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="mb-8 h-[50px] w-full rounded-2xl bg-white px-4 py-3 text-black shadow-sm outline-none"
          placeholder="Pesquisar contato..."
        />
      )}
      <HomeHeader numberOfContacts={filteredNumberOfContacts} />
      <Separator />
      <div className="space-y-1.5">
        {!hasNoContacts && (
          <button
            onClick={handleOrderBy}
            className="flex items-center gap-0.5 text-lg text-indigo-500"
          >
            Nome
            {orderBy === "ASC" ? (
              <ArrowDown size={20} className="font-bold text-indigo-500" />
            ) : (
              <ArrowUp size={20} className="font-bold text-indigo-500" />
            )}
          </button>
        )}
        <ContactList
          contacts={filteredContacts}
          isLoading={loading}
          isError={!!error}
          onTryAgain={fetchData}
          numberOfContacts={filteredNumberOfContacts}
          initialNumberOfContacts={numberOfContacts}
          onDeleteContact={handleDeleteContact}
        />
      </div>
    </section>
  );
}
