<?php
namespace ios\system\clipboard\action;

use wcf\system\clipboard\ClipboardEditorItem;
use wcf\system\clipboard\action\AbstractClipboardAction;
use wcf\system\WCF;

class IRCUserOnlineChannelClipboardAction extends AbstractClipboardAction {
    /**
     * list of channels
     *
     * @var	array<data\data\irc\useronline\channel\ChannelUserOnline>
     */
    public $channels = null;

    /**
     * @see	wcf\system\clipboard\action\AbstractClipboardAction::$supportedActions
     */
    protected $supportedActions = array('assignLabel', 'manageBlacklist', 'delete');

    /**
     * @see	wcf\system\clipboard\action\IClipboardAction::getTypeName()
     */
    public function getTypeName() {
        return 'de.community4wcf.qserver.ircUserOnline.server.channele';
    }

    /**
     * @see	wcf\system\clipboard\action\IClipboardAction::getClassName()
     */
    public function getClassName() {
        return 'wcf\data\irc\useronline\channel\ChannelUserOnlineAction';
    }

    /**
     * @see	wcf\system\clipboard\action\IClipboardAction::execute()
     */
    public function execute(array $objects, $actionName, array $typeData = array()) {
        $item = new ClipboardEditorItem();

        return $item;
    }

    /**
     * @see	wcf\system\clipboard\action\IClipboardAction::getEditorLabel()
     */
    public function getEditorLabel(array $objects) {
        return WCF::getLanguage()->getDynamicVariable('wcf.clipboard.ircUserOnline.label.channel.marked', array('count' => count($objects)));
    }
}
