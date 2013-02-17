{include file='documentHeader'}

<head>
	<title>{lang}wcf.user.ircOnlineUsers.channelList{/lang} - {lang}wcf.user.usercp{/lang} - {PAGE_TITLE|language}</title>
	{include file='headInclude'}
	
	<script type="text/javascript">
		//<![CDATA[
		$(function() {
			WCF.Clipboard.init('wcf\\page\\IRCOnlineUserChannelListPage', {@$hasMarkedItems}, { });
		
			var $editorHandler = new WCF.IRCOnlineUser.channel.EditorHandler();
			new WCF.IRCOnlineUser.channel.Clipboard($editorHandler);
		}
		//]]>
	</script>
</head>

<body id="tpl{$templateName|ucfirst}">

{include file='userMenuSidebar'}

{include file='header' sidebarOrientation='left'}

<header class="boxHeadline">
	<hgroup>
		<h1>{lang}wcf.user.ircOnlineUsers.channelList{/lang}</h1>
	</hgroup>
</header>

{include file='userNotice'}

<div class="contentNavigation">
	{pages print=true assign=pagesLinks controller='IRCOnlineUserChannelList' link="pageNo=%d"}
</div>

{hascontent}
	<div class="marginTop tabularBox tabularBoxTitle shadow messageGroupList channelList jsClipboardContainer" data-type="de.community4wcf.qserver.ircUserOnline.server.channel">
		<hgroup>
			<h1>{lang}wcf.user.ircOnlineUsers.channel{/lang} <span class="badge badgeInverse">{#$objects|count}</span></h1>
		</hgroup>

		<table class="table">
			<thead>
				<tr>
					<th class="columnMark"><label><input type="checkbox" class="jsClipboardMarkAll" /></label></th>
					<th class="columnTitle columnChannelname{if $sortField == 'channel'} active {@$sortOrder}{/if}"><a href="{link controller='IRCOnlineUserChannelList'}pageNo={@$pageNo}&sortField=channel&sortOrder={if $sortField == 'channel' && $sortOrder == 'ASC'}DESC{else}ASC{/if}{/link}">{lang}wcf.user.ircOnlineUsers.channel.channelName{/lang}</a></th>
					<th class="columnText columnSecurityToken{if $sortField == 'securityToken'} active {@$sortOrder}{/if}"><a href="{link controller='IRCOnlineUserChannelList'}&pageNo={@$pageNo}&sortField=securityToken&sortOrder={if $sortField == 'securityToken' && $sortOrder == 'ASC'}DESC{else}ASC{/if}{/link}">{lang}wcf.user.ircOnlineUsers.channel.securityToken{/lang}</a></th>
					<th class="columnText columnTime{if $sortField == 'time'} active {@$sortOrder}{/if}"><a href="{link controller='IRCOnlineUserChannelList'}&pageNo={@$pageNo}&sortField=time&sortOrder={if $sortField == 'time' && $sortOrder == 'ASC'}DESC{else}ASC{/if}{/link}">{lang}wcf.user.ircOnlineUsers.channel.time{/lang}</a></th>
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
	<p class="info">{lang}wcf.user.ircOnlineUsers.channelList.noChannel{/lang}</p>
{/hascontent}

{include file='footer'}

</body>
</html>
