// Copyright (c) 2024, KCSC and contributors
// For license information, please see license.txt

frappe.ui.form.on("Asset Movement Entry", {
	setup: function (frm) {
		cur_frm.fields_dict['asset_counts'].get_query = function(doc) {
            return {
                filters: {
                    "docstatus": 1
                }
            }
        }
	},
    setup: function (frm) {
		cur_frm.fields_dict['location'].get_query = function(doc) {
            return {
                filters: {
                    "is_group": 0
                }
            }
        }
	}, 
    setup: function (frm) {
		cur_frm.fields_dict['source_location'].get_query = function(doc) {
            return {
                filters: {
                    "is_group": 0
                }
            }
        }
	}, 
    setup: function (frm) {
		cur_frm.fields_dict['target_location'].get_query = function(doc) {
            return {
                filters: {
                    "is_group": 0
                }
            }
        }
	}, 
    refresh: function(frm) {
        if (!frm.is_new()){
			frm.add_custom_button(__('Get Asset'), function(){
                frm.clear_table('items');
				frappe.call({
					doc:frm.doc,
					method:'get_asset',
                    callback: function(r){
                        
                        frm.refresh_field('items');
                        frm.refresh_field('num_of_asset');
                    }
					
				});
			});
        }
    }
});


frappe.ui.form.on("Asset Movement Entry", {
	setup: function (frm) {
		frm.fields_dict.items.grid.get_field('target_location').get_query =
			function() {
				return {
					filters: {
						"is_group":0,

					}
				}
			}

	},
});
