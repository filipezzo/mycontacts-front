import { Contact } from "../models/contact";

export const contacts: Contact[] = [
  {
    id: crypto.randomUUID(),
    name: "Vitor sousa",
    email: "vitor@gmial.com",
    category_name: "instagram",
    phone: "011993022929",
  },
  {
    id: crypto.randomUUID(),
    name: "Ana Clara",
    email: "ana@gmail.com",
    category_name: "twitter",
    phone: "011991234567",
  },
  {
    id: crypto.randomUUID(),
    name: "João Pedro",
    email: "joao@hotmail.com",
    category_name: "facebook",
    phone: "011998765432",
  },
  {
    id: crypto.randomUUID(),
    name: "Mariana Oliveira",
    email: "mariana@outlook.com",
    category_name: "linkedin",
    phone: "011992345678",
  },
  {
    id: crypto.randomUUID(),
    name: "Lucas Martins",
    email: "lucas@yahoo.com",
    category_name: "instagram",
    phone: "011994567890",
  },
  {
    id: crypto.randomUUID(),
    name: "Fernanda Lima",
    email: "fernanda@protonmail.com",
    category_name: "twitter",
    phone: "011996543210",
  },
];
