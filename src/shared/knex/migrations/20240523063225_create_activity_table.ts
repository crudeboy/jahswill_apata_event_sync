import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.schema
    .createTable('activity', (table) => {
      table.increments('id').primary({ constraintName: 'activity_pk' });
      table.string('contract_address').notNullable();
      table.string('token_index').notNullable();
      table.double('listing_price').notNullable();
      table.string('maker').notNullable();
      table.double('listing_from').notNullable();
      table.double('listing_to').nullable();
      table.string('event_timestamp').notNullable();
      table.timestamps(true, true);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('activity');
}
