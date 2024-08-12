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
        frm.refresh_fields();
    }
});

frappe.ui.form.on("User", {
    
    onload: function(frm) {
        if (!frappe.user.has_role('System Manager') || !frappe.user.has_role('Workspace Manager')) {
            const fields_to_hide = [
                "sb_allow_modules", 
                "module_profile", 
                "modules_html", 
                "block_modules", 
                "home_settings"
            ];
            fields_to_hide.forEach(field => frm.toggle_display(field, false));
            const roles_to_hide = ["System Manager", "Workspace Manager" , "Script Manager"];
            frm.roles_editor.wrapper.find(`[data-unit="${roles_to_hide.join('"], [data-unit="')}"]`).hide();
        }




        frm.refresh_fields();
    },

    refresh: function(frm) {
        
        frm.refresh_fields();
        if (!frappe.user.has_role('System Manager') || !frappe.user.has_role('Workspace Manager')) {
            const roles_to_hide = ["System Manager", "Workspace Manager" , "Script Manager"];
        frm.roles_editor.wrapper.find(`[data-unit="${roles_to_hide.join('"], [data-unit="')}"]`).hide();

            const fields_to_hide = [
                "sb_allow_modules", 
                "module_profile", 
                "modules_html", 
                "block_modules", 
                "home_settings",
            ];
            fields_to_hide.forEach(field => frm.toggle_display(field, false));
        }
        frm.refresh_fields();
    }
});

//// Mohamad Khalil Code /////