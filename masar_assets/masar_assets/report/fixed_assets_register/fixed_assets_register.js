// Copyright (c) 2024, KCSC and contributors
// For license information, please see license.txt

frappe.query_reports["Fixed Assets Register"] = {
	filters: [
		{
			fieldname: "company",
			label: __("Company"),
			fieldtype: "Link",
			options: "Company",
			default: frappe.defaults.get_user_default("Company"),
			reqd: 1,
		},
		{
			fieldname: "filter_based_on",
			label: __("Period Based On"),
			fieldtype: "Select",
			options: ["Date Range"],
			default: "Date Range",
		},
		{
			fieldname: "from_date",
			label: __("Start Date"),
			fieldtype: "Date",
			default: frappe.datetime.add_months(frappe.datetime.nowdate(), -12),
			depends_on: "eval: doc.filter_based_on == 'Date Range'",
		},
		{
			fieldname: "to_date",
			label: __("End Date"),
			fieldtype: "Date",
			default: frappe.datetime.nowdate(),
			depends_on: "eval: doc.filter_based_on == 'Date Range'",
		},
		{
			fieldname: "asset_category",
			label: __("Asset Category"),
			fieldtype: "Link",
			options: "Asset Category",
		},
		{
			fieldname: "status",
			label: __("Status"),
			fieldtype: "Select",
			options: "\nIn Location\nDisposed",
			default: "In Location",
		},
		{
			fieldname: "group_by",
			label: __("Group By"),
			fieldtype: "Select",
			options: ["--Select a group--", "Asset Category", "Location"],
			default: "--Select a group--",
			reqd: 1,
		},
		{
			fieldname: "from_fiscal_year",
			label: __("Start Year"),
			fieldtype: "Link",
			options: "Fiscal Year",
			default: erpnext.utils.get_fiscal_year(frappe.datetime.get_today()),
			depends_on: "eval: doc.filter_based_on == 'Fiscal Year'",
		},
		{
			fieldname: "to_fiscal_year",
			label: __("End Year"),
			fieldtype: "Link",
			options: "Fiscal Year",
			default: erpnext.utils.get_fiscal_year(frappe.datetime.get_today()),
			depends_on: "eval: doc.filter_based_on == 'Fiscal Year'",
		},
		{
			fieldname: "date_based_on",
			label: __("Date Based On"),
			fieldtype: "Select",
			options: ["Purchase Date", "Available For Use Date"],
			default: "Purchase Date",
			depends_on: "eval: doc.filter_based_on == 'Date Range' || doc.filter_based_on == 'Fiscal Year'",
		},
		{
			fieldname: "only_existing_assets",
			label: __("Only existing assets"),
			fieldtype: "Check",
		}
	],
};
