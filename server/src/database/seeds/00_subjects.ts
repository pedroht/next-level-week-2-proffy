import * as Knex from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex("subjects").del();

  await knex("subjects").insert([
    { name: "Artes" },
    { name: "Química" },
    { name: "Matemática" },
    { name: "Português" },
    { name: "Biologia" },
    { name: "Ciências" },
    { name: "Geografia" },
    { name: "História" },
    { name: "Educação Física" },
  ]);
}
