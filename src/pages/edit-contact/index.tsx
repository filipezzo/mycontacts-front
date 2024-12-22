import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Contact } from "../../app/models/contact";
import { API } from "../../app/router/api";
import { ContactForm } from "../../components/contact-form";
import { Loading } from "../../components/loading";
import { EditHeader } from "./components/edit-header";

export function EditContact() {
  const [contact, setContact] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { id } = useParams();

  const fetchContact = async () => {
    try {
      setError(null);
      const response = await fetch(`${API.BASEURL}${API.CONTACTS}/${id}`);
      if (!response.ok) {
        throw new Error("Algo deu errado ao buscar dados do usuário");
      }
      const data = await response.json();
      setContact(data);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        return;
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (id) {
      fetchContact();
    }
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (error || !contact) {
    return null;
  }

  return (
    <div className="flex flex-col">
      <EditHeader name={contact.name} />
      <ContactForm mode="edit" contactId={id} initialData={contact} />
    </div>
  );
}
