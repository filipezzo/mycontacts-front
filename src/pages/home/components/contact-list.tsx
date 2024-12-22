import { BookUser, Edit, Frown, Trash2 } from "lucide-react";
import { Contact } from "../../../app/models/contact";
import { Btn } from "../../../components/btn";

interface ContactListProps {
  contacts: Contact[];
  isLoading: boolean;
  isError: boolean;
  onTryAgain: () => void;
  numberOfContacts: number;
}

export function ContactList({
  contacts,
  isLoading,
  isError,
  onTryAgain,
  numberOfContacts,
}: ContactListProps) {
  if (isLoading) {
    return (
      <div className="size-6 animate-spin rounded-full border border-r-indigo-500 border-t-indigo-500" />
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-between gap-4">
        <Frown size={56} />
        <div className="flex-1 space-y-4">
          <p className="text-center text-xl text-rose-400">
            Ocorreu um erro ao obter os seus contatos!
          </p>
          <Btn onClick={onTryAgain}>Tentar novamente</Btn>
        </div>
      </div>
    );
  }

  if (numberOfContacts === 0) {
    return (
      <div className="flex flex-col items-center gap-2">
        <BookUser size={56} />
        <p className="text-center">
          Você ainda não tem nenhum contato cadastrado! Clique no botão ”Novo
          contato” à cima para cadastrar o seu primeiro!
        </p>
      </div>
    );
  }
  return (
    <ul className="h-full max-h-[500px] overflow-scroll">
      {contacts.map((contact) => (
        <li key={contact.id} className="flex items-center justify-between p-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <strong>{contact.name}</strong>
              <div className="flex h-[21px] items-center justify-center rounded-md bg-indigo-200 p-1.5 font-bold text-indigo-400">
                <span className="text-xs uppercase">
                  {contact.category_name}
                </span>
              </div>
            </div>
            <span className="text-gray-100">{contact.email}</span>
            <span className="text-gray-100">{contact.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <button>
              <Edit className="text-indigo-500" />
            </button>
            <button>
              <Trash2 className="text-rose-400" />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
