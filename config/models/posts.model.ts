import knex from "knex";
import { Model } from "objection";

const db = knex({
  client: "sqlite3",
  connection: {
    filename: "./test.db",
  },
  useNullAsDefault: true,
});

Model.knex(db);

export class Posts extends Model {
  title: string;
  content: string;

  static get tableName() {
    return "posts";
  }

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["title", "content"],
      properties: {
        title: { type: "string" },
        content: { type: "string" },
      },
    };
  }
}
