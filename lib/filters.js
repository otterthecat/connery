exports.browserType = {
	'firefox': /Firefox\/[0-9.]+/,
	'safari': /Version\/[0-9. ]+Safari[\/[0-9.]+/,
	'chrome': /AppleWebKit(.*)Chrome/,
	'androidstock': /Android.+Mobile(.*)Safari/,
	'mobilesafari': /Mobile(.*)Safari\/[0-9.]+/,
	'explorer': /(MSIE | Trident)/,
};

exports.osType = {
	'linux': /X11.+(Linux)/,
	'osx': /OS X[0-9_ ]+/,
	'ios': /iPh(one|od|ad)/,
	'android': /Android/,
	'windows': /(MSIE|Trident|Windows NT)/
};

exports.versionType = {
	'firefox': /Firefox\/([0-9.]+)/,
	'safari': /Version\/([0-9.]+)/,
	'chrome': /Chrome\/([0-9.]+)/,
	'explorer': /(MSIE|rv:)[0-9 ]+/
};