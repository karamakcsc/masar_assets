frappe.ui.form.on('Asset Category', {
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
    frm.toggle_display("finance_book_detail", false);
    frm.toggle_display("depreciation_options", false);
    if (frappe.user.has_role('JKB Supply Chain-Checker')) {
        frm.set_read_only(true);

        // frappe.show_alert('Form set to read-only mode for JKB Supply Chain-Checker', 5);
    }
}