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
    if (!frappe.user.has_role('System Manager')) {
        frm.set_read_only(true);
    }
}