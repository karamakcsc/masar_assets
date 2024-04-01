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