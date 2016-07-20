"use strict";

const express = require("express");
const Horseman = require('node-horseman');
const app = express();

const horseman = new Horseman({
	phantomPath: "./bin/phantomjs.exe"
});

class TicketChecker {

	constructor(eventUrl, waitInSeconds) {
		this.eventUrl = eventUrl;
		this.waitInSeconds = waitInSeconds;
		this.run();
	}

	run(){
		this.request().then(flag => this.response(flag));
	}

	request() {		

		console.log("Checking Resident Advisor event: " + this.eventUrl);

		let request = horseman
			.userAgent("Mozilla/5.0 (Windows NT 6.1; WOW64; rv:27.0) Gecko/20100101 Firefox/27.0")
			.open(this.eventUrl)
			.waitForSelector("#tickets")
			.evaluate(this.scrape);

		return request;

	}

	 scrape(selector) {
		var links = $("#tickets ul li");
		var flag = false;
		links.each(function(link) {
			if (!$(this).hasClass("closed")) {
				flag = true;
			}
		});
		return flag;
	}

	response(flag) {
		console.log(flag ? "Tickets are available!" : "Still no tickets available.");
		console.log("Waiting ", this.waitInSeconds, " seconds before next attempt.\n\n");
		setTimeout(() => this.run(), parseInt(this.waitInSeconds + "000"));
	}

}

new TicketChecker("https://www.residentadvisor.net/event.aspx?805080", 30);