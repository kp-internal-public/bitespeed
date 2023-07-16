import { FastifyReply } from "fastify";

export default abstract class BaseController {
  public static jsonResponse(res: FastifyReply, code: number, message: string) {
    return res.status(code).send({ message });
  }

  public ok<T>(res: FastifyReply, dto?: T) {
    if (!!dto) {
      res.type("application/json");
      return res.status(200).send(dto);
    } else {
      return res.status(200);
    }
  }

  public created(res: FastifyReply) {
    return res.status(201);
  }

  public badRequest(res: FastifyReply, message?: string) {
    return BaseController.jsonResponse(
      res,
      400,
      message ? message : "Bad Request"
    );
  }

  public unauthorized(res: FastifyReply, message?: string) {
    return BaseController.jsonResponse(
      res,
      401,
      message ? message : "Unauthorized"
    );
  }

  public paymentRequired(res: FastifyReply, message?: string) {
    return BaseController.jsonResponse(
      res,
      402,
      message ? message : "Payment required"
    );
  }

  public forbidden(res: FastifyReply, message?: string) {
    return BaseController.jsonResponse(
      res,
      403,
      message ? message : "Forbidden"
    );
  }

  public notFound(res: FastifyReply, message?: string) {
    return BaseController.jsonResponse(
      res,
      404,
      message ? message : "Not found"
    );
  }

  public conflict(res: FastifyReply, message?: string) {
    return BaseController.jsonResponse(
      res,
      409,
      message ? message : "Conflict"
    );
  }

  public unprocessable(res: FastifyReply, message?: string) {
    return BaseController.jsonResponse(
      res,
      422,
      message ? message : "Cannot Process"
    );
  }

  public todo(res: FastifyReply) {
    return BaseController.jsonResponse(res, 400, "TODO");
  }

  public fail(res: FastifyReply, error: Error | string) {
    console.log(error);
    return res.status(500).send({
      message: error.toString(),
    });
  }
}
