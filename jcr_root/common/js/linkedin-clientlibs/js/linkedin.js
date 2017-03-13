/**
 * Aetna LinkedIn API connection
 */
Aetna.LinkedIn = Aetna.LinkedIn || {	
	/**
	 * Runs when the JavaScript framework is loaded
	 */
    onLinkedInLoad : function() {
    	$('.sidebar-linkedin-feed .feed-not-available-msg').addClass('hidden');
		IN.Event.on(IN, "auth", Aetna.LinkedIn.onLinkedInAuth);
	},

    /**
     * Runs when the viewer has authenticated
     */
    onLinkedInAuth : function() {
        IN.API.Raw("/companies/" + Aetna.LinkedIn.linkedInAccount + "/updates?event-type=status-update&start=0&count=1")
            .result(function(feedInfo) {
                Aetna.LinkedIn.loadFeed(feedInfo);
            })
            .error(function(error) {
            	$('.sidebar-linkedin-feed .feed-not-available-msg').removeClass('hidden');
            });
    },

	/**
	 * Runs when the API call returns successfully
	 */ 
    loadFeed : function(feedInfo) {
		if (feedInfo.values.length > 0) {
			var updateInfo = feedInfo.values[0].updateContent.companyStatusUpdate.share;
			var updatesWrapper = $('.linked-in-updates-wrapper');
			
			$('.sidebar-linkedin-feed .feed-not-available-msg').addClass('hidden');
			
			// Check the type of post
			if (updateInfo.content.title != '') {
				// Set the values of the update 
				$('.title a', updatesWrapper).attr('href', updateInfo.content.submittedUrl).text(updateInfo.content.title);
				$('.body p', updatesWrapper).text(updateInfo.content.description);
				
				if (updateInfo.content.submittedImageUrl && updateInfo.content.submittedImageUrl != '') {
					$('.thumbnail-image a', updatesWrapper).attr('href', updateInfo.content.submittedUrl);
					$('.thumbnail-image img', updatesWrapper).attr('src', updateInfo.content.submittedImageUrl);
				} else {
					$('.thumbnail-image', updatesWrapper).remove();
					$('.title', updatesWrapper).removeClass('title');
				}
			} else {
				var urls = [];
				var postDescription = updateInfo.comment;
				
				$('.header-wrapper', updatesWrapper).remove();
				
				// Get the URLs from the comment and replace them with anchors
				urls = postDescription.match(/(((ftp|https?):\/\/)[\-\w@:%_\+.~#?,&\/\/=]+)|((mailto:)?[_.\w-]+@([\w][\w\-]+\.)+[a-zA-Z]{2,3})/g);
				
				for (var indexUrl = 0; indexUrl < urls.length; indexUrl++) {
					postDescription = postDescription.replace(urls[indexUrl], 
							'<a href="' + urls[indexUrl] + '" target="_blank">' 
								+ urls[indexUrl] + '</a>');
				}
				
				$('.body p', updatesWrapper).html(postDescription);
			}
			
			// Set the likes and comments
			$('.like-link .likes-qty', updatesWrapper).text(feedInfo.values[0].numLikes);
			$('.comment-link .comments-qty', updatesWrapper).text(feedInfo.values[0].updateComments._total);
			$('.date-link a', updatesWrapper).text(Aetna.LinkedIn.displayTimeElapsedDate(new Date(feedInfo.values[0].timestamp)));
			$('.linked-in-updates-wrapper').removeClass('hidden');
		}
	},

	/**
	 * Method to format the time elapsed property
	 */ 
    displayTimeElapsedDate : function(updateDate) {
		// Time difference
	    var timeDiff = new Date() - updateDate;

	    // strip the miliseconds
	    timeDiff /= 1000;

	    // get seconds
	    var seconds = Math.round(timeDiff % 60);
	    timeDiff = Math.floor(timeDiff / 60);

	    // get minutes
	    var minutes = Math.round(timeDiff % 60);
	    timeDiff = Math.floor(timeDiff / 60);

	    // get hours
	    var hours = Math.round(timeDiff % 24);
	    timeDiff = Math.floor(timeDiff / 24);

	    // the rest of timeDiff is number of days
	    var days = timeDiff;
	    
	    // Check which time elapsed to return
	    if (days > 0) {
	    	return days + ' day' + ((days > 1) ? 's' : '') + ' ago';
	    } else if (hours > 0) {
	    	return hours + ' hour' + ((hours > 1) ? 's' : '') + ' ago';
	    } else if (minutes > 0) {
	    	return minutes + ' minute' + ((minutes > 1) ? 's' : '') + ' ago';
	    } else if (seconds > 0) {
	    	return seconds + ' second' + ((seconds > 1) ? 's' : '') + ' ago';
	    }
	}
};