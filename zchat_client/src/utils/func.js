const key = '89f495fa2646bb137284a28fc760d221'
import crypto from 'crypto'

export function aesEncrypt(data) {
	const cipher = crypto.createCipher('aes192', key)
	var crypted = cipher.update(data, 'utf8', 'hex')
	crypted += cipher.final('hex')
	return crypted
}

export function aesDecrypt(encrypted) {
	const decipher = crypto.createDecipher('aes192', key)
	var decrypted = decipher.update(encrypted, 'hex', 'utf8')
	decrypted += decipher.final('utf8')
	return decrypted
}