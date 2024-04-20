# Copyright (c) 2024, KCSC and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

class AssetCounts(Document):
    def validate(self):
        self.update_values()

    def before_submit(self):
        self.check_item_code()

    def check_item_code(self):
        all_assets_in_this_location_sql = frappe.db.sql("""
            SELECT name, asset_name, item_code, location
            FROM `tabAsset`
            WHERE location = %s
        """, (self.location), as_dict=True)
        counted_assets_sql = frappe.db.sql("""
            SELECT asset_id , idx
            FROM `tabAsset Count Table`
            WHERE parent = %s
        """, (self.name), as_dict=True)
        asset_ids = [item['asset_id'] for item in counted_assets_sql]
        message = ''
        for row in counted_assets_sql:
            row_asset = row.asset_id
            row_idx = row.idx
            asset_ids.remove(row_asset)
            for asset_dublicate_row in asset_ids:
                if asset_dublicate_row == row_asset:
                    message +=(f'This Asset: {row_asset} is dublicate in row {row_idx}.' + "\t\t\t\t")
            asset_ids.append(row_asset)
        if message != '':
            frappe.throw(message)
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
    def update_values(self):
        total_rows = 0 
        num_additional = 0 
        num_match = 0 
        num_missing = 0 
        for row in self.items:
                total_rows += 1 
                if  row.status == 'Match':
                    num_match += 1
                elif row.status == 'Additional':
                    num_additional +=1 
        num_missing = self.exp_num_asset - num_match
        self.total_asset_count = total_rows
        self.number_of_match_assets = num_match
        self.number_of_additional_assets = num_additional
        self.number_of_missing_assets = num_missing

