import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
    .createTable('user', (table) => {
      table.increments('id').primary({ constraintName: 'user_pk' });
      table.string('contract_address').notNullable();
      table.string('token_index').notNullable();
      table.double('listing_price').notNullable();
    })
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('user');
}

