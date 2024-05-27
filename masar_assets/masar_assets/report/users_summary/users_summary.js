// Copyright (c) 2024, KCSC and contributors
// For license information, please see license.txt

frappe.query_reports["Users Summary"] = {
	"filters": [

		{
			"fieldname" : "username",
			"label" : __("Username"),
			"fieldtype" : "Data",
		},
		{
			"fieldname" : "role_profile_name",
			"label" : __("Role Profile"),
			"fieldtype" : "Link",
			"options" : "Role Profile"
		},
        {
            "fieldname": "enabled",
            "label": __("Enabled"),
            "fieldtype": "Select",
            "options": " \nEnabled\nDisabled"
        }
	]
};
