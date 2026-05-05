const db=require('../config/db');

const logActivity = async (rfqId, eventType, details) => {
    const query = `
        INSERT INTO activity_log (rfqId, eventType, details)
        VALUES (?, ?, ?)
    `;
    const [result] = await db.execute(query, [rfqId, eventType , details]);
    return result;
};

module.exports = { logActivity };
