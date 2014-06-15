var agentFilters = require('./filters');

var findMatch = function(string, regs){

	"use strict";
	for (var item in regs){

		if (string.match(regs[item])){

			return item;
		}
	}

	return "unknown";
};

var getBrowser = function(agent){

	"use strict";
	return findMatch(agent, agentFilters.browserType);
};

var getOS = function(agent){

	"use strict";
	return findMatch(agent, agentFilters.osType);
};

var getVersion = function(agent){

	"use strict";
	var versionType = agentFilters.versionType;

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

	"use strict";
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