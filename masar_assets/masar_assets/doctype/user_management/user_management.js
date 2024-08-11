// Copyright (c) 2024, KCSC and contributors
// For license information, please see license.txt

frappe.ui.form.on('User Management', {
    refresh: function(frm) {
        set_doctype_read_only(frm);
    },
    onload: function(frm){
        set_doctype_read_only(frm);
    },
    setup: function(frm){
        set_doctype_read_only(frm);
    }
  });

function set_doctype_read_only(frm) {
    if (frappe.user.has_role('JKB User Management-Checker')) {
        frm.set_df_property('is_exist_user', 'read_only', 1);
        frm.set_df_property('link_user', 'read_only', 1);
        frm.set_df_property('posting_date', 'read_only', 1);
        frm.set_df_property('user_name', 'read_only', 1);
        frm.set_df_property('last_name', 'read_only', 1);
        frm.set_df_property('user_email', 'read_only', 1);
        frm.set_df_property('purpose', 'read_only', 1);
        frm.set_df_property('first_name', 'read_only', 1);
        frm.set_df_property('section_break_vfg7', 'read_only', 1);
        // frappe.show_alert('Form set to read-only mode for JKB User Management-Checker', 5);
    }
}