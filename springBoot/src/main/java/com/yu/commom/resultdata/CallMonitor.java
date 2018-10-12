package com.yu.commom.resultdata;

import java.io.Serializable;

/**
 * 调用情况监视类
 * @author yu
 */
public class CallMonitor implements Serializable {

	private static final long serialVersionUID = 417277104762571674L;

	private Double useTime = 0.0;

	/**
	 * 调用方法使用时间 长度为 53 可为空
	 * 
	 * @return
	 */
	public Double getUseTime() {
		return useTime;
	}

	/**
	 * 调用方法使用时间 长度为 53 可为空
	 * 
	 * @return
	 */
	public void setUseTime(Double useTime) {
		this.useTime = useTime;
	}

}
