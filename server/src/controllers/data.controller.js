const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { dataService } = require('../services');

const getStatistics = catchAsync(async (req, res) => {
  const stats = await dataService.getAllStatsData();
  res.status(httpStatus.OK).send(stats);
});

module.exports = {
  getStatistics,
};
