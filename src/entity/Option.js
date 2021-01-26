"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var User_1 = require("./User");
var Option = /** @class */ (function () {
    function Option() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        __metadata("design:type", Number)
    ], Option.prototype, "id", void 0);
    __decorate([
        typeorm_1.OneToOne(function () { return User_1.User; }, { nullable: true }),
        typeorm_1.JoinColumn(),
        __metadata("design:type", Number)
    ], Option.prototype, "user", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Option.prototype, "number_choices", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Boolean)
    ], Option.prototype, "vote_anyway", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Option.prototype, "time", void 0);
    Option = __decorate([
        typeorm_1.Entity()
    ], Option);
    return Option;
}());
exports.Option = Option;
//# sourceMappingURL=Option.js.map