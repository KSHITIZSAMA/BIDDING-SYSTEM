const db = require('../config/db');

const getRFQById = async (rfqId) => {
    const query = `
        SELECT *
        FROM rfq
        WHERE id = ?
    `;
     
    const [rows] = await db.execute(query, [rfqId]);
    
    return rows[0]; // return single RFQ
};

const updateCurrentCloseTime = async (rfqId, newTime) => {
    const query = `
        UPDATE rfq
        SET currentCloseTime = ?
        WHERE id = ?
    `;

    const [result] = await db.execute(query, [newTime, rfqId]);

    return result;
};

module.exports = { getRFQById, updateCurrentCloseTime };