/*
Digitas Javascript Videoplayer Framework (DJSP)
Author : Adam Hilliker | D I G I T A S
Version : 0.9
*/

var DJSPlayer = (function(DJSPSetup)
{
	// Default setup values, you can override these by passing DJSPSetup object above
	var playerSetupValues = {
		videoWidth : 300,
		videoHeight : 534,
		shouldShowControls : true,
		progressIntervals : 4,
		showCaptionsBelowPlayer : false,
		showControlsBelowPlayer : false,
		autoPlay : true,
		autoHideControls : false,
		videoPaths : ['https://thismoment-a.akamaihd.net/video/expressyourthanks2013/f7611617dd8230cc0a24c6128647edac.mp4'],
		divToContainPlayer : 'videoPlayerDiv', // id only
		videoPosterframe : 'https://thismoment-a.akamaihd.net/video/expressyourthanks2013/f7611617dd8230cc0a24c6128647edac.jpg',
		currentCaptionSet : [ { label : "English", SRTpath : "../captions/test-file.en.srt" },
			{ label : "Spanish", SRTpath : "../captions/test-file.es.srt" },
			{ label : "Korean", SRTpath : "../captions/test-file.ko.srt" },
			{ label : "Chinese", SRTpath : "../captions/test-file.zh.srt" } ]
	}

	// static constants
	var VIDEO_EVENT = 'DJSPvideoEvent';
	var CONTROLS_HEIGHT = 39;

	// internal variables
	var videoWidth;
	var videoHeight;
	var videoPosterframe;
	var videoPlayerPath;
	var currentCaptionSet;
	var shouldShowControls;
	var showControlsBelowPlayer;
	var showCaptionsBelowPlayer;
	var myPlayer;
	var videoPlayerDiv;
	var	shouldFireProgressEvent;
	var mustDoIEtweaks;
	var ieVolumeInterval;
	var ieMuteInterval;
	var loadAlreadyComplete;
	var storedVolume;
	var playbackReported;
	var functionsToExecuteLater = new Array();
	var isiPad = navigator.userAgent.match(/iPad/i) != null ? true : false;
	var isKindle =  navigator.userAgent.match(/kindle/i) != null || navigator.userAgent.match(/silk/i) != null ? true : false;
	var isFF = navigator.userAgent.toLowerCase().indexOf('firefox') > -1 ? true : false;
	var isIE;
	var analyticsFlags = {
			1 : false,
			50: false,
			100 : false
	}

	// called when file loads
	var onFrameworkLoaded = function()
	{
		// define setup values
		if(DJSPSetup){ playerSetupValues = DJSPSetup }

		// autohide?
		DJSPGlobal_controlsAutoHide = playerSetupValues.autoHideControls;

		// store values for build
		videoWidth = playerSetupValues.videoWidth;
		videoHeight = playerSetupValues.videoHeight;
		currentCaptionSet = playerSetupValues.currentCaptionSet != undefined ? playerSetupValues.currentCaptionSet : new Array();
		videoPosterframe = playerSetupValues.videoPosterframe;
		videoPlayerDiv = playerSetupValues.divToContainPlayer;
		shouldShowControls = playerSetupValues.shouldShowControls;
		showControlsBelowPlayer = playerSetupValues.showControlsBelowPlayer;
		showCaptionsBelowPlayer = playerSetupValues.showCaptionsBelowPlayer;

		// do pre-markup build setup
		isIE = checkForIE();
		shouldShowControls = decideWhetherToShowControls();
		mustDoIEtweaks = checkForOldIEversions();

		// build markup
		buildMarkup();

		// once markup is built, set up videoJS player
		onFrameworkReady();

		// listen?
		EventBus.addEventListener("DJSPupdatevolume", muteFromVideoJS);
	}

	var muteFromVideoJS = function(event)
	{
		// console.log('event received from video.js');
		forceVolumeAdjustmentFeedbackInIE();
	}

	var decideWhetherToShowControls = function()
	{
		var tempShouldShowControls = shouldShowControls;

		// TODO: if it's a hirez phone like galaxy S III, override setting and don't show controls

		return tempShouldShowControls;
	}

	var buildMarkup = function()
	{
		// start embed tag
		var controlsString = shouldShowControls == true ? 'controls ' : ' ';
		var posterFrameString = videoPosterframe != undefined  ? ' poster="' + videoPosterframe + '"' : '';
		var videoEmbedString = '<video tabindex="0" id="DJSPvideoPlayerDiv' + videoPlayerDiv + '" class="video-js vjs-default-skin vjs-djsp-skin"' + controlsString + 'preload="auto" width="' + videoWidth + '" height="' + videoHeight + '"' + posterFrameString + '>';

		// add track tags for transcripts
		for (var i = 0; i < currentCaptionSet.length; i++){
			var currTrackSource = currentCaptionSet[i].SRTpath;
			var currTrackLabel = currentCaptionSet[i].label;
			var currTrackMarkup = '<track kind="captions" src="' + currTrackSource + '" srclang="en" label="' + currTrackLabel + '"></track>';
			videoEmbedString += currTrackMarkup;
		}

		// add chapters
		if(1==0)
		{
			videoEmbedString += '<track kind="chapters" src="../chapters/testChapters.vtt" srclang="en" default="default">';
		}

		// close tag and apply markup
		videoEmbedString += '</video>';

		$('#'+videoPlayerDiv).html(videoEmbedString);

		if(showControlsBelowPlayer)
		{
			// add space below player for controls
			$('#'+videoPlayerDiv).append('<div id="djsp-controls-spacer"/>');
		}
	}

	// called after file has loaded and markup has been built
	var onFrameworkReady = function()
	{
		// reset playback var
		playbackReported = false;

		// set player reference
		myPlayer = _V_('DJSPvideoPlayerDiv' + videoPlayerDiv, null, null);

		// set initial video values
		setVideoSource(playerSetupValues.videoPaths);

		// setup events
		addEvents();

		// if any CSS needs to change, do it here
		setCSSoverrides();

		// add custom tabbing functionality
		addKeyboardControlTweaks();

		// do delayed IE tweaks
		doIEhacks();

		// dispatch player loaded and ready event; wait a millisecond so it's not doing it
		// on top of other events (eventBus limitation)
		window.setTimeout(eventCaptured, 1, 'playerloaded', 'PLAYER_FULLY_LOADED');

		// play if autoplay is enabled
		if(playerSetupValues.autoPlay)
		{
			// delaying to ensure proper order of operations
			window.setTimeout(doAutoplay, 1);
		}
	}

	var doAutoplay = function()
	{
		// wrapping in a function to solve scope issues with setTimeout
		myPlayer.play();
	}

	var doIEhacks = function()
	{
		for( var i=0; i < functionsToExecuteLater.length; i++ )
		{
			var currExe = functionsToExecuteLater[i];
			
			window.setTimeout(currExe, 800);
		}

		forceVolumeAdjustmentFeedbackInIE();
	}

	var showControls = function()
	{
		if(shouldShowControls && playerSetupValues.autoHideControls == true)
		{
			$('#' + videoPlayerDiv + ' .vjs-controls').addClass('vjs-fade-in');
			$('#' + videoPlayerDiv + ' .vjs-controls').removeClass('vjs-fade-out');
		}
	}

	var hideControls = function()
	{
		if(shouldShowControls && playerSetupValues.autoHideControls == true)
		{
			$('#' + videoPlayerDiv + ' .vjs-controls').removeClass('vjs-fade-in');
			$('#' + videoPlayerDiv + ' .vjs-controls').addClass('vjs-fade-out');
		}
	}

	var setVideoSource = function(pInitVideoPaths)
	{
		// this accepts an array of video paths,
		// and sets the source objects for the videojs 'src()' call dynamically
		var videoObjects = new Array();
		for(var i=0; i < pInitVideoPaths.length; i++)
		{
			var currPath = pInitVideoPaths[i];
			var currExtension = currPath.split('.').pop();
			var currObject = { type: "video/" + currExtension, src: currPath };
			videoObjects.push(currObject);
		}

		myPlayer.src(videoObjects);
	}

	var setVolume = function(pNewVolume)
	{
		// pass as decimal value 0.0 - 1.0
		myPlayer.volume(pNewVolume);
	}

	var toggleMute = function(event)
	{
		// make sure it was "ENTER" that was pressed if this was done by keypress
		if(event.keyCode != 13)
		{
			return;
		}

		// store volume if it's not already muted
		if(myPlayer.volume() > 0)
		{
			storedVolume = myPlayer.volume();
			myPlayer.volume(0);
		}
		else
		{
			var oldVolume = storedVolume ? storedVolume : 1;
			myPlayer.volume(oldVolume);
		}
		forceVolumeAdjustmentFeedbackInIE();
	}

	var onMuteButtonUp = function()
	{
		// this was made because IE does weird elements
		ieMuteInterval = setInterval(forceVolumeAdjustmentFeedbackInIE,200);
	}

	var playNewVideo = function( pVideoPaths, pVideoPosterframe, pCaptionPaths )
	{
		// store new values
		currentCaptionSet = pCaptionPaths ? pCaptionPaths : new Array();
		videoPosterframe = pVideoPosterframe;
		playerSetupValues.videoPaths = pVideoPaths;

		// kill old player
		$('#'+videoPlayerDiv + ' #DJSPvideoPlayerDiv' + videoPlayerDiv).remove();
		_V_.players = {};

		// rebuild markup with new caption paths
		buildMarkup();

		// reset player when it's ready
		myPlayer.ready(function() {
			onFrameworkReady();
	    });
	}

	// returns playhead time
	var getProgress = function()
	{
		var myCurrentTime = myPlayer.currentTime();
		eventProgressVideo(myCurrentTime);
		return myCurrentTime;
	}

	// returns percent of video played
	var getPercentPlayed = function()
	{
		var percentage = (myPlayer.currentTime()*100)/myPlayer.duration();
		eventPercentageVideo(percentage);
		return percentage;
	}

	var play = function()
	{
		myPlayer.play();
	}

	var pause = function()
	{
		myPlayer.pause();
	}

	var stop = function()
	{
		myPlayer.pause();
		myPlayer.currentTime(0);
		myPlayer.posterImage.show();
		$(".vjs-big-play-button").show();
		
		// reset the flags
		resetAnalyticFlags();
	}

	// returns percentage of video played back
	var onTimeUpdate = function()
	{
		// called "every frame" to define when to send percentage progress events.
		// TODO: This could be improved by defining specific intervals that a timeout is called
		// that might be more efficient: requires research
		var percentage = (myPlayer.currentTime()*100)/myPlayer.duration();
		var moduloThing = percentage%(100/playerSetupValues.progressIntervals);
		if((percentage > 1) && moduloThing < 1){
			if(shouldFireProgressEvent)
			{
				eventProgressVideo(Math.floor(percentage));
				shouldFireProgressEvent = false;				
			}
		}

		shouldFireProgressEvent = moduloThing > 1 ? true : false;

		// dispatch when playing begins
		if( !playbackReported )
		{
			if(myPlayer.currentTime() > 0)
			{
				playbackReported = true;
				eventCaptured('playing','PLAYBACK_STARTED');
			}
		}
		
		if (percentage > 99) {
			// reset the flags
			resetAnalyticFlags();
		} else {
			if (percentage > 0 && percentage < 5 && !analyticsFlags['1']) {
				Aetna.analytics.omniture.linkCode('aeVideoA',DJSPSetup.videoName,this);
				s.tl(this,'o',linkText);
				analyticsFlags['1'] = true;
			} else if (percentage >= 50 && percentage < 55 && !analyticsFlags['50']) {
				Aetna.analytics.omniture.linkCode('aeVideoB',DJSPSetup.videoName,this);
				s.tl(this,'o',linkText);
				analyticsFlags['50'] = true;
			} else if (percentage >= 98 && percentage <= 99 && !analyticsFlags['100']) {
				Aetna.analytics.omniture.linkCode('aeVideoC',DJSPSetup.videoName,this);
				s.tl(this,'o',linkText);
				analyticsFlags['100'] = true;
			}
		}
	}

	var resetAnalyticFlags = function() {
		analyticsFlags['1'] = false;
		analyticsFlags['50'] = false;
		analyticsFlags['100'] = false;
	}
	
	var addEvents = function()
	{
		myPlayer.addEvent("ended", eventEndVideo);
		myPlayer.addEvent("loadstart", eventVideoLoadStarted);
		myPlayer.addEvent("loadedalldata", eventVideoLoadComplete);
		myPlayer.addEvent("play", eventPlayVideo);
		myPlayer.addEvent("pause", eventPauseVideo);
		myPlayer.addEvent("error", eventVideoError);
		myPlayer.addEvent("fullscreenchange", onFullscreenChange);
		myPlayer.addEvent("timeupdate", onTimeUpdate);
		myPlayer.addEvent("volumechange", onVolumeChange);
	}

	var setCSSoverrides = function()
	{
		if(isKindle)
		{
			// hide tiny useless controls
			$('.vjs-controls').hide();
			// make entire video clickable to play
			$('#DJSPvideoPlayerDiv' + videoPlayerDiv).prepend('<div tabindex="0" class="vjs-kindle-clicker" id="vjs-ipad-clicker" style="width:' + videoWidth + 'px; height:' + videoHeight + 'px"></div>');
			$('#' + videoPlayerDiv).delegate('.vjs-kindle-clicker', 'click', onIpadVideoClick);
		}

		// if it's an ipad, hide the volume stuff
		if(isiPad)
		{
			// hide volume controls because apple doesn't allow volume adjustment from within a browser:
			$('.vjs-mute-control').addClass('hideVolumeControlsOniPad');
			$('.vjs-volume-control').addClass('hideVolumeControlsOniPad');

			// add a button on top of the videoplayer that toggles play/pause
			$('#DJSPvideoPlayerDiv' + videoPlayerDiv).prepend('<div tabindex="0" class="vjs-ipad-clicker" id="vjs-ipad-clicker" style="width:' + videoWidth + 'px; height:' + (videoHeight - CONTROLS_HEIGHT) + 'px"></div>');
			$('body').delegate('.vjs-ipad-clicker', 'click', onIpadVideoClick);

			// hide ipad thing on menu interact
			$('body').delegate('.vjs-menu-button', 'click', hideIpadThing);
			$('body').delegate('.vjs-menu-button', 'mouseover', hideIpadThing);
			$('body').delegate('.vjs-menu-item', 'click', showIpadThing);
			$('body').delegate('.vjs-menu-item', 'mouseover', showIpadThing);

			// show ipad thing the rest of the time
			$('body').delegate('.vjs-play-control', 'click', showIpadThing);
			$('body').delegate('.vjs-play-control', 'mouseover', showIpadThing);
			$('body').delegate('.vjs-fullscreen-control', 'click', showIpadThing);
			$('body').delegate('.vjs-fullscreen-control', 'mouseover', showIpadThing);
			$('body').delegate('.vjs-progress-control', 'click', showIpadThing);
			$('body').delegate('.vjs-progress-control', 'mouseover', showIpadThing);
		}

		// show or hide controls on keyboard tab to or away from the player div
		$('body').delegate('#'+videoPlayerDiv, 'focus', showControls);
		$('body').delegate('#'+videoPlayerDiv, 'blur', hideControls);
		$('body').delegate('.vjs-mute-control', 'mouseup', onMuteButtonUp);
		$('body').delegate('.vjs-mute-control', 'keypress', toggleMute);

		// set location of transcripts
		if(mustDoIEtweaks)
		{
			functionsToExecuteLater.push(doCaptionsPlacement);

			$('body').delegate('#' + videoPlayerDiv + ' .vjs-volume-handle', 'mousedown', onVolumeTweakInIE);
			$('body').delegate('#' + videoPlayerDiv, 'mouseup', onVolumeTweakInIEDone);
		}
		else
		{
			doCaptionsPlacement();
		}

		// set location of controls
		if(mustDoIEtweaks)
		{
			functionsToExecuteLater.push(doControlsPlacement);
		}
		else
		{
			doControlsPlacement();
		}

		// ipad registers first click of FS button as rollover, this is the fix
		$('body').delegate('.vjs-fullscreen-control', 'click touchend', doIpadFullscreen);

		// fun with ADA
		if(mustDoIEtweaks)
		{
			functionsToExecuteLater.push(doADAtweaks);
		}
		else
		{
			doADAtweaks();
		}

		// remove the fullscreen button.
		// hideFullscreenButton();
		// functionsToExecuteLater.push(hideFullscreenButton);
	}

	var doIpadFullscreen = function()
	{
		if(isiPad)
		{
			myPlayer.requestFullScreen();
		}
	}

	var doADAtweaks = function()
	{

		// add name to big button
		$('.vjs-big-play-button').attr('aria-label','Play');

		// slider labels
		$('.vjs-progress-holder').attr('aria-label','Progress');
		$('.vjs-volume-bar').attr('aria-label','Volume');

		// language button stuff
		for(var i=0;i<$('.vjs-captions-button li').length;i++)
		{
			var currMenuButton = $('.vjs-captions-button li')[i];
			var currLabel = $(currMenuButton).text();
			if(currLabel == "Off")
			{
				// add label for screen readers
				$(currMenuButton).attr('aria-label', 'Captions Off');
			}
			else if(currLabel == "Captions")
			{
				// remove screen reader function on header
				$(currMenuButton).removeAttr('role');
				$(currMenuButton).removeAttr('aria-label');
			}
			else
			{
				// more explicit button descriptions for language buttons
				$(currMenuButton).attr('aria-label', currLabel + ' Captions');
			}
			$(currMenuButton).attr('role', 'button');
			// add function to hide menu when you select something
			$('body').delegate('.vjs-captions-button li', 'click', hideCaptionsMenu);
		}

		// keyboard help
		augmentKeyControl();

		doCaptionsADAVooDoo();
	}

	var doCaptionsADAVooDoo = function()
	{
		// hide captions button from screen reader
		$('#' + videoPlayerDiv + ' .vjs-captions-button').removeAttr('role');
		$('#' + videoPlayerDiv + ' .vjs-captions-button').attr('tabindex','-1');

		// add invisible button to activate captions (add it before captions)
		var captionsButtonHTML = '<div id="ADACaptionsButton" tabindex="0" role="button" aria-label="Captions"';
		captionsButtonHTML += '></div>';
		$('#' + videoPlayerDiv + ' .vjs-captions-button').before(captionsButtonHTML);
		$('body').delegate('#' + videoPlayerDiv + ' #ADACaptionsButton', 'focus', showCaptionsMenu);
		$('body').delegate('#' + videoPlayerDiv + ' #ADACaptionsButton', 'keypress', toggleCaptionsMenu);
	}

	var showCaptionsMenu = function(event)
	{
		$('#' + videoPlayerDiv + ' .vjs-captions-button .vjs-menu').show();
	}

	var hideCaptionsMenu = function(event)
	{
		$('#' + videoPlayerDiv + ' .vjs-captions-button .vjs-menu').hide();
	}

	var toggleCaptionsMenu = function(event)
	{
		// make sure it was "ENTER" that was pressed if this was done by keypress
		if(event.keyCode != 13)
		{
			return;
		}

		if($('#' + videoPlayerDiv + ' .vjs-captions-button .vjs-menu').css('display') == 'block')
		{
			$('#' + videoPlayerDiv + ' .vjs-captions-button .vjs-menu').hide();
		}
		else
		{
			$('#' + videoPlayerDiv + ' .vjs-captions-button .vjs-menu').show();			
		}
	}

	var augmentKeyControl = function()
	{
		$('#DJSPvideoPlayerDiv' + videoPlayerDiv).keydown(function(event){
			// console.log('focused element: ' + document.activeElement.className);
			switch( document.activeElement.className )
			{
				case 'vjs-progress-holder':
					if(event.keyCode == 39)
					{
						doFlashFastForward();
					}

				case 'vjs-volume-bar':
					forceVolumeAdjustmentFeedbackInIE();
			}
 		});
	}

	var doFlashFastForward = function()
	{
		var currPlayheadTime = myPlayer.currentTime();
		var newTime = currPlayheadTime + 7;
		myPlayer.currentTime(newTime);
	}

	var onVolumeTweakInIE = function()
	{
		ieVolumeInterval = setInterval(forceVolumeAdjustmentFeedbackInIE,50);
	}

	var onVolumeTweakInIEDone = function()
	{
		clearInterval(ieVolumeInterval);
	}

	var forceVolumeAdjustmentFeedbackInIE = function(event)
	{
		clearInterval(ieMuteInterval);

		if(checkForIE())
		{
			// console.log('forcing volume visual feedback in IE: ' + myPlayer.volume());
			// based on width of vjs-volume-bar
			var newX = myPlayer.volume() * $('#' + videoPlayerDiv + ' .vjs-volume-bar').width();
			// set width of indicator vjs-volume-level
			$('#' + videoPlayerDiv + ' .vjs-volume-level').css('width',newX);
			// set position of handle vjs-volume-handle, 80% max
			var handleX = ((80/100) * newX) * 2;
			$('#' + videoPlayerDiv + ' .vjs-volume-handle').css('left',handleX + '%');
			
			// set mute icon
			clearMuteVolumeClasses();
			if(myPlayer.volume() > 0)
			{
				$('#' + videoPlayerDiv + ' .vjs-mute-control').addClass('vjs-vol-1');
			}
			else
			{
				$('#' + videoPlayerDiv + ' .vjs-mute-control').addClass('vjs-vol-0');				
			}
		}
	}

	var clearMuteVolumeClasses = function()
	{
		$('#' + videoPlayerDiv + ' .vjs-mute-control').removeClass('vjs-vol-0');
		$('#' + videoPlayerDiv + ' .vjs-mute-control').removeClass('vjs-vol-1');
		$('#' + videoPlayerDiv + ' .vjs-mute-control').removeClass('vjs-vol-2');
		$('#' + videoPlayerDiv + ' .vjs-mute-control').removeClass('vjs-vol-3');
	}

	// var hideMuteButton = function()
	// {
	// 	console.log('hide mute button');
	// 	$('.vjs-mute-control').addClass('hideVolumeControlsOniPad');
	// }

	var hideFullscreenButton = function()
	{
		$('#' + videoPlayerDiv + ' .vjs-fullscreen-control').addClass('hideVolumeControlsOniPad');
		$('#' + videoPlayerDiv + ' .vjs-fullscreen-control').hide();
		$('#' + videoPlayerDiv + ' .vjs-volume-control').css('padding-right', '10px');
	}

	var hideIpadThing = function()
	{
		$('#' + videoPlayerDiv + ' .vjs-ipad-clicker').hide();
	}

	var showIpadThing = function()
	{
		$('#' + videoPlayerDiv + ' .vjs-ipad-clicker').show();
	}

	var onIpadVideoClick = function(event)
	{
		// toggle playback
		if(myPlayer.paused())
		{
			myPlayer.play();
		}
		else
		{
			myPlayer.pause();
		}

	}

	var doControlsPlacement = function()
	{
		if(showControlsBelowPlayer)
		{
			$('#' + videoPlayerDiv + ' .vjs-controls').css('bottom','-' + CONTROLS_HEIGHT + 'px');
		}
		else
		{
			$('#' + videoPlayerDiv + ' .vjs-controls').css('bottom','0px');
		}
	}

	var doControlsPlacementUp = function()
	{
		$('#' + videoPlayerDiv + ' .vjs-controls').css('bottom','0px');		
	}

	var doCaptionsPlacement = function()
	{
		var captionPosition = 0;
		var captionPadding = 8;
		if(showCaptionsBelowPlayer)
		{
			if(showControlsBelowPlayer)
			{
				captionPosition = videoHeight + captionPadding + CONTROLS_HEIGHT;
			}
			else
			{
				captionPosition = videoHeight + captionPadding;
			}

			// align captions to the top
			$('#' + videoPlayerDiv + ' .vjs-text-track-display').css('top',captionPosition + 'px');
		}
		else
		{
			if(showControlsBelowPlayer)
			{
				captionPosition = captionPadding;
			}
			else
			{
				captionPosition = CONTROLS_HEIGHT + captionPadding;
			}

			// align captions to the bottom
			$('#' + videoPlayerDiv + ' .vjs-text-track-display').css('bottom',captionPosition + 'px');
		}
	}

	var addKeyboardControlTweaks = function()
	{
		// IE crap
		if(mustDoIEtweaks)
		{
			functionsToExecuteLater.push(doKeyboardControlTweaks);
		}
		else
		{
			doKeyboardControlTweaks();
		}
	}

	var doKeyboardControlTweaks = function()
	{
		// if any of the controls gain focus, that means you should hide the CC menu or Transcripts menu
		$('.vjs-play-control, .vjs-mute-control, .vjs-volume-bar, .vjs-fullscreen-control').focus(function() {
  			$('.vjs-menu').hide();
		});

		// if the player loses focus, hide the menus
		$('#DJSPvideoPlayerDiv' + videoPlayerDiv).blur(function() {
  			$('.vjs-menu').hide();
		});

		// if the captions menu is selected, hide the chapters menu
		$('.vjs-captions-button, .vjs-captions-button .vjs-menu-item').focus(function(){
			$('.vjs-chapters-button .vjs-menu').hide();
		});

		// vice versa
		$('.vjs-chapters-button, .vjs-chapters-button .vjs-menu-item').focus(function(){
			$('.vjs-captions-button .vjs-menu').hide();
		});
	}

	var getDuration = function()
	{
		return myPlayer.duration();
	}

	var onVolumeChange = function(data)
	{
		// console.log('volumechange!!  Muted: ' + data.currentTarget.muted + ', volume value: ' + data.currentTarget.volume);
		var muteString = 'mute:' + data.currentTarget.muted;
		var volString = 'volume:' + data.currentTarget.volume;
		eventCaptured( muteString, volString );
		forceVolumeAdjustmentFeedbackInIE();
	}

	var eventPauseVideo = function()
	{
		eventCaptured('Pause','PAUSE');
	}

	var eventPlayVideo = function()
	{
		eventCaptured('Play','PLAY');
	}

	var eventChangeVolume = function(percent)
	{
		eventCaptured('ChangeVolume',percent);
	}

	var eventEndVideo = function()
	{
		eventCaptured('End','END');
	}

	var eventVideoError = function(error)
	{
		eventCaptured('Error',error);
		
		if (console) {
			console.log(error);
		}
	}

	var onFullscreenChange = function(Event)
	{
		if (console) {
			console.log('fullscreenchange:');
			console.log(Event);
		}

		// adjust controls positioning if they may potentially be invisible
		// due to being positioned below the player at full screen and 
		// therefore off the screen
		var returnValue = false;
		if(shouldShowControls)
		{
			if(showControlsBelowPlayer)
			{
				if(myPlayer.isFullScreen)
				{
					// move controls UP
					doControlsPlacementUp();
					returnValue = true;
				}
				else
				{
					// move controls DOWN!
					doControlsPlacement();
				}
			}
		}

		

		// dispatch event returning boolean
		eventCaptured('FullscreenChange', returnValue);
	}

	var eventProgressVideo = function(playheadTime)
	{
		eventCaptured('eventProgressVideo',playheadTime);
	}

	var eventPercentageVideo = function(percent)
	{
		eventCaptured('eventPercentageVideo',percent);
	}

	var eventVideoLoadComplete = function()
	{
		// TODO: for some reason it is dispatching this event like crazy.  Thus, this hack.
		if(!loadAlreadyComplete)
		{
			eventCaptured('loadedalldata','VIDEO_LOAD_COMPLETE');
			loadAlreadyComplete = true;
		}
	}

	var eventVideoLoadStarted = function()
	{
		loadAlreadyComplete = false;
		eventCaptured('loadStart','VIDEO_LOAD_STARTED');

		// do IE resize tweaks again in case it didn't work last time due to elements not being loaded
		doIEhacks();
	}

	var eventCaptured = function(eventName, eventValue)
	{
		EventBus.dispatch( DJSPlayer.VIDEO_EVENT, this, eventName, eventValue, videoPlayerDiv );
	}

	var checkForIE = function()
	{
		return navigator.userAgent.indexOf('MSIE') > -1;
	}

	var checkForOldIEversions = function()
	{
		var isOldIE = false;
		
		if (checkForIE()) {
			var userAgentDivision = navigator.userAgent.split('MSIE ');
			var browserVersion = userAgentDivision[1].substring(0, userAgentDivision[1].indexOf('.'));
			
			isOldIE = parseInt(browserVersion) < 9;
		}
		
		return isOldIE;
	}

	// call onLoaded
	onFrameworkLoaded();
	
	//return object with public methods
	return{
		playNewVideo : playNewVideo,
		play : play,
		pause : pause,
		stop : stop,
		getProgress : getProgress,
		getPercentPlayed : getPercentPlayed,
		setVolume : setVolume,
		toggleMute : toggleMute,
		VIDEO_EVENT : VIDEO_EVENT,
		getDuration : getDuration
	}

});