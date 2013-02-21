/**
 * Channel namespace
 */
WCF.IRC.Channel = {};

/**
 * Core editor handler for channels.
 */
WCF.IRC.Channel.EditorHandler = Class.extend({
	/**
	 * list of attributes per channel
	 * @var	object
	 */
	_attributes: { },
	
	/**
	 * list of channels
	 * @var	object
	 */
	_channels: { },
	
	/**
	 * Initializes the core editor handler for channel.
	 */
	init: function(availableLabels) {
		this._channels = { };
		
		var self = this;
		$('.channel').each(function(index, channel) {
			var $channel = $(channel);
			var $channelID = $channel.data('channelID');
			
			if (!self._channels[$channelID]) {
				self._channels[$channelID] = $channel;
				var $labelIDs = eval($channel.data('labelIDs'));
				
				// set attributes
				self._attributes[$channelID] = {
					labelIDs: $labelIDs
				};
			}
		});
	},
	
	/**
	 * Returns an attribute's value for given channel id.
	 * 
	 * @param	integer		channelID
	 * @param	string		key
	 * @return	mixed
	 */
	getValue: function(channelID, key) {
		switch (key) {
			case 'labelIDs':
				if (this._attributes[channelID].labelIDs === undefined) {
					// TODO: fetch label ids
					this._attributes[channelID].labelIDs = [ ];
				}
				
				return this._attributes[channelID].labelIDs;
			break;
		}
	},
	
	/**
	 * Counts available labels.
	 * 
	 * @return	integer
	 */
	countAvailableLabels: function() {
		return (this.getAvailableLabels()).length;
	},
	
	getAvailableLabels: function() {
		var $labels = [ ];
		
		$('#channelLabelFilter > .dropdownMenu li').each(function(index, listItem) {
			var $listItem = $(listItem);
			if ($listItem.hasClass('dropdownDivider')) {
				return false;
			}
			
			var $span = $listItem.find('span');
			$labels.push({
				cssClassName: $span.data('cssClassName'),
				labelID: $span.data('labelID'),
				label: $span.text()
			});
		});
		
		return $labels;
	},
	
	/**
	 * Updates channel data.
	 * 
	 * @param	integer		channelID
	 * @param	object		data
	 */
	update: function(channelID, key, data) {
		if (!this._channels[channelID]) {
			console.debug("[WCF.IRC.Channel.EditorHandler] Unknown channel id '" + channelID + "'");
			return;
		}
		var $channel = this._channels[channelID];
		
		switch (key) {		
			case 'labelIDs':
				var $labels = { };
				$('#channelLabelFilter > .dropdownMenu > li > a > span').each(function(index, span) {
					var $span = $(span);
					
					$labels[$span.data('labelID')] = {
						cssClassName: $span.data('cssClassName'),
						label: $span.text(),
						url: $span.parent().attr('href')
					};
				});
				
				var $labelList = $channel.find('.columnSubject > h1 > .labelList');
				if (!data.length) {
					if ($labelList.length) $labelList.remove();
				}
				else {
					// create label list if missing
					if (!$labelList.length) {
						$labelList = $('<ul class="labelList" />').prependTo($channel.find('.columnSubject > h1'));
					}
					
					// remove all existing labels
					$labelList.empty();
					
					// insert labels
					for (var $i = 0, $length = data.length; $i < $length; $i++) {
						var $label = $labels[data[$i]];
						$('<li><a href="' + $label.url + '" class="badge label' + ($label.cssClassName ? " " + $label.cssClassName : "") + '">' + $label.label + '</a>&nbsp;</li>').appendTo($labelList);
					}
				}
			break;
		}
	}
});

/**
 * Article editor handler for channel page.
 * 
 * @see	WCF.IRC.Channel.EditorHandler
 * @param	array<object>	availableLabels
 */
WCF.IRC.Channel.EditorHandlerArticle = WCF.IRC.Channel.EditorHandler.extend({
	/**
	 * list of available labels
	 * @var	array<object>
	 */
	_availableLabels: null,
	
	/**
	 * @see	WCF.IRC.Channel.EditorHandler.init()
	 * 
	 * @param	array<object>	availableLabels
	 */
	init: function(availableLabels) {
		this._availableLabels = availableLabels || [ ];
		
		this._super();
	},
	
	/**
	 * @see	WCF.IRC.Channel.EditorHandler.getAvailableLabels()
	 */
	getAvailableLabels: function() {
		return this._availableLabels;
	},
	
	/**
	 * @see	WCF.IRC.Channel.EditorHandler.update()
	 */
	update: function(channelID, key, data) {
		if (!this._channels[channelID]) {
			console.debug("[WCF.IRC.Channel.EditorHandler] Unknown channel id '" + channelID + "'");
			return;
		}
		var $channel = this._channels[channelID];
		
		switch (key) {
			case 'labelIDs':
				var $container = $('#content > header h1');
				if (!data.length) {
					// remove all labels
					$container.find('ul.labelList').remove();
				}
				else {
					var $labelList = $container.find('ul.labelList');
					if (!$labelList.length) {
						$labelList = $('<ul class="labelList" />').appendTo($container);
					}
					
					// remove existing labels
					$labelList.empty();
					
					// add new labels
					for (var $i = 0, $length = data.length; $i < $length; $i++) {
						var $labelID = data[$i];
						
						for (var $j = 0, $innerLength = this.getAvailableLabels().length; $j < $innerLength; $j++) {
							var $label = this.getAvailableLabels()[$j];
							if ($label.labelID == $labelID) {
								$('<li><span class="label badge' + ($label.cssClassName ? " " + $label.cssClassName : "") + '">' + $label.label + '</span>&nbsp;</li>').appendTo($labelList);
								
								break;
							}
						}
					}
				}
			break;
		}
	}
});

/**
 * Provides extended actions for channel clipboard actions.
 */
WCF.IRC.Channel.Clipboard = Class.extend({
	/**
	 * editor handler
	 * @var	WCF.IRC.Channel.EditorHandler
	 */
	_editorHandler: null,
	
	/**
	 * Initializes a new WCF.IRC.Channel.Clipboard object.
	 * 
	 * @param	WCF.IRC.Channel.EditorHandler	editorHandler
	 */
	init: function(editorHandler) {
		this._editorHandler = editorHandler;
		
		// bind listener
		$('.jsClipboardEditor').each($.proxy(function(index, container) {
			var $container = $(container);
			var $types = eval($container.data('types'));
			if (WCF.inArray('de.community4wcf.wcf.qserver.ircUserOnline.server.channel', $types)) {
				$container.on('clipboardAction', $.proxy(this._execute, this));
				$container.on('clipboardActionResponse', $.proxy(this._evaluateResponse, this));
				return false;
			}
		}, this));
	},
	
	/**
	 * Handles clipboard actions.
	 * 
	 * @param	object		event
	 * @param	string		type
	 * @param	string		actionName
	 * @param	object		parameters
	 */
	_execute: function(event, type, actionName, parameters) {
		if (type === 'de.community4wcf.wcf.qserver.ircUserOnline.server.channel' && actionName === 'channel.assignLabel') {
			new WCF.IRC.Channel.Label.Editor(this._editorHandler, null, parameters.objectIDs);
		}
	},
	
	/**
	 * Evaluates AJAX responses.
	 * 
	 * @param	object		event
	 * @param	object		data
	 * @param	string		type
	 * @param	string		actionName
	 * @param	object		parameters
	 */
	_evaluateResponse: function(event, data, type, actionName, parameters) {
		if (type !== 'de.community4wcf.wcf.qserver.ircUserOnline.server.channel') {
			// ignore unreleated events
			return;
		}
	}
});

/**
 * Namespace for label-related classes.
 */
WCF.IRC.Channel.Label = { };

/**
 * Providers an editor for channel labels.
 * 
 * @param	WCF.IRC.Channel.EditorHandler	editorHandler
 * @param	string				elementID
 * @param	array<integer>			channelIDs
 */
WCF.IRC.Channel.Label.Editor = Class.extend({
	/**
	 * list of channel id
	 * @var	array<integer>
	 */
	_channelIDs: 0,
	
	/**
	 * dialog object
	 * @var	jQuery
	 */
	_dialog: null,
	
	/**
	 * editor handler object
	 * @var	WCF.IRC.Channel.EditorHandler
	 */
	_editorHandler: null,
	
	/**
	 * system notification object
	 * @var	WCF.System.Notification
	 */
	_notification: null,
	
	/**
	 * action proxy object
	 * @var	WCF.Action.Proxy
	 */
	_proxy: null,
	
	/**
	 * Initializes the label editor for given channel.
	 * 
	 * @param	WCF.IRC.Channel.EditorHandler	editorHandler
	 * @param	string				elementID
	 * @param	array<integer>			channelIDs
	 */
	init: function(editorHandler, elementID, channelIDs) {
		if (elementID) {
			this._channelIDs = [ $('#' + elementID).data('channelID') ];
		}
		else {
			this._channelIDs = channelIDs;
		}
		
		this._dialog = null;
		this._editorHandler = editorHandler;
		
		this._notification = new WCF.System.Notification(WCF.Language.get('wcf.ircUserOnline.channel.label.management.addLabel.success'));
		this._proxy = new WCF.Action.Proxy({
			success: $.proxy(this._success, this)
		});
		
		this._loadDialog();
	},
	
	/**
	 * Loads label assignment dialog.
	 */
	_loadDialog: function() {
		this._proxy.setOption('data', {
			actionName: 'getLabelForm',
			className: 'wcf\\data\\irc\\useronline\\channel\\label\\ChannelLabelAction',
			parameters: {
				channelIDs: this._channelIDs,
				categoryID: this._categoryID
			}
		});
		this._proxy.sendRequest();
	},
	
	/**
	 * Handles successful AJAX requests.
	 * 
	 * @param	object		data
	 * @param	string		textStatus
	 * @param	jQuery		jqXHR
	 */
	_success: function(data, textStatus, jqXHR) {
		switch (data.returnValues.actionName) {
			case 'assignLabel':
				this._assignLabels(data);
			break;
			
			case 'getLabelForm':
				this._renderDialog(data);
			break;
		}
	},
	
	/**
	 * Renders the label assignment form overlay.
	 * 
	 * @param	object		data
	 */
	_renderDialog: function(data) {
		if (this._dialog === null) {
			this._dialog = $('#channelLabelForm');
			if (!this._dialog.length) {
				this._dialog = $('<div id="channelLabelForm" />').hide().appendTo(document.body);
			}
		}
		
		this._dialog.html(data.returnValues.template);
		this._dialog.wcfDialog({
			title: WCF.Language.get('wcf.ircUserOnline.channeln.label.assignLabels')
		});
		this._dialog.wcfDialog('render');
		
		$('#assignLabels').click($.proxy(this._save, this));
	},
	
	/**
	 * Saves label assignments for current channel id.
	 */
	_save: function() {
		var $labelIDs = [ ];
		this._dialog.find('input').each(function(index, checkbox) {
			var $checkbox = $(checkbox);
			if ($checkbox.is(':checked')) {
				$labelIDs.push($checkbox.data('labelID'));
			}
		});
		
		this._proxy.setOption('data', {
			actionName: 'assignLabel',
			className: 'wcf\\data\\irc\\useronline\\channel\\label\\ChannelLabelAction',
			parameters: {
				channelIDs: this._channelIDs,
				labelIDs: $labelIDs,
				categoryID: this._categoryID
			}
		});
		this._proxy.sendRequest();
	},
	
	/**
	 * Updates channel labels.
	 * 
	 * @param	object		data
	 */
	_assignLabels: function(data) {
		// update channel
		for (var $i = 0, $length = this._channelIDs.length; $i < $length; $i++) {
			this._editorHandler.update(this._channelIDs[$i], 'labelIDs', data.returnValues.labelIDs);
		}
		
		// close dialog and show a 'success' notice
		this._dialog.wcfDialog('close');
		this._notification.show();
	}
});

/**
 * Label manager for channels.
 * 
 * @param	string		link
 */
WCF.IRC.Channel.Label.Manager = Class.extend({
	/**
	 * deleted label id
	 * @var	integer
	 */
	_deletedLabelID: 0,
	
	/**
	 * dialog object
	 * @var	jQuery
	 */
	_dialog: null,
	
	/**
	 * list of labels
	 * @var	jQuery
	 */
	_labels: null,
	
	/**
	 * parsed label link
	 * @var	string
	 */
	_link: '',
	
	/**
	 * action proxy object
	 * @var	WCF.Action.Proxy
	 */
	_proxy: null,
	
	/**
	 * Initializes the label manager for channels.
	 * 
	 * @param	string		link
	 */
	init: function(link) {
		this._deletedLabelID = 0;
		this._link = link;
		
		this._labels = $('#channelLabelFilter .dropdownMenu');
		$('#manageLabel').click($.proxy(this._click, this));
		
		this._notification = new WCF.System.Notification(WCF.Language.get('wcf.ircUserOnline.channel.label.management.addLabel.success'));
		this._proxy = new WCF.Action.Proxy({
			success: $.proxy(this._success, this)
		});
	},
	
	/**
	 * Handles clicks on the 'manage labels' button.
	 */
	_click: function() {
		this._proxy.setOption('data', {
			actionName: 'getLabelManagement',
			className: 'wcf\\data\\irc\\useronline\\channel\\ChannelAction',
			parameters: {
				data: {
					categoryID: $('#manageLabel').data('categoryID')
				}
			}
		});
		this._proxy.sendRequest();
	},
	
	/**
	 * Handles successful AJAX requests.
	 * 
	 * @param	object		data
	 * @param	string		textStatus
	 * @param	jQuery		jqXHR
	 */
	_success: function(data, textStatus, jqXHR) {
		if (this._dialog === null) {
			this._dialog = $('<div id="labelManagement" />').hide().appendTo(document.body);
		}
		
		if (data.returnValues && data.returnValues.actionName) {
			switch (data.returnValues.actionName) {
				case 'add':
					this._insertLabel(data);
				break;
				
				case 'getLabelManagement':
					// render dialog
					this._dialog.empty().html(data.returnValues.template);
					this._dialog.wcfDialog({
						title: WCF.Language.get('wcf.ircUserOnline.channel.label.management')
					});
					this._dialog.wcfDialog('render');
					
					// bind action listeners
					this._bindListener();
				break;
			}
		}
		else {
			// check if delete label id is present within URL (causing an IllegalLinkException if reloading)
			if (this._deletedLabelID) {
				var $regex = new RegExp('(\\?|&)labelID=' + this._deletedLabelID);
				window.location = window.location.toString().replace($regex, '');
			}
			else {
				// reload page
				window.location.reload();
			}
		}
	},
	
	/**
	 * Inserts a previously created label.
	 * 
	 * @param	object		data
	 */
	_insertLabel: function(data) {
		var $listItem = $('<li><a href="' + this._link + '&labelID=' + data.returnValues.labelID + '"><span class="badge label' + (data.returnValues.cssClassName ? ' ' + data.returnValues.cssClassName : '') + '">' + data.returnValues.label + '</span></a></li>');
		$listItem.find('a > span').data('labelID', data.returnValues.labelID).data('cssClassName', data.returnValues.cssClassName);
		
		var $divider = this._labels.find('.dropdownDivider:eq(0)').show();
		$listItem.insertBefore($divider);
		
		this._notification.show();
	},
	
	/**
	 * Binds event listener for label management.
	 */
	_bindListener: function() {
		$('#labelName').keyup($.proxy(this._updateLabels, this));
		$('#addLabel').disable().click($.proxy(this._addLabel, this));
		$('#editLabel').disable();
		
		this._dialog.find('.channelLabelList a.label').click($.proxy(this._edit, this));
	},
	
	/**
	 * Prepares a label for editing.
	 * 
	 * @param	object		event
	 */
	_edit: function(event) {
		var $label = $(event.currentTarget);
		
		// replace legends
		var $legend = WCF.Language.get('wcf.ircUserOnline.channel.label.management.editLabel').replace(/#labelName#/, $label.text());
		$('#channelLabelManagementForm').data('labelID', $label.data('labelID')).children('legend').html($legend);
		
		// update text input
		$('#labelName').val($label.text()).trigger('keyup');
		
		// select css class name
		var $cssClassName = $label.data('cssClassName');
		$('#labelManagementList input').each(function(index, input) {
			var $input = $(input);
			
			if ($input.val() == $cssClassName) {
				$input.attr('checked', 'checked');
			}
		});
		
		// toggle buttons
		$('#addLabel').hide();
		$('#editLabel').show().click($.proxy(this._editLabel, this));
		$('#deleteLabel').show().click($.proxy(this._deleteLabel, this));
	},
	
	/**
	 * Edits a label.
	 */
	_editLabel: function() {
		this._proxy.setOption('data', {
			actionName: 'update',
			className: 'wcf\\data\\irc\\useronline\\channel\\label\\ChannelLabelAction',
			objectIDs: [ $('#channelLabelManagementForm').data('labelID') ],
			parameters: {
				data: {
					cssClassName: $('#labelManagementList input:checked').val(),
					label: $('#labelName').val()
				}
			}
		});
		this._proxy.sendRequest();
	},
	
	/**
	 * Deletes a label.
	 */
	_deleteLabel: function() {
		var $title = WCF.Language.get('wcf.ircUserOnline.channel.label.management.deleteLabel.confirmMessage').replace(/#labelName#/, $('#labelName').val());
		WCF.System.Confirmation.show($title, $.proxy(function(action) {
			if (action === 'confirm') {
				this._proxy.setOption('data', {
					actionName: 'delete',
					className: 'wiki\\data\\irc\\useronline\\channel\\label\\ChannelLabelAction',
					objectIDs: [ $('#channelLabelManagementForm').data('labelID') ]
				});
				this._proxy.sendRequest();
				
				this._deletedLabelID = $('#channelLabelManagementForm').data('labelID');
			}
		}, this));
	},
	
	/**
	 * Updates label text within label management.
	 */
	_updateLabels: function() {
		var $value = $('#labelName').val();
		if ($value) {
			$('#addLabel, #editLabel').enable();
		}
		else {
			$('#addLabel, #editLabel').disable();
			$value = WCF.Language.get('wiki.ircUserOnline.channel.label.placeholder');
		}
		
		$('#labelManagementList').find('span.label').text($value);
	},
	
	/**
	 * Sends an AJAX request to add a new label.
	 */
	_addLabel: function() {
		var $labelName = $('#labelName').val();
		var $cssClassName = $('#labelManagementList input:checked').val();
		
		this._proxy.setOption('data', {
			actionName: 'add',
			className: 'wcf\\data\\irc\\useronline\\channel\\label\\ChannelLabelAction',
			parameters: {
				data: {
					cssClassName: $cssClassName,
					labelName: $labelName
				}
			}
		});
		this._proxy.sendRequest();
		
		// close dialog
		this._dialog.wcfDialog('close');
	}
});