import {expect, test} from "@playwright/test";
import {StatusCodes} from "http-status-codes";

let userID: number;
let baseURL: string = 'http://localhost:3000/users';

test.beforeAll(async ({request}) => {
    const response = await request.post(`${baseURL}`);
    const body = await response.json();
    userID = body.id
});
test.describe('Check for one User management  API', () => {

    test('POST / - should add a new user', async ({request}) => {
        const response = await request.post(`${baseURL}`);
        const body = await response.json();
        expect(response.status()).toBe(201)
        expect.soft(response.status()).toBe(StatusCodes.CREATED)
        expect.soft(body.id).toBeDefined()
    });

    test('GET /:id - should return a user by ID', async ({request}) => {
        const response = await request.get(`${baseURL}` + "/" + userID);
        const responseBody = await response.text()
        console.log(responseBody)
        expect(response.status()).toBe(StatusCodes.OK);
    });

    test('DELETE /:id - should delete a user by ID', async ({request}) => {
        const response = await request.delete(`${baseURL}` + "/" + userID);
        const responseBody = await response.json();
        console.log(responseBody)
        expect.soft(response.status()).toBe(StatusCodes.OK)
        expect.soft(responseBody[0].id).toBe(userID)
    });

    test('DELETE /:id - should return 404 if user not found', async ({request}) => {
        const response = await request.delete(`${baseURL}` + "/" + 111);
        const responseBody = await response.json();
        console.log(responseBody)
        expect.soft(response.status()).toBe(StatusCodes.NOT_FOUND)
    });
});