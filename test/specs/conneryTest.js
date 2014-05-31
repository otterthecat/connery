// assertion library
// /////////////////////////////////////////////////////////
var chai = require('chai').should();
var sinon = require('sinon');

// stubs
// /////////////////////////////////////////////////////////
var request = {
	headers: {
		'user-agent': "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:24.0) Gecko/20100101 Firefox/24.0"
	}
};

var response = {
	locals: {}
};

var next = sinon.spy();

// modules to test
// /////////////////////////////////////////////////////////
var connery = require('../../lib/connery');

describe('connery', function(){

	describe('#connery()', function(){

		connery(request, response, next);

		it('should apply browser name to response.locals.browser', function(){

			response.locals.connery.browser.name.should.equal('firefox');
		});

		it('should apply browser version to response.locals.browser', function(){

			response.locals.connery.browser.version.should.equal(24);
		});

		it('should detect OS from request', function(){

			response.locals.os = 'linux';
		});

		it('should call passed next function', function(){

			next.called.should.equal(true);
		});
	});
});