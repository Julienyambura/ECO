"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mockStats = void 0;
// Mock data - in a real application, this would come from a database
exports.mockStats = {
    totalLocations: 127,
    totalGlassRecycled: 1250000, // in pounds
    co2Saved: 875000, // in pounds
    energySaved: 437500, // in kWh
    monthlyStats: [
        { month: "Jan", amount: 95000 },
        { month: "Feb", amount: 85000 },
        { month: "Mar", amount: 100000 },
        { month: "Apr", amount: 110000 },
        { month: "May", amount: 120000 },
        { month: "Jun", amount: 115000 },
        { month: "Jul", amount: 105000 },
        { month: "Aug", amount: 95000 },
        { month: "Sep", amount: 100000 },
        { month: "Oct", amount: 110000 },
        { month: "Nov", amount: 105000 },
        { month: "Dec", amount: 110000 },
    ],
};
