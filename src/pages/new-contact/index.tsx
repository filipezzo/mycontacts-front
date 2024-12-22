import { ContactForm } from "../../components/contact-form";
import { NewHeader } from "./components/new-header";

export function NewContact() {
  return (
    <section className="flex flex-col">
      <NewHeader />
      <ContactForm mode="create" />
    </section>
  );
}
