frappe.ui.form.on("Role Profile", {
	refresh: function (frm) {
		if (has_common(frappe.user_roles, ["Administrator", "System Manager"])) {
			if (!frm.roles_editor) {
				const role_area = $(frm.fields_dict.roles_html.wrapper);
				frm.roles_editor = new frappe.RoleEditor(role_area, frm);
			}
			frm.roles_editor.show();
            const roles_to_hide = ["System Manager", "Workspace Manager" , "Script Manager"];
            frm.roles_editor.wrapper.find(`[data-unit="${roles_to_hide.join('"], [data-unit="')}"]`).hide()
		}
	},

	validate: function (frm) {
		if (frm.roles_editor) {
			frm.roles_editor.set_roles_in_table();
		}
	},
});
