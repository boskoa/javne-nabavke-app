const router = require('express').Router()
const { /*ContractingAuthority, */User, Procedure } = require('../models')
const { Op } = require('sequelize')
const tokenExtractor = require('../utils/tokenExtractor')

router.get('/procs-by-month', tokenExtractor, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.decodedToken.id)

    if (user.disabled) {
      return res.status(401).json({ error: 'Account disabled' })
    }

    const start = req.query.start
    const end = req.query.end

    const proceduresCount = await Procedure.count({
      where: { submission_date: { [Op.gt]: start, [Op.lt]: end } }
    })
    res.json(proceduresCount)
  } catch (error) {
    next(error)
  }
})

module.exports = router