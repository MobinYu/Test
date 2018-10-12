package com.yu.commom.resultdata;

import java.util.ArrayList;
import java.util.List;

/**
 * 调用结果
 * 
 * @author qiandm
 * @param <T>
 */
public class Result<T> extends CallMonitor {

	private static final long serialVersionUID = 1L;

	/**
	 * 调用状态
	 */
	private ResultStatus status = ResultStatus.Failure;

	public Result() {
		super();
	}

	public Result(T data) {
		super();
		this.data = data;
	}

	/**
	 * 数据
	 */
	private T data;

	/**
	 * 信息列表
	 */
	private List<String> infoList = new ArrayList<String>();

	/**
	 * sql信息列表
	 */
	private List<String> sqlInfoList = new ArrayList<String>();

	/**
	 * 错误信息列表
	 */
	private List<Message> errorMsgList;

	/**
	 * 状态
	 * 
	 * @return
	 */
	public ResultStatus getStatus() {
		return status;
	}

	/**
	 * 状态
	 * 
	 * @param status
	 */
	public void setStatus(ResultStatus status) {
		this.status = status;
	}

	/**
	 * 数据
	 * 
	 * @return
	 */
	public T getData() {
		return data;
	}

	/**
	 * 数据
	 * 
	 * @param data
	 *            数据
	 */
	public void setData(T data) {
		this.data = data;
	}

	/**
	 * 信息列表
	 * 
	 * @return
	 */
	public List<String> getInfoList() {
		return infoList;
	}

	/**
	 * 信息列表
	 * 
	 * @param infoList
	 *            信息列表
	 */
	public void setInfoList(List<String> infoList) {
		this.infoList = infoList;
	}

	/**
	 * sql信息列表
	 */
	public List<String> getSqlInfoList() {
		return sqlInfoList;
	}

	/**
	 * sql信息列表
	 * 
	 * @param sqlInfoList
	 *            sql信息列表
	 */
	public void setSqlInfoList(List<String> sqlInfoList) {
		this.sqlInfoList = sqlInfoList;
	}

	public List<Message> getErrorMsgList() {
		return errorMsgList;
	}

	public void setErrorMsgList(List<Message> errorMsgList) {
		this.errorMsgList = errorMsgList;
	}
}
