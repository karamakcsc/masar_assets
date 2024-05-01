frappe.pages['asset-count'].on_page_load = function(wrapper) {
    new MyPage(wrapper);
}

class MyPage {
    constructor(wrapper) {
        this.page = frappe.ui.make_app_page({
            parent: wrapper,
            single_column: true
        });
        this.locationSelected = false; 
        this.selectedLocation = null;
        this.DocName = null; 
        this.AssetPostionStatus = null; 
        this.AssetPostionStatusColor = null;
        this.PreviousLocationSelected = null; 
        this.SelectedDocument = null; 
        this.TimerRowName = null;
        this.ExpNum = null; 
        this.make();
    }

    make() {
        const body = `
            <h1>Asset Count</h1>
            <h3>Asset ID</h3>
            <button type="button" id="load-button">Load Previous Document</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <button type="button" id="new-button">New Document</button><br><br>
            
            
            <form id="document-form" style="display: none;">
                <label for="document-input">Previous Document:</label>
                <select id="document" name="document">
                    <option value="">Select Document ID </option>
                </select>
                <button type="button" id="prev-doc-button">Selected Document</button><br><br>
            </form>
            
            <form id="location-form" style="display: none; align-items: center;">
                <label for="location" style="margin-right: 10px;">Location:</label>
                <select id="location" name="location">
                    <option value="">Select Location</option>
                </select>
                <button type="button" id="start-prev-process-button" style="margin-left: 10px; display: none;">Get Document</button>
                <button type="button" id="start-new-process-button" style="margin-left: 10px; display: none;">Start Process</button>
                
            </form>

            <form id="asset-form" style="display: none;">
                <label for="asset-input">ID:</label>
                <input type="text" id="asset-input" name="asset">
                <button type="button" id="finish-process-button" style = "margin-left: 100px;">Finish Process</button>
                <br><br>
            </form>
            <div id="exp-num-container" style= "color : green ; font-size:16px;"></div>
            <form id= "finish-buttons-form" style ="display: none;">
                <h5>Are you sure to End Process?</h5><br>
                <button type="button" id="yes-button" style = "margin-left: 100px;">Yes</button>
                <button type="button" id="stop-process-button" style = "margin-left: 150px;">To Be Count...</button>
                <button type="button" id="no-button" style = "margin-left: 200px;">No</button><br>
            </form>
            <br>
            <div id="msg-first-step"><b>Please, Select Previous Document to continue or Create New Document</b></div>
            <div id="msg-location-id" style="display: none;"><b>Please, Select Location.</b></div>
            <div id="msg-prev-doc" style="display: none;"><b>Please, Select The Previous Document.</b></div>
            <div id="msg-asset-id" style="display: none;"><b>Enter the Asset ID, and the information will be displayed automatically.</b></div><br><br>
            <div id="result-container"></div> <!-- Container to display the result -->
        `;
        $(body).appendTo(this.page.main);
        $("#load-button").on("click", () => {
            $("#location").val("");
            this.locationSelected = false; 
            $("#load-button").hide();
            $("#start-prev-process-button").show();
            $("#new-button").hide();
            $("#asset-form").hide(); 
            $("#location-form").show();
            $("#msg-first-step").hide();
            $("#msg-location-id").show();
           
        });
        $("#prev-doc-button").on("click", () => {
            if (!this.SelectedDocument) {
                frappe.msgprint("Please select a Document before starting the process.");
                return;
            }
            
            $("#new-button").hide();
            $("#load-button").hide();
            $("#msg-asset-id").show();
            $("#asset-form").show();
            $("#msg-prev-doc").hide();
            $("#document-form").hide();
            this.SelectedDocument = $("#document").val();

            frappe.call({
                method : 'masar_assets.api.insert_time_for_timer', 
                args:{
                    doc_name : this.SelectedDocument
                },
                callback: (response) => {
                    this.TimerRowName = response.message;
                    frappe.call({
                        method :'masar_assets.api.get_exp_num', 
                        args:{
                            doc_name : this.SelectedDocument 
                        }, 
                        callback:(response) => {
                            this.ExpNum = response.message.exp;
                            let ExpNumContainer = $("#exp-num-container");
                            ExpNumContainer.empty();
                            if (response.message) {
                                let message = `
                                <b><span style="color: red;">Expected Items: &nbsp;&nbsp; ${this.ExpNum}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <span style="color: green;">Matched Items Counted : ${response.message.match}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: orange;">Total Items Counted : ${response.message.total_count}</b><br><br>
                                `;
                                ExpNumContainer.html(message);
                            }
                        } 
                    });
                    $("#exp-num-container").show();    
                }
            });
        });
        $("#new-button").on("click", () => {
            $("#location").val("");
            this.locationSelected = false;
            $("#new-button").hide();
            $("#load-button").hide();
            $("#location-form").show();
            $("#start-process-button").show();
            $("#start-new-process-button").show();
            $("#start-prev-process-button").hide();
            $("#msg-first-step").hide();
            $("#msg-location-id").show();
        });
        $("#start-prev-process-button").on("click", () => {
            if (!this.locationSelected) {
                frappe.msgprint("Please select a Location before starting the process.");
                return;
            }
            this.PreviousLocationSelected = $("#location").val();
            frappe.call({
                method :'masar_assets.api.get_prev_doc', 
                args:{
                    location : this.PreviousLocationSelected
                },
                callback: (response) => {
                    let options = '<option value="">Select Document</option>';
                response.message.forEach((doc) => {
                    options += `<option value="${doc.name}">${doc.name}</option>`;
                });
                $("#document").html(options);
                if (this.selectedLocation) {
                    $("#location").val(this.selectedLocation);
                }
                }
            });
            $("#new-button").hide();
            $("#load-button").hide();
            $("#location-form").hide();
            $("#start-perv-process-button").hide();
            $("#new-button").hide();
            $("#document-form").show();
            $("#msg-location-id").hide();
            $("#msg-prev-doc").show();
            $("#document").val("");
            this.SelectedDocument = false;
        });
        $("#start-new-process-button").on("click", () => {
            if (!this.locationSelected) {
                frappe.msgprint("Please select a Location before starting the process.");
                return;
            }
            this.selectedLocation = $("#location").val();
            $("#new-button").hide();
            $("#load-button").hide();
            $("#location-form").hide();
            $("#start-new-process-button").hide();
            $("#msg-asset-id").show();
            $("#asset-form").show();
            $("#msg-location-id").hide();
            frappe.call({
                method: "masar_assets.api.create_asset_count",
                args: {
                    location: this.selectedLocation 
                },
                callback: (response) => {
                    this.DocName = response.message ;
                    frappe.call({
                        method : 'masar_assets.api.insert_time_for_timer', 
                        args:{
                            doc_name : this.DocName
                        },
                        callback: (response) => {
                            this.TimerRowName = response.message;
                        }
                    });
                    frappe.call({
                        method :'masar_assets.api.get_exp_num', 
                        args:{
                            doc_name : this.DocName 
                        }, 
                        callback:(response) => {
                            this.ExpNum = response.message.exp;
                            let ExpNumContainer = $("#exp-num-container");
                            ExpNumContainer.empty();
                            if (response.message) {
                                let message = `
                                <b>Expected Items: &nbsp;&nbsp; ${this.ExpNum}</b><br><br>
                                `;
                                ExpNumContainer.html(message);
                            }
                        } 
                    });
                }
            });
        });
        
        $("#asset-input").on("keypress", (event) => {
            if (event.key === "Enter") {
                event.preventDefault();
                this.submitForm();
                $("#asset-input").val("");
            }
        });
        $("#document").on("change", () => {
            this.SelectedDocument = ($("#document").val() !== "");
        });
        $("#start-process-button").on("click", () => {
            if (!this.SelectedDocument) {
                frappe.msgprint("Please select a location before starting the process.");
                return;
            }
            this.selectedLocation = $("#location").val();
            frappe.call({
                method: "masar_assets.api.create_asset_count",
                args: {
                    location: this.selectedLocation 
                },
                callback: (response) => {
                    this.DocName = response.message ; 
                    
                }
            });
            $("#asset-form").show(); 
            $("#location-form").hide(); 
            $("#start-process-button").hide(); 
        });
        $("#no-button").on("click", () => {
            $("#asset-form").show(); 
            $("#location-form").hide(); 
            $("#start-process-button").hide();
            $("#finish-buttons-form").hide();
            $("#exp-num-container").show();   
            $("#msg-asset-id").show(); 

        });
        $("#yes-button").on("click", () => {
            $("#asset-form").hide(); 
            $("#location-form").hide(); 
            $("#start-process-button").hide();
            $("#load-button").show();
            $("#new-button").show();
            $("#finish-buttons-form").hide();
            $("#msg-first-step").show();
            frappe.call({
                method: 'masar_assets.api.end_process_check', 
                args:{
                    timer_row_name : this.TimerRowName,
                    doc_name: this.DocName,
                    selected_doc : this.SelectedDocument
                    // selected_location: this.selectedLocation ,
                },
                callback: (response) => {  
                }
            });
        });
        $("#stop-process-button").on("click", () => {
            $("#msg-first-step").show();  
            $("#asset-form").hide(); 
            $("#location-form").hide(); 
            $("#start-process-button").hide();
            $("#load-button").show();
            $("#new-button").show();
            $("#finish-buttons-form").hide();
            frappe.call({
                method: 'masar_assets.api.uncompleted_process_check', 
                args:{
                    timer_row_name : this.TimerRowName,
                    doc_name: this.DocName,
                    selected_doc : this.SelectedDocument
                    // selected_location: this.selectedLocation ,
                },
                callback: (response) => {  
                }
            });

        });
        $("#finish-process-button").on("click", () => {
            frappe.call({
                method: 'masar_assets.api.submit_asset_count', 
                args:{
                    doc_name: this.DocName,
                    selected_location: this.selectedLocation ,
                },
                callback: (response) => {  
                }
            });
            $("#asset-form").hide(); 
            $("#location-form").hide();
            $("#start-process-button").hide();
            $("#load-button").hide();
            $("#new-button").hide();
            $("#exp-num-container").hide();
            $("#finish-buttons-form").show();
            $("#msg-asset-id").hide(); 
            
        });
        this.populateLocationDropdown();
        $("#location").on("change", () => {
            this.locationSelected = ($("#location").val() !== "");
        });

    }

    populateLocationDropdown() {
        frappe.call({
            method: "masar_assets.api.get_location",
            callback: (response) => {
                let options = '<option value="">Select Location</option>';
                response.message.forEach((item) => {
                    options += `<option value="${item.name}">${item.name}</option>`;
                });
                $("#location").html(options);
                if (this.selectedLocation) {
                    $("#location").val(this.selectedLocation);
                }
            }
        });
    }

    submitForm() {
        let asset = $("#asset-input").val();

        if (asset) {
            frappe.call({
                method: 'masar_assets.api.insert_asset_in_table', 
                args:{
                    doc_name: this.DocName,
                    asset : asset,
                    selected_location: this.selectedLocation ,
                    document :this.SelectedDocument , 
                },
                callback: (response) => {
                }
            });
            frappe.call({
                method: "masar_assets.api.get_qr_code",
                args: { selected_location: this.selectedLocation, name: asset },
                callback: (response) => {
                    this.AssetPostionStatus = response.message.status;
                    if (response.message.status === 'Match') {
                        this.AssetPostionStatusColor = 'green';
                    } else if (response.message.status === 'Additional') {
                        this.AssetPostionStatusColor = 'orange';
                    }
                    let resultContainer = $("#result-container");
                    resultContainer.empty();
                    if (response.message && response.message.result.length > 0) {
                        let message = `
                        <b>Result:</b>
                        <br>
                        <table class='datatable'>
                            <thead>
                                <tr>
                                    <th style='width:500px'>Asset ID</th>
                                    <th style='width:180px'>Asset Name</th>
                                    <th style='width:180px'>Item Code</th>
                                    <th style='width:180px'>Item Name</th>
                                    <th style='width:300px'>Location</th>
                                    <th style='width:200px'>Department</th>
                                    <th style='width:200px'>Asset Image</th>
                                    <th style='width:200px'>QR Code</th>
                                    <th style='width:200px'>Asset Status</th>
                                    <th style='width:250px'>Asset Count Status</th>
                                </tr>
                            </thead>
                        <tbody>`;
                        $.each(response.message.result, (index, item) => {
                            message += `<tr>
                                            <td>${item.name}</td>
                                            <td>${item.asset_name}</td>
                                            <td>${item.item_code}</td>
                                            <td>${item.item_name}</td>
                                            <td>${item.location}</td>
                                            <td>${item.department == null ? '' : item.department }</td>
                                            <td><img src="${item.image == null ? '': item.image}" style="max-width: 100px; max-height: 100px;">
                                            </td><td><img src="${item.custom_qr_code_text == null ? '' : item.custom_qr_code_text}" style="max-width: 100px; max-height: 100px;">
                                            </td><td>${item.status}</td>
                                            <td style="color: ${this.AssetPostionStatusColor}"><b>${this.AssetPostionStatus}</b></td>
                                        </tr>`;
                        });
                        message += "</tbody></table>";
                        resultContainer.html(message);
                        $('.datatable').DataTable();
                        if (response.custom_qr_code_text) {
                            $("#qr_code_image").html(`<img src="${response.custom_qr_code_text}">`);
                        }
                    } else {
                        resultContainer.html("No data found for the given asset ID.");
                    }
                }
            }); 
            
        }
    }
}
