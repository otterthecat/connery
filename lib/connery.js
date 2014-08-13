var agentFilters = require('./filters');

var findMatch = function(string, regs, callback){

	"use strict";
	for (var item in regs){

		if (string.match(regs[item])){

			return arguments.length === 3 ? callback(item) : item;
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

	return findMatch(agent, versionType, function(item){
		return parseFloat(agent.match(versionType[item])[0].match(/[0-9.]+/)[0]);
	});
};

module.exports = function(req, res, next){

	"use strict";
	var agent = req.headers['user-agent'];

	res.locals = res.locals || {};

	res.locals.connery = {
		'os': getOS(agent),
		'browser': {
			'name': getBrowser(agent),
			'version': getVersion(agent)
		}
	};

	next();
};