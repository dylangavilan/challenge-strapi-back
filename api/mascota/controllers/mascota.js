"use strict";

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async createMascota(ctx) {
    const { name, years, date, isExact, raza, edadtipo, sexo } =
      ctx.request.body;
    try {
      if (!isExact) {
        let calculo = edadtipo === "year" ? years * 12 : years;
        console.log("calculo", calculo);
        let fecha = new Date("25 Dec 2021");
        fecha.setMonth(fecha.getMonth() - calculo);
        await strapi.services.mascota.create({
          name: name,
          edad: years,
          nacimiento: fecha,
          isExact: isExact,
          raza: raza,
          edadtipo: edadtipo,
          sexo: sexo,
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
        if (edad > 0) {
          await strapi.services.mascota.create({
            name: name,
            edad: edad,
            nacimiento: date,
            isExact: isExact,
            raza: raza,
            edadtipo: "year",
            sexo: sexo,
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
            raza: raza,
            edadtipo: "months",
            sexo: sexo,
          });
          return ctx.send("Creado");
        }
      }
    } catch (err) {
      ctx.status = 400;
      ctx.send(err);
    }
  },
};
