/*

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50721
 Source Host           : localhost:3306
 Source Schema         : test

 Target Server Type    : MySQL
 Target Server Version : 50721
 File Encoding         : 65001

*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for _mysql_session_store
-- ----------------------------
DROP TABLE IF EXISTS `_mysql_session_store`;
CREATE TABLE `_mysql_session_store` (
  `id` varchar(255) COLLATE utf8_bin NOT NULL,
  `expires` bigint(20) DEFAULT NULL,
  `data` text COLLATE utf8_bin,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ----------------------------

-- Table structure for status
-- ----------------------------
DROP TABLE IF EXISTS `status`;
CREATE TABLE `status` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `Name` varchar(50) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '描述',
  `Value` smallint(6) DEFAULT NULL,
  `Type` varchar(50) NOT NULL COMMENT '类型',
  `Status` smallint(6) NOT NULL,
  `Remark` varchar(50) DEFAULT NULL,
  `Create_Time` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for user_info
-- ----------------------------
DROP TABLE IF EXISTS `user_info`;
CREATE TABLE `user_info` (
  `User_ID` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `Mobile` varchar(45) NOT NULL COMMENT '手机号(登录账号)',
  `Login_Password` varchar(45) NOT NULL COMMENT '登录密码',
  `AccountName` varchar(45) NOT NULL COMMENT '权限',
  `RealName` varchar(45) DEFAULT NULL COMMENT '姓名',
  `Token` varchar(200) DEFAULT NULL,
  `User_Avator` varchar(100) DEFAULT NULL,
  `Access_Group` varchar(45) DEFAULT '0' COMMENT '是否主账号',
  `Login_Count` int(11) NOT NULL DEFAULT '0',
  `Login_Last_Date` datetime DEFAULT NULL,
  `Login_Last_IP` varchar(100) DEFAULT NULL,
  `Login_This_Date` datetime DEFAULT NULL,
  `Login_This_IP` varchar(100) DEFAULT NULL,
  `Create_Date` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `Create_IP` varchar(100) DEFAULT NULL,
  `Status` smallint(6) NOT NULL DEFAULT '0' COMMENT '状态：\n0：正常\n1：锁定',
  PRIMARY KEY (`User_ID`),
  UNIQUE KEY `Mobile` (`Mobile`)
) ENGINE=InnoDB AUTO_INCREMENT=1004 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=DYNAMIC COMMENT='信息表';

-- ----------------------------
-- Table structure for user_log
-- ----------------------------
DROP TABLE IF EXISTS `user_log`;
CREATE TABLE `user_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '自增id',
  `User_ID` varchar(45) COLLATE utf8_bin NOT NULL COMMENT '用户ID',
  `Type` int(11) NOT NULL DEFAULT '0' COMMENT '日志类型0 其它1 登录',
  `Status` smallint(6) DEFAULT '0' COMMENT '状态',
  `Description` varchar(45) COLLATE utf8_bin DEFAULT NULL COMMENT '描述',
  `Create_Time` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '日期',
  `Create_IP` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8 COLLATE=utf8_bin ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for yuedu
-- ----------------------------
DROP TABLE IF EXISTS `yuedu`;
CREATE TABLE `yuedu` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'UUID',
  `bookid` int(10) DEFAULT NULL COMMENT 'bookid',
  `chapterid` int(10) DEFAULT NULL COMMENT '章节id',
  `class` int(11) DEFAULT '1' COMMENT '分类',
  `category` int(11) DEFAULT '1' COMMENT '类别',
  `title` varchar(100) CHARACTER SET utf8 DEFAULT NULL COMMENT '标题',
  `href` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '原文链接',
  `cover` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '封面图片',
  `content` longtext CHARACTER SET utf8 COMMENT '内容',
  `description` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '描述',
  `likes` int(10) DEFAULT NULL COMMENT '喜欢: 0 不喜欢:1',
  `post_time` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '原文post time',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `remark` varchar(255) CHARACTER SET utf8 DEFAULT NULL COMMENT '标记',
  `status` int(10) DEFAULT '0' COMMENT '状态0 正常 1 锁定 2其他',
  `validity` int(10) DEFAULT '0' COMMENT '有效性 0 永久 1 临时 2范围',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`title`,`href`)
) ENGINE=InnoDB AUTO_INCREMENT=3784 DEFAULT CHARSET=utf8 COLLATE=utf8_bin ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Table structure for yuedu_apps
-- ----------------------------
DROP TABLE IF EXISTS `yuedu_apps`;
CREATE TABLE `yuedu_apps` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app_id` int(11) DEFAULT NULL,
  `app_name` varchar(50) DEFAULT '' COMMENT 'app 名称',
  `app_icon` varchar(50) DEFAULT NULL COMMENT 'app 图标',
  `app_desc` varchar(50) DEFAULT NULL COMMENT 'app 描述',
  `to_url` varchar(200) DEFAULT NULL COMMENT 'app 跳转url',
  `to_name` varchar(200) DEFAULT NULL COMMENT 'app 跳转Name',
  `remark` varchar(200) DEFAULT NULL COMMENT 'app 备注',
  `status` int(10) DEFAULT '0' COMMENT '0 正常 1 锁定 2其他',
  `create_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (`id`,`create_time`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for yuedu_category
-- ----------------------------
DROP TABLE IF EXISTS `yuedu_category`;
CREATE TABLE `yuedu_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `parent_id` int(10) DEFAULT '0' COMMENT '父Id',
  `label` varchar(50) DEFAULT NULL,
  `value` varchar(50) DEFAULT NULL,
  `category` int(10) DEFAULT NULL,
  `remark` varchar(200) DEFAULT NULL,
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

SET FOREIGN_KEY_CHECKS = 1;
