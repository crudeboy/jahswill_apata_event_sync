import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.alterTable('tokens', function(table) {
        table.string('current_price').nullable().alter();
      });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.alterTable('tokens', function(table) {
        table.string('current_price').notNullable().alter();
      });
}

