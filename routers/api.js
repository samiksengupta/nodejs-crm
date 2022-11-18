const express = require('express');
// const accountController = require('../controllers/account.controller');
const authController = require('../controllers/auth.controller');
// const categoryController = require('../controllers/category.controller');
// const productController = require('../controllers/product.controller');
// const userController = require('../controllers/user.controller');
const validator = require('../middlewares/validators');
const { authenticate, authorize } = require('../middlewares/auth');

const apiRouter = express.Router();
const apiRouterSecure = express.Router();

apiRouter.get('/', (req, res) => {
    res.status(200).send({
        message: 'You have reached the API service successfully!'
    });
});

apiRouter.route('/register').post(validator.authRegister, authController.register);
apiRouter.route('/login').post(validator.authLogin, authController.login);
apiRouter.route('/logout').post(authController.logout);
apiRouter.route('/refresh').post(validator.authRefresh, authController.refresh);

apiRouterSecure.use(authenticate);

/* apiRouterSecure.route('/users')
    .get(userController.index)
    .post(authorize, userController.create);

apiRouterSecure.route('/users/:id')
    .get(userController.read)
    .put(authorize, userController.update)
    .delete(authorize, userController.destroy);

apiRouterSecure.route('/categories')
    .get(categoryController.index)
    .post(authorize, validator.categoryCreate, categoryController.create);

apiRouterSecure.route('/categories/:id')
    .get(categoryController.read)
    .put(authorize, validator.categoryUpdate, categoryController.update)
    .delete(authorize, categoryController.destroy);

apiRouterSecure.route('/categories/:id/products')
    .get(categoryController.indexProducts);

apiRouterSecure.route('/products')
    .get(productController.index)
    .post(authorize, validator.productCreate, productController.create);

apiRouterSecure.route('/products/:id')
    .get(productController.read)
    .put(authorize, validator.productUpdate, productController.update)
    .delete(authorize, productController.destroy);

apiRouterSecure.route('/cart')
    .get(accountController.getCart)
    .put(accountController.setCart)
    .delete(accountController.clearCart); */

module.exports = {
    apiRouter: apiRouter, 
    apiRouterSecure: apiRouterSecure
};