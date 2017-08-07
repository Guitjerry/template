package com.csair.util;


/**
 * 读取配置文件
 * 
 * @author panpan
 * 
 */
public final class PropUtil {
	private static final PropUtil instance = new PropUtil();

	private PropUtil() {
	}

	public static PropUtil getInstance() {
		return instance;
	}
	
	public String getSystemPath(String filename){
		String path = PropUtil.class.getResource("").toString();
		path = path.replace("%20", " "); // 引号中有一个半角的空格
		// 去掉文件前缀
		int sidx = path.indexOf("file:/") + "file:/".length();
		// 切掉/WEB-INF/后面文件
		int eidx = path.indexOf("/WEB-INF/") + "/WEB-INF/".length();
		// 获取文件绝对路径
		path = path.substring(sidx, eidx) + filename;
		// 犯止linux系统切掉前缀
		if (path.indexOf("home") == 0) {
			path = "/" + path;
		} else if (path.indexOf('/') > 0 && path.indexOf(':') < 0)
			path = "/" + path; // 非windows系统加上前缀（unix/mac os）
		return path;
	}
}
