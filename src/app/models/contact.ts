export type Contact = {
  id?: string;
  name: string;
  email: string;
  phone: string;
  category_id?: string;
  category_name: string;
};

export type FormContactData = {
  name: string;
  email: string;
  phone: string;
  category_id: string;
};
