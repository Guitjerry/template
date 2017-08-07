package com.csair.vo;



/**
 * 上传信息返回
 * 
 * @author root
 * 
 */
public class UploadResultVo {
	private boolean result; // 状态 true为成功
	private String ori; //原名字
	private String name; //返回文件名
	private String url; //返回文件全路径
	private String msg; // 弹出消息 

	public UploadResultVo(String name, String url, String ori) {
		this.result = true;
		this.name = name;
		this.url = url;
		this.msg = "";
		this.ori = ori;
	}

	public UploadResultVo(boolean result, String msg, String name, String url) {
		this.result = result;
		this.name = name;
		this.url = url;
		this.msg = msg;
		this.ori = "";
	}

	public boolean isResult() {
		return result;
	}

	public String getOri() {
		return ori;
	}

	public void setOri(String ori) {
		this.ori = ori;
	}

	public void setResult(boolean result) {
		this.result = result;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}
	


}
