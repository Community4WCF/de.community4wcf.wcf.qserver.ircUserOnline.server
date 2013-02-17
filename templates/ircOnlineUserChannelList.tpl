{include file='documentHeader'}

<head>
	<title>{lang}wcf.user.ircOnlineUsers.channelList{/lang} - {lang}wcf.user.usercp{/lang} - {PAGE_TITLE|language}</title>
	{include file='headInclude'}
	
	<script type="text/javascript">
		//<![CDATA[
		$(function() {
			new WCF.Action.Delete('wcf\\data\\irc\\useronline\\channel\\ChannelUserOnlineAction', '.jsUserOnlineChannel');
		});
		//]]>
	</script>
</head>

<body id="tpl{$templateName|ucfirst}">

{include file='userMenuSidebar'}

{include file='header' sidebarOrientation='left'}

<header class="boxHeadline">
	<hgroup>
		<h1>{lang}wcf.user.ircOnlineUsers.channelList{/lang} <span class="badge">{#$items}</span></h1>
	</hgroup>
</header>

{include file='userNotice'}

<div class="contentNavigation">
	{pages print=true assign=pagesLinks controller='IRCOnlineUserChannelList' link="pageNo=%d"}
</div>

{hascontent}
	<div class="container marginTop">
		<ol class="containerList doubleColumned userList">
			{content}
				{foreach from=$objects item=channel}
					<li class="jsUserOnlineChannel">
						
					</li>
				{/foreach}
			{/content}
		</ol>
	</div>
	
	<div class="contentNavigation">
		{@$pagesLinks}
	</div>
{hascontentelse}
	<p class="info">{lang}wcf.user.ircOnlineUsers.channelList.noChannel{/lang}</p>
{/hascontent}

{include file='footer'}

</body>
</html>
