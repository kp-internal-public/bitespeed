import z from "zod";
import zodToJsonSchema from "zod-to-json-schema";

declare module "zod" {
  function toJsonSchema<T extends z.ZodType<any, any>>(schema: T): any
}

z.toJsonSchema = (schema: z.ZodType<any, any>) => {
  return zodToJsonSchema(schema, "schema").definitions.schema
}

export default z
