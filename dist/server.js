"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = __importDefault(require("./config"));
const mongoose_1 = __importDefault(require("mongoose"));
const books_routes_1 = __importDefault(require("./modules/books/books.routes"));
const borrow_route_1 = __importDefault(require("./modules/books/borrow.route"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(books_routes_1.default);
app.use(borrow_route_1.default);
app.listen(config_1.default.port, () => {
    console.log(`Server running on port ${config_1.default.port}`);
});
app.get("/", (req, res) => {
    res.send({ success: true, massage: "I am here!" });
});
function server() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!config_1.default.database_url) {
                throw new Error(' DATABASE_URL is missing!');
            }
            yield mongoose_1.default.connect(config_1.default.database_url);
            console.log(`✅ Connected to database`);
        }
        catch (error) {
            console.error(`Server error:`, error);
        }
    });
}
server();
