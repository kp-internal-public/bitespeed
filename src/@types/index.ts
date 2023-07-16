import Contact from "../data/model/contact";

export interface DB {
  get(obj: { email?: string, phoneNumber?: string }): Promise<Contact[]>
  traverseToRoot(contact: Contact): Promise<Contact[]>
  insert(obj: Contact): Promise<Contact>
  update(obj: Contact): Promise<boolean>
}
