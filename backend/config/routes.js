const express = require('express')

module.exports = function(server) {
 //API routes
  const router = express.Router()
  server.use('/api', router)

  // first route
  const billinCycleService = require('../api/billingCycle/billingCycleService')
  billinCycleService.register(router, '/billingCycles')


  const billingSummaryService = require('../api/billingSummary/billingSummaryService')
  router.route('/billingSummary').get(billingSummaryService.getSummary)
  //billingSummaryService.register(router, '/billingSummary')
}
