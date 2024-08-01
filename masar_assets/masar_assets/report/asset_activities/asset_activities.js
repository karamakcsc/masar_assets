// Copyright (c) 2024, KCSC and contributors
// For license information, please see license.txt
frappe.query_reports["Asset Activities"] = {
    "filters": [
        {
            "fieldname": "asset_id",
            "label": __("Asset ID"),
            "fieldtype": "Link",
            "options": "Asset"
        },
        {
            "fieldname": "item_code",
            "label": __("Item Code"),
            "fieldtype": "Link",
            "options": "Item"
        },
        {
            "fieldname": "asset_category",
            "label": __("Asset Category"),
            "fieldtype": "Link",
            "options": "Asset Category"
        },
        {
            "fieldname": "from_date",
            "label": __("From Date"),
            "fieldtype": "Datetime",
            "default": frappe.datetime.add_months(frappe.datetime.get_today(), -1),
            "reqd": 1,
            "width": "60px"
        },
        {
            "fieldname": "to_date",
            "label": __("To Date"),
            "fieldtype": "Datetime",
            "default": frappe.datetime.get_today(),
            "reqd": 1,
            "width": "60px"
        },
        {
            "fieldname": "location",
            "label": __("Asset Location"),
            "fieldtype": "Link",
            "options": "Location"
        },
        {
            "fieldname": "status",
            "label": __("Status"),
            "fieldtype": "Select",
            "options": "\nDraft\nSubmitted\nScrapped"
        }
    ]
};
