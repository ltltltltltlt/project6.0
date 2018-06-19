/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50717
Source Host           : localhost:3306
Source Database       : game

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2018-05-12 21:00:51
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES ('1', '11', '11', '6512bd43d9caa6e02c990b0a82652dca');

-- ----------------------------
-- Table structure for class
-- ----------------------------
DROP TABLE IF EXISTS `class`;
CREATE TABLE `class` (
  `className` varchar(32) NOT NULL,
  `studentName` varchar(64) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of class
-- ----------------------------
INSERT INTO `class` VALUES ('人人爱编程', 'vv');
INSERT INTO `class` VALUES ('人人爱编程', 'fangfang');
INSERT INTO `class` VALUES ('小小编程班', 'fg');
INSERT INTO `class` VALUES ('小小编程班', 'vb');

-- ----------------------------
-- Table structure for code
-- ----------------------------
DROP TABLE IF EXISTS `code`;
CREATE TABLE `code` (
  `role` varchar(32) NOT NULL,
  `username` varchar(64) NOT NULL,
  `chapter` varchar(32) DEFAULT NULL,
  `chapterCode` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of code
-- ----------------------------
INSERT INTO `code` VALUES ('student', 'vv', '1', 'step 20');
INSERT INTO `code` VALUES ('student', 'fangfang', '0', 'step 15');
INSERT INTO `code` VALUES ('student', 'vv', '2', 'step 25');
INSERT INTO `code` VALUES ('student', 'vv', '3', 'turn right\nstep 15');
INSERT INTO `code` VALUES ('student', 'vv', '4', 'turn left\nstep 20');
INSERT INTO `code` VALUES ('student', 'vv', '5', 'turn left\nstep 15\nturn right\nstep 15');
INSERT INTO `code` VALUES ('student', 'vv', '6', 'turn left\nstep 5\nturn right\nstep 15\nturn right\nstep 5');
INSERT INTO `code` VALUES ('student', 'vv', '0', 'step 15');
INSERT INTO `code` VALUES ('teacher', 'te', '0', 'step 15');
INSERT INTO `code` VALUES ('student', 'vb', '0', 'step 15');
INSERT INTO `code` VALUES ('student', 'fg', '0', 'step 15');
INSERT INTO `code` VALUES ('student', 'ff', '0', 'step 15');

-- ----------------------------
-- Table structure for hasclass
-- ----------------------------
DROP TABLE IF EXISTS `hasclass`;
CREATE TABLE `hasclass` (
  `classId` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(64) NOT NULL,
  `className` varchar(32) NOT NULL,
  `role` varchar(32) NOT NULL,
  PRIMARY KEY (`classId`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of hasclass
-- ----------------------------
INSERT INTO `hasclass` VALUES ('1', 'te', '人人爱编程', 'teacher');
INSERT INTO `hasclass` VALUES ('2', 'te', '小小编程班', 'teacher');
INSERT INTO `hasclass` VALUES ('3', 'te', '编程教室', 'teacher');
INSERT INTO `hasclass` VALUES ('4', 'tt', 'dsf', 'teacher');

-- ----------------------------
-- Table structure for student
-- ----------------------------
DROP TABLE IF EXISTS `student`;
CREATE TABLE `student` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(64) NOT NULL,
  `email` varchar(64) NOT NULL,
  `password` varchar(64) NOT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `level` varchar(32) DEFAULT NULL,
  `star` int(10) DEFAULT NULL,
  `sex` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of student
-- ----------------------------
INSERT INTO `student` VALUES ('8', 'mick', 'mick@163.com', '409e061a94a638b018132d29a24f7f24', 'http://localhost:8080/static/img/avatar10.png', '1', '0', 'male');
INSERT INTO `student` VALUES ('9', 'john', 'john@123.com', 'b5e42f49ab3acf8f6c2ccf99f604a17f', 'static/img/avatar00.png', '1', '0', 'male');
INSERT INTO `student` VALUES ('10', 'yoyoyo', 'yoyoyo@123.com', '0f2bfa99c367e833d82a24fe465d200a', 'http://localhost:8080/static/img/avatar02.png', '1', '0', 'female');
INSERT INTO `student` VALUES ('11', 'mm', 'mm@123.com', '648ceaa6447a6a2004ec51b797c78247', 'http://localhost:8080/static/img/avatar07.png', '1', '0', 'male');
INSERT INTO `student` VALUES ('12', 'lili', 'lili@123.com', '6a67e071db5a47888d6b58abe69c0cc5', 'static/img/avatar00.png', '1', '0', 'male');
INSERT INTO `student` VALUES ('13', 'vv', 'vv@qq.com', '7927d0cd79707f9a9432b0ed4d07c489', 'http://localhost:8080/static/img/avatar04.png', '1', '30', 'male');
INSERT INTO `student` VALUES ('14', 'fangfang', 'fangfang@123.com', '7cad0b44c11c8e5459e1bf59e4d8d7ea', 'static/img/avatar00.png', '1', '0', 'male');
INSERT INTO `student` VALUES ('15', 'st', 'st@qq.com', '163003754d4250d37828badf4281e0a5', 'static/img/avatar00.png', '1', '0', 'male');
INSERT INTO `student` VALUES ('16', 'vb', 'vb@qq.com', '272f69906630c76c19e69a11549767b3', 'static/img/avatar00.png', '1', '0', 'male');
INSERT INTO `student` VALUES ('17', 'fg', 'fg@qq.com', 'a5294aae137b94bc062918cb9c271bb6', 'static/img/avatar00.png', '1', '0', 'male');
INSERT INTO `student` VALUES ('18', 'ff', 'ff@qq.com', '3028879ab8d5c87dc023049fa5bb5c1a', 'static/img/avatar00.png', '1', '0', 'male');

-- ----------------------------
-- Table structure for teacher
-- ----------------------------
DROP TABLE IF EXISTS `teacher`;
CREATE TABLE `teacher` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(64) NOT NULL,
  `email` varchar(64) NOT NULL,
  `password` varchar(64) NOT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `level` varchar(32) DEFAULT NULL,
  `star` int(10) DEFAULT NULL,
  `sex` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of teacher
-- ----------------------------
INSERT INTO `teacher` VALUES ('3', 'tt', 'tt@qq.com', '45fcaeafd8ebec14bece68f7f00ca154', null, null, null, null);
INSERT INTO `teacher` VALUES ('4', 'te', 'te@qq.com', 'e564b6df48781a5fdf8ca5263ace1947', 'http://localhost:8080/static/img/avatar08.png', '1', '0', 'male');
