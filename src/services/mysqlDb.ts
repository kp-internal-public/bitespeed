import { Kysely, MysqlDialect } from "kysely";
import * as _ from "lodash";
import env from "../utils/config"
import Contact, { ContactTableName } from "../data/model/contact";
const mysql = require('mysql2');
import Injector from "../utils/injector";
import migrator from "../migrations/index"
import { DB } from "../@types";

export default class MysqlDb implements DB {
  static SCHEMA = "my_schema"

  private pool = mysql.createPool(env.dbPoolOptions)
  private db = new Kysely<{ contact: Contact }>({
    dialect: new MysqlDialect({ pool: this.pool })
  })

  public async runMigration() {
    console.debug("Running migrations")
    const { error } = await migrator(this.db).migrateToLatest()
    if (error) {
      throw error
    }
  }

  public async get(obj: { email?: string, phoneNumber?: string }): Promise<Contact[]> {
    let query = this.db.withSchema(MysqlDb.SCHEMA).selectFrom(ContactTableName)

    if (obj.phoneNumber) {
      query = query.orWhere("phoneNumber", "=", obj.phoneNumber)
    }
    if (obj.email) {
      query = query.orWhere("email", "=", obj.email)
    }

    const result = await query
      .orderBy("updatedAt", "desc")
      .selectAll()
      .$castTo<Contact>()
      .execute()

    return result
  }

  public async traverseToRoot(contact: Contact): Promise<Contact[]> {
    const results: Contact[] = []

    let current = contact

    while (current?.linkedId) {
      current = await this.db.withSchema(MysqlDb.SCHEMA).selectFrom(ContactTableName)
        .where("id", "=", contact.linkedId)
        .selectAll()
        .$castTo<Contact>()
        .executeTakeFirst()

      if (current) {
        results.push(current)
      }
    }

    return results
  }

  public async insert(obj: Contact): Promise<Contact> {
    const result = await this.db.withSchema(MysqlDb.SCHEMA).insertInto(ContactTableName)
      .values(_.omit(obj, ["id", "createdAt", "updatedAt", "deletedAt"]))
      .executeTakeFirst()

    if (result.numInsertedOrUpdatedRows > 0) {
      obj.id = Number(result.insertId)
    }
    return obj
  }

  public async update(obj: Contact): Promise<boolean> {
    const result = await this.db.withSchema(MysqlDb.SCHEMA).updateTable(ContactTableName)
      .set(_.pick(obj, ["linkedId", "linkPrecedence"]))
      .where("id", "=", obj.id)
      .executeTakeFirst()

    return result.numUpdatedRows > 0
  }

  static get(): MysqlDb {
    return Injector.get(MysqlDb.name, () => new MysqlDb());
  }
}
