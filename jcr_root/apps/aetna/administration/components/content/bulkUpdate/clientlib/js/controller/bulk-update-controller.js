function BulkUpdateController($scope, $http) {
	var queryProperties = {};
	var confirmationModal = $('#confirmationModal');
	
	$scope.queryBuilderURL = '/crx/de/query.jsp';
	$scope.resultsMsg = 'Results';
	$scope.queryResults = [];
	$scope.selectedNodePaths = [];
	$scope.properties = [];
	$scope.queryInProgress = false;
	$scope.queryDoneCount = 0;
	$scope.proceedButtonClass = '';
	
	/**
	 * Execute query method to perform the call to CQ Query Builder.
	 */
	$scope.executeQuery = function() {
		var queryData = {
			'_charset_' : 'utf-8',
			'type' : 'sql',
			'stmt' : $scope.query,
			'showResults' : true
		};
		
		$scope.queryInProgress = true;
		
		$http({method: 'GET', url: $scope.queryBuilderURL, params: queryData}).
			success(function(data, status, headers, config) {
				$scope.queryResults = data;
				$scope.resultsMsg = 'Results - Total matches: ' + $scope.queryResults.results.length + 
					' - Time: ' + $scope.queryResults.time + 'ms';
				$scope.queryInProgress = false;
			}).
			error(function(data, status, headers, config) {
				console.log(JSON.stringify(data));
				$scope.queryInProgress = false;
			});
	};
	
	/**
	 * Method to select or not all the results.
	 */
	$scope.selectAllResults = function() {
		angular.forEach($scope.queryResults.results, function(result) {
			result.selected = $scope.allResultsSelected;
			console.log(result.selected);
	    });
	};
	
	/**
	 * Method to add new property to the controller.
	 */
	$scope.addProperty = function() {
		$scope.properties.push({property: '', name: ''});
	};
	
	/**
	 * Method to remove a property.
	 */
	$scope.removeProperty = function(index) {
		$scope.properties.splice(index, 1);
	};
	
	/**
	 * Method to prepare the bulk update.
	 */
	$scope.prepareBulkUpdate = function() {
		$scope.queryDoneCount = 0;
		$scope.proceedButtonClass = '';
		$scope.selectedNodePaths = [];
		queryProperties = {};
		
		// Process the selected nodes
		angular.forEach($scope.queryResults.results, function(result) {
			// Check if the result was selected
			if (result.selected) {
				$scope.selectedNodePaths.push({path: result.path, done: false});
			}
		});
		
		// Process the list of properties
		angular.forEach($scope.properties, function(property) {
			queryProperties[property.name] = property.value;
		});
		
		// Check if there is at least one selected node path
		if ($scope.selectedNodePaths.length > 0 && Object.keys(queryProperties).length > 0) {
			confirmationModal.modal('show');
		}
	};
	
	/**
	 * Method to perform the bulk update.
	 */
	$scope.performBulkUpdate = function() {
		$scope.queryDoneCount = 0;
		$scope.proceedButtonClass = 'disabled';
		
		// Process each selected node path
		var indexNode = 0;
		
		var intervalTimer = setInterval(function() {
			if (indexNode < $scope.selectedNodePaths.length) {
				performUpdateRequest($scope.selectedNodePaths[indexNode]);
				indexNode++;
			} else {
				clearInterval(intervalTimer);
			}
		}, 500);
	};
	
	/**
	 * Method to perform the request to update the node with the selected properties.
	 * @param nodePath String with the path of the node to update
	 */
	var performUpdateRequest = function(node) {
		$http({method: 'POST', url: node.path, params: queryProperties}).
			success(function(data, status, headers, config) {
				node.done = true;
				$scope.queryDoneCount++;
			}).
			error(function(data, status, headers, config) {
				console.log(status + ': ' + JSON.stringify(data));
			});
	}
}