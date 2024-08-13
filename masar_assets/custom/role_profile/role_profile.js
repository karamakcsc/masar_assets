frappe.ui.form.on("Role Profile", {
	refresh: function (frm) {
			if (!frm.roles_editor) {
				const role_area = $(frm.fields_dict.roles_html.wrapper);
				frm.roles_editor = new frappe.RoleEditor(role_area, frm);
			}
			frm.roles_editor.show();

	}
});

frappe.ui.form.on('Role Profile', {
    refresh: function(frm) {
		$('input[data-unit="System Manager"]').closest('.checkbox').hide();
        $('input[data-unit="Script Manager"]').closest('.checkbox').hide();
		if (frappe.user.has_role("Administrator")){
			$('input[data-unit="System Manager"]').closest('.checkbox').show();
			$('input[data-unit="Script Manager"]').closest('.checkbox').show();
    }
}
});