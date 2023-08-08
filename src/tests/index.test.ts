// __tests__/index.test.ts or tests/index.test.ts

import request from 'supertest';
import app from '../index'; // Make sure the path is correct

describe('GET /', () => {
  it('should return a 200 status code', async () => {
    const response = await request(app).get('/api/products/all');
    expect(response.status).toBe(200);
  });

  it('should return a 200 status code', async () => {

    const requestBody = {
        "id" : 3,
        "name" : "third product",
        "price" : "14",
        "description": "respecter la posologie",
        "category": "head",
        "typeProduct": "parapharmacy",
        "image": "..."
    };
    const response = await request(app).post('/api/products/sudoCreateProduct').send(requestBody);
    expect(response.status).toBe(200);
  });

  it('should return a 200 status code', async () => {
    const requestBody = {
        "id" : 3,
        "name" : "third product",
        "price" : "14",
        "description": "respecter la posologie",
        "category": "head",
        "typeProduct": "parapharmacy",
        "image": "..."
    };
    const response = await request(app).post('/api/products/createProduct').send(requestBody);
    expect(response.status).toBe(200);
  });

  it('should return a 200 status code for download files', async () => {
    
    const response = await request(app).get('/api/files/downloadFiles');
    expect(response.status).toBe(200);
  });

  it('should return a JSON response', async () => {
    const response = await request(app).get('/api/products/all');
    expect(response.type).toEqual('application/json');
  });
});