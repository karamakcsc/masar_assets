// Copyright (c) 2024, KCSC and contributors
// For license information, please see license.txt

frappe.ui.form.on('Role Permissions Doctype', {
    onload: function(frm) {
        set_doctype_read_only(frm);
    },
    refresh: function(frm) {
        set_doctype_read_only(frm);
    },
    setup: function(frm) {
        set_doctype_read_only(frm);
    }
});

function set_doctype_read_only(frm) {
    frm.set_df_property("link_doctype", "read_only", 1);
    if (frappe.user.has_role("Administrator")) {
        frm.set_df_property("link_doctype", "read_only", 0);
    }
}