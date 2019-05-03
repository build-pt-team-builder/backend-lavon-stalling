require('dotenv').config();
const jwt = require('jsonwebtoken');

const jwtKey = process.env.SECRET_KEY || 'env file';

// quickly see what this file exports
module.exports = {
	authenticate,
	generateToken,
};

function authenticate(req, res, next) {
	const token = req.get('Authorization');

	if (token) {
		jwt.verify(token, jwtKey, (err, decoded) => {
			if (err)
				return res.status(401).json({
					message: 'Invalid token, please log in and try again',
					error: err,
				});

			if (decoded.admin !== T)
				return res.status(401).json({
					message: 'Not authorized to take this action, admin access needed',
				});
			req.decoded = decoded;
			next();
		});
	} else {
		return res.status(401).json({
			error: 'No token provided',
		});
	}
}

//generateToken
function generateToken(user) {
	const payload = {
		username: user.username,
		admin: user.admin,
		id: user.id,
	};
	const secret = jwtKey;
	const options = { expiresIn: '30m' };

	return jwt.sign(payload, secret, options);
}
