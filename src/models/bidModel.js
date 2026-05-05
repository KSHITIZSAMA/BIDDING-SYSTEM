const db = require('../config/db');

// insert bid into database
const insertBid = async (rfqId, supplierId, price) => {
    const query = `
        INSERT INTO bids (rfqId, supplierId, price)
        VALUES (?, ?, ?)
    `;

    const [result] = await db.execute(query, [rfqId, supplierId, price]);

    return result;
};

// get lowest bid (L1)
const getLowestBid = async (rfqId) => {
    const query = `
        SELECT *
        FROM bids
        WHERE rfqId = ?
        ORDER BY price ASC
        LIMIT 1
    `;

    const [rows] = await db.execute(query, [rfqId]);

    return rows[0]; 
};

const getTopBids = async (rfqId) => {
    const query = `
        SELECT *
        FROM bids
        WHERE rfqId = ?
        ORDER BY price ASC
        LIMIT 3
    `;

    const [rows] = await db.execute(query, [rfqId]);

    return rows; 
};



module.exports = { insertBid, getLowestBid, getTopBids };