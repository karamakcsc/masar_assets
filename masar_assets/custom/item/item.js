frappe.ui.form.on('Item', {
    onload: function(frm) {
        set_doctype_read_only(frm);
        frm.set_value("is_fixed_asset", 1);
        hide_fields(frm);
        // cur_frm.dashboard.hide();
    },
    refresh: function(frm) {
        set_doctype_read_only(frm);
        frm.set_value("is_fixed_asset", 1);
        hide_fields(frm);
        // cur_frm.dashboard.hide();
    },
    setup: function(frm) {
        set_doctype_read_only(frm);
        frm.set_value("is_fixed_asset", 1);
        hide_fields(frm);
        // cur_frm.dashboard.hide();
    },
    before_load: function(frm) {
        set_doctype_read_only(frm);
        frm.set_value("is_fixed_asset", 1);
        hide_fields(frm);
        // cur_frm.dashboard.hide();
    },
    onload_post_render: function(frm) {
        set_doctype_read_only(frm);
        frm.set_value("is_fixed_asset", 1);
        hide_fields(frm);
        // cur_frm.dashboard.hide();
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
        $('a.nav-link:contains("Inventory")').parent('.nav-item').hide();
        $('a.nav-link:contains("Accounting")').parent('.nav-item').hide();
        $('a.nav-link:contains("Purchasing")').parent('.nav-item').hide();
        $('a.nav-link:contains("Variants")').parent('.nav-item').hide();
        $('a.nav-link:contains("Tax")').parent('.nav-item').hide();
        $('a.nav-link:contains("Sales")').parent('.nav-item').hide();
        $('a.nav-link:contains("Quality")').parent('.nav-item').hide();
        $('a.nav-link:contains("Manufacturing")').parent('.nav-item').hide();
        frm.toggle_display("allow_alternative_item", false);
        frm.toggle_display("is_stock_item", false);
        frm.toggle_display("has_variants", false);
        frm.toggle_display("opening_stock", false);
        frm.toggle_display("valuation_rate", false);
        frm.toggle_display("standard_rate", false);
        frm.toggle_display("auto_create_assets", false);
        frm.toggle_display("brand", false);
        frm.toggle_display("over_delivery_receipt_allowance", false);
        frm.toggle_display("over_billing_allowance", false);
    }
}