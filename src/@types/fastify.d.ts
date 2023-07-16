import { FastifyPluginCallback, FastifyPluginOptions, FastifyRegisterOptions } from "fastify";

export type FastifyRoute<
  Options extends FastifyPluginOptions = Record<never, never>
> = [FastifyPluginCallback<Options>, FastifyRegisterOptions<Options>];
