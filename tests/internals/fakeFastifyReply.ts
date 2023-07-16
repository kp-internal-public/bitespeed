//@ts-nocheck
import { FastifyReply } from "fastify";

export default class FakeReply implements FastifyReply {
  raw = {}
  type(contentType: string) {
    return this
  }
  status(code: number) {
    return this
  }
  send(payload?: any) {
    this.raw = payload
    return this
  }
}

