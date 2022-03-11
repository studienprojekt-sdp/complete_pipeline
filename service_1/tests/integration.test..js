const request = require('supertest');

jest.setTimeout(20000);

describe('service_1_integration_tests', () => {
    it('tests successful api call ', async () => {
        const response = await request("http://service_1:4001").get("/api/service_1/?tz=Europe/Rome");
        expect(response.statusCode).toBe(200);
    });

    it('tests failed api call', async () => {
      const response = await request("http://service_1:4001").get("/api/service_1/?tz=NONSENSE");
      expect(response.statusCode).toBe(404);
  });
});