frappe.ui.form.on('Asset', {
    before_submit: function(frm) {
        frappe.call({
            method: "masar_assets.custom.asset.asset.generate_qr_code",
            args: {
                name: frm.doc.name
            },
            callback: function(r) {
                if (r.message) {
                    frappe.model.set_value(frm.doctype, frm.docname, 'custom_qr_code_text', r.message);
                    frappe.model.set_value(frm.doctype, frm.docname, 'custom_qr_code', r.message);
                    refresh_field(['custom_qr_code_text', 'custom_qr_code']);
                }
            }
        });
    }
});

frappe.ui.form.on("Asset","onload", function(frm) {

    if (!frappe.user.has_role('System Manager')) {
  
      frm.toggle_display("section_break_23", false);
      frm.toggle_display("section_break_36", false);
      frm.toggle_display("section_break_33", false);
      frm.toggle_display("depreciation_schedule_sb", false);
      frm.toggle_display("insurance_details", false);
      frm.toggle_display("accounting_dimensions_section", false);
      frm.toggle_display("section_break_31", false);
      frm.toggle_display("booked_fixed_asset", false);
    }
});