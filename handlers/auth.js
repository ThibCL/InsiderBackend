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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = require("jsonwebtoken");
var typeorm_1 = require("typeorm");
var User_1 = require("../src/entity/User");
var google_auth_library_1 = require("google-auth-library");
var Handler = /** @class */ (function () {
    function Handler(clientId) {
        var _this = this;
        this.login = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var ticket, payload, userid, connection, user, userRepo, e_1, token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.verifyIdToken({
                            idToken: req.body.token,
                            audience: [
                                "578157949333-l0ufg3vlp0l0msbbdloq3nna5bdm2r66.apps.googleusercontent.com",
                                "578157949333-gdsu9a0325a42eiqf5mqt042gijhim3v.apps.googleusercontent.com",
                            ],
                        })];
                    case 1:
                        ticket = _a.sent();
                        console.log("verified");
                        payload = ticket.getPayload();
                        userid = payload["sub"];
                        console.log(payload);
                        console.log(userid);
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 5, 6, 8]);
                        return [4 /*yield*/, typeorm_1.createConnection()];
                    case 3:
                        connection = _a.sent();
                        userRepo = connection.getRepository(User_1.User);
                        return [4 /*yield*/, userRepo.findOne({ id: userid })];
                    case 4:
                        user = _a.sent();
                        console.log(user);
                        return [3 /*break*/, 8];
                    case 5:
                        e_1 = _a.sent();
                        console.log(e_1);
                        return [3 /*break*/, 8];
                    case 6: return [4 /*yield*/, connection.close()];
                    case 7:
                        _a.sent();
                        return [7 /*endfinally*/];
                    case 8:
                        token = "";
                        if (user) {
                            token = jsonwebtoken_1.sign({ id: payload["sub"] }, "secret", {
                                expiresIn: "24h",
                            });
                        }
                        if (token != "") {
                            res.statusCode = 200;
                            res.send(JSON.stringify({ token: token }));
                        }
                        else {
                            res.statusCode = 401;
                            res.send(JSON.stringify({ error: "User does not exist" }));
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        this.client = new google_auth_library_1.OAuth2Client(clientId);
    }
    return Handler;
}());
exports.Handler = Handler;
//# sourceMappingURL=auth.js.map