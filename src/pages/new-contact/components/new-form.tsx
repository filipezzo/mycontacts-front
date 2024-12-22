import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { API } from "../../../app/router/api";
import { Btn } from "../../../components/btn";
import { Input } from "../../../components/input";
import { Loading } from "../../../components/loading";
import { Select } from "../../../components/select";

const schema = z.object({
  name: z.string().min(4, "o nome deve conter no min 4 ch"),
  email: z.string().email("email inválido"),
  phone: z.string(),
  category_id: z.string().nonempty(),
});

type SchemaType = z.infer<typeof schema>;

export function NewForm() {
  const {
    register,
    handleSubmit,

    formState: { errors, isSubmitting },
  } = useForm<SchemaType>({
    resolver: zodResolver(schema),
  });

  const nav = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await fetch(`${API.BASEURL}${API.CONTACTS}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.status === 201) {
        toast.success("Contato criado com sucesso.", {
          duration: 2500,
        });

        nav("/");
      }

      if (response.status !== 201) {
        throw new Error("Algo deu errado, tente novamente.");
      }

      console.log(response);
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        toast.error(error?.message, {
          duration: 4000,
        });
        return;
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
      <Select {...register("category_id")} />
      <Btn
        disabled={isSubmitting}
        className="mt-2 flex max-w-96 justify-center"
        type="submit"
      >
        {isSubmitting ? <Loading /> : "Cadastrar"}
      </Btn>
    </form>
  );
}
