from __future__ import unicode_literals
import frappe, erpnext
from frappe.utils import flt, cstr, nowdate, comma_and
from frappe import throw, msgprint, _
from frappe.custom.doctype.custom_field.custom_field import create_custom_field
import requests , json
from frappe import _
import pymysql
import math
from datetime import datetime


@frappe.whitelist()
def get_qr_code_query(name=None):
    result = frappe.db.sql("""
        SELECT *
        FROM `tabAsset` ta
        WHERE ta.name = %s
        ORDER BY ta.creation DESC
        """, (name,), as_dict=True)
    return result

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
    num_of_asset_in_location = frappe.db.sql("""
    SELECT name 
    FROM `tabAsset`
    WHERE location = %s """, (location) , as_dict = True)
    new_doc.exp_num_asset = len(num_of_asset_in_location)
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
def insert_asset_in_table(doc_name , asset ,selected_location  , document = None ):
    asset_data = frappe.db.sql("""
            SELECT ta.name , ta.asset_name , ta.item_code  , ta.location 
            FROM `tabAsset` ta
            WHERE ta.name  = %s 
    """ , (asset),as_dict = True)
    if asset_data:
        asset_id = asset_data[0]['name']
        asset_name = asset_data[0]['asset_name']
        item_code = asset_data[0]['item_code']
        asset_location = asset_data[0]['location']
        if document : 
            update_doc = frappe.get_doc('Asset Counts' , document)
        else:
            update_doc = frappe.get_doc('Asset Counts' , doc_name)
        status = ''
        if  asset_location == selected_location:
            status = 'Match'
        elif   asset_location != selected_location:
            status = 'Additional' 
        for row in update_doc.items:
            if asset_id == row.asset_id:
                frappe.msgprint('This Asset has been count before.')
        update_doc.append("items" , {
            'asset_id':asset_id, 
            'asset_name':asset_name,
            'item_code':item_code,
            'register_location': asset_location,
            'current_location':selected_location,
            'status': status
        })
        update_doc.save()
        total_rows = 0 
        num_additional = 0 
        num_match = 0 
        num_missing = 0 
        for row in update_doc.items:
            total_rows += 1 
            if  row.status == 'Match':
                num_match += 1
            elif row.status == 'Additional':
                num_additional +=1 
        num_missing = update_doc.exp_num_asset - num_match
        update_doc.total_asset_count = total_rows
        update_doc.number_of_match_assets = num_match
        update_doc.number_of_additional_assets = num_additional
        update_doc.number_of_missing_assets = num_missing
        update_doc.save()
        return str(status)
    else :
        frappe.throw("This Item Not Registered.")



@frappe.whitelist()
def submit_asset_count(doc_name , selected_location ):
    pass


@frappe.whitelist()
def get_prev_doc(location):
    result = frappe.db.sql(""" 
        SELECT tac.name 
        FROM  `tabAsset Counts` tac 
        WHERE tac.location = %s 
            AND tac.docstatus = 0 
            AND tac.is_end_process = 0 
            AND tac.uncompleted_process = 1 
    """ , (location) , as_dict = True)
    return result
   

@frappe.whitelist()
def end_process_check( timer_row_name , doc_name = None , selected_doc = None ):
    if doc_name:
        update_doc = frappe.get_doc('Asset Counts' , doc_name)
    elif selected_doc:
        update_doc = frappe.get_doc('Asset Counts' , selected_doc)
    update_doc.is_end_process = 1 
    update_doc.save()
    start_process_sql = frappe.db.sql("""
        SELECT start_process 
        FROM `tabAsset Counts Timer Details` tactd 
        WHERE name = %s 
    """ , (timer_row_name) , as_dict = True)
    start_process = start_process_sql[0]['start_process']
    end_process = datetime.now()
    duration = end_process - start_process
    duration_in_seconds = duration.total_seconds()
    for row in update_doc.timer_table:
        if row.name == timer_row_name:
            row.end_process = end_process
            row.duration = duration_in_seconds 
            row.process_status = 'Complete Process'
    update_doc.save()
    total_duration = 0.0
    for row in update_doc.timer_table:
        total_duration += row.duration
    update_doc.total_duration = total_duration
    update_doc.submit()

@frappe.whitelist()
def uncompleted_process_check( timer_row_name , doc_name = None , selected_doc = None ):
    if doc_name:
        update_doc = frappe.get_doc('Asset Counts' , doc_name)
    elif selected_doc:
        update_doc = frappe.get_doc('Asset Counts' , selected_doc)
    update_doc.uncompleted_process = 1 
    update_doc.save()
    start_process_sql = frappe.db.sql("""
        SELECT start_process 
        FROM `tabAsset Counts Timer Details` tactd 
        WHERE name = %s 
    """ , (timer_row_name) , as_dict = True)
    start_process = start_process_sql[0]['start_process']
    end_process = datetime.now()
    duration = end_process - start_process
    duration_in_seconds = duration.total_seconds()
    for row in update_doc.timer_table:
        if row.name == timer_row_name:
            row.end_process = end_process
            row.duration = duration_in_seconds 
            row.process_status = 'Break Process'
    update_doc.save()
    total_duration = 0.0
    for row in update_doc.timer_table:
        if row.duration:
            total_duration += row.duration
    update_doc.total_duration = total_duration
    update_doc.save()
@frappe.whitelist()
def insert_time_for_timer(doc_name):
    update_doc = frappe.get_doc('Asset Counts' , doc_name)
    date_time_now =  datetime.now()
    update_doc.append("timer_table" , {
            'start_process':date_time_now, 
        })
    update_doc.save()
    new_timer = update_doc.timer_table[-1].name
    return new_timer




@frappe.whitelist()
def get_exp_num(doc_name):
    doc = frappe.get_doc('Asset Counts' , doc_name)
    location =  doc.location 
    result = frappe.db.sql("""
    SELECT name 
    FROM `tabAsset`
    WHERE location = %s """, (location) , as_dict = True)
    return {
        'exp':str(len(result)), 
        'match': str(doc.number_of_match_assets),
        'total_count':str(doc.total_asset_count)
    }
