package com.csair.util;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import java.io.*;
import java.net.URLEncoder;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

/**
 * 文件操作
 * 
 * @author elwingao
 * 
 */

public class FileUtil {
	private static final Log _Log = LogFactory.getLog(FileUtil.class);

	/**
	 * 新建目录
	 * 
	 * @param folderPath
	 *            String 如 c:/fqf
	 * @return boolean
	 */
	public static void newFolder(String folderPath) {
		try {
			String filePath = folderPath;
			filePath = filePath.toString();
			File myFilePath = new File(filePath);
			if (!myFilePath.exists()) {
				myFilePath.mkdirs();
			}
		} catch (Exception e) {
			_Log.error("新建目录操作出错");
			e.printStackTrace();
		}
	}

	/**
	 * 新建文件
	 *
	 * @param filePathAndName
	 *            String 文件路径及名称 如c:/fqf.txt
	 * @param fileContent
	 *            String 文件内容
	 * @return boolean
	 */
	public static void newFile(String filePathAndName, String fileContent) {

		try {
			String filePath = filePathAndName;
			filePath = filePath.toString();
			File myFilePath = new File(filePath);
			if (!myFilePath.exists()) {
				myFilePath.createNewFile();
			}
			FileWriter resultFile = new FileWriter(myFilePath);
			PrintWriter myFile = new PrintWriter(resultFile);
			String strContent = fileContent;
			myFile.println(strContent);
			resultFile.close();

		} catch (Exception e) {
			_Log.error("新建目录操作出错");
			e.printStackTrace();

		}

	}

	// 检测文件是否存在
	public static boolean exists(String filePath) {
		try {
			File myFilePath = new File(filePath);
			if (!myFilePath.exists()) {
				return false;
			} else
				return true;
		} catch (Exception e) {
			_Log.error("找不到文件");
			return false;
		}
	}

	/**
	 * 删除文件
	 *
	 * @param filePathAndName
	 *            String 文件路径及名称 如c:/fqf.txt
	 * @return boolean
	 */
	public static void delFile(String filePathAndName) {
		try {
			String filePath = filePathAndName;
			filePath = filePath.toString();
			File myDelFile = new File(filePath);
			myDelFile.delete();

		} catch (Exception e) {
			_Log.error("删除文件操作出错");
		}
	}

	/**
	 * 删除匹配的文件
	 *
	 * @param path
	 *            String 文件路径
	 * @param name
	 *            String 名称
	 * @return boolean
	 */
	public static void delFile(String path, String name) {
		try {
			File f=new File(path);
			File lst[]=f.listFiles(new FileFilterUtil(name));
			for(int i=0;i<lst.length;i++){
				if(lst[i].isFile()){
					lst[i].delete();
				}
			}

		} catch (Exception e) {
			_Log.error("删除文件操作出错");
		}
	}

	/**
	 * 删除文件夹
	 *
	 * @param filePathAndName
	 *            String 文件夹路径及名称 如c:/fqf
	 * @param fileContent
	 *            String
	 * @return boolean
	 */
	public static void delFolder(String folderPath) {
		try {
			delAllFile(folderPath); // 删除完里面所有内容
			String filePath = folderPath;
			filePath = filePath.toString();
			File myFilePath = new File(filePath);
			myFilePath.delete(); // 删除空文件夹

		} catch (Exception e) {
			_Log.error("删除文件夹操作出错");
		}
	}

	/**
	 * 删除文件夹里面的所有文件
	 * 
	 * @param path
	 *            String 文件夹路径 如 c:/fqf
	 */
	public static void delAllFile(String path) {
		File file = new File(path);
		if (!file.exists()) {
			return;
		}
		if (!file.isDirectory()) {
			return;
		}
		String[] tempList = file.list();
		File temp = null;
		for (int i = 0; i < tempList.length; i++) {
			if (path.endsWith(File.separator)) {
				temp = new File(path + tempList[i]);
			} else {
				temp = new File(path + File.separator + tempList[i]);
			}
			if (temp.isFile()) {
				temp.delete();
			}
			if (temp.isDirectory()) {
				delAllFile(path + "/" + tempList[i]);// 先删除文件夹里面的文件
				delFolder(path + "/" + tempList[i]);// 再删除空文件夹
			}
		}
	}

	/**
	 * 复制单个文件
	 * 
	 * @param oldPath
	 *            String 原文件路径 如：c:/fqf.txt
	 * @param newPath
	 *            String 复制后路径 如：f:/fqf.txt
	 * @return boolean
	 */
	public static void copyFile(String oldPath, String newPath) {
		InputStream inStream = null;
		FileOutputStream fs = null;
		try {
			int bytesum = 0;
			int byteread = 0;
			File oldfile = new File(oldPath);
			if (oldfile.exists()) { // 文件存在时
				//生成目标文件夹
				newPath = newPath.replace("\\", "/");
				newFolder(newPath.substring(0,newPath.lastIndexOf("/")));
				inStream = new FileInputStream(oldPath); // 读入原文件
				fs = new FileOutputStream(newPath);
				byte[] buffer = new byte[1444];
				// int length;
				while ((byteread = inStream.read(buffer)) != -1) {
					bytesum += byteread; // 字节数 文件大小
					fs.write(buffer, 0, byteread);
				}
				
			}
		} catch (Exception e) {
			_Log.error("复制单个文件操作出错");
		}finally{
			try {
				if(null != inStream)inStream.close();
				if(null != fs)fs.close();
			} catch (Exception e2) {}
		}
	}

	/**
	 * 复制整个文件夹内容
	 * 
	 * @param oldPath
	 *            String 原文件路径 如：c:/fqf
	 * @param newPath
	 *            String 复制后路径 如：f:/fqf/ff
	 * @return boolean
	 */
	public static void copyFolder(String oldPath, String newPath) {
		FileInputStream input = null;
		FileOutputStream output = null;
		try {
			(new File(newPath)).mkdirs(); // 如果文件夹不存在 则建立新文件夹
			File a = new File(oldPath);
			String[] file = a.list();
			File temp = null;
			for (int i = 0; i < file.length; i++) {
				if (oldPath.endsWith(File.separator)) {
					temp = new File(oldPath + file[i]);
				} else {
					temp = new File(oldPath + File.separator + file[i]);
				}

				if (temp.isFile()) {
					input = new FileInputStream(temp);
					output = new FileOutputStream(newPath
							+ "/" + (temp.getName()).toString());
					byte[] b = new byte[1024 * 5];
					int len;
					while ((len = input.read(b)) != -1) {
						output.write(b, 0, len);
					}
				}
				if (temp.isDirectory()) {// 如果是子文件夹
					copyFolder(oldPath + "/" + file[i], newPath + "/" + file[i]);
				}
			}
		} catch (Exception e) {
			_Log.error("复制整个文件夹内容操作出错");
		} finally{
			try {
				if( null != output)output.close();
				if( null != input)input.close();
			} catch (Exception e2) {
				// TODO: handle exception
			}
		}
	}

	/**
	 * 移动文件到指定目录
	 * 
	 * @param oldPath
	 *            String 如：c:/fqf.txt
	 * @param newPath
	 *            String 如：d:/fqf.txt
	 */
	public static void moveFile(String oldPath, String newPath) {
		copyFile(oldPath, newPath);
		//TODO 因东南无端丢失图片，故先保留原图
		//delFile(oldPath);

	}

	/**
	 * 移动文件到指定目录
	 * 
	 * @param oldPath
	 *            String 如：c:/fqf.txt
	 * @param newPath
	 *            String 如：d:/fqf.txt
	 */
	public static void moveFolder(String oldPath, String newPath) {
		copyFolder(oldPath, newPath);
		delFolder(oldPath);
	}

	/**
	 * 创建目录
	 */
	public static boolean createFileDir(String dirName) {
		boolean CreateOk = false;

		File f = new File(dirName);
		if (!f.exists()) {
			CreateOk = true;
			f.mkdirs();
		} else
			CreateOk = true;

		return CreateOk;
	}  
  
    /**
     * 压缩文件
     * @param file
     * @param out
     * @param basedir
     */
    public static void compressFile(File file,ZipOutputStream out) {  
        if (!file.exists()) {  
            return;  
        }
        BufferedInputStream bis = null ;
        try {  
            bis = new BufferedInputStream(  
                    new FileInputStream(file));  
            ZipEntry entry = new ZipEntry(file.getName());  
            out.putNextEntry(entry);  
            int count;  
            byte data[] = new byte[1024 * 512];  
            while ((count = bis.read(data, 0, 1024 * 512)) != -1) {  
                out.write(data, 0, count);  
            }  
        } catch (Exception e) {  
            throw new RuntimeException(e);  
        }  finally{
        	try{
        		if(null != bis){bis.close();}
        	}catch(Exception e){e.printStackTrace();}
        }
    }  
	
	public static void main(String[] args) {
//		delFile("D:\\Projects\\Xtown\\Catalog\\XPSCatalog\\webapp\\myfiles\\company\\1\\product\\11", "9f0141fc-6d07-4276-a196-ddbf5260d495");
		try {
			System.out.println(URLEncoder.encode("http://test.51homevip.com/weixin/main/member/good/purchase?id=3&code=monthgood&recommentcode=15625084950","utf-8"));
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
	}
}
