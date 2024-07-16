# Copyright (c) 2024, KCSC and contributors
# For license information, please see license.txt

import frappe


def execute(filters=None):
    columns = get_columns()
    data = get_data(filters)
    return columns, data


def get_data(filters):
    _from, to = filters.get('from_date'), filters.get('to_date')
    conditions = ''
    
    if filters.get('asset_id'):
        conditions += f" AND ta.name = '{filters.get('asset_id')}'"

    if filters.get('item_code'):
        conditions += f" AND ta.item_code = '{filters.get('item_code')}'"
    if filters.get('asset_category'):
        conditions += f" AND ta.asset_category = '{filters.get('asset_category')}'"
    if filters.get('location'):
        conditions += f" AND ta.location = '{filters.get('location')}'"
    if filters.get('status'):
        conditions += f" AND ta.status = '{filters.get('status')}'"

    query = frappe.db.sql(f"""
			SELECT 	
				ta.name , 
				ta.asset_name , 
				ta.item_code , 
				ta.item_name , 
				ta.asset_category , 
				ta.company ,
				ta.location , 
				ta.status , 
				taa.`date` as activity_date_time , 
				tami.from_employee  , 
				tami.to_employee  , 
				tami.source_location , 
				tami.target_location  ,  
				taa.subject 
			FROM 	
				tabAsset ta 
			INNER JOIN  
				`tabAsset Movement Item` tami ON ta.name = tami.asset 
			INNER JOIN  	
				`tabAsset Activity` taa ON  taa.asset = ta.name
				
			WHERE (taa.`date` BETWEEN '{_from}' AND '{to}') {conditions}

    """)
    return query


def get_columns():
    return [
        "Asset ID:Link/Asset:200",
        "Asset Name:Data:200",
        "Item Code:Link/Item:200", 
        "Item Name:Data:200",
        "Asset Category:Link/Asset Category:200", 
        "Company:Link/Company:200",
        "Location:Link/Location:300",
        "Status:Data:170", 
        "Activity Date:Datetime:200",
        "From Employee:Data:200",
        "To Employee:Data:200",
        "Source Location:Data:200",
        "Target Location:Data:200", 
        "Subject:Data:800", 
    ]