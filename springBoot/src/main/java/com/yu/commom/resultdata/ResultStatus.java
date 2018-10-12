package com.yu.commom.resultdata;

/**
 * 调用状态
 * @author qiandm
 * 
 */
public enum ResultStatus {

	/**
	 * 业务验证错误
	 */
	ValidateError(-4),

	/**
	 * 出错
	 */
	Error(-3),

	/**
	 * 没有权限
	 */
	NoRight(-2),

	/**
	 * 登入超时（未登入）
	 */
	LoginOut(-1),

	/**
	 * 失败
	 */
	Failure(0),

	/**
	 * 成功
	 */
	Success(1),

	/**
	 * 频繁操作
	 */
	Frequently(2);

	private int value;

	private ResultStatus(int v) {
		this.value = v;
	}

	public static ResultStatus create(int value) {
		switch (value) {
		case -4:
			return ResultStatus.ValidateError;
		case -3:
			return ResultStatus.Error;
		case -2:
			return ResultStatus.NoRight;
		case -1:
			return ResultStatus.LoginOut;
		case 0:
			return ResultStatus.Failure;
		case 1:
			return ResultStatus.Success;
		case 2:
			return ResultStatus.Frequently;
		default:
			throw new RuntimeException("code error");
		}
	}

	public static Integer value(ResultStatus status) {
		return status.value;
	}

}

