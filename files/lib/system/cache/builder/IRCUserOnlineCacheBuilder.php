<?php
namespace wcf\system\cache\builder;

use wcf\util\OpServUtil;

class IRCUserOnlineCacheBuilder extends AbstractCacheBuilder {
    /**
     * @see	wcf\system\cache\builder\AbstractCacheBuilder::rebuild()
     */
    public function rebuild(array $parameters) {
        $data = array(
                'channel' => array()
        );

        $objectList = new \wcf\data\irc\useronline\channel\ChannelUserOnlineList();
        $objectList->readObjects();

        foreach($objectList AS $object) {
            $data['channel'][$object->channel] = array('channelID' => $object->channelID);
            $channelData = OpServUtil::getUser(array('name' => $object->channel));
            $data['channel'][$object->channel]['user'] = $channelData['user'];
        }

        return $data;
    }
}
