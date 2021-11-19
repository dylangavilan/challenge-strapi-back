"use strict";
const { sanitizeEntity } = require("strapi-utils");
/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async filterByRaza(ctx) {
    const { nombre } = ctx.params;
    const result = await strapi
      .query("raza")
      .find({ Nombre: nombre }, ["Mascota", "mascotas"]);
    return sanitizeEntity(result, { model: strapi.models.raza });
  },
};
