import Injector from "../utils/injector";
import { FastifyReply } from "fastify";
import BaseController from "./baseController";
import MysqlDb from "../services/mysqlDb";
import Contact, { createContact } from "../data/model/contact";
import * as _ from "lodash";
import { DB } from "../@types";

export default class IdentityController extends BaseController {
  private readonly db: DB

  public constructor(db: DB) {
    super()
    this.db = db
  }

  public async trackOrder(res: FastifyReply, email?: string, phoneNumber?: string) {
    const ok = (contact: Contact[]) => {
      // ascending order so first will be always primary contact
      const ordered = _.orderBy(contact, ["updatedAt"], ["asc"])

      return this.ok(res, {
        contact: {
          primaryContactId: _.first(ordered).id, // first will be order id of primary key
          emails: _.chain(contact).map(i => i.email).uniq().value(),
          phoneNumbers: _.chain(contact).map(i => i.phoneNumber).uniq().value(),
          secondaryContactIds: _.chain(contact).filter(i => i.linkPrecedence === "secondary").map(i => i.id).uniq().value()
        }
      })
    }

    const contact = createContact(email, phoneNumber)
    const existingContacts = await this.db.get(contact)

    // If not exist then insert
    if (_.isEmpty(existingContacts) && await this.db.insert(contact)) {
      return ok([contact])
    }

    // If exist then set linkPrecedence to secondary and insert
    if (!_.isEmpty(existingContacts)) {
      const match = _.last(existingContacts) // this could be primary or matched secondary contact

      if (existingContacts.length == 1 && (match.email != contact.email || match.phoneNumber != contact.phoneNumber)) {
        // If primary contact exists then create new contact set linkPrecedence to secondary and insert
        contact.linkedId = match.id
        contact.linkPrecedence = "secondary"

        existingContacts.push(contact)

        await this.db.insert(contact)
      } else {
        for (const ec of existingContacts) {
          // do not modify matched contact
          if (match === ec) continue

          // add link to its matching contact
          ec.linkedId = match.id
          ec.linkPrecedence = "secondary"
          await this.db.update(ec)
        }
      }

      if (match.linkPrecedence === "secondary") {
        // Since match could be secondary contact we will recursively traverse to find the primary key
        const previousResults = await this.db.traverseToRoot(match)
        return ok(previousResults.concat(existingContacts))
      }
      return ok(existingContacts.concat(contact))
    }

    return this.fail(res, new Error("Failed to track order"))
  }

  public static get() {
    return Injector.get(IdentityController.name, () => new IdentityController(MysqlDb.get()))
  }
}
