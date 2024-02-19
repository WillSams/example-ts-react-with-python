import { readFile } from 'fs/promises';

const jsonReader = async (filepath, callback) => {
  try {
    const data = await readFile(filepath);
    const obj = JSON.parse(data);
    callback(null, obj);
    return obj;
  } catch (error) {
    return Promise.reject(error);
  }
};

const dropAllConstraints = async (knex, tableName) => {
  const tableExists = await knex.schema.hasTable(tableName);
  if (tableExists) {
    const constraintQuery = `
      SELECT conname 
      FROM pg_constraint 
      WHERE conrelid = (
        SELECT oid 
        FROM pg_class 
        WHERE relname = '${tableName}'
      );
    `;

    const result = await knex.raw(constraintQuery);
    const constraintNames = result.rows.map((row) => row.conname);
    for (const constraintName of constraintNames) {
      await knex.raw(`ALTER TABLE ${tableName} DROP CONSTRAINT IF EXISTS "${constraintName}";`);
    }
  }
};

const seedData = async (knex, tableName, data) => {
  if (tableName == 'rooms') await dropAllConstraints(knex, 'reservations');
  const databaseExists = await knex.schema.hasTable(tableName);
  if (databaseExists) await knex(tableName).del();
  return await knex(tableName).insert(data);
};

const injectTables = async (knex, tableName) => {
  try {
    const data = await jsonReader(`./seeds/development/${tableName}.json`, (error, data) => {
      if (error) throw error;
      else return data;
    });
    await seedData(knex, tableName, data);
  } catch (ex) {
    console.log(`Seed failed: ${ex.message}`);
  }
};

export const seed = async (knex) => {
  await injectTables(knex, 'rooms');
  await injectTables(knex, 'reservations');
};
