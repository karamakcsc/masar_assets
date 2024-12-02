frappe.ui.form.on('Supplier', {
    onload: function(frm) {
        set_doctype_read_only(frm);
        // cur_frm.dashboard.hide();
        hide_fields(frm);
    },
    refresh: function(frm) {
        set_doctype_read_only(frm);
        // cur_frm.dashboard.hide();
        hide_fields(frm);
    },
    setup: function(frm) {
        set_doctype_read_only(frm);
        // cur_frm.dashboard.hide();
        hide_fields(frm);
    },
    before_load: function(frm) {
        set_doctype_read_only(frm);
        // cur_frm.dashboard.hide();
        hide_fields(frm);
    },
    onload_post_render: function(frm) {
        set_doctype_read_only(frm);
        // cur_frm.dashboard.hide();
        hide_fields(frm);
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

function hide_fields(frm){
    if (frappe.session.user !== 'Administrator'){
        $('a.nav-link:contains("Dashboard")').parent('.nav-item').hide();
        $('a.nav-link:contains("Contact & Address")').parent('.nav-item').hide();
        $('a.nav-link:contains("Accounting")').parent('.nav-item').hide();
        $('a.nav-link:contains("Settings")').parent('.nav-item').hide();
        $('a.nav-link:contains("Portal Users")').parent('.nav-item').hide();
        frm.toggle_display("tax_category", false);
        frm.toggle_display("tax_withholding_category", false);
        frm.toggle_display("defaults_section", false);
        frm.toggle_display("internal_supplier_section", false);
    }
}