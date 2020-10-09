import dayjs from 'dayjs'
import models from '../models'

const createUser = (req, res) => {
  models.User.findOneAndUpdate(
    { ...req.body.user },
    { expire: new Date() },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  )
    .then((user) => {
      req.session.user_id = user.uid
      res.json(user)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send({ error: err })
    })
}

const getUser = (req, res) => {
  console.log('req.session.user_id', req.session.user_id)

  if (req.session.user_id) {
    models.UserLimit.findOneAndUpdate(
      { user_uid: req.session.user_id, date: dayjs().format('YYYY-MM-DD') },
      { expire: new Date() },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    )
      .then((userLimit) => {
        if (!userLimit.status) {
          userLimit.status = 0
        }
        if (userLimit.status < process.env.API_LIMIT) {
          userLimit.status += 1
          models.User.findOne({ uid: userLimit.user_uid })
            .then((user) => {
              userLimit.save()
              res.json(user)
            })
            .catch((err) => {
              res.status(500).send({ error: err })
            })
        } else {
          res.status(403).send({ error: 'User Limit is reached' })
        }
      })
      .catch((err) => {
        res.status(500).send({ error: err })
      })
  } else {
    res.status(400).send()
  }
}

export default {
  createUser,
  getUser,
}
