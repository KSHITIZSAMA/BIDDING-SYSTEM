const db=require('../config/db');

const getAuctionConfig = async (rfqId) => {
    const query = `
        SELECT *
        FROM auction_config
        WHERE rfqId = ?
    `;

    const [rows] = await db.execute(query, [rfqId]);

    return rows[0];
};

module.exports = { getAuctionConfig };