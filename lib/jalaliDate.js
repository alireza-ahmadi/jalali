JalaliDate = {
	g_days_in_month : [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
	j_days_in_month : [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29]
};

JalaliDate.jalaliToGregorian = function (j_y, j_m, j_d) {
	j_y = parseInt(j_y);
	j_m = parseInt(j_m);
	j_d = parseInt(j_d);
	var jy = j_y - 979;
	var jm = j_m - 1;
	var jd = j_d - 1;
	var j_day_no = 365 * jy + parseInt(jy / 33) * 8 + parseInt((jy % 33 + 3) / 4);
	for (var i = 0; i < jm; ++i)
		j_day_no += JalaliDate.j_days_in_month[i];
	j_day_no += jd;
	var g_day_no = j_day_no + 79;
	var gy = 1600 + 400 * parseInt(g_day_no / 146097);
	g_day_no = g_day_no % 146097;
	
	var leap = true;
	if (g_day_no >= 36525) {
		g_day_no--;
		gy += 100 * parseInt(g_day_no / 36524);
		g_day_no = g_day_no % 36524;
		
		if (g_day_no >= 365)
			g_day_no++;
		else
			leap = false;
	}
	
	gy += 4 * parseInt(g_day_no / 1461);
	g_day_no %= 1461;
	
	if (g_day_no >= 366) {
		leap = false;
		
		g_day_no--;
		gy += parseInt(g_day_no / 365);
		g_day_no = g_day_no % 365;
	}
	
	for (var i = 0; g_day_no >= JalaliDate.g_days_in_month[i] + (i == 1 && leap); i++)
		g_day_no -= JalaliDate.g_days_in_month[i] + (i == 1 && leap);
	var gm = i + 1;
	var gd = g_day_no + 1;
	
	return [gy, gm, gd];
}

JalaliDate.checkDate = function (j_y, j_m, j_d) {
	return !(j_y < 0 || j_y > 32767 || j_m < 1 || j_m > 12 || j_d < 1 || j_d >
		(JalaliDate.j_days_in_month[j_m - 1] + (j_m == 12 && !((j_y - 979) % 33 % 4))));
}


module.exports = JalaliDate;

JalaliDate.gregorianToJalali = function (g_y, g_m, g_d) {
	g_y = parseInt(g_y);
	g_m = parseInt(g_m);
	g_d = parseInt(g_d);
	var gy = g_y - 1600;
	var gm = g_m - 1;
	var gd = g_d - 1;
	
	var g_day_no = 365 * gy + parseInt((gy + 3) / 4) - parseInt((gy + 99) / 100) + parseInt((gy + 399) / 400);
	
	for (var i = 0; i < gm; ++i)
		g_day_no += JalaliDate.g_days_in_month[i];
	if (gm > 1 && ((gy % 4 == 0 && gy % 100 != 0) || (gy % 400 == 0)))
		/* leap and after Feb */
		++g_day_no;
	g_day_no += gd;
	
	var j_day_no = g_day_no - 79;
	
	var j_np = parseInt(j_day_no / 12053);
	j_day_no %= 12053;
	
	var jy = 979 + 33 * j_np + 4 * parseInt(j_day_no / 1461);
	
	j_day_no %= 1461;
	
	if (j_day_no >= 366) {
		jy += parseInt((j_day_no - 1) / 365);
		j_day_no = (j_day_no - 1) % 365;
	}
	
	for (var i = 0; i < 11 && j_day_no >= JalaliDate.j_days_in_month[i]; ++i) {
		j_day_no -= JalaliDate.j_days_in_month[i];
	}
	var jm = i + 1;
	var jd = j_day_no + 1;
	
	return [jy, jm, jd];
}
