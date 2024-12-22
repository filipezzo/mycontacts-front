import { NewForm } from "./components/new-form";
import { NewHeader } from "./components/new-header";

export function NewContact() {
  return (
    <section className="flex flex-col">
      <NewHeader />
      <NewForm />
    </section>
  );
}
