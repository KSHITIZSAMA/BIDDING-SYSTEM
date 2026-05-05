const { placeBidService } = require('../services/bidService');

const placeBid = async (req, res) => {
    try {
        const { rfqId, price } = req.body;

        const supplierId = req.user.id; // 🔥 FROM TOKEN

        const io = req.app.get('io');

        const result = await placeBidService(rfqId, supplierId, price, io);

        res.json({ success: true, data: result });

    } catch (err) {
        res.json({ success: false, message: err.message });
    }
};

module.exports = { placeBid };