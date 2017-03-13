function XmlFormGenerationController($scope) {
	
	$scope.showExcelSheetsIndexes = false;
	$scope.queryInProgress = false;
	
	/**
	 * Code to be executed on page load.
	 */
	$('input[type=file]').bootstrapFileInput();
	
	/**
	 * Method to be executed on change selection of the excel file type.
	 */
	$scope.changeFileType = function() {
		$scope.showExcelSheetsIndexes = $scope.fileType === 'sales-reference';
	}
}