// frappe.listview_settings['Role'] = {
//     onload : function(listview) {
//        if(!frappe.user.has_role('System Manager')){
//         frappe.route_options = {
//             "disabled": "0"
//           };
//         listview.refresh();
//         }
//     },
//      refresh : function(listview) {
//          if(!frappe.user.has_role('System Manager')){
//         frappe.route_options = {
//             "disabled": "0"
//           };
//         listview.refresh();
//          }
//     },
//      setup : function(listview) {
//          if(!frappe.user.has_role('System Manager')){
//         frappe.route_options = {
//             "disabled": "0"
//           };
//         listview.refresh();
//     }
//      }
// };
