package com.yu.commom.resultdata;

import javax.validation.ConstraintViolation;

public class Message {

	/**
	 * 信息内容
	 */
	private String message;

	/**
	 * 信息相关的字段
	 */
	private String field;

	/**
	 * 字段值
	 */
	private Object fieldValue;

	/**
	 * 信息相关的entity
	 */
	private Object entity;

	/**
	 * 验证返回的原始错误信息对象
	 */
	private transient ConstraintViolation<Object> constraintViolationObject;

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getField() {
		return field;
	}

	public void setField(String field) {
		this.field = field;
	}

	public Object getEntity() {
		return entity;
	}

	public void setEntity(Object entity) {
		this.entity = entity;
	}

	public ConstraintViolation<Object> getConstraintViolationObject() {
		return constraintViolationObject;
	}

	public void setConstraintViolationObject(ConstraintViolation<Object> constraintViolationObject) {
		this.constraintViolationObject = constraintViolationObject;
	}

	public Object getFieldValue() {
		return fieldValue;
	}

	public void setFieldValue(Object fieldValue) {
		this.fieldValue = fieldValue;
	}

}