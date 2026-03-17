const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Earthquake API',
      version: '1.0.0',
      description: 'A REST API for earthquake data with authentication, pagination, and caching.',
      contact: { name: 'API Support' }
    },
    servers: [
      { url: 'http://localhost:3000', description: 'Development' },
      { url: 'https://your-cloud-url.com', description: 'Production' }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
  apis: ['./src/routes/*.js']
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = { swaggerUi, swaggerSpec };
