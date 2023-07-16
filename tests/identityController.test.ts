import IdentityController from "../src/controllers/identityController"
import MemoryDB from "./internals/memoryDb"
import FakeFastifyReply from "./internals/fakeFastifyReply"
const res1 = require("./internals/1.json")
const res2 = require("./internals/2.json")

describe("IdentityController", () => {

  const db = new MemoryDB()
  const controller = new IdentityController(db)

  test("check basic insertion with same email to see secondary linkage", async () => {
    const reply = new FakeFastifyReply()
    //@ts-ignore
    await controller.trackOrder(reply, "lorraine@hillvalley.edu", "123456")
    //@ts-ignore
    await controller.trackOrder(reply, "mcfly@hillvalley.edu", "123456")
    expect(JSON.stringify(reply.raw)).toBe(JSON.stringify(res1))
  })

  test("check whether primary key converts to secondary key", async () => {
    const reply = new FakeFastifyReply()
    //@ts-ignore
    await controller.trackOrder(reply, "george@hillvalley.edu", "919191")
    //@ts-ignore
    await controller.trackOrder(reply, "biffsucks@hillvalley.edu", "717171")
    //@ts-ignore
    await controller.trackOrder(reply, "george@hillvalley.edu", "717171")
    expect(JSON.stringify(reply.raw)).toBe(JSON.stringify(res2))
  })
})
