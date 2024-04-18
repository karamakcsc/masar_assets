// Copyright (c) 2024, KCSC and contributors
// For license information, please see license.txt

// frappe.ui.form.on("Asset Counts", {
// 	refresh(frm) {

// 	},
// });
frappe.ui.form.on('Asset Counts', {
	onload: function (frm) {
		frm.get_field('items').grid.cannot_add_rows = true;
	}
});