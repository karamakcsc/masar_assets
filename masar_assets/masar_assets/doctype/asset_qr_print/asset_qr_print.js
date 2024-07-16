// Copyright (c) 2024, KCSC and contributors
// For license information, please see license.txt

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

  frappe.ui.form.on("Asset QR Print", {
	setup: function(frm) {
		frm.set_query("location", function() {
			return {
				filters: {
					"is_group" : 0
                }
			}
		});
        frm.set_query("asset_name", function() {
			return {
				filters: {
					"docstatus" : 1
                }
			}
		});
        frm.set_query("item_code", function() {
			return {
				filters: {
					"is_fixed_asset" : 1
                }
			}
		});
	}
});