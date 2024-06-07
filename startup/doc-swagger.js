const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

module.exports = (app) => {
  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Real-Time Analytics API",
        version: "1.0.0",
      },
      servers: [
        {
          url: `http://localhost:${process.env.PORT}`,
        },
      ],
    },
    apis: ["./routers/*.js"],
  };

  const swaggerSpec = swaggerJsdoc(options);

  app.use("/api/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
