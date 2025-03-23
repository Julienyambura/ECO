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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var locations_1 = require("../data/locations");
var stats_1 = require("../data/stats");
// Define your MongoDB URI (use environment variable or default)
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/eco_glass";
// Connect to MongoDB (Mongoose handles the connection pooling automatically)
function setupDatabase() {
    return __awaiter(this, void 0, void 0, function () {
        var Location_1, Stats, MonthlyStat, locationsCount, _i, mockLocations_1, location_1, statsCount, _a, _b, monthlyStat, error_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 14, , 15]);
                    // Connect to MongoDB
                    return [4 /*yield*/, mongoose_1.default.connect(MONGODB_URI)];
                case 1:
                    // Connect to MongoDB
                    _c.sent();
                    console.log("Connected to MongoDB successfully");
                    Location_1 = mongoose_1.default.model("Location", new mongoose_1.default.Schema({
                        id: String,
                        name: String,
                        address: String,
                        city: String,
                        state: String,
                        zipCode: String,
                        latitude: Number,
                        longitude: Number,
                        hours: String,
                        phone: String,
                        website: String,
                        acceptedItems: mongoose_1.default.Schema.Types.Mixed,
                    }));
                    Stats = mongoose_1.default.model("Stat", new mongoose_1.default.Schema({
                        totalLocations: Number,
                        totalGlassRecycled: Number,
                        co2Saved: Number,
                        energySaved: Number,
                    }));
                    MonthlyStat = mongoose_1.default.model("MonthlyStat", new mongoose_1.default.Schema({
                        month: String,
                        amount: Number,
                    }));
                    return [4 /*yield*/, Location_1.countDocuments()];
                case 2:
                    locationsCount = _c.sent();
                    if (!(locationsCount === 0)) return [3 /*break*/, 6];
                    console.log("Inserting mock locations data...");
                    _i = 0, mockLocations_1 = locations_1.mockLocations;
                    _c.label = 3;
                case 3:
                    if (!(_i < mockLocations_1.length)) return [3 /*break*/, 6];
                    location_1 = mockLocations_1[_i];
                    return [4 /*yield*/, Location_1.create(location_1)];
                case 4:
                    _c.sent();
                    _c.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 3];
                case 6: return [4 /*yield*/, Stats.countDocuments()];
                case 7:
                    statsCount = _c.sent();
                    if (!(statsCount === 0)) return [3 /*break*/, 12];
                    console.log("Inserting mock stats data...");
                    return [4 /*yield*/, Stats.create(stats_1.mockStats)];
                case 8:
                    _c.sent();
                    _a = 0, _b = stats_1.mockStats.monthlyStats;
                    _c.label = 9;
                case 9:
                    if (!(_a < _b.length)) return [3 /*break*/, 12];
                    monthlyStat = _b[_a];
                    return [4 /*yield*/, MonthlyStat.create(monthlyStat)];
                case 10:
                    _c.sent();
                    _c.label = 11;
                case 11:
                    _a++;
                    return [3 /*break*/, 9];
                case 12:
                    console.log("Database setup completed successfully");
                    // Close the MongoDB connection
                    return [4 /*yield*/, mongoose_1.default.disconnect()];
                case 13:
                    // Close the MongoDB connection
                    _c.sent();
                    console.log("Disconnected from MongoDB");
                    process.exit(0);
                    return [3 /*break*/, 15];
                case 14:
                    error_1 = _c.sent();
                    console.error("Error setting up database:", error_1);
                    process.exit(1);
                    return [3 /*break*/, 15];
                case 15: return [2 /*return*/];
            }
        });
    });
}
setupDatabase();
