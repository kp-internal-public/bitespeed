import { MigrationProvider, Migrator } from "kysely";
import * as _1 from './1'

const migrations = [_1]

class LocalMigrationProvider implements MigrationProvider {
  async getMigrations(): Promise<Record<string, any>> {
    const _ = (n: number) => n.toString().padStart(4, "0")
    const obj = {}
    migrations.forEach((m, i) => {
      obj[_(i + 1)] = m
    })
    return obj
  }
}

export default function getMigrator(db: any) {
  return new Migrator({
    db: db,
    provider: new LocalMigrationProvider()
  })
}

