"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("usuarios", "genero", {
      type: Sequelize.ENUM("Masculino", "Feminino"),
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("usuarios", "genero");
  },
};
