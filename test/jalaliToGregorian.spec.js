// Jalali To Gregorian Test Unit

var jalali = require('../index');

describe('Jalali to Gregorian', function () {
	it('should be correct date', function () {
		var gregorianDate = {
			y: 2014,
			m: 01,
			d: 08
		};
		var jalaliDate = { // Correct Date
			y: 1392,
			m: 10,
			d: 18
		};

		expect(jalali.convert(jalaliDate.y, jalaliDate.m, jalaliDate.d, 'jg')).toEqual(gregorianDate);
	});
});
