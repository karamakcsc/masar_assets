import frappe

def execute(filters=None):
    columns = get_columns()
    data = get_data(filters)
    return columns, data

def get_data(filters):
    conditions = ''
    
    if filters.get('username'):
        conditions += f" AND tu.username LIKE '%{filters.get('username')}%'"

    if filters.get('role_profile_name'):
        conditions += f" AND tu.role_profile_name = '{filters.get('role_profile_name')}'"

    if filters.get('enabled'):
        enabled_value = frappe.db.escape(filters.get('enabled'))
        if enabled_value == "'Enabled'":
            conditions += " AND tu.enabled = 1"
        elif enabled_value == "'Disabled'":
            conditions += " AND tu.enabled = 0"
    
    query = frappe.db.sql(f"""
                       SELECT tu.email, tu.username, tu.role_profile_name, tu.module_profile, tu.enabled
                       FROM `tabUser` tu
                       WHERE  1=1 {conditions}
                    """)

    return query

def get_columns():
    return [
        "Email:Data:200",
        "Username:Data:200",
        "Role Profile:Link/Role Profile:200",
        "Module Profile:Link/Module Profile:200",
        "Status:Check:150",
    ]