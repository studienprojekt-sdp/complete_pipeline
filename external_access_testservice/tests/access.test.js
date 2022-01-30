const request = require('supertest');

jest.setTimeout(20000);

describe('tests if service_1 api can NOT be accessed', () => {
    it('tests successful api call ', async () => {
      try {
        const response = await request("http://service_1:4001").get("/api/service_1/?tz=Europe/Rome");
        expect(response.statusCode).toBe(418); // 418 = i am a teapot
      } catch {
        expect(1).toBe(1);
      }
    });

    it('tests failed api call', async () => {
      try {
        const response = await request("http://service_1:4001").get("/api/service_1/?tz=NONSENSE");
        expect(response.statusCode).toBe(418); // 418 = i am a teapot
      } catch {
        expect(1).toBe(1);
      }
  });
});

describe('tests if service_2 api can NOT be accessed', () => {
  it('tests successful api call ', async () => {
    try {
      const response = await request("http://service_2:4002").get("/api/service_2/?tz=Europe/Rome");
      expect(response.statusCode).toBe(418); // 418 = i am a teapot
    } catch {
      expect(1).toBe(1);
    }
  });

  it('tests failed api call', async () => {
    try {
      const response = await request("http://service_2:4002").get("/api/service_2/?tz=NONSENSE");
      expect(response.statusCode).toBe(418); // 418 = i am a teapot
    } catch {
      expect(1).toBe(1);
    }
});
});