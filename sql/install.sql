DROP TABLE IF EXISTS ios1_channel;
CREATE TABLE ios1_channel (
    channelID 	    INT(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    userID		    INT(10),
    username	    VARCHAR(255),
    time 		    INT(10) NOT NULL,
    channel 	    VARCHAR(255)
);

DROP TABLE IF EXISTS ios1_channel_group;
CREATE TABLE ios1_channel_group (
    groupID         INT(10) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    userID          INT(10),
    title           VARCHAR(80) NOT NULL,
    cssClassName    VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS ios1_channel_group_to_object;
CREATE TABLE ios1_channel_group_to_object (
    groupID         INT(10) NOT NULL,
    objectID       INT(10) NOT NULL
);

ALTER TABLE ios1_channel ADD FOREIGN KEY (userID) REFERENCES wcf1_user (userID) ON DELETE SET NULL;
ALTER TABLE ios1_channel_group_to_object ADD FOREIGN KEY (groupID) REFERENCES ios1_channel_group (groupID) ON DELETE CASCADE;
ALTER TABLE ios1_channel_group_to_object ADD FOREIGN KEY (objectID) REFERENCES ios1_channel (channelID) ON DELETE CASCADE;