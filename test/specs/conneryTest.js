// assertion library
// /////////////////////////////////////////////////////////
var chai = require('chai').should();
var sinon = require('sinon');

// stubs
// /////////////////////////////////////////////////////////
var validRequest = {
	headers: {
		'user-agent': "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:24.0) Gecko/20100101 Firefox/24.0"
	}
};

var invalidRequest = {
	headers: {
		'user-agent': ''
	}
};

var response, next;

// modules to test
// /////////////////////////////////////////////////////////
var connery = require('../../lib/connery');

describe('connery()', function(){

	describe('connery with known user agent', function(){

		before(function(){

			response = {
				locals: {}
			};
			next = sinon.spy();
			connery(validRequest, response, next);
		});

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

			next.calledOnce.should.equal(true);
		});
	});

	describe('connery with unknown user agent', function(){

		before(function(){

			response = {
				locals: {}
			};
			next = sinon.spy();
			connery(invalidRequest, response, next);
		});

		it('should return string value "unknown" to browser name & version', function(){

			response.locals.connery.browser.name.should.equal('unknown');
			response.locals.connery.browser.version.should.equal('unknown');
		});

		it('should call passed next funcion', function(){

			next.calledOnce.should.equal(true);
		});
	});
});