"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var locationsController_1 = require("../controllers/locationsController"); // named imports
var router = express_1.default.Router();
// GET all locations
router.get("/", locationsController_1.getLocations);
// GET location by ID
router.get("/:id");
exports.default = router;
