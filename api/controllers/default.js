
module.exports.home = (req, res, next) => {
  res.status(200).json({message: 'Welcome to default end point.'}); 
};