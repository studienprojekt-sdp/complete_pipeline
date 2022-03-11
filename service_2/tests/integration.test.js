const request = require('supertest');

jest.setTimeout(20000);

describe('tests service_2 api', () => {
    it('tests successful api call ', async () => {
        const response = await request("http://service_2:4002").get("/api/service_2/?tz=Europe/Rome");
        expect(response.body).toHaveProperty('time');
        expect(response.body).toHaveProperty('location');
        expect(response.statusCode).toBe(200);
    });

    it('tests failed api call', async () => {
      const response = await request("http://service_2:4002").get("/api/service_2/?tz=NONSENSE");
      expect(response.statusCode).toBe(404);
  });
});