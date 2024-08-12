frappe.ui.form.on("Role Profile", {
	refresh: function (frm) {
		if (!frappe.user.has_role('System Manager') || !frappe.user.has_role('Workspace Manager')) {
				const roles_to_hide = ["System Manager", "Workspace Manager" , "Script Manager"];
				frm.roles_editor.wrapper.find(`[data-unit="${roles_to_hide.join('"], [data-unit="')}"]`).hide()
			}

	}, 
	onload: function(frm){
		if (!frappe.user.has_role('System Manager') || !frappe.user.has_role('Workspace Manager')) {
			const roles_to_hide = ["System Manager", "Workspace Manager" , "Script Manager"];
			frm.roles_editor.wrapper.find(`[data-unit="${roles_to_hide.join('"], [data-unit="')}"]`).hide()
		}
	}
});
