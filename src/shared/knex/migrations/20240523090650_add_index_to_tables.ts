import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable('tokens', function(table) {
        table.index('index');
      })
      .alterTable('activity', function(table) {
        table.index('token_index');
      });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable('tokens', function(table) {
        table.dropIndex('index');
      })
      .alterTable('activity', function(table) {
        table.dropIndex('token_index');
      });
}