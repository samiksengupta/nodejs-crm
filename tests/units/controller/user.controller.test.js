
const { index, create, read, update, destroy } = require("../../../controllers/user.controller");
const { User } = require("../../../models");
const { connect, clear, close } = require("../../db");
const { mockRequest, mockResponse } = require("../../interceptor");

beforeAll(async () => connect());
beforeEach(async () => clear());
afterAll(async () => close());

describe('index', () => {
    it('should return array', async () => {
        // arrange
        const req = mockRequest();
        const res = mockResponse();

        // act
        await index(req, res);

        console.log(res);

        // assert
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(
            expect.arrayContaining(
                expect.anything()
            )
        );
    })
});