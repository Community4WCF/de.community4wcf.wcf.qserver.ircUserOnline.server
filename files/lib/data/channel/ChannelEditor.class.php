<?php
namespace wcf\data\irc\useronline\channel;
use wcf\system\cache\builder\IRCUserOnlineCacheBuilder;
use wcf\data\DatabaseObjectEditor;
use wcf\data\IEditableCachedObject;

class ChannelUserOnlineEditor extends DatabaseObjectEditor implements IEditableCachedObject {
    /**
     * @see	wcf\data\DatabaseObjectDecorator::$baseClass
     */
    protected static $baseClass = 'wiki\data\article\Article';

    /**
     * @see	wcf\data\IEditableCachedObject::resetCache()
     */
    public static function resetCache() {
        IRCUserOnlineCacheBuilder::getInstance()->reset();
    }
}