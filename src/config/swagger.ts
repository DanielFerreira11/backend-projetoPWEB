import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ACPB Manager",
      version: "1.0.0",
      description: "Documentação da API do ACPB Manager",
    },
    servers: [
      {
        url: "http://localhost:8008",
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
