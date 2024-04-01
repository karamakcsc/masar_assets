frappe.ui.form.on("Location", {
    location: function(frm){
        let mapdata = JSON.parse(frm.doc.location).features[0];
        if (mapdata && mapdata.geometry.type == 'Point'){
            let lat = mapdata.geometry.coordinates[1]; 
            let lon = mapdata.geometry.coordinates[0];
            frappe.call({
                type: "GET",
                url: `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`,
                callback: function (r){
                    frm.set_value('latitude',parseFloat(r.lat));
                    frm.set_value('longitude',parseFloat(r.lon));
                    refresh_field(['latitude', 'longitude']);
                }
            });
        }
    }
});

  