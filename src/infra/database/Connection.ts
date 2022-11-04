import pgPromise from "pg-promise";

import { configApp } from "@App/config";

export class Connection {
  connection: any;

  constructor() {
    this.connection = pgPromise()(configApp.database.uri);
  }

  async query(statement: string, params: any) {
    return this.connection.query(statement, params);
  }

  async close() {
    return this.connection.$pool.end();
  }
}
