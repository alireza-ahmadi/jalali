// Gregorian To Jalali Test Unit

var jalali = require('../index');

describe('Gregorian to Jalali', function () {
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

		expect(jalali.convert(gregorianDate.y, gregorianDate.m, gregorianDate.d, 'gj')).toEqual(jalaliDate);
	});
});
