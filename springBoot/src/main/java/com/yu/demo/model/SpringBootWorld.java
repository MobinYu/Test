package com.yu.demo.model;

import java.io.Serializable;

public class SpringBootWorld implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	private String feature;
	private String version;
	private String configure;
	
	public String getFeature() {
		return feature;
	}
	public void setFeature(String feature) {
		this.feature = feature;
	}
	public String getVersion() {
		return version;
	}
	public void setVersion(String version) {
		this.version = version;
	}
	public String getConfigure() {
		return configure;
	}
	public void setConfigure(String configure) {
		this.configure = configure;
	}

}
