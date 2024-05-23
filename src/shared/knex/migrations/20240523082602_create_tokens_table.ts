import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
    .createTable('tokens', (table) => {
      table.increments('id').primary({ constraintName: 'tokens_pk' });
      table.string('contract_address').notNullable();
      table.string('index').notNullable();
      table.double('current_price').notNullable();
      table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('tokens');
}
