package net.megx.pubmap.rest.json;

import net.megx.model.Journal;

public class JournalArticleDTO {
	private String issue;
	private String isoab;
	private String pages;
	private String publication;
	private String volume;
	private String month;
	private String day;
	private String abstractText;
	public String getIssue() {
		return issue;
	}
	public void setIssue(String issue) {
		this.issue = issue;
	}
	public String getIsoab() {
		return isoab;
	}
	public void setIsoab(String isoab) {
		this.isoab = isoab;
	}
	public String getPages() {
		return pages;
	}
	public void setPages(String pages) {
		this.pages = pages;
	}
	public String getPublication() {
		return publication;
	}
	public void setPublication(String publication) {
		this.publication = publication;
	}
	public String getVolume() {
		return volume;
	}
	public void setVolume(String volume) {
		this.volume = volume;
	}
	public String getMonth() {
		return month;
	}
	public void setMonth(String month) {
		this.month = month;
	}
	public String getDay() {
		return day;
	}
	public void setDay(String day) {
		this.day = day;
	}
	public String getAbstractText() {
		return abstractText;
	}
	public void setAbstractText(String abstractText) {
		this.abstractText = abstractText;
	}
	public static JournalArticleDTO fromDAO(String journalName, Journal journal) {
		JournalArticleDTO rv = new JournalArticleDTO();
		rv.issue = "TODO: from DAO";
		rv.isoab = journal.getIsoAbbr();
		rv.pages = "TODO: from DAO journal.get?";
		rv.publication = journal.getPublisher();
		rv.volume = "TODO: from DAO journal.getVo?";
		//rv.month = journal.get;
		//rv.day = day;
		//rv.abstractText = abstractText;
		return rv;
	}
}
