/**
 * Copyright (c) 2021, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { FormValidation } from "@wso2is/validation";
import { FieldConstants } from "../constants";

/**
 * Util method to apply default validations to the fields.
 *
 * @param field string - HTML input type of the field.
 * @param fieldType string - Usage type of the field
 * @param value - value of the field.
 */
export const getDefaultValidation = (field: string, fieldType: string, value: any): string => {

    if (field === "text") {
        switch (fieldType) {
            case "resourceName":
                if (!FormValidation.resourceName(value)) {
                    return FieldConstants.INVALID_NAME_ERROR;
                }
                break;
            case "email":
                if (!FormValidation.email(value)) {
                    return FieldConstants.INVALID_EMAIL_ERROR;
                }
                break;
            case "phoneNumber":
                if (!FormValidation.mobileNumber(value)) {
                    return FieldConstants.INVALID_PHONE_NUMBER_ERROR;
                }
                break;
            case "url":
                if (!FormValidation.url(value)) {
                    return FieldConstants.INVALID_URL_ERROR;
                }
                break;
        }
    }
};

export const getValidation = (value: any, field: string, fieldType: string, validation: any, required: boolean) => {

    if (required && !value) {
        return FieldConstants.FIELD_REQUIRED_ERROR;
    }

    if (validation instanceof Promise) {
        validation.then(message => {
            return message;
        });
    }

    return getDefaultValidation(field, fieldType, value);
};
