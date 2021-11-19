"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async createMascota(ctx) {
    const { name, years, date, isExact, raza, edadtipo } = ctx.request.body;
    const result = await strapi.query("raza").find({ Nombre: raza });
    if (!isExact) {
      let calculo = edadtipo === "year" ? years * 12 : years;
      let date = new Date("25 Dec 2021");
      date.setMonth(date.getMonth() - calculo);
      await strapi.services.mascota.create({
        name: name,
        edad: years,
        nacimiento: date,
        isExact: isExact,
        raza: result[0]._id,
        edadtipo: edadtipo,
      });
      return ctx.send("Creado");
    }
    if (isExact) {
      let birthday_arr = date.split("-").reverse();
      let birthday_date = new Date(
        birthday_arr[2],
        birthday_arr[1] - 1,
        birthday_arr[0]
      );
      let ageDifMs = Date.now() - birthday_date.getTime();
      let ageDate = new Date(ageDifMs);
      let edad = Math.abs(ageDate.getUTCFullYear() - 1970);
      console.log(edad);
      if (edad > 0) {
        await strapi.services.mascota.create({
          name: name,
          edad: edad,
          nacimiento: date,
          isExact: isExact,
          raza: result[0]._id,
          edadtipo: "year",
        });
        return ctx.send("Creado");
      }
      if (edad === 0) {
        let fecha = Date.now();
        let newDate = new Date(fecha);
        let meses =
          newDate.getMonth() -
          birthday_date.getMonth() +
          12 * (newDate.getFullYear() - birthday_date.getFullYear());
        console.log(meses);
        await strapi.services.mascota.create({
          name: name,
          edad: meses,
          nacimiento: date,
          isExact: isExact,
          raza: result[0]._id,
          edadtipo: "months",
        });
        return ctx.send("Creado");
      }
    }
  },
};
