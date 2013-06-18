<?php
namespace ios\data\channel;
use wcf\data\DatabaseObject;

class ChannelUserOnline extends DatabaseObject {
    /**
     * @see	wcf\data\DatabaseObject::$databaseTableName
     */
    protected static $databaseTableName = 'channel';

    /**
     * @see	wcf\data\DatabaseObject::$databaseTableIndexName
     */
    protected static $databaseTableIndexName = 'channelID';
}
