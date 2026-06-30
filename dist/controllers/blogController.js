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
exports.blogController = void 0;
const database_1 = __importDefault(require("../database"));
const response_helper_1 = require("../helpers/response.helper");
class BlogController {
    listBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [list] = yield database_1.default.query('SELECT * FROM blog');
                (0, response_helper_1.successResponse)(res, 'Listado Correctamente', list);
            }
            catch (error) {
                console.log('Error Listar Blogs', error);
                (0, response_helper_1.errorResponse)(res, 'Error del Servidor');
            }
        });
    }
    getBlogOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { IdBlog } = req.params;
                const [list] = yield database_1.default.query('SELECT * FROM blog WHERE IdBlog = ?', [IdBlog]);
                if (list.length === 0) {
                    return (0, response_helper_1.errorResponse)(res, 'Blog no encontrado', 404);
                }
                const [Fotos] = yield database_1.default.query('SELECT * FROM blog_foto WHERE IdBlog = ?', [IdBlog]);
                const data = [Object.assign(Object.assign({}, list[0]), { Fotos })];
                (0, response_helper_1.successResponse)(res, 'Listado Correctamente', data);
            }
            catch (error) {
                console.log('Error al obtener el blog', error);
                (0, response_helper_1.errorResponse)(res, 'Error del Servidor');
            }
        });
    }
}
exports.blogController = new BlogController();
