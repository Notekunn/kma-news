const PORT = process.env.PORT || 8888

const swaggerOption = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'KMA News API Document',
      version: '1.0.0',
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
  },
  apis: ['./src/docs/*.yml', './src/routes/*.ts'],
}

export default swaggerOption
