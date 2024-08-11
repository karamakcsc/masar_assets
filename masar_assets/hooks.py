app_name = "masar_assets"
app_title = "Masar Assets"
app_publisher = "KCSC"
app_description = "Masar Assets"
app_email = "info@kcsc.com.jo"
app_license = "mit"

# required_apps = []

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
# app_include_css = "/assets/masar_assets/js/masar_assets.css"
# app_include_js = "/assets/masar_assets/js/masar_assets.js"

# include js, css files in header of web template
# web_include_css = "/assets/masar_assets/css/masar_assets.css"
# web_include_js = "/assets/masar_assets/js/masar_assets.js"

# include custom scss in every website theme (without file extension ".scss")
# website_theme_scss = "masar_assets/public/scss/website"

# include js, css files in header of web form
# webform_include_js = {"doctype": "public/js/doctype.js"}
# webform_include_css = {"doctype": "public/css/doctype.css"}

# include js in page
# page_js = {"page" : "public/js/file.js"}

# include js in doctype views
# doctype_js = {"doctype" : "public/js/doctype.js"}
# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}

# Svg Icons
# ------------------
# include app icons in desk
# app_include_icons = "masar_assets/public/icons.svg"

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
# 	"Role": "home_page"
# }

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# Jinja
# ----------

# add methods and filters to jinja environment
# jinja = {
# 	"methods": "masar_assets.utils.jinja_methods",
# 	"filters": "masar_assets.utils.jinja_filters"
# }

# Installation
# ------------

# before_install = "masar_assets.install.before_install"
# after_install = "masar_assets.install.after_install"

# Uninstallation
# ------------

# before_uninstall = "masar_assets.uninstall.before_uninstall"
# after_uninstall = "masar_assets.uninstall.after_uninstall"

# Integration Setup
# ------------------
# To set up dependencies/integrations with other apps
# Name of the app being installed is passed as an argument

# before_app_install = "masar_assets.utils.before_app_install"
# after_app_install = "masar_assets.utils.after_app_install"

# Integration Cleanup
# -------------------
# To clean up dependencies/integrations with other apps
# Name of the app being uninstalled is passed as an argument

# before_app_uninstall = "masar_assets.utils.before_app_uninstall"
# after_app_uninstall = "masar_assets.utils.after_app_uninstall"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "masar_assets.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
# 	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
# 	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# DocType Class
# ---------------
# Override standard doctype classes

override_doctype_class = {
    "User": "masar_assets.override._user.User",
    # "Email Queue": "masar_assets.override._email_queue.EmailQueueCustom"
}

# Document Events
# ---------------
# Hook on document methods and events

doc_events = {
    "Asset": {
        "before_submit": "masar_assets.custom.asset.asset.before_submit"
    },
    "Email Queue": {
        "on_change": "masar_assets.custom.email_queue.email_queue.masked_message"
    }
}
doctype_js = {
    "Asset" : "custom/asset/asset.js", 
    "User" : "custom/user/user.js",
    "Role" : "custom/role/role.js",
    "Location" : "custom/location/location.js",
    "Asset Category" : "custom/asset_category/asset_category.js",
    "Item" : "custom/item/item.js",
    "Asset Movement" : "custom/asset_movement/asset_movement.js",
    "Supplier" : "custom/supplier/supplier.js",
    "Supplier Group" : "custom/supplier_group/supplier_group.js",
    "Department" : "custom/department/department.js", 
    "Role Profile" : "custom/role_profile/role_profile.js",
}

# Scheduled Tasks
# ---------------
# scheduler_events = {
# 	"all": [
# 		"masar_assets.tasks.all"
# 	],
# 	"daily": [
# 		"masar_assets.tasks.daily"
# 	],
# 	"hourly": [
# 		"masar_assets.tasks.hourly"
# 	],
# 	"weekly": [
# 		"masar_assets.tasks.weekly"
# 	],
# 	"monthly": [
# 		"masar_assets.tasks.monthly"
# 	],
# }

# Testing
# -------

# before_tests = "masar_assets.install.before_tests"

# Overriding Methods
# ------------------------------
#
# override_whitelisted_methods = {
# 	"frappe.desk.doctype.event.event.get_events": "masar_assets.event.get_events"
# }
#
# each overriding function accepts a `data` argument;
# generated from the base implementation of the doctype dashboard,
# along with any modifications made in other Frappe apps
# override_doctype_dashboards = {
# 	"Task": "masar_assets.task.get_dashboard_data"
# }

# exempt linked doctypes from being automatically cancelled
#
# auto_cancel_exempted_doctypes = ["Auto Repeat"]

# Ignore links to specified DocTypes when deleting documents
# -----------------------------------------------------------

# ignore_links_on_delete = ["Communication", "ToDo"]

# Request Events
# ----------------
# before_request = ["masar_assets.utils.before_request"]
# after_request = ["masar_assets.utils.after_request"]

# Job Events
# ----------
# before_job = ["masar_assets.utils.before_job"]
# after_job = ["masar_assets.utils.after_job"]

# User Data Protection
# --------------------

# user_data_fields = [
# 	{
# 		"doctype": "{doctype_1}",
# 		"filter_by": "{filter_by}",
# 		"redact_fields": ["{field_1}", "{field_2}"],
# 		"partial": 1,
# 	},
# 	{
# 		"doctype": "{doctype_2}",
# 		"filter_by": "{filter_by}",
# 		"partial": 1,
# 	},
# 	{
# 		"doctype": "{doctype_3}",
# 		"strict": False,
# 	},
# 	{
# 		"doctype": "{doctype_4}"
# 	}
# ]

# Authentication and authorization
# --------------------------------
# auth_hooks = [
# 	"masar_assets.auth.validate"
# ]

# Automatically update python controller files with type annotations for this app.
# export_python_type_annotations = True

# default_log_clearing_doctypes = {
# 	"Logging DocType Name": 30  # days to retain logs
# }

fixtures = [
    {"dt": "Custom Field", "filters": [
        [
            "name", "in", [
                "Asset-custom_qr_code_text",
                "Asset-custom_qr_code",
                "Asset-custom_supplier_details",
                "Asset-custom_supplier_id",
                "Asset-custom_supplier_name",
                "Asset-custom_invoice_date",
                "Asset-custom_invoice_no",
                "Asset-custom_column_break_xpq6r",
                "Asset-custom_supplier_tax",
                "Department-custom_department_code",
                "Location-custom_section_break_ofpln",
                "Location-custom_description",
                "Location-custom_section_break_5vp5v",
                "Location-custom_city",
                "Location-custom_branch",
                "Location-custom_room_no",
                "Location-custom_floor",
                "Location-custom_column_break_kmhwj",
                "Email Queue-custom_masked_message"
            ]
        ]
    ]},
    {
        "doctype": "Property Setter",
        "filters": [
            [
                "name",
                "in",
                [
                    "Email Queue-message-hide"
                ]
            ]
        ]
    }
]
