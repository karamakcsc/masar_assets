frappe.ui.form.on("Location", {
    location: function(frm) {
        let locationData = JSON.parse(frm.doc.location);

        if (locationData && locationData.features && locationData.features.length > 0) {
            let lat = locationData.features[0].geometry.coordinates[1]; 
            let lon = locationData.features[0].geometry.coordinates[0]; 
            
            frm.set_value('latitude', lat);
            frm.set_value('longitude', lon);
        } else {
            frm.set_value('latitude', null);
            frm.set_value('longitude', null);
        }

        // Refresh fields
        frm.refresh_field('latitude');
        frm.refresh_field('longitude');
    }
});
