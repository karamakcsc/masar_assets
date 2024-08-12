frappe.ui.form.on('Role', {
    onload: function(frm) {
        hide_fields(frm);
    },
    refresh: function(frm) {
        hide_fields(frm);
    },
    setup: function(frm) {
        hide_fields(frm);
    }
});


function hide_fields(frm){
    frm.toggle_display("restrict_to_domain", false);
}