import { Kysely, sql } from 'kysely'
import { ContactTableName, ContactLinkPrecedence } from '../data/model/contact'
import MysqlDb from '../services/mysqlDb'

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema.createSchema(MysqlDb.SCHEMA).execute()
  await db.schema.withSchema(MysqlDb.SCHEMA)
    .createTable(ContactTableName)
    .addColumn("id", "integer", (col) => col.primaryKey().autoIncrement())
    .addColumn("phoneNumber", "text", (col) => col.defaultTo(null))
    .addColumn("email", "text", (col) => col.defaultTo(null))
    .addColumn("linkedId", "integer", (col) => col.defaultTo(null))
    .addColumn("linkPrecedence", sql`enum(${sql.join(ContactLinkPrecedence.map(sql.literal))})`, (col) => col.defaultTo(ContactLinkPrecedence[0]).notNull())
    .addColumn("createdAt", "timestamp(3)", (col) => col.defaultTo(sql.raw("CURRENT_TIMESTAMP(3)")).notNull())
    .addColumn("updatedAt", sql`timestamp(3) default CURRENT_TIMESTAMP(3) on update CURRENT_TIMESTAMP(3)`)
    .addColumn("deletedAt", "timestamp(3)", (col) => col.defaultTo(null))
    .execute()
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropSchema(MysqlDb.SCHEMA).execute()
}
