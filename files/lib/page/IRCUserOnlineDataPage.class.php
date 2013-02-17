<?php
namespace wcf\page;

class IRCUserOnlineDataPage extens AbstractPage {
	public $channel = '';
	public $securityToken = '';
	public $cache = null;
	
	/**
	 * @see	wcf\page\Page::readParameters()
	 */
	public function readParameters() {
		parent::readParameters();
		
		if(isset($_GET['channel'])) $this->channel = escapeString($_GET['channel']);
		if(isset($_GET['securityToken'])) $this->securityToken = escapeString($_GET['securityToken']);
	}
}
