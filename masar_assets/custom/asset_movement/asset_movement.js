frappe.ui.form.on('Asset Movement', {
    onload: function(frm) {
        set_doctype_read_only(frm);
        frm.toggle_display("reference", false);
    },
    refresh: function(frm) {
        set_doctype_read_only(frm);
        frm.toggle_display("reference", false);
    },
    setup: function(frm) {
        set_doctype_read_only(frm);
        frm.toggle_display("reference", false);
    },
    before_load: function(frm) {
        set_doctype_read_only(frm);
        frm.toggle_display("reference", false);
    },
    onload_post_render: function(frm) {
        set_doctype_read_only(frm);
        frm.toggle_display("reference", false);
    }
});

function set_doctype_read_only(frm) {
    if (frappe.session.user !== 'Administrator'){
        if (frappe.user.has_role('JKB Supply Chain-Checker')) {
            frm.set_read_only(true);
            // frappe.show_alert('Form set to read-only mode for JKB Supply Chain-Checker', 5);
        }
    }
}