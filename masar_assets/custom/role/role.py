import frappe

def role_query(user):
    if not user:
        user = frappe.session.user
    if user == 'Administrator':
        return "(`tabRole`.disabled in ('No', 'Yes'))"
    else:
        return "(`tabRole`.disabled = 'No')"