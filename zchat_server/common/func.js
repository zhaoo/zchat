const crypto = require('crypto')
const config = require("../common/config")

module.exports = {
	md5: (val) => {
		return crypto.createHash('md5').update(val).digest('hex')
	},
	urlencode: (str) => {
		str = (str + '').toString()
		return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+')
	},
	base64: (str) => {
		return Buffer.from(str).toString('base64')
	},
	expressMap: (type, str) => {
		const map = {
			顺丰: 'SF',
			百世: 'HTKY',
			中通: 'ZTO',
			申通: 'STO',
			圆通: 'YTO',
			韵达: 'YD',
			邮政: 'YZPY',
			EMS: 'EMS',
			天天: 'HHTT',
			京东: 'JD',
			德邦: 'DBL',
			宅急送: 'ZJS'
		}
		if (type == 'search') {
			return map[str]
		} else if (type == 'ergodic') {
			return map
		}
	},
	aesEncrypt: (data) => {
		const cipher = crypto.createCipher('aes192', config.SECRET)
		var crypted = cipher.update(data, 'utf8', 'hex')
		crypted += cipher.final('hex')
		return crypted
	},
	aesDecrypt: (encrypted) => {
		const decipher = crypto.createDecipher('aes192', config.SECRET)
		var decrypted = decipher.update(encrypted, 'hex', 'utf8')
		decrypted += decipher.final('utf8')
		return decrypted
	}
}