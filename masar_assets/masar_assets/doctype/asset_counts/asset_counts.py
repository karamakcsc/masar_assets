# Copyright (c) 2024, KCSC and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class AssetCounts(Document):
    def before_submit(self):
        self.check_item_code()

    def check_item_code(self):
        all_assets_in_this_location_sql = frappe.db.sql("""
            SELECT name, asset_name, item_code, location
            FROM `tabAsset`
            WHERE location = %s
        """, (self.location), as_dict=True)
        counted_assets_sql = frappe.db.sql("""
            SELECT asset_id
            FROM `tabAsset Count Table`
            WHERE parent = %s
        """, (self.name), as_dict=True)
        asset_ids = [item['asset_id'] for item in counted_assets_sql]
        asset_ids_set = set(asset_ids)
        if len(asset_ids) != len(asset_ids_set):
            frappe.throw('There is a Duplicate Item')
        for asset in all_assets_in_this_location_sql:
            if asset['name'] not in asset_ids:
                self.append("items", {
                    'asset_id': asset['name'],
                    'asset_name': asset['asset_name'],
                    'item_code': asset['item_code'],
                    'register_location': asset['location'],
                    'current_location': self.location,
                    'status': 'Missing'
                })


