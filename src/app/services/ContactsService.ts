import { FormContactData } from "../models/contact";
import { HttpClient } from "./utils/HttpClient";

class ContactsService {
  private httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient("http://localhost:3000");
  }
  async listContacts(orderBy: string) {
    return this.httpClient.get(`/contactsx/?orderBy=${orderBy}`);
  }

  async getContact(id: string) {
    return this.httpClient.get(`/contacts/${id}`);
  }

  async createContact(data: FormContactData) {
    const response = await fetch("http://localhost:3000/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return response.json();
  }

  async editContact(data: FormContactData, id: string) {
    const response = await fetch(`http://localhost:3000/contacts/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return response.json();
  }

  async deleteContact(id: string) {
    await fetch(`http://localhost:3000/contacts/${id}`, {
      method: "DELETE",
    });
  }
}

export default new ContactsService();
