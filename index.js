/*
 * Jalali - Nodejs Jalali Calendar
 * By : Alireza Ahmadi | http://alireza.es
 * Special thanks to Ali Farhadi | http://farhadi.ir
 */
var JalaliDate = require('./lib/jalaliDate.js'); // By Ali Farhadi

var Jalali = {
	jmonths : ['فروردین','اردیبهشت','خرداد','تیر','مرداد','شهریور','مهر','آبان','آذر','دی','بهمن','اسفند'],
	
	jdays : ['دوشنبه','سه شنبه','چهارشنبه','پنجشنبه','جمعه','شنبه','یکشنبه'],
	
	alphabetic : function(month){
		return this.jmonths[month - 1];
	},
	
	persianDay : function(get){
		if(!get){
			var d = new Date();
			get = d.getDay();
		}
		return this.jdays[get - 1];
	},
	
	yesterday : function(style){
		var date = new Date();
		var jdate = {
			year : parseInt(date.getFullYear(),10),
			month : parseInt(date.getMonth() + 1,10),
			day : parseInt(date.getDate(),10)
		}
		if(jdate.day == 1){
			if(jdate.month == 1){
				jdate.month = 12;
				jdate.year = jdate.year - 1;
				jdate.day = 29;
			}
			else{
				jdate.month = jdate.month - 1;
				jdate.day = JalaliDate.j_days_in_month[jdate.month - 2];
			}
		}
		else{
			jdate.day = jdate.day - 1;
		}
		
		jdate.result = JalaliDate.gregorianToJalali(jdate.year, jdate.month, jdate.day);
		if(style){
			jdate.result[1] = this.alphabetic(jdate.result[1]);
		}
		return this.list(jdate.result);
	},
	
	today : function(style){
		var date = new Date();
		var jdate = {
			year : parseInt(date.getFullYear(),10),
			month : parseInt(date.getMonth() + 1,10),
			day : parseInt(date.getDate(),10)
		}
		jdate.result = JalaliDate.gregorianToJalali(jdate.year, jdate.month, jdate.day);
		if(style){
			jdate.result[1] = this.alphabetic(jdate.result[1]);
		}
		return this.list(jdate.result);
	},
	
	tomorrow : function(style){
		var date = new Date();
		var jdate = {
			year : parseInt(date.getFullYear(),10),
			month : parseInt(date.getMonth() + 1,10),
			day : parseInt(date.getDate(),10)
		}
		if(jdate.day == JalaliDate.j_days_in_month[jdate.month - 1]){
			if(jdate.month == 12){
				jdate.month = 1;
				jdate.year = jdate.year + 1;
				jdate.day = 1;
			}
			else{
				jdate.month = jdate.month + 1;
				jdate.day = 1;
			}
		}
		else{
			jdate.day = jdate.day + 1;
		}
		
		jdate.result = JalaliDate.gregorianToJalali(jdate.year, jdate.month, jdate.day);
		if(style){
			jdate.result[1] = this.alphabetic(jdate.result[1]);
		}
		return this.list(jdate.result);
	},
	
	convert : function(fyear,fmonth,fday,format,style){
		var jdate = {
			year : fyear,
			month : fmonth,
			day : fday
		}
		var type = format || 'gj' ;
		if(type == 'gj'){
			jdate.result = JalaliDate.gregorianToJalali(jdate.year, jdate.month, jdate.day);
			if(style){
				jdate.result[1] = this.alphabetic(jdate.result[1]);
			}
		}
		else if(type == 'jg'){
			jdate.result = JalaliDate.jalaliToGregorian(jdate.year, jdate.month, jdate.day);
		}
		return this.list(jdate.result);
	},
	
	list : function(get){
		var answer = {
			y : get[0],
			m : get[1],
			d : get[2]
		}
		return answer;
	}
}

module.exports = Jalali;
 