package com.yu.commom.resultdata;

/**
 * 调用状态
 * @author yu
 * 
 */
public enum ResultStatusEnum {


	/**
	 * 失败
	 */
	FAILURE(0),

	/**
	 * 成功
	 */
	SUCCESS(1),

	/**
	 * 频繁操作
	 */
	FREQUENTLY(100),

	/**
	 * 登入超时（未登入）
	 */
	LOGIN_OUT(300),

	/**
	 * 没有权限
	 */
	AUTHORITY_NO(500),

	/**
	 * 业务验证错误
	 */
	VALIDATE(700),

	/**
	 * 出错
	 */
	ERROR(900);

	private int value;

	ResultStatusEnum(int value) {
		this.value = value;
	}

	public static ResultStatusEnum create(int value) {
		switch (value) {
			case 0:
				return ResultStatusEnum.FAILURE;
			case 1:
				return ResultStatusEnum.SUCCESS;
			case 100:
				return ResultStatusEnum.FREQUENTLY;
			case 300:
				return ResultStatusEnum.LOGIN_OUT;
			case 500:
				return ResultStatusEnum.AUTHORITY_NO;
			case 700:
				return ResultStatusEnum.VALIDATE;
			case 900:
				return ResultStatusEnum.ERROR;
			default:
				throw new RuntimeException("code error");
		}
	}

	public static Integer value(ResultStatusEnum resultStatus) {
		return resultStatus.value;
	}
}