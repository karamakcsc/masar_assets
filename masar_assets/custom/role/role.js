frappe.ui.form.on('Role', {
    onload: function(frm) {
        hide_fields(frm);
        frm.remove_custom_button('Role Permissions Manager');
    },
    refresh: function(frm) {
        hide_fields(frm);
        frm.remove_custom_button('Role Permissions Manager');
    },
    setup: function(frm) {
        hide_fields(frm);
        frm.remove_custom_button('Role Permissions Manager');
    }
});


function hide_fields(frm){
    frm.toggle_display("restrict_to_domain", false);
}