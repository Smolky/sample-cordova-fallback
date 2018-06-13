/**
 * DOM modifications
 */
$(document).ready (function () {

    /** var body DOM */
    var body = $('body');
       
    
    /** var notifications DOM */
    var notifications = $('#notifications');
    
    
    /** var notifications_handler DOM */
    var notifications_handler = $('#notifications-handler');
    
    
    /** var device_token String The token of the device for the push notifications */
    var device_token = body.attr ('data-token');
    
    
    /** var url String The URL for the API calls */
    var url = body.attr ('data-url');
    
    
    /** var patient_id int The patient ID @todo review */
    var patient_id = $('#select-person').val () * 1;
    
    
    // Without patient_id all of this stuff is useless
    if ( ! patient_id) {
        return;
    }    
    
    
    // Update the changes
    notifications_handler.unbind ().change (function () {
    
        /** var api_url String The API URL to subscribe your device */
        var api_url = '/subscribe_to_push';
        
        
        /** var data Object */
        var data = {
            patient_id: patient_id,
            device_token: device_token
        };
        
        
        // Prepare POST request
        $.ajax ({
            url: api_url,
            data: data,
            dataType: 'json',
            method: 'post',
            success: function (response) {
            
                // No response
                if ( ! response || response.ok == false) {
                    alert ('La operación no se puede completar. Por favor, inténtelo en unos instantes y vuelva a intentarlo. Si el problema persiste, póngase en contacto con el administrador');
                    return;
                }
                
                
                // Force the checkbox status
                notifications_handler.prop ('checked', response.push);
            
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log  ('@error subscribe to push ' + xhr.status);
            }
        });
    
    });
    
    
    // If user has a token, then show the notifications
    // event
    if (device_token) {
    
        // Show panel
        notifications.show ();
        
        
        /** var api_url String The API URL to check if your device has already subscribed */
        var api_url = '/get_push_state';
        
        
        /** var data Object */
        var data = {
            patient_id: patient_id,
            device_token: device_token
        };

        
        // Determine if the user has already activated push notifications
        // Prepare POST request
        $.ajax ({
            url: api_url,
            data: data,
            dataType: 'json',
            method: 'get',
            success: function (response) {
            
                // No response
                if ( ! response || response.ok == false) {
                    alert ('La operación no se puede completar. Por favor, inténtelo en unos instantes y vuelva a intentarlo. Si el problema persiste, póngase en contacto con el administrador');
                    return;
                }            
                
                // Mark (or not) the checkbox
                notifications_handler.prop ('checked', response.push);
                
                
                // Now, we can change the state
                notifications_handler.prop ('disabled', false);
            
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log  ('@error check push ' + xhr.status);
            }
        });
        
    }
    
    
});