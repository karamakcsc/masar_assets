frappe.ui.form.on('Department', {
    onload: function(frm) {
        set_doctype_read_only(frm);
        // frm.toggle_display("company", false);
        frm.set_df_property('company', 'read_only', 1);
    },
    refresh: function(frm) {
        set_doctype_read_only(frm);
        // frm.toggle_display("company", false);
        frm.set_df_property('company', 'read_only', 1);
    },
    setup: function(frm) {
        set_doctype_read_only(frm);
        // frm.toggle_display("company", false);
        frm.set_df_property('company', 'read_only', 1);
    }
});

function set_doctype_read_only(frm) {
    if (frappe.session.user !== 'Administrator'){
        if (frappe.user.has_role('JKB Supply Chain-Checker') || frappe.user.has_role('JKB Supply Chain-Maker')) {
            frm.set_read_only(true);
            // frappe.show_alert('Form set to read-only mode for JKB Supply Chain-Checker', 5);
        }
    }
}

