frappe.ui.form.on("User", {
    onload: function(frm) {
        frm.add_custom_button(__("Generate Password"), () => {
            frappe.call({
                method : 'masar_assets.custom.user.user.gen_hash',
            })

        });
    },

    refresh: function(frm) {
        frm.add_custom_button(__("Generate Password"), () => {
            frappe.call({
                method : 'masar_assets.custom.user.user.gen_hash',
            })

        });
    }
});





frappe.ui.form.on("User", "refresh", function(frm) {
    if (!frappe.user.has_role('System Manager') && !frappe.user.has_role('JKB User Management-Checker')  ) {
        var df_enabled = frappe.meta.get_docfield("User", "enabled", frm.doc.name);
        df_enabled.read_only = 0;
        frm.toggle_display("enabled", false);
        frm.refresh_fields();
    }
});
frappe.ui.form.on("User", "onload", function(frm) {
    if (!frappe.user.has_role('System Manager') && !frappe.user.has_role('Workspace Manager')){
        frm.toggle_display("sb_allow_modules", false);
        frm.toggle_display("module_profile", false);
        frm.toggle_display("modules_html", false);
        frm.toggle_display("block_modules", false);
        frm.toggle_display("home_settings", false);
        frm.refresh_fields();
    }
});

frappe.ui.form.on("Role", "onload", function(frm) {
    if (!frappe.user.has_role('System Manager')) {
        frm.toggle_display("disabled", false)
        frm.refresh_fields();
        frm.set_visible("disabled", false);
    }
});
