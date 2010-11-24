// ==UserScript==
// @name	peeringdb-links
// @version     0.1.2
// @description	Replace ASN with links in peeringdb 
// @include     https://www.peeringdb.com/*
// @include	http://www.peeringdb.com/*
// @namespace   http://version6.net/
// @author	Cougar <cougar@random.ee>
// @license	GPL
// @released	2010-11-24
// @updated	2010-11-24
// @compatible	Greasemonkey
// ==/UserScript

(function()
{
	var asnurl = 'http://www.ris.ripe.net/mt/asdashboard.html?as=';

	var i, j, k;
	// look for tables having 'ClearFormTABLE' class
	var tables = document.body.getElementsByClassName('ClearFormTABLE');
	for (i = 0; i < tables.length; i++) {
		// uninitialize ASN column in this table
		var asncol = -1;
		var trs = tables[i].getElementsByTagName('tr');
		// go through each table row
		for (j = 0; j < trs.length; j++) {
			var tds = trs[j].getElementsByTagName('td');
			if (asncol == -1) {
				// search <td> with "ASN"
				for (k = 0; k < tds.length; k++) {
					if ((tds[k].className == 'ClearColumnTD') &&
					     tds[k].innerHTML.match(/ASN/)) {
						// found ASN column
						asncol = k;
						break;
					}
				}
			} else {
				// is there enough columns (no colspan use)
				if (tds.length <= asncol)
					continue;
				// check <td> class
				if (tds[asncol].className != 'ClearDataTD')
					continue;
				// read ASN value and remove '&nbsp;'-s
				var asn = tds[asncol].innerHTML.replace('&nbsp;', '');
				// is it a number
				if (! asn.match(/^[0-9]+$/))
					continue;
				// time to add link
				tds[1].innerHTML = '<a href="'+asnurl+asn+'">'+asn+'</a>';
			}
		}
	}
})();
