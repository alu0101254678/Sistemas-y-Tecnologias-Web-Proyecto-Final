const { Router } = require('express');
const router = Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
router.get('/', (req, res) => res.send('Hello world'));
router.post('/signup', async (req, res) => {
    //console.log(req.body);
    const { name, email, password, type } = req.body;
    const newUser = User({ name, email, password, type });
    await newUser.save();
    const token = await jwt.sign({ _id: newUser._id }, 'secretkey');
    res.status(200).json({ token });
    console.log(newUser);
    //console.log(name, email, password, type);
    //res.send('register');
});
router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(401).send("El correo no existe");
    }
    if (user.password !== password) {
        return res.status(401).send("La contraseña no existe");
    }
    const token = jwt.sign({ _id: user._id }, 'secretkey');
    return res.status(200).json({ token });
});
router.get('/productos', (req, res) => {
    res.json([
        {
            _id: 1,
            name: 'Cerveza',
            description: 'Cerveza de Canarias',
            supermercado: "Mercadona"
        },
        {
            _id: 2,
            name: 'Leche',
            description: 'Leche de Canarias',
            supermercado: "Mercadona"
        },
        {
            _id: 3,
            name: 'Cereales',
            description: 'Cereales de Canarias',
            supermercado: "Mercadona"
        }
    ]);
});
router.get('/misproductos', verifyToken, (req, res) => {
    res.json([
        {
            _id: 1,
            name: 'Cerveza',
            description: 'Cerveza de Canarias',
            supermercado: "Mercadona"
        },
        {
            _id: 2,
            name: 'Leche',
            description: 'Leche de Canarias',
            supermercado: "Mercadona"
        },
        {
            _id: 3,
            name: 'Cereales',
            description: 'Cereales de Canarias',
            supermercado: "Mercadona"
        }
    ]);
});
module.exports = router;
function verifyToken(req, res, next) {
    console.log("->");
    console.log(req.headers);
    if (!req.headers.authorization) {
        return res.status(401).send('Autorización errónea');
    }
    const token = req.headers.authorization.split(' ')[1];
    if (token === "null") {
        return res.status(401).send('Autorización errónea');
    }
    const payload = jwt.verify(token, 'secretkey'); //contenido que esta dentro del token
    console.log(payload);
    req.userId = payload._id;
    next();
}
