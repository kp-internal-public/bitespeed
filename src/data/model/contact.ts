export default interface Contact {
  id: number,
  phoneNumber?: string,
  email?: string,
  linkedId?: number, // the ID of another Contact linked to this one
  linkPrecedence: typeof ContactLinkPrecedence[number], // "primary" if it's the first Contact in the link
  createdAt: Date,
  updatedAt: Date,
  deletedAt?: Date
}

export const ContactLinkPrecedence = ["primary", "secondary"] as const
export const ContactTableName = "contact"

export function createContact(email?: string, phoneNumber?: string): Contact {
  return {
    id: -1,
    email,
    phoneNumber,
    linkPrecedence: "primary" as typeof ContactLinkPrecedence[number],
    createdAt: new Date(),
    updatedAt: new Date()
  }
}
