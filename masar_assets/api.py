from __future__ import unicode_literals
import frappe, erpnext
from frappe.utils import flt, cstr, nowdate, comma_and
from frappe import throw, msgprint, _
from frappe.custom.doctype.custom_field.custom_field import create_custom_field
import requests , json
from frappe import _
import pymysql
import math

@frappe.whitelist()
def get_qr_code(selected_location, name=None):
    result = frappe.db.sql("""
        SELECT *
        FROM `tabAsset` ta
        WHERE ta.name = %s
        ORDER BY ta.creation DESC
        """, (name,), as_dict=True)
    status =''
    if result:
        asset_location = result[0]['location']
        if asset_location == selected_location:
            status = 'Match'
        else:
            status = 'Additional'
        return {
            'result': result,
            'status': status
        }
    else:
        return {
            'result': [],
            'status': status
        }


@frappe.whitelist()
def create_asset_count(location):
    user_id = frappe.session.user
    new_doc = frappe.new_doc('Asset Counts')
    new_doc.user_id = user_id
    new_doc.location = location
    new_doc.insert()
    return new_doc.name

@frappe.whitelist()
def get_location():
    locations = frappe.db.sql("""
            SELECT name 
            FROM tabLocation tl
            WHERE tl.is_group = 0
            """, as_dict=True)
    return locations

@frappe.whitelist()
def insert_asset_in_table(doc_name , asset ,selected_location):
    asset_data = frappe.db.sql("""
            SELECT ta.name , ta.asset_name , ta.item_code  , ta.location 
            FROM `tabAsset` ta
            WHERE ta.name  = %s 
    """ , (asset),as_dict = True)
    asset_id = asset_data[0]['name']
    asset_name = asset_data[0]['asset_name']
    item_code = asset_data[0]['item_code']
    asset_location = asset_data[0]['location']
    update_doc = frappe.get_doc('Asset Counts' , doc_name)
    status = ''
    if  asset_location == selected_location:
        status = 'Match'
    elif   asset_location != selected_location:
        status = 'Additional' 
    update_doc.append("items" , {
        'asset_id':asset_id, 
        'asset_name':asset_name,
        'item_code':item_code,
        'register_location': asset_location,
        'current_location':selected_location,
        'status': status
    })
    update_doc.save()
    return str(status)



@frappe.whitelist()
def submit_asset_count(doc_name , selected_location ):
    pass
    # all_asset_in_this_location_sql = frappe.db.sql("""
    #     SELECT ta.name , ta.asset_name , ta.item_code  , ta.location 
    #     FROM `tabAsset` ta
    #     WHERE ta.location = %s
    # """ , (selected_location) , as_dict = True)
    # counted_asset_sql = frappe.db.sql("""
    #     SELECT tact.asset_id 
    #     FROM `tabAsset Count Table` tact 
    #     WHERE tact.parent  = %s
    # """, (doc_name) , as_dict = True)
    # asset_ids = [item['asset_id'] for item in counted_asset_sql]
    # for all_asset_in_this_location in all_asset_in_this_location_sql:
    #         if all_asset_in_this_location.get('name') not in asset_ids: 
    #             doc = frappe.get_doc('Asset Counts' , doc_name)
    #             doc.append("items" , {
    #                 'asset_id':all_asset_in_this_location.get('name'), 
    #                 'asset_name':all_asset_in_this_location.get('asset_name'),
    #                 'item_code':all_asset_in_this_location.get('item_code'),
    #                 'location': all_asset_in_this_location.get('location'),
    #                 'status': 'Missing'
    #             })
    #             doc.save()
    # asset_ids_set = set(asset_ids)
    # if len(asset_ids) != len(asset_ids_set):
    #     frappe.throw('There is a Dublicate Item')
   
