const passport = require('passport');

exports.isAuth = (req, res, done) => {
  return passport.authenticate('jwt')
};

exports.sanitizeUser = (user)=>{
    return {id:user.id, role:user.role}
}
exports.sanitizeUser = (user) => {
  return { id: user.id, role: user.role };
};

exports.cookieExtractor = function (req) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['jwt'];
  }
  //TODO : this is temporary token for testing without cookie
  token ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1MzFhNGY1MzExZTE0NWU1Y2JiY2FlMyIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcwMTcxMDYzMn0.sXhueLZ1-eJV0QaA3Mwp3UhHPJzNTNe8HxJald-uwSA"
  return token;
};