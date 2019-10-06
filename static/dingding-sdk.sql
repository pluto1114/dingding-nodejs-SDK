/*
Navicat MySQL Data Transfer

Source Server         : mytencent
Source Server Version : 50726
Source Host           : 94.191.121.109:3306
Source Database       : dingding-sdk

Target Server Type    : MYSQL
Target Server Version : 50726
File Encoding         : 65001

Date: 2019-10-06 15:19:34
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for dd_config
-- ----------------------------
DROP TABLE IF EXISTS `dd_config`;
CREATE TABLE `dd_config` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ukey` varchar(64) NOT NULL,
  `uname` varchar(128) DEFAULT NULL,
  `sname` varchar(64) DEFAULT NULL,
  `corpid` varchar(128) NOT NULL,
  `corpsecret` varchar(128) DEFAULT NULL,
  `appkey` varchar(128) DEFAULT NULL,
  `appsecret` varchar(128) DEFAULT NULL,
  `agentid` varchar(128) DEFAULT NULL,
  `chatid` varchar(128) DEFAULT NULL,
  `access_token` varchar(128) DEFAULT NULL,
  `token_begin_time` timestamp NULL DEFAULT NULL,
  `ticket` varchar(128) DEFAULT NULL,
  `ticket_begin_time` timestamp NULL DEFAULT NULL,
  `url` varchar(256) DEFAULT NULL,
  `process_code` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`ukey`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of dd_config
-- ----------------------------
INSERT INTO `dd_config` VALUES ('2', 'pluto1114', '功夫熊猫', '熊猫', 'ding275ce32e2776968e35c2f4657eb6378f', null, 'ding5xtlfq9fetzeu9lh', 'UxFQjUYies19AdPd7zAkf7Y2ApXre1JryYVOVhM8A8vrCW8QH4KCToVmLinmpgiG', '273096225', 'chat9c5f8af5a1ad3768a648a0a0d3c96dea', '3440a736fff837a3a3e06a74b6caf237', '2019-10-06 14:07:56', 'LyoXbMWD9VGNikFRHmOxP0WUuCz7JjoXrGP3VIdbm1K9B2M4oGUc55qYgkVYFW73R3lITksAcdHCz9skJnpG2t', '2019-10-01 09:05:38', 'http://94.191.121.109/dingding-sdk', 'PROC-8143FE43-735A-400A-8B75-1B64C137F1FB');

-- ----------------------------
-- Table structure for t_order
-- ----------------------------
DROP TABLE IF EXISTS `t_order`;
CREATE TABLE `t_order` (
  `orderId` bigint(20) NOT NULL AUTO_INCREMENT,
  `orderName` varchar(255) DEFAULT NULL,
  `userid` varchar(64) DEFAULT NULL,
  `totalPrice` decimal(10,2) DEFAULT NULL,
  `orderStatus` varchar(64) DEFAULT NULL,
  `processInstanceId` varchar(64) DEFAULT NULL,
  `createtime` datetime DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`orderId`)
) ENGINE=InnoDB AUTO_INCREMENT=1570343722608 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of t_order
-- ----------------------------
INSERT INTO `t_order` VALUES ('1570341114736', 'test2', 'manager8036', '666.00', 'orderFinish', '76bf06c0-6fd4-4bfa-921b-4be5917422c9', '2019-10-06 14:29:51');
INSERT INTO `t_order` VALUES ('1570342076477', 'kk', 'manager8036', '456.00', 'orderFinish', '1a7cb361-5e96-4dd9-b09d-7ea0af70d9c6', '2019-10-06 14:29:48');
INSERT INTO `t_order` VALUES ('1570342365605', 'gg', 'manager8036', '899.00', 'orderFinish', '772d6a44-cc30-4286-ab7d-08b33f74d4b6', '2019-10-06 14:15:26');
INSERT INTO `t_order` VALUES ('1570343722607', '音乐', 'manager8036', '487.00', 'orderFinish', 'c6ce5bcf-51d9-4ad8-9ff4-d13634194c9b', '2019-10-06 14:35:54');

-- ----------------------------
-- Table structure for t_user
-- ----------------------------
DROP TABLE IF EXISTS `t_user`;
CREATE TABLE `t_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `department` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `departmentName` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `mobile` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `avatar` varchar(256) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `openid` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `unionid` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createtime` datetime NOT NULL,
  `accesstime` datetime DEFAULT NULL,
  `hot` int(11) DEFAULT '0',
  `upDepart` bigint(20) DEFAULT NULL,
  `ukey` varchar(64) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `point` int(11) DEFAULT '0',
  `god` tinyint(1) NOT NULL DEFAULT '0',
  `role` varchar(16) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'P',
  PRIMARY KEY (`userid`),
  UNIQUE KEY `id` (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2325 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of t_user
-- ----------------------------
INSERT INTO `t_user` VALUES ('2324', 'manager8036', '高健', '1', null, '18698401720', '', 'https://static-legacy.dingtalk.com/media/lADPDgQ9q-ph7vDNAoDNAeA_480_640.jpg', '2dNE0hnueBGiSc4pIzii1HSgiEiE', null, '2019-10-06 12:51:51', '2019-10-06 14:35:35', '13', null, 'pluto1114', '0', '1', 'P');
