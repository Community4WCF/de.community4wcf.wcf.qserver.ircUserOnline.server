<?php
namespace wcf\page;
use wcf\system\menu\user\UserMenu;
use wcf\system\WCF;

class IRCOnlineUserChannelListPage extends MultipleLinkPage {
	/**
	 * @see	wcf\page\AbstractPage::$templatename
	 */
	public $templateName = 'ircOnlineUserChannelList';
	
	/**
	 * @see	wcf\page\AbstractPage::$loginRequired
	 */
	public $loginRequired = true;
	
	/**
	 * @see	wcf\page\MultipleLinkPage::$objectListClassName
	 */
	public $objectListClassName = 'wcf\data\irc\useronline\channel\ChannelUserOnlineList';
	
	/**
	 * @see	wcf\page\MultipleLinkPage::readData()
	 */
	protected function initObjectList() {
		parent::initObjectList();
		
	}
	
	/**
	 * @see	wcf\page\Page::show()
	 */
	public function show() {
		// set active tab
		UserMenu::getInstance()->setActiveMenuItem('wcf.user.menu.ircSettings.onlineUsersChannelList');
		
		parent::show();
	}
}
