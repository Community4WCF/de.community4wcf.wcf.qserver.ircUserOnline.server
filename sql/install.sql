DROP TABLE IF EXISTS wcf1_irc_useronline_channel;
CREATE TABLE wcf1_irc_useronline_channel (
	channelID 	    INT(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
	userID		    INT(10),
	username	    VARCHAR(255),
	time 		    INT(10) NOT NULL,
	channel 	    VARCHAR(255),
    securityToken 	VARCHAR(255)
);

ALTER TABLE wcf1_irc_useronline_channel ADD FOREIGN KEY (userID) REFERENCES wcf1_user (userID) ON DELETE SET NULL;