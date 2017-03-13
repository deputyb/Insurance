function UsersNotificationsAdminController($scope, $http) {
	var queryProperties = {};
	var confirmationModal = $('#confirmationModal');
	
	$scope.queryInProgress = false;
	$scope.showAddConfigurationPanel = false;
	$scope.selectedConfiguration = {
		id : '',
		title : '',
		path : [{ path: '' }],
		titles : [{ title: '' }],
		emailSender: '',
		emailSubject: '',
		emailBody: '',
		emailAddresses : [{ address: '' }]
	};
	$scope.configurations = [];
    $scope.formGuid = null;
    $scope.generatedFormGuid = null;

	/**
	 * Method to make the ajax call to backend to get the stored configurations.
	 */
	var getStoredConfigurations = function() {
        $scope.$watch('apiEndpointList', function () {
			$http({method: 'GET', url: $scope.apiEndpointList}).
				success(function(data, status, headers, config) {
                    // Process the result
                    angular.forEach(data, function(value, key) {
                        if (key.indexOf('config-') > -1) {
                            var newConfig = {
                        		id : key,
                        		title: data[key].title,
                        		path : [],
                        		titles : [],
                        		emailSender: data[key].emailSender,
                        		emailSubject: data[key].emailSubject,
                        		emailBody: data[key].emailBody,
                        		emailAddresses : []
                        	};
                            
                            // check if it is multiple path, old version values were saved as single path
                        	if (data[key].path instanceof Array) {
                                angular.forEach(data[key].path, function(pathValue) {
                                    newConfig.path.push({path: pathValue});
                                    // commented as page titles are not required to be shown now
                                    //getConfigurationPageTitle (newConfig, pathValue);
                                });                        		
                            } else {
                            	newConfig.path.push({path: data[key].path});
                            	getConfigurationPageTitle (newConfig, data[key].path);
                            }

                            
                            angular.forEach(data[key].emailAddresses, function(emailAddress) {
                                newConfig.emailAddresses.push({address: emailAddress});
                            });
                            
                            $scope.configurations.push(newConfig);
                        }
                    });
                }).
                error(function(data, status, headers, config) {
                    console.log(JSON.stringify(data));
                });
        });
	};
	
	/**
	 * Method to make the ajax call and get page title from path.
	 */
	var getConfigurationPageTitle = function(configUpdate, path) {
			$http({method: 'GET', url: path + '/jcr:content/jcr:title'}).
				success(function(data, status, headers, config) {
                    // Process the result
					configUpdate.titles.push({title: data});
                }).
                error(function(data, status, headers, config) {
                	configUpdate.titles.push({title: 'Not Found'});
                });
	};	
	
	/**
	 * Method to show the Add configuration panel.
	 */
	$scope.addConfiguration = function() {
		$scope.selectedConfiguration = {
			id : '',
			title: '',
			path : [{ path: '' }],
			emailSender: '',
			emailSubject: '',
			emailBody: '',
			emailAddresses : [{ address: '' }]
		};
		$scope.formGuid = $scope.generatedFormGuid;
		$scope.showAddConfigurationPanel = true;
	}
	
	
	/**
	 * Method to add new property to the controller.
	 */
	$scope.addPath = function() {
		$scope.selectedConfiguration.path.push({ path : '' });
	};
	
	/**
	 * Method to remove a path
	 */
	$scope.removePath = function(index) {
		$scope.selectedConfiguration.path.splice(index, 1);
	};
	
	/**
	 * Method to add new property to the controller.
	 */
	$scope.addEmailAddress = function() {
		$scope.selectedConfiguration.emailAddresses.push({ adddress : '' });
	};
	
	/**
	 * Method to remove an email address.
	 */
	$scope.removeEmailAddress = function(index) {
		$scope.selectedConfiguration.emailAddresses.splice(index, 1);
	};
	
	/**
	 * Method to edit a configuration.
	 */
	$scope.editConfiguration = function(index) {
		$scope.selectedConfiguration = $scope.configurations[index];
		$scope.formGuid = $scope.selectedConfiguration.id.replace('config-', '');
		$scope.showAddConfigurationPanel = true;
	}
	
	/**
	 * Method to delete a configuration.
	 */
	$scope.deleteConfiguration = function(index) {
		$scope.selectedConfiguration = $scope.configurations[index];
		$scope.showAddConfigurationPanel = false;
		confirmationModal.modal('show');
	}
	
	$scope.performDeleteConfiguration = function() {
		
	}

    /**
     * Method to generate a GUID for the new configurations.
     */
	var generateGuid = function() {
        var s4 = function() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        };

        return s4() + s4() + '-' + 
            s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + 
			s4() + s4();
	};

	getStoredConfigurations();
    $scope.generatedFormGuid = generateGuid();
}