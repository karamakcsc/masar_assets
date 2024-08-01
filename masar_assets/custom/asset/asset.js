frappe.ui.form.on('Asset', {
    refresh: function(frm) {
        frm.clear_custom_buttons();
        hide_fields(frm);
    },
    onload: function(frm){
        frm.clear_custom_buttons(); 
        hide_fields(frm);
    },
    setup: function(frm){
        frm.clear_custom_buttons(); 
        hide_fields(frm);
    }
  });
function hide_fields(frm){
    frm.toggle_display("section_break_23", false);
    frm.toggle_display("section_break_36", false);
    frm.toggle_display("section_break_33", false);
    frm.toggle_display("depreciation_schedule_sb", false);
    frm.toggle_display("insurance_details", false);
    frm.toggle_display("section_break_31", false);
    frm.toggle_display("booked_fixed_asset", false);
    frm.toggle_display("accounting_dimensions_section", false);
}

frappe.ui.form.on('Asset', {
    onload: function(frm) {
        set_doctype_read_only(frm);
    },
    refresh: function(frm) {
        set_doctype_read_only(frm);
    },
    setup: function(frm) {
        set_doctype_read_only(frm);
    },
    before_load: function(frm) {
        set_doctype_read_only(frm);
    },
    onload_post_render: function(frm) {
        set_doctype_read_only(frm);
    }
});

function set_doctype_read_only(frm) {
    if (frappe.user.has_role('JKB Supply Chain-Checker')) {
        frm.set_read_only(true);
        // frappe.show_alert('Form set to read-only mode for JKB Supply Chain-Checker', 5);
    }
}
