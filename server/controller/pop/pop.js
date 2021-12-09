const { Beans } =  require('../../models');
const { isAuthorized } = require('../tokenFunctions');
const { Op } = require('sequelize');

module.exports = {
    get: async (req, res) => {
        if (!req.headers['authorization']) {
            return res.status(401).send({
                message: 'invalid access token',
            });
        }
    
        const accessTokenData = isAuthorized(req);
        // console.log(accessTokenData);
        
        // 일요일마다 '긍정' '부정' 중에
        // 콩주머니를 더 많이 맞은 박이 터짐

        const sixDaysAgo = new Date(new Date().setDate(new Date().getDate() - 6));
        // console.log(sevenDaysAgo);
        const beans = await Beans.findAll({
            where: {
                createdAt: {
                    [Op.gt]: sixDaysAgo,
                    [Op.lt]: new Date(),
                },
                users_id: accessTokenData.id
            },
        });

        // console.log(beans);
        let posCount = 0;
        let negCount = 0;

        beans.forEach(bean => {
            if (bean.gourdKinds === true) {
                posCount++;
            } else {
                negCount++;
            }
        });

        if (posCount > negCount) {
            return res.status(201).json({
                message: 'Positive Gourd Win'
            });
        } else if (posCount < negCount) {
            return res.status(201).json({
                message: 'Negative Gourd Win'
            });
        } else {
            return res.status(201).json({
                message: 'Positive & Negative Draw'
            })
        }
    }
}