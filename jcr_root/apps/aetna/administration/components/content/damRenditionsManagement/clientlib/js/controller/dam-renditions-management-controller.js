function DamRenditionsManagementController($scope, $http) {
	var confirmationModal = $('#confirmationModal');
	
	$scope.queryBuilderURL = '/crx/de/query.jsp';
	$scope.resultsMsg = 'Results';
	$scope.queryResults = [];
	$scope.selectedNodePaths = [];
	$scope.queryInProgress = false;
	$scope.queryDoneCount = 0;
	$scope.proceedButtonClass = '';
	
	/**
	 * Method to execute the query generation method.
	 */
	$scope.executeQueryGeneration = function() {
		var queryPath = $('#search-pathfield').val();
		
		// Check if the path ends with an slash
		if (queryPath[queryPath.length - 1] !== '/') {
			queryPath += '/';
		}
		
		$scope.query = 'select * from nt:base where jcr:path like \'' 
			+ queryPath + '%/renditions/%\'';
		
		// Check if the there are conditions to add
		if ($scope.conditions != null && $scope.conditions != '') {
			$scope.query += ' and ' + $scope.conditions;
		}
	};
	
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
				var filteredResults = [];
				
				angular.forEach(data.results, function(result) {
					if (result.path.indexOf('original') === -1 && 
						!endsWith(result.path, 'jcr:content')) {
						filteredResults.push(result);
					}
			    });
				
				$scope.queryResults = data;
				$scope.queryResults.results = filteredResults;
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
	    });
	};
	
	/**
	 * Method to prepare the renditions deletion.
	 */
	$scope.prepareRenditionsDeletion = function() {
		$scope.queryDoneCount = 0;
		$scope.proceedButtonClass = '';
		$scope.selectedNodePaths = [];
		
		// Process the selected nodes
		angular.forEach($scope.queryResults.results, function(result) {
			// Check if the result was selected
			if (result.selected) {
				$scope.selectedNodePaths.push({path: result.path, done: false});
			}
		});
		
		// Check if there is at least one selected node path
		if ($scope.selectedNodePaths.length > 0) {
			confirmationModal.modal('show');
		}
	};
	
	/**
	 * Method to perform the renditions deletion.
	 */
	$scope.performRenditionsDeletion = function() {
		$scope.queryDoneCount = 0;
		$scope.proceedButtonClass = 'disabled';
		
		// Process each selected node path
		var indexNode = 0;
		
		var intervalTimer = setInterval(function() {
			if (indexNode < $scope.selectedNodePaths.length) {
				performRenditionDeletionRequest($scope.selectedNodePaths[indexNode]);
				indexNode++;
			} else {
				clearInterval(intervalTimer);
			}
		}, 500);
	};
	
	/**
	 * Method to perform the request to delete the given node.
	 * @param nodePath String with the path of the node to update
	 */
	var performRenditionDeletionRequest = function(node) {
		$http({method: 'DELETE', url: node.path}).
			success(function(data, status, headers, config) {
				node.done = true;
				$scope.queryDoneCount++;
			}).
			error(function(data, status, headers, config) {
				console.log(status + ': ' + JSON.stringify(data));
			});
	}
	
	/**
	 * Method to check if a string ends with a given suffix.
	 * @param string String with the suffix to verify
	 * @param suffix String with the suffix to check in the string
	 * @return Boolean with the result of the operation
	 */
	var endsWith = function(string, suffix) {
		return string.indexOf(suffix, string.length - suffix.length) !== -1;
	}
}