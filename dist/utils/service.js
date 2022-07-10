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
exports.createService = void 0;
const axios_1 = __importDefault(require("axios"));
const _1 = require(".");
const types_1 = require("../types");
function createService(miraiInstance) {
    const service = axios_1.default.create({
        baseURL: miraiInstance.config.host,
    });
    service.interceptors.request.use((config) => __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        if ((0, _1.isVerifyApi)(config.url || "")) {
            // verify api
        }
        else {
            // normal api
            if (!miraiInstance.cachedSessionKey) {
                const newSession = yield miraiInstance.setNewSession();
                miraiInstance.log.info(`set new session ${newSession}`);
            }
            if (config.method === "get") {
                config.params = Object.assign((_a = config === null || config === void 0 ? void 0 : config.params) !== null && _a !== void 0 ? _a : {}, {
                    sessionKey: miraiInstance.cachedSessionKey,
                });
            }
            else if (config.method === "post") {
                config.data = Object.assign((_b = config === null || config === void 0 ? void 0 : config.data) !== null && _b !== void 0 ? _b : {}, {
                    sessionKey: miraiInstance.cachedSessionKey,
                });
            }
        }
        return config;
    }));
    service.interceptors.response.use((response) => __awaiter(this, void 0, void 0, function* () {
        const config = response.config;
        const resData = response.data;
        // sessionKey 失效重新激活并重新发送请求
        if (resData.code === types_1.MIRAI_HTTP_CODE_ENUM.noSession && !config.isReload) {
            miraiInstance.log.info(`session ${miraiInstance.cachedSessionKey} is expired, reactive session ... ...`);
            const newSession = yield miraiInstance.setNewSession();
            miraiInstance.log.info(`set new session ${newSession}`);
            return yield service(Object.assign(Object.assign({}, config), { isReload: true, reloadCount: typeof config.reloadCount === "number" ? config.reloadCount + 1 : 1 }));
        }
        return response;
    }), (error) => {
        miraiInstance.log.error(error);
    });
    const miraiService = {
        get(url, config) {
            return service.get(url, config);
        },
        post(url, data, config) {
            return service.post(url, data, config);
        },
    };
    return miraiService;
}
exports.createService = createService;
