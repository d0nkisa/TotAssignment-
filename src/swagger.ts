import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Restaurant Reservations API',
      version: '1.0.0',
    },
  },
  apis: ['src/routes/*.ts'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
export default swaggerDocs;