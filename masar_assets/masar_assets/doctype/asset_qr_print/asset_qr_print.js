// Copyright (c) 2024, KCSC and contributors
// For license information, please see license.txt

// frappe.ui.form.on("Asset QR Print", {
// 	validate(frm) {
//         frappe.call({
//             doc:frm.doc,
//             method:'asset_filters',
//             callback: function(r) {
//                 var insert_row = cur_frm.add_child("filtered_assets_table");
//                 insert_row.asset_code= r.message;
//                 // insert_row.asset_name=
//                 // insert_row.custom_qr_code_text=
//                 cur_frm.refresh_fields("filtered_assets_table");
//             }
//         })
       

// 	},
// });

frappe.ui.form.on('Asset QR Print', {
    refresh(frm) {
        if (frm.doc.docstatus != 1) {
            $("button[data-original-title='Print']").hide();
        }
    },
    setup(frm) {
        if (frm.doc.docstatus != 1) {
            frm.page.clear_menu();
        }
    },
    onload(frm) {
        if (frm.doc.docstatus != 1) {
            frm.page.clear_menu();
        }
    }
  });