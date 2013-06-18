<?php
namespace ios\system\moderation\queue\activation;
use wcf\data\irc\useronline\channel\ChannelUserOnline;
use wcf\data\irc\useronline\channel\ChannelUserOnlineList;
use wcf\data\irc\useronline\channel\ChannelUserOnlineAction;
use wcf\data\moderation\queue\ModerationQueue;
use wcf\data\moderation\queue\ViewableModerationQueue;
use wcf\system\moderation\queue\activation\IModerationQueueActivationHandler;
use wcf\system\moderation\queue\ModerationQueueManager;
use wcf\system\WCF;

class QServerChannelModerationQueueActivationHandler implements IModerationQueueActivationHandler {
    /**
     * list of channels
     * @var	array<wcf\data\irc\useronline\channel\ChannelUserOnline>
     */
    protected static $channel = array();

    /**
     * @see	wcf\system\moderation\queue\IModerationQueueHandler::assignQueues()
     */
    public function assignQueues(array $queues) {
        $assignments = array();
        foreach ($queues as $queue) {
            $assignUser = 0;
            if (WCF::getSession()->getPermission('mod.channelUseronline.channel.canActivate')) {
                $assignUser = 1;
            }

            $assignments[$queue->queueID] = $assignUser;
        }

        ModerationQueueManager::getInstance()->setAssignment($assignments);
    }

    /**
     * @see	wcf\system\moderation\queue\activation\IModerationQueueActivationHandler::enableContent()
     */
    public function enableContent(ModerationQueue $queue) {
        if ($this->isValid($queue->objectID)) {

        }
    }

    /**
     * @see	wcf\system\moderation\queue\activation\IModerationQueueActivationHandler::getDisabledContent()
     */
    public function getDisabledContent(ViewableModerationQueue $queue) {
        WCF::getTPL()->assign(array(
        'channel' => new ChannelUserOnline($queue->getAffectedObject())
        ));

        return WCF::getTPL()->fetch('moderationChannel', 'wcf');
    }

    /**
     * @see	wcf\system\moderation\queue\IModerationQueueHandler::populate()
     */
    public function populate(array $queues) {
        $objectIDs = array();
        foreach ($queues as $object) {
            $objectIDs[] = $object->objectID;
        }

        // fetch channel
        $channelList = new ChannelUserOnlineList();
        $channelList->getConditionBuilder()->add("channel.channelID IN (?)", array($objectIDs));
        $channelList->sqlLimit = 0;
        $channelList->readObjects();
        $channels = $channelList->getObjects();

        foreach ($queues as $object) {
            if (isset($channels[$object->objectID])) {
                $channel = $channels[$object->objectID];

                $object->setAffectedObject($channel);
            }
        }
    }

    /**
     * @see	wcf\system\moderation\queue\IModerationQueueHandler::getContainerID()
     */
    public function getContainerID($objectID) {

        return 0;
    }

    /**
     * @see	wcf\system\moderation\queue\IModerationQueueHandler::removeContent()
     */
    public function removeContent(ModerationQueue $queue, $message) {
        $channel = new ChannelUserOnline($queue->objectID);
        $objectAction = new ChannelUserOnlineAction(array($channel), 'delete');
    }

    /**
     * @see	wcf\system\moderation\queue\IModerationQueueHandler::isValid()
     */
    public function isValid($objectID) {
        if ($this->getChannelUserOnline($objectID) === null) {
            return false;
        }

        return true;
    }

    /**
     * Returns a channel object by channel id or null if channel id is invalid.
     *
     * @param	integer		$objectID
     * @return	use wcf\data\irc\useronline\channel\ChannelUserOnline
     */
    protected function getChannelUserOnline($objectID) {
        if (!array_key_exists($objectID, self::$channel)) {
            self::$channel[$objectID] = new ChannelUserOnline($objectID);
            if (!self::$channel[$objectID]->channelID) {
                self::$channel[$objectID] = null;
            }
        }

        return self::$channel[$objectID];
    }
}