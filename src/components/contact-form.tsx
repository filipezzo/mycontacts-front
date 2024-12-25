import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import ApiError from "../app/errors/api-error";
import { Contact } from "../app/models/contact";
import ContactsService from "../app/services/ContactsService";
import { Btn } from "./btn";
import { Input } from "./input";
import { Loading } from "./loading";
import { Select } from "./select";

const schema = z.object({
  name: z.string().min(4, "o nome deve conter no min 4 ch"),
  email: z.string().email("email inválido"),
  phone: z.string(),
  category_id: z.string().nonempty(),
});

type SchemaType = z.infer<typeof schema>;

interface ContactFormProps {
  initialData?: Contact;
  mode: "create" | "edit";
  contactId?: string;
}

export function ContactForm({
  initialData,
  mode,
  contactId,
}: ContactFormProps) {
  const {
    register,
    handleSubmit,

    formState: { errors, isSubmitting },
  } = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: { ...initialData, category_id: initialData?.category_id },
  });

  const nav = useNavigate();
  const createMode = mode === "create";

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (createMode) {
        await ContactsService.createContact(data);
        toast.success("Usuário criado com sucesso.");
      } else {
        await ContactsService.editContact(data, contactId!);
        toast.success("Usuário editado com sucesso.");
      }
      nav("/");
    } catch (error) {
      console.log(error);
      if (error instanceof ApiError) {
        toast.error(error?.message, {
          duration: 4000,
        });
      }
    }
  });

  return (
    <form onSubmit={onSubmit} className="flex w-full flex-col gap-4">
      <Input {...register("name")} placeholder="Nome" />
      {errors.name?.message && (
        <small className="text-rose-400">{errors.name.message}</small>
      )}
      <Input type="email" {...register("email")} placeholder="Email" />
      {errors.email?.message && (
        <small className="text-rose-400">{errors.email.message}</small>
      )}
      <Input {...register("phone")} placeholder="Telefone" />
      <Select
        {...register("category_id")}
        value={initialData?.category_id ?? ""}
      />
      <Btn
        disabled={isSubmitting}
        className="mt-2 flex max-w-96 justify-center"
        type="submit"
      >
        {isSubmitting ? (
          <Loading />
        ) : mode === "create" ? (
          "Cadastrar"
        ) : (
          "Editar"
        )}
      </Btn>
    </form>
  );
}
