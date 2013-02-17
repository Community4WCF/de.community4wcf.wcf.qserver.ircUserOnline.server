<?php
namespace wcf\page;

use wcf\system\clipboard\ClipboardHandler;
use wcf\system\menu\user\UserMenu;
use wcf\system\WCF;

class IRCUserOnlineChannelListPage extends SortablePage {
	/**
	 * @see	wcf\page\AbstractPage::$templatename
	 */
	public $templateName = 'ircUserOnlineChannelList';
	
	/**
	 * @see	wcf\page\AbstractPage::$loginRequired
	 */
	public $loginRequired = true;
	
	/**
	 * @see	wcf\page\MultipleLinkPage::$objectListClassName
	 */
	public $objectListClassName = 'wcf\data\irc\useronline\channel\ChannelUserOnlineList';
	
	/**
	 * @see wcf\page\SortablePage::$validSortFields
	 */
	public $validSortFields = array('channel', 'securityToken', 'time');
	
	/**
	 * @see	wcf\page\MultipleLinkPage::readData()
	 */
	protected function initObjectList() {
		parent::initObjectList();
		
		$this->objectList->getConditionBuilder()->add("irc_useronline_channel.userID = ?", array(WCF::getUser()->userID));
	}
	
	public function assignVariables() {
		parent::assignVariables();
		
		WCF::getTPL()->assign(array(
			'hasMarkedItems' => ClipboardHandler::getInstance()->hasMarkedItems(ClipboardHandler::getInstance()->getObjectTypeID('de.community4wcf.qserver.ircUserOnline.server.channel'))
		));
	}
	
	/**
	 * @see	wcf\page\Page::show()
	 */
	public function show() {
		// set active tab
		UserMenu::getInstance()->setActiveMenuItem('wcf.user.menu.ircSettings.UserOnlineChannelList');
		
		parent::show();
	}
}
