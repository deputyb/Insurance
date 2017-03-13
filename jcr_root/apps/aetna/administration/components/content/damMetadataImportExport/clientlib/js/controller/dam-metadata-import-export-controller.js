function DamMetadataImportExportController($scope, $http) {
	var confirmationModal = $('#confirmationModal');
	
	$scope.queryInProgress = false;
	$scope.displayExportResults = false;
	$scope.panelsDisplay = {
		'import': false,
		'export': false
	}
	$scope.exportConfig = {
			path: '',
			exportType: ''
	}
	$scope.assets = [];

	/**
	 * Method to make the ajax call to backend to export the assets metadata.
	 */
	$scope.executeExport = function() {	
		if ($scope.exportConfig.exportType == 'json') {
			$scope.queryInProgress = true;
			
			$http({method: 'GET', url: $scope.apiEndpointList, params: $scope.exportConfig}).
				success(function(data, status, headers, config) {
					$scope.assets = data;
					$scope.displayExportResults = ($scope.exportConfig.exportType == 'json');
					$scope.queryInProgress = false;
	            }).
	            error(function(data, status, headers, config) {
	                console.log(JSON.stringify(data));
	                $scope.queryInProgress = false;
	            });
		} else {
			window.location = $scope.apiEndpointList + '?path=' + $scope.exportConfig.path + 
				'&exportType=' + $scope.exportConfig.exportType;
		}
	};
	
	/**
	 * Method to change the panel to display
	 */
	$scope.changePanelDisplay = function(operation) {
		$scope.panelsDisplay['import'] = (operation == 'import'); 
		$scope.panelsDisplay['export'] = !$scope.panelsDisplay['import'];
	};
	
}