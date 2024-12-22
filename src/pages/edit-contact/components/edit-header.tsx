import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../app/router/routes";

interface EditHeaderProps {
  name: string;
}

export function EditHeader({ name }: EditHeaderProps) {
  return (
    <header className="mb-6">
      <div className="flex items-center gap-1">
        <Link to={ROUTES.home}>
          <ArrowLeft size={24} className="text-lg font-bold text-indigo-500" />
        </Link>

        <span className="font-bold text-indigo-500">Voltar</span>
      </div>
      <h2 className="text-2xl font-bold">Editar {name}</h2>
    </header>
  );
}