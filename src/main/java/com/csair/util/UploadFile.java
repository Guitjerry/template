package com.csair.util;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;


/**
 * 文件上传类
 * 
 * @author Administrator
 * 
 */
public class UploadFile {
	Map<String, MultipartFile> fileMap = null;

	/** 默认文件保存路径 */
	public String uploadPath = null;
	public String filterExt = ""; // 指定保存的文件类型(.jpg.xml)
	public File saveFile = null;
	public String oriName = "";
	public String fileName = "";
	public String fileNamePrefix = ""; //文件名前缀
	public String extName = "";
	public long fileSize;
	public String filetype; //文件类型

	MultipartHttpServletRequest multipartRequest;
	private static final Log _Log = LogFactory.getLog(UploadFile.class);

	public UploadFile(HttpServletRequest request, String uploadPath) {
		this.multipartRequest = (MultipartHttpServletRequest) request;
		this.uploadPath = uploadPath;
		// 获得文件：
		this.fileMap = this.multipartRequest.getFileMap();
		// 创建文件夹
		FileUtil.createFileDir(uploadPath);
	}

	public UploadFile(HttpServletRequest request, String uploadPath,
                      boolean hasFilename) {
		this.multipartRequest = (MultipartHttpServletRequest) request;
		this.uploadPath = uploadPath;
		// 获得文件：
		this.fileMap = this.multipartRequest.getFileMap();
		if (hasFilename) {
			this.fileName = this.getFormField("filename");
		}
		// 创建文件夹
		FileUtil.createFileDir(uploadPath);
	}

	/**
	 * 获取表单值
	 * 
	 * @param name
	 * @return
	 */
	public String getFormField(String name) {
		return multipartRequest.getParameter(name);
	}

	/**
	 * 保存文件
	 */
	public void saveFile() {
		if (null == this.fileMap || 0 == this.fileMap.size())
			return;
		
		for (Map.Entry<String, MultipartFile> entity : this.fileMap.entrySet()) {
			MultipartFile mf = entity.getValue();
			this.oriName = mf.getOriginalFilename();
            this.fileSize = mf.getSize();
            
			if (this.oriName == null || this.oriName.trim().equals("")) {
				continue;
			}
			// 扩展名格式：
			if (this.oriName.lastIndexOf(".") >= 0) {
				extName = this.oriName.substring(this.oriName.lastIndexOf("."))
						.toLowerCase();
				if (!"".equals(filterExt)) {
					if (-1 == filterExt.indexOf(extName)) {
						continue;
					}
				}
			}
			if (null == this.fileName || 0 == this.fileName.length()) {
				fileNamePrefix = UUID.randomUUID().toString();
				this.fileName =  fileNamePrefix + extName; // 生成文件名：UUID
			}
			try {
				
				FileUtil.newFolder(uploadPath);
				saveFile = new File(uploadPath+"/"+fileName);
				if(!saveFile.exists()){
					saveFile.createNewFile();
				}
//				FileUtil.newFile(uploadPath + this.fileName,"");
				FileCopyUtils.copy(mf.getBytes(), saveFile);
				
			} catch (Exception e) {
				e.printStackTrace();
				_Log.error(e, e);
			}
		}
	}
	
	/**
	 * 保存编辑器文件
	 * 
	 * @throws Exception
	 */
	public void saveEditorFile(String filetype) throws Exception {
		// 定义允许上传的文件扩展名
		HashMap<String, String> extMap = new HashMap<String, String>();
		extMap.put("image", ".gif,.jpg,.jpeg,.png");
		extMap.put("flash", ".swf,.flv");
		extMap.put("media",
				".swf,.flv,.mp3,.wav,.wma,.wmv,.mid,.avi,.mpg,.asf,.rm,.rmvb");
		extMap.put("file",
				".doc,.docx,.xls,.xlsx,.ppt,.htm,.html,.txt,.zip,.rar,.gz,.bz2");

		if (null == this.fileMap || 0 == this.fileMap.size())
			return;
		
		for (Map.Entry<String, MultipartFile> entity : this.fileMap.entrySet()) {
			MultipartFile mf = entity.getValue();
			this.oriName = mf.getOriginalFilename();

			if (this.oriName == null || this.oriName.trim().equals("")) {
				continue;
			}
			// 扩展名格式：
			if (this.oriName.lastIndexOf(".") >= 0) {
				extName = this.oriName.substring(this.oriName.lastIndexOf("."))
						.toLowerCase();
				if (!Arrays.<String> asList(extMap.get(filetype).split(","))
						.contains(extName)) {
					throw new Exception("上传文件扩展名是不允许的扩展名。\n只允许"
							+ extMap.get(filetype) + "格式。");
				}
			}
			
			fileNamePrefix = UUID.randomUUID().toString();
			this.fileName =fileNamePrefix + extName; // 生成文件名：UUID
			
			if (null == this.fileName || 0 == this.fileName.length()) {
				fileNamePrefix = UUID.randomUUID().toString();
				this.fileName =  fileNamePrefix + extName; // 生成文件名：UUID
			}
			try {
				
				FileUtil.newFolder(uploadPath);
				saveFile = new File(uploadPath + this.fileName);
				FileCopyUtils.copy(mf.getBytes(), saveFile);
				
			} catch (Exception e) {
				_Log.error(e, e);
			}
		}
	}
}
