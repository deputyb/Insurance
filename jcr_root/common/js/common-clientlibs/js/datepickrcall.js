$(function(){
    if ($('#_content_aetna-taskmanager_aetna-task-request-form_jcr_content_column1_start_request_start_date').length > 0) {
        new datepickr('_content_aetna-taskmanager_aetna-task-request-form_jcr_content_column1_start_request_start_date', {
            'dateFormat': 'm/d/y'
        });
    }
    if ($('#_content_aetna-taskmanager_aetna-task-request-form_jcr_content_column1_start_request_expiration_date').length > 0) {
        new datepickr('_content_aetna-taskmanager_aetna-task-request-form_jcr_content_column1_start_request_expiration_date', {
            'dateFormat': 'm/d/y'
        });
    }
});