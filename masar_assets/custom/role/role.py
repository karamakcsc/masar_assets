import frappe
def role_query(user):
    permission =  "(`tabRole`.disabled = 'No')"
    if frappe.session.user == 'Administrator':
        permission = None
    return permission