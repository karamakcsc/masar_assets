// Copyright (c) 2024, KCSC and contributors
// For license information, please see license.txt

frappe.query_reports["User Profile Summary"] = {
	"filters": [
		{
			"fieldname" : "role_profile_name",
			"label" : __("Role Profile"),
			"fieldtype" : "Link",
			"options" : "Role Profile"
		},
		{
			"fieldname" : "module_profile",
			"label" : __("Module Profile"),
			"fieldtype" : "Link",
			"options" : "Module Profile"
		},

	]
};
