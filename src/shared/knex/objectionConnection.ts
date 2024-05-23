import knex from "knex";
import { Model } from "objection";
import env from "../../config/environment"
const knexConfiguration = require("./knexfile");

let environ = env.nodeEnv || "development";

export default () => {
  let config: any;
  let pg: any;
  if (environ === "production") {
    config = knexConfiguration.production;
  } else if (environ === "development") {
    config = knexConfiguration.development;
  }
  
  pg = knex(config);
  Model.knex(pg);
  return Model;
};