import { Link } from "react-router-dom";
import { ROUTES } from "../../../app/router/routes";
import { cn } from "../../../app/utils/cn";
import { Btn } from "../../../components/btn";

export function HomeHeader({ numberOfContacts }: { numberOfContacts: number }) {
  const hasNoContacts = numberOfContacts === 0;
  return (
    <header
      className={cn("flex items-center justify-between", {
        "justify-center": hasNoContacts,
      })}
    >
      {!hasNoContacts && (
        <h2 className="text-xl font-bold"> {numberOfContacts} contatos</h2>
      )}
      <Btn variant="secondary" className="max-w-[142px]">
        <Link to={ROUTES.newContact}>Novo contato</Link>
      </Btn>
    </header>
  );
}
