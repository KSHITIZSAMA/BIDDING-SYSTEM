const { insertBid, getLowestBid, getTopBids } = require('../models/bidModel');
const { getRFQById, updateCurrentCloseTime } = require('../models/rfqModel');
const { getAuctionConfig } = require('../models/auctionConfigModel');
const { logActivity } = require('../models/activityLogModel');

const placeBidService = async (rfqId, supplierId, price, io) => {

    // define room
    const room = `rfq_${rfqId}`;

    // 0. validate RFQ
    const rfq = await getRFQById(rfqId);

    if (!rfq) {
        throw new Error("RFQ not found");
    }

    if (rfq.status !== 'ACTIVE') {
        throw new Error("Auction is not active");
    }

    const now = new Date();
    const currentClose = new Date(rfq.currentCloseTime);

    if (now > currentClose) {
        throw new Error("Auction has ended");
    }

    // 1. get L1
    const lowestBid = await getLowestBid(rfqId);

    if (lowestBid && price >= lowestBid.price) {
        throw new Error("Bid must be lower than current lowest bid");
    }

    // 2. insert bid
    const result = await insertBid(rfqId, supplierId, price);

    // 3. log bid
    await logActivity(
        rfqId,
        "BID_PLACED",
        `Supplier ${supplierId} placed bid ${price}`
    );

    // 4. get rankings
    const topBids = await getTopBids(rfqId);

    // 🔥 emit to room (NOT global)
    if (io) {
        io.to(room).emit('NEW_BID', {
            rfqId,
            supplierId,
            price
        });

        io.to(room).emit('RANK_UPDATE', {
            rfqId,
            rankings: topBids
        });
    }

    // 5. extension logic
    const config = await getAuctionConfig(rfqId);
    const forcedClose = new Date(rfq.forcedCloseTime);

    const timeLeft = (currentClose - now) / (1000 * 60);

    if (config && timeLeft <= config.triggerWindow) {

        let newCloseTime = new Date(
            currentClose.getTime() + config.extensionDuration * 60000
        );

        if (newCloseTime > forcedClose) {
            newCloseTime = forcedClose;
        }

        // update DB
        await updateCurrentCloseTime(rfqId, newCloseTime);

        // log extension
        await logActivity(
            rfqId,
            "TIME_EXTENDED",
            `Extended by ${config.extensionDuration} minutes`
        );

        // 🔥 emit extension ONLY to that RFQ room
        if (io) {
            io.to(room).emit('TIME_EXTENDED', {
                rfqId,
                newCloseTime
            });
        }
    }

    // 6. response
    return {
        message: "Bid inserted in DB",
        insertId: result.insertId,
        rankings: topBids
    };
};

module.exports = { placeBidService };