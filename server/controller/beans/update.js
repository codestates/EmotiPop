const { Users, Beans } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');

module.exports = {
  patch: async (req, res) => {
    if (!req.headers['authorization']) {
      return res.status(401).send({
        message: 'invalid access token',
      });
    }

    const accessTokenData = isAuthorized(req);
    // console.log(accessTokenData);
    const userInfo = await Users.findOne({
      attributes: { exclude: ['password'] },
      where: {
        email: accessTokenData.email,
        username: accessTokenData.username,
      },
    });
    // console.log(userInfo);
    if (!userInfo) {
      res.status(403).send({
        message: 'Forbidden',
      });
    }
    const beansInfo = await Beans.findOne({
      where: {
        id: req.params.beans_id,
      },
    });
    if (!beansInfo) {
      res.status(404).send({
        message: 'Not Found!',
      });
    }
    const { emotions, emotion_level, contents, gourdkinds } = req.body;
    // console.log(beansInfo);
    // console.log(req.body);
    const data = {
      emotions,
      emotion_level,
      contents,
      gourdKinds: gourdkinds,
      users_id: accessTokenData.id,
    };
    const id = req.params.beans_id;
    await Beans.update({ ...data }, { where: { id } });
    const modifiedBeans = await Beans.findOne({
      where: {
        id: req.params.beans_id,
      },
    });
    // console.log(modifiedBeans);
    res.send({
      data: modifiedBeans.dataValues,
      message: 'ok',
    });
  },
};
