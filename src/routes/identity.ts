import IdentityController from "../controllers/identityController";
import { FastifyInstance, FastifyPluginOptions } from "fastify";
import z from "../@types/zod"

const bodySchema = z.object({
  email: z.string().regex(/[\w\d\.]+@[\w\d]+\.[\w]{2,4}/g).optional(),
  phoneNumber: z.string().optional()
})

type BodySchema = z.infer<typeof bodySchema>

export default (
  fastify: FastifyInstance,
  options: FastifyPluginOptions,
  done: Function
) => {
  fastify.post<{ Body: BodySchema }>(
    "/identity",
    { schema: { body: z.toJsonSchema(bodySchema) }, ...options },
    async (request, reply) => {
      const { email, phoneNumber } = request.body
      return IdentityController.get().trackOrder(reply, email, phoneNumber);
    }
  );
  done();
};
