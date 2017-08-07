package com.csair.util;

import java.io.File;
import java.io.FileFilter;

//文件过滤器

public class FileFilterUtil implements FileFilter {
	String name;

	public FileFilterUtil(String name) {
		this.name = name;
	}

	public boolean accept(File file) {
		boolean ret = false;
		try {
			String getFilename = file.getName();
			if(getFilename.startsWith(name)){
				ret = true;
			}
		} catch (Exception e) {
		}
		return ret;
	}
}
