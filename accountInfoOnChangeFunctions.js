var fieldsToToggle = ["name", "telephone1", "fax", "websiteurl", "parentaccountid", "tickersymbol"];

function checkUserRole(executionContext) {
    var formContext = executionContext.getFormContext();
    var userRoles = Xrm.Utility.getGlobalContext().userSettings.roles;

    var isSysAdmin = false;

    userRoles.forEach(function (role) {
        if (role.name === "System Administrator") {
            isSysAdmin = true;
        }
    });

    var stateField = formContext.getAttribute("cre76_state");

    if (stateField) {
        if (isSysAdmin) {
            stateField.setValue(1); // 1 for Enabled
        } else {
            stateField.setValue(2); // 2 for Disabled
        }
    } else {
        console.error("Field 'cre76_state' is not found on the form.");
    }
}

function onVisibilityChange(executionContext) {
    var formContext = executionContext.getFormContext();

    var visibility = formContext.getAttribute("cre76_visibility").getValue();
    var applyToAll = formContext.getAttribute("cre76_applytoall").getValue();

    var accountNameControl = formContext.getControl("name");

    if (visibility === 1 && !applyToAll) { // Visible and Apply to all is not selected
        accountNameControl.setVisible(true);
    } else if (visibility === 2 && !applyToAll) { // Hidden and Apply to all is not selected
        accountNameControl.setVisible(false);
    } else if (visibility === 1 && applyToAll) { // Visible and Apply to all is selected
        fieldsToToggle.forEach(function (fieldName) {
            var control = formContext.getControl(fieldName);
            if (control) {
                control.setVisible(true);
            }
        });
    } else if (visibility === 2 && applyToAll) { // Hidden and Apply to all is selected
        fieldsToToggle.forEach(function (fieldName) {
            var control = formContext.getControl(fieldName);
            if (control) {
                control.setVisible(false);
            }
        });
    }
}

function onStateChange(executionContext) {
    var formContext = executionContext.getFormContext();

    var state = formContext.getAttribute("cre76_state").getValue();
    var applyToAll = formContext.getAttribute("cre76_applytoall").getValue();

    var accountNameControl_1 = formContext.getControl("name");

    if (state === 1 && !applyToAll) { // Enabled and Apply to all is not selected
        accountNameControl_1.setDisabled(false);
    } else if (state === 2 && !applyToAll) { // Disabled and Apply to all is not selected
        accountNameControl_1.setDisabled(true);
    } else if (state === 1 && applyToAll) { // Enabled and Apply to all is selected
        fieldsToToggle.forEach(function (fieldName) {
            var control = formContext.getControl(fieldName);
            if (control) {
                control.setDisabled(false);
            }
        });
    } else if (state === 2 && applyToAll) { // Disabled and Apply to all is selected
        fieldsToToggle.forEach(function (fieldName) {
            var control = formContext.getControl(fieldName);
            if (control) {
                control.setDisabled(true);
            }
        });
    }
}

function onRequirementChange(executionContext) {
    var formContext = executionContext.getFormContext();

    var requirement = formContext.getAttribute("cre76_requirement").getValue();
    var applyToAll = formContext.getAttribute("cre76_applytoall").getValue();

    var accountNameAttribute = formContext.getAttribute("name");

    if (requirement === 1 && !applyToAll) { // Required and Apply to all is not selected
        accountNameAttribute.setRequiredLevel("required");
    } else if (requirement === 2 && !applyToAll) { // Does not required and Apply to all is not selected
        accountNameAttribute.setRequiredLevel("none");
    } else if (requirement === 1 && applyToAll) { // Required and Apply to all is selected
        fieldsToToggle.forEach(function (fieldName) {
            var attribute = formContext.getAttribute(fieldName);
            if (attribute) {
                attribute.setRequiredLevel("required");
            }
        });
    } else if (requirement === 2 && applyToAll) { // Does not required and Apply to all is selected
        fieldsToToggle.forEach(function (fieldName) {
            var attribute = formContext.getAttribute(fieldName);
            if (attribute) {
                attribute.setRequiredLevel("none");
            }
        });
    }
}