import { createServer, Model, hasMany, belongsTo, Factory } from "miragejs";
import { Challenge, Checkin } from "./types";

export function makeMirageServer() {
  return createServer({
    models: {
      challenge: Model.extend<Partial<Challenge>>({
        checkins: hasMany(),
      }),
      checkin: Model.extend<Partial<Checkin>>({
        challenge: belongsTo(),
      }),
    },

    factories: {
      challenge: Factory.extend({
        title(i: number) {
          return `挑戰 ${i + 1}`;
        },
        frequency() {
          return "daily";
        },
        createdAt() {
          return new Date();
        },
      }),
    },

    seeds(server) {
      server.createList("challenge", 3).forEach((c: any) => {
        server.createList("checkin", 2, { challenge: c });
      });
    },

    routes() {
      this.namespace = "api";

      this.get("/challenges", (schema) => schema.all("challenge"));
      this.get("/challenges/:id", (schema, request) => {
        return schema.find("challenge", request.params.id);
      });
      this.post("/challenges", (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        return schema.create("challenge", attrs);
      });

      this.get("/checkins", (schema, request) => {
        if (request.queryParams.challengeId) {
          return schema.where("checkin", {
            challengeId: request.queryParams.challengeId,
          });
        }
        return schema.all("checkin");
      });
      this.post("/checkins", (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        return schema.create("checkin", attrs);
      });
    },
  });
}
