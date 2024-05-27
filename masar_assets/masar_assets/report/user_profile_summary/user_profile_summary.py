import frappe


def execute(filters=None):
    columns = get_columns()
    data = get_data(filters)
    return columns, data


def get_data(filters):
    conditions = ''

    if filters.get('role_profile_name'):
        conditions += f" AND tu.role_profile_name = '{filters.get('role_profile_name')}'"

    if filters.get('module_profile'):
        conditions += f" AND tu.module_profile = '{filters.get('module_profile')}'"

    query = frappe.db.sql(f"""
    SELECT
        thr.role,
        tbm.module,
        tu.role_profile_name,
        tu.module_profile
    FROM `tabUser` tu
    INNER JOIN `tabHas Role` thr ON tu.name = thr.parent
    INNER JOIN `tabBlock Module` tbm ON tbm.parent = tu.name -- AND tbm.module = tu.role_profile_name
    WHERE 1=1 {conditions}
	-- GROUP BY thr.role

    """)

    return query


def get_columns():
    return [
        "Roles:Link/Role:200",
        "Modules:Data:200",
    ]