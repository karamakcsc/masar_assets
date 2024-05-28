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



frappe.ui.form.on("User", "onload", function(frm) {
    if (frappe.user.has_role('JKB User Management-Maker') ) {
        var df_enabled = frappe.meta.get_docfield("User", "enabled", frm.doc.name);
        df_enabled.read_only = 1;
        frm.set_value("enabled", 1);
        frm.refresh_fields();
    }
});


frappe.ui.form.on("User", {
    onload: function(frm) {
        if (!frappe.user.has_role('System Manager') && !frappe.user.has_role('JKB User Management-Checker')) {
            frm.toggle_display("enabled", false);
        }

        if (!frappe.user.has_role('System Manager') && !frappe.user.has_role('Workspace Manager')) {
            const fields_to_hide = [
                "sb_allow_modules", 
                "module_profile", 
                "modules_html", 
                "block_modules", 
                "home_settings"
            ];
            fields_to_hide.forEach(field => frm.toggle_display(field, false));
        }

        frm.refresh_fields();
    },

    refresh: function(frm) {
        if (!frappe.user.has_role('System Manager') && !frappe.user.has_role('Workspace Manager')) {
            const fields_to_hide = [
                "sb_allow_modules", 
                "module_profile", 
                "modules_html", 
                "block_modules", 
                "home_settings"
            ];
            fields_to_hide.forEach(field => frm.toggle_display(field, false));
        }

        if (!frappe.user.has_role('System Manager') && !frappe.user.has_role('JKB User Management-Checker')) {
            frm.toggle_display("enabled", false);
        }

        frm.refresh_fields();
    }
});


// frappe.ui.form.on("User", "onload", function(frm) {
//     if (!frappe.user.has_role('System Manager')) {
//         frm.toggle_display("disabled", false)
//         frm.refresh_fields();
//         frm.set_visible("disabled", false);
//     }
// });
