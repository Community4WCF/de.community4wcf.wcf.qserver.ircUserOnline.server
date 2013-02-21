{include file='documentHeader'}

<head>
	<title>{lang}wcf.ircUserOnline.user.channelList{/lang} - {lang}wcf.user.usercp{/lang} - {PAGE_TITLE|language}</title>
	{include file='headInclude'}
	<script type="text/javascript" src="{@$__wcf->getPath('wcf')}js/IRC.Channel.js"></script>
	
	<script type="text/javascript">
		//<![CDATA[
		$(function() {
			WCF.Clipboard.init('wcf\\page\\IRCUserOnlineChannelListPage', {@$hasMarkedItems}, { });
		
			var $editorHandler = new WCF.IRC.Channel.EditorHandler();
			new WCF.IRC.Channel.Clipboard($editorHandler);
		}
		//]]>
	</script>
</head>

<body id="tpl{$templateName|ucfirst}">

{include file='userMenuSidebar'}

{include file='header' sidebarOrientation='left'}

<header class="boxHeadline">
	<hgroup>
		<h1>{lang}wcf.ircUserOnline.user.channelList{/lang}</h1>
	</hgroup>
</header>

{include file='userNotice'}

<div class="contentNavigation">
	{pages print=true assign=pagesLinks controller='IRCUserOnlineChannelList' link="pageNo=%d"}

	<nav>
		<ul>
			<li><a href="{link application='wcf' controller='IRCUserOnlineChannelAdd'}{/link}" title="{lang}wcf.global.button.ircUserOnline.channelAdd{/lang}" class="button"><span class="icon icon24 icon-asterisk"></span><span>{lang}wcf.global.button.ircUserOnline.channelAdd{/lang}</span></a></li>
			
			{event name='largeButtonsTop'}
		</ul>
	</nav>
</div>

{hascontent}
	<div class="marginTop tabularBox tabularBoxTitle shadow messageGroupList channelList jsClipboardContainer" data-type="de.community4wcf.qserver.ircUserOnline.server.channel">
		<hgroup>
			<h1>{lang}wcf.ircUserOnline.user.channel{/lang} <span class="badge badgeInverse">{#$objects|count}</span></h1>
		</hgroup>

		<table class="table">
			<thead>
				<tr>
					<th class="columnMark"><label><input type="checkbox" class="jsClipboardMarkAll" /></label></th>
					<th class="columnTitle columnChannelname{if $sortField == 'channel'} active {@$sortOrder}{/if}"><a href="{link controller='IRCUserOnlineChannelList'}pageNo={@$pageNo}&sortField=channel&sortOrder={if $sortField == 'channel' && $sortOrder == 'ASC'}DESC{else}ASC{/if}{/link}">{lang}wcf.ircUserOnline.user.channel.channelName{/lang}</a></th>
					<th class="columnText columnSecurityToken{if $sortField == 'securityToken'} active {@$sortOrder}{/if}"><a href="{link controller='IRCUserOnlineChannelList'}&pageNo={@$pageNo}&sortField=securityToken&sortOrder={if $sortField == 'securityToken' && $sortOrder == 'ASC'}DESC{else}ASC{/if}{/link}">{lang}wcf.ircUserOnline.user.channel.securityToken{/lang}</a></th>
					<th class="columnText columnTime{if $sortField == 'time'} active {@$sortOrder}{/if}"><a href="{link controller='IRCUserOnlineChannelList'}&pageNo={@$pageNo}&sortField=time&sortOrder={if $sortField == 'time' && $sortOrder == 'ASC'}DESC{else}ASC{/if}{/link}">{lang}wcf.ircUserOnline.user.channel.time{/lang}</a></th>
				</tr>
			</thead>
			
			<tbody>
			{content}
				{foreach from=$objects item=channel}
					<tr class="channel" data-channel-id="{@$channel->channelID}">
						<td class="columnMark">
							<label><input type="checkbox" class="jsClipboardItem" data-object-id="{@$channel->channelID}" /></label>
						</td>
						<td class="columnTitle columnChannelname">
							#{$channel->channel}
						</td>
						<td class="columnText columnSecurityToken">
							{$channel->securityToken}
						</td>
						<td class="columnText columnTime">
							{@$channel->time|time}
						</td>
					</tr>
				{/foreach}
			{/content}
			</tbody>
		</table>
	</div>
	
	<div class="contentNavigation">
		{@$pagesLinks}
		
		<div class="jsClipboardEditor" data-types="[ 'de.community4wcf.qserver.ircUserOnline.server.channel' ]"></div>
	</div>
{hascontentelse}
	<p class="info">{lang}wcf.ircUserOnline.user.channelList.noChannel{/lang}</p>
{/hascontent}

{include file='footer'}

</body>
</html>
