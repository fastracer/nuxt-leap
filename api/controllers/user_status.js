import dayjs from 'dayjs'
import models from '../models'

const getUserStatus = async (req, res) => {
  if (req.session.user_id) {
    try {
      const userLimit = await models.UserLimit.findOne({
        user_uid: req.session.user_id,
        date: dayjs().format('YYYY-MM-DD'),
      }).exec()
      const result = {
        status: 0,
      }
      if (userLimit) {
        result.status = userLimit.status
      }
      res.json(result)
    } catch (e) {
      res.status(403).send({ error: e })
    }
  } else {
    res.status(400).send()
  }
}

export default {
  getUserStatus,
}
