"use strict";

const fs = require("fs");
const path = require("path");

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    const data = await fs.readFileSync(path.join(__dirname, "./initial.sql"));
    const quries = data.toString().split(";");
    try {
      for (let query of quries) {
        query = query.trim();
        if (!query.length) continue;
        await queryInterface.sequelize.query(query);
      }
    } catch (e) {
      console.error(e);
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    const tables = await queryInterface.showAllTables();
    for (const table of tables) {
      if (table.toLowerCase() === "sequelizemeta") continue;
      await queryInterface.dropTable(table);
    }
  },
};
