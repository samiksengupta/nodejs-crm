const { register, login } = require("../../../controllers/auth.controller");
const { User } = require("../../../models");
const { connect, clear, close } = require("../../db");
const { mockRequest, mockResponse } = require("../../interceptor");

beforeAll(async () => connect());
beforeEach(async () => clear());
afterAll(async () => close());

const registerPayload = {
    name: 'Test Name',
    username: 'testname',
    password: '123456',
    email: 'test@mail.com'
};

const loginPayload = {
    username: 'testname',
    password: '123456'
};

describe('register', () => {
    it('should pass', async () => {

        // arrange
        const req = mockRequest();
        const res = mockResponse();
        req.body = registerPayload;

        // act
        await register(req, res);

        // assert
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                name: registerPayload.name,
                username: registerPayload.username,
                email: registerPayload.email,
                role: registerPayload.role || 'customer',
                isEnabled: registerPayload.isEnabled || registerPayload.role === 'customer' || !registerPayload.role,
            })
        );
    })

    it('should fail', async () => {

        // arrange
        const userSpyCreate = jest.spyOn(User, 'create').mockRejectedValue('error');
        const req = mockRequest();
        const res = mockResponse();
        req.body = registerPayload;

        // act
        await register(req, res);

        // assert
        expect(userSpyCreate).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith(
            expect.objectContaining({
                message: expect.any(String)
            })
        );
    })
});

describe('login', () => {
    it('should pass', async () => {

        // arrange
        const userSpyAuthenticate = jest.spyOn(User, 'authenticate').mockResolvedValue({
            _id: 1,
            save: () => {}
        });
        const req = mockRequest();
        const res = mockResponse();
        req.body = loginPayload;

        // act
        await login(req, res);

        // assert
        expect(userSpyAuthenticate).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                accessToken: expect.any(String),
                refreshToken: expect.any(String)
            })
        );
    })

    it('should fail', async () => {

        // arrange
        const userSpyAuthenticate = jest.spyOn(User, 'authenticate').mockRejectedValue(false);
        const req = mockRequest();
        const res = mockResponse();
        req.body = loginPayload;

        // act
        await login(req, res);

        // assert
        expect(userSpyAuthenticate).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith(
            expect.objectContaining({
                message: expect.any(String)
            })
        );
    })
});
