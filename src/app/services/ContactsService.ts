import { FormContactData } from "../models/contact";
import { HttpClient } from "./utils/HttpClient";

class ContactsService {
  private httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient("http://localhost:3000");
  }
  async listContacts(orderBy: string) {
    return this.httpClient.get(`/contacts/?orderBy=${orderBy}`);
  }

  async getContact(id: string) {
    return this.httpClient.get(`/contacts/${id}`);
  }

  async createContact(data: FormContactData) {
    return this.httpClient.post("/contacts", data);
  }

  async editContact(data: FormContactData, id: string) {
    return this.httpClient.put(`/contacts/${id}`, data);
  }

  async deleteContact(id: string) {
    this.httpClient.delete(`/contacts`, id);
  }
}

export default new ContactsService();
