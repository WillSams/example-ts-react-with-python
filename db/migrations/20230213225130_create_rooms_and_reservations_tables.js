export const up = async (knex) => {
  return knex.schema
    .createTable("rooms", (table) => {
      table.string("id").primary().unique();
      table.integer("num_beds");
      table.boolean("allow_smoking");
      table.integer("daily_rate");
      table.integer("cleaning_fee");
    })
    .createTable("reservations", (table) => {
      table.increments("id").primary();
      table.string("room_id").references("rooms.id");
      table.datetime("checkin_date");
      table.datetime("checkout_date");
      table.integer("total_charge");
      table.unique(["room_id", "checkin_date", "checkout_date"]);
    });
};

export const down = async (knex) =>
  knex.schema.dropTableIfExists("reservations").dropTableIfExists("rooms");

