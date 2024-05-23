import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable('tokens', function(table) {
        table.foreign('index', 'token_index_foreign_key').references('token_index').inTable('activity');
      })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable('tokens', function(table) {
        table.dropForeign('index', 'token_index_foreign_key');
      })
}