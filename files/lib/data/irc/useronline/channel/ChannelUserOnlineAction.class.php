<?php
namespace wcf\data\irc\useronline\channel;
use wcf\data\AbstractDatabaseObjectAction;
use wcf\system\clipboard\ClipboardHandler;
use wcf\data\IClipboardAction;

class ChannelUserOnlineAction extends AbstractDatabaseObjectAction implements IClipboardAction {
    /**
     * @see wcf\data\AbstractDatabaseObjectAction::$className
     */
    protected $className = 'wcf\data\irc\useronline\channel\ChannelUserOnlineEditor';

    /**
     * @see DatabaseObjectEditor::create()
     */
    public function create() {
        $object = call_user_func(array($this->className, 'create'), $this->parameters);

        return $object;
    }

    /**
     * @see wcf\data\IClipboardAction::validateUnmarkAll()
     */
    public function validateUnmarkAll() {
        // does nothing
    }

    /**
     * @see wcf\data\IClipboardAction::unmarkAll()
     */
    public function unmarkAll() {
        ClipboardHandler::getInstance()->removeItems(ClipboardHandler::getInstance()->getObjectTypeID('de.community4wcf.wcf.qserver.ircUserOnline.server.channel'));
    }
}