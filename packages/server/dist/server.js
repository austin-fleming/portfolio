"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./config"));
const app = (0, express_1.default)();
app.disable('x-powered-by'); // NOTE: can remove if using helmet
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hola!' });
});
app.get('/hello-world', (req, res) => {
    res.status(200).json({ message: 'Hello World!' });
});
app.listen(config_1.default.port, () => console.log('server ready on port:', config_1.default.port));
