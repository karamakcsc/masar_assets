frappe.ui.form.on('Department', {
    onload: function(frm) {
        set_doctype_read_only(frm);
        set_filters_list(frm);
    },
    refresh: function(frm) {
        set_doctype_read_only(frm);
        set_filters_list(frm);
    },
    setup: function(frm) {
        set_doctype_read_only(frm);
        set_filters_list(frm);
    },
    before_load: function(frm) {
        set_doctype_read_only(frm);
        set_filters_list(frm);
    },
    onload_post_render: function(frm) {
        set_doctype_read_only(frm);
        set_filters_list(frm);
    }
});

function set_doctype_read_only(frm) {
    if (frappe.user.has_role('JKB Supply Chain-Checker') || frappe.user.has_role('JKB Supply Chain-Maker')) {
        frm.set_read_only(true);
        // frappe.show_alert('Form set to read-only mode for JKB Supply Chain-Checker', 5);
    }
}


function set_filters_list(frm) {
    frm.set_df_property('company', 'read_only', 1);
}
