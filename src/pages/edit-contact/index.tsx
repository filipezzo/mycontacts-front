import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { Contact } from "../../app/models/contact";
import ContactsService from "../../app/services/ContactsService";
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

      const data = await ContactsService.getContact(id!);
      setContact(data);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        toast.error(error.message);
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
