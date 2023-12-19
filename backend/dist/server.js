"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('tiny'));
app.use(express_1.default.json());
app.use(express_1.default.static('public'));
app.get('*', (req, res) => {
    res.status(404).json({
        status: 404,
        message: 'This is not what you are looking for!',
    });
});
app.listen(8000, () => {
    console.log('Server is running!');
});
