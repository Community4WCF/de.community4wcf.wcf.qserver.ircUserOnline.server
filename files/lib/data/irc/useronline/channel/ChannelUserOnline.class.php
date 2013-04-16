<?php
namespace wcf\data\irc\useronline\channel;
use wcf\data\DatabaseObject;

class ChannelUserOnline extends DatabaseObject {
    /**
     * @see	wcf\data\DatabaseObject::$databaseTableName
     */
    protected static $databaseTableName = 'irc_useronline_channel';

    /**
     * @see	wcf\data\DatabaseObject::$databaseTableIndexName
     */
    protected static $databaseTableIndexName = 'channelID';
}
