import { exists } from "fs";
import { DB } from "../../src/@types/index";
import Contact from "../../src/data/model/contact";

export default class MemoryDB implements DB {
  private readonly contacts: Contact[] = []

  async get(obj: { email?: string, phoneNumber?: string }): Promise<Contact[]> {
    return this.contacts.filter(contact => {
      let match = false
      if (obj.email) {
        match = contact.email === obj.email
      }
      if (!match && obj.phoneNumber) {
        match = contact.phoneNumber === obj.phoneNumber
      }
      return match
    })
  }

  async traverseToRoot(contact: Contact): Promise<Contact[]> {
    const results: Contact[] = []

    let current = contact

    while (current?.linkedId) {
      current = this.contacts[current.linkedId]
      if (current) {
        results.push(current)
      }
    }

    return results
  }

  async insert(obj: Contact): Promise<Contact> {
    obj.id = this.contacts.length
    obj.updatedAt = new Date()
    obj.createdAt = new Date()
    this.contacts.push(obj)

    return obj
  }

  async update(obj: Contact): Promise<boolean> {
    const contact = this.contacts[obj.id]
    if (contact) {
      contact.updatedAt = new Date()
      contact.linkedId = obj.linkedId
      contact.linkPrecedence = obj.linkPrecedence
      return true
    }
    return false
  }
}
