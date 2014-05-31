var browserType = {
	'firefox': /Firefox\/[0-9.]+/,
	'safari': /Version\/[0-9. ]+Safari[\/[0-9.]+/,
	'chromium': /AppleWebKit(.*)Chrome/,
	'mobilesafari': /Mobile(.*)Safari\/[0-9.]+/,
	'explorer': /bar/,
};

var osType = {
	'linux': /Linux/,
	'osx': /OS X[0-9_ ]+/,
	'ios': /iPad/,
	'windows': /Microsoft/
};

var versionType = {
	'firefox': /Firefox\/([0-9.]+)/,
	'safari': /Version\/([0-9.]+)/,
	'chromium': /Chrome\/([0-9.]+)/
};


var findMatch = function(string, regs){

	for (var item in regs){

		if (string.match(regs[item])){

			return item;
		}
	}

	return "unknown";
};

var getBrowser = function(agent){

	return findMatch(agent, browserType);
};

var getOS = function(agent){

	return findMatch(agent, osType);
};

var getVersion = function(agent){

	for (var item in versionType){

		if (agent.match(versionType[item])){
			var a = agent.match(versionType[item]);
			var n = a[0].match(/[0-9.]+/);
			return parseFloat(n[0]);
		}
	}

	return "unknown";
};

module.exports = function(req, res, next){

	var agent = req.headers['user-agent'];

	res.locals.connery = {
		'os': getOS(agent),
		'browser': {
			'name': getBrowser(agent),
			'version': getVersion(agent)
		}
	};

	next();
};