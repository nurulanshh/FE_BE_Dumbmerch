//instantiate express module here
const express = require('express')

// Init express router here..
const router = express.Router()

// Controller
// import controller here
const {addUsers, getUser, getUsers, updateUser, deleteUser, getProfile } = require('../controllers/user')
const { getProduct, addProduct, getUserProduct, updateProduct, deleteProduct, getDetailProduct, nameProduct } = require('../controllers/product')
const { getTransactions, addTransaction, notification } = require('../controllers/transaction')
const { register, login, checkAuth } = require('../controllers/auth')
const { getCategory, addCategory, detailCategory, updateCategory, deleteCategory } = require('../controllers/category')


// Middleware
// import middleware here
const {auth} = require('../middlewares/auth')
const { uploadFile } = require('../middlewares/uploadFile')


// Route
// add route here
router.post('/user', addUsers)
router.get('/users', getUsers)
router.get('/user/:id', getUser)
router.patch('/user/:id', updateUser)
router.delete('/user/:id', deleteUser)

router.get('/products', getProduct)
router.get('/product/:id', getDetailProduct)
router.post('/product/:name', nameProduct)
router.get('/user-products', getUserProduct)
router.post('/product', auth, uploadFile('image'), addProduct)
router.patch('/product/:id',auth, uploadFile('image'), updateProduct)
router.delete('/product/:id', auth, deleteProduct)

router.get('/categories', getCategory)
router.post('/category', addCategory)
router.get('/category/:id', auth, detailCategory)
router.patch('/category/:id',auth, updateCategory)
router.delete('/category/:id', auth, deleteCategory)


router.get('/transactions',auth, getTransactions)
router.post('/transaction',auth, addTransaction)
// Create router for notification with POST method here ...
router.post("/notification", notification);

router.post('/register', register)
router.post('/login', login)
router.get("/check-auth", auth, checkAuth);


// add route here
router.get("/profile", getProfile);



// Export module router here
module.exports = router




