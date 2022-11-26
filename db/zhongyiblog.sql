/*
Navicat MySQL Data Transfer

Source Server         : 192.168.3.46
Source Server Version : 80031
Source Host           : 192.168.3.46:3396
Source Database       : zhongyiblog

Target Server Type    : MYSQL
Target Server Version : 80031
File Encoding         : 65001

Date: 2022-11-26 10:57:17
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for r_article_tag
-- ----------------------------
DROP TABLE IF EXISTS `r_article_tag`;
CREATE TABLE `r_article_tag` (
  `article_id` bigint DEFAULT NULL,
  `tag_id` bigint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of r_article_tag
-- ----------------------------

-- ----------------------------
-- Table structure for t_archive
-- ----------------------------
DROP TABLE IF EXISTS `t_archive`;
CREATE TABLE `t_archive` (
  `arid` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(100) DEFAULT NULL,
  `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `description` text,
  PRIMARY KEY (`arid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='文章归档';

-- ----------------------------
-- Records of t_archive
-- ----------------------------

-- ----------------------------
-- Table structure for t_articles
-- ----------------------------
DROP TABLE IF EXISTS `t_articles`;
CREATE TABLE `t_articles` (
  `cid` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '文章标题',
  `description` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '文章描述',
  `created` datetime DEFAULT NULL COMMENT '创建时间',
  `modified` datetime DEFAULT NULL COMMENT '更新时间',
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '文章内容',
  `order` int unsigned DEFAULT '0' COMMENT '置顶顺序',
  `authorId` int unsigned NOT NULL DEFAULT '0' COMMENT '作者',
  `keywords` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '关键字',
  `publish` int unsigned DEFAULT '0' COMMENT '发布状态: 0 -> 草稿, 1 -> 已发布, 2 -> 回收站',
  `cover` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '封面图',
  `password` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '密码访问',
  `comments` int unsigned DEFAULT '0' COMMENT '评论数量',
  `allow_comment` int unsigned DEFAULT '0' COMMENT '是否允许评论',
  `liking` int unsigned DEFAULT '0' COMMENT '点赞数量',
  `readers` int unsigned DEFAULT '1' COMMENT '阅读访问数量',
  `banner` int DEFAULT '0' COMMENT '是否展示在banner 区域',
  `categories` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '文章分类列表',
  PRIMARY KEY (`cid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='文章';

-- ----------------------------
-- Records of t_articles
-- ----------------------------

-- ----------------------------
-- Table structure for t_black_list
-- ----------------------------
DROP TABLE IF EXISTS `t_black_list`;
CREATE TABLE `t_black_list` (
  `ip` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `keyword` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='黑名单';

-- ----------------------------
-- Records of t_black_list
-- ----------------------------

-- ----------------------------
-- Table structure for t_comments
-- ----------------------------
DROP TABLE IF EXISTS `t_comments`;
CREATE TABLE `t_comments` (
  `coid` bigint NOT NULL AUTO_INCREMENT,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `nickname` char(50) DEFAULT '0' COMMENT '昵称',
  `email` char(50) DEFAULT '0',
  `liking` bigint unsigned DEFAULT '0' COMMENT '点赞数',
  `url` varchar(255) DEFAULT NULL,
  `ip` varchar(64) DEFAULT NULL,
  `agent` varchar(511) DEFAULT NULL,
  `city` char(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `province` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '省份',
  `status` varchar(16) DEFAULT 'approved',
  `parent` int unsigned DEFAULT '0',
  `sort` bigint unsigned DEFAULT '0',
  `avatar` varchar(500) DEFAULT NULL COMMENT '头像',
  `article_title` varchar(100) DEFAULT NULL COMMENT '文章标题',
  `article_description` varchar(300) DEFAULT NULL COMMENT '文章描述',
  `parent_nickname` varchar(100) DEFAULT NULL COMMENT '回复人昵称',
  `parent_id` int unsigned DEFAULT NULL,
  `article_id` bigint DEFAULT NULL COMMENT '文章id',
  PRIMARY KEY (`coid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of t_comments
-- ----------------------------

-- ----------------------------
-- Table structure for t_tags
-- ----------------------------
DROP TABLE IF EXISTS `t_tags`;
CREATE TABLE `t_tags` (
  `name` varchar(100) DEFAULT NULL COMMENT '标签名',
  `description` varchar(100) DEFAULT NULL COMMENT '标签描述',
  `sort` int DEFAULT NULL COMMENT '标签排序',
  `relate_count` bigint unsigned DEFAULT '0' COMMENT '关联文章数量',
  `tid` bigint NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`tid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of t_tags
-- ----------------------------
