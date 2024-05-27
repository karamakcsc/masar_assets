frappe.ui.form.on("User", {
    onload: function(frm) {
        if (!frappe.user.has_role('User Management-Maker')) {
            frm.toggle_display("enabled", true);
        } else {
            frm.toggle_display("enabled", false);
        }
        frm.add_custom_button(__("Generate Password"), () => {
            frappe.call({
                method : 'masar_assets.custom.user.user.gen_hash',
            })

        });
    },

    refresh: function(frm) {
        if (!frappe.user.has_role('User Management-Maker')) {
            frm.toggle_display("enabled", true);
        } else {
            frm.toggle_display("enabled", false);
        }

        frm.add_custom_button(__("Generate Password"), () => {
            frappe.call({
                method : 'masar_assets.custom.user.user.gen_hash',
            })

        });
    }
});