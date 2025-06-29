frappe.ui.form.on('Asset', {
    refresh: function(frm) {
        frm.clear_custom_buttons();
        hide_fields(frm);
        set_doctype_read_only(frm);
        set_current_location(frm);
    },
    onload: function(frm){
        frm.clear_custom_buttons(); 
        hide_fields(frm);
        set_doctype_read_only(frm);
        set_current_location(frm);
    },
    setup: function(frm){
        frm.clear_custom_buttons(); 
        hide_fields(frm);
        set_doctype_read_only(frm);
    }
  });
function hide_fields(frm){
    if (frappe.session.user !== 'Administrator'){
        frm.toggle_display("section_break_23", false);
        frm.toggle_display("section_break_36", false);
        frm.toggle_display("section_break_33", false);
        frm.toggle_display("depreciation_schedule_sb", false);
        frm.toggle_display("insurance_details", false);
        frm.toggle_display("section_break_31", false);
        frm.toggle_display("booked_fixed_asset", false);
        frm.toggle_display("accounting_dimensions_section", false);
        // frm.set_df_property('company', 'read_only', 1);
        // cur_frm.dashboard.hide();//
    }
}

function set_doctype_read_only(frm) {
    if (frappe.session.user !== 'Administrator'){
        if (frappe.user.has_role('JKB Supply Chain-Checker')) {
            frm.set_read_only(true);
            // frappe.show_alert('Form set to read-only mode for JKB Supply Chain-Checker', 5);
        }
    }
}

function set_current_location(frm) {
    if (frm.doc.__islocal != 0 && frm.doc.location) {
        frappe.call({
            method: "masar_assets.custom.asset.asset.get_current_department",
            args: {
                location: frm.doc.location,
                a_name: frm.doc.name
            },
            callback: function(r) {
                if (r.message) {                
                    frm.refresh_field("custom_current_department");
                    console.log("Success");
                } else {
                    frm.refresh_field("custom_current_department");
                    console.log("Failure");
                }
            }
        })
    }
}