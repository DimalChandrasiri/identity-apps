/**
 * Copyright (c) 2020, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
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

import { TestableComponentInterface } from "@wso2is/core/models";
import { Field, FormValue, Forms, Validation } from "@wso2is/forms";
import { FormValidation } from "@wso2is/validation";
import React, { FunctionComponent, ReactElement, useState } from "react";
import { useTranslation } from "react-i18next";
import { Grid } from "semantic-ui-react";
import { getIdentityProviderList } from "../../../../api";
import { IdentityProviderInterface } from "../../../../models";
import { handleGetIDPListCallError } from "../../../utils";

/**
 * Proptypes for the general settings wizard form component.
 */
interface GeneralSettingsWizardFormPropsInterface extends TestableComponentInterface {
    initialValues: IdentityProviderInterface;
    triggerSubmit: boolean;
    onSubmit: (values: IdentityProviderInterface) => void;
}

/**
 * General settings wizard form component.
 *
 * @param {GeneralSettingsWizardFormPropsInterface} props - Props injected to the component.
 * @return {ReactElement}
 */
export const GeneralSettings: FunctionComponent<GeneralSettingsWizardFormPropsInterface> = (
    props: GeneralSettingsWizardFormPropsInterface
): ReactElement => {

    const {
        initialValues,
        triggerSubmit,
        onSubmit,
        [ "data-testid" ]: testId
    } = props;

    const [ isNameValid, setIsNameValid ] = useState<boolean>(false);

    const { t } = useTranslation();

    return (
        <Forms
            onSubmit={ (values): void => {
                const data: IdentityProviderInterface = {
                    description: values.get("description").toString(),
                    image: values.get("image").toString(),
                    name: values.get("name").toString()
                }

                onSubmit(data);
            } }
            submitState={ triggerSubmit }
            data-testid={ testId }
        >
            <Grid>
                <Grid.Row columns={ 1 }>
                    <Grid.Column mobile={ 16 } tablet={ 16 } computer={ 8 }>
                        <Field
                            name="name"
                            label={ t("devPortal:components.idp.forms.generalDetails.name.label") }
                            required={ true }
                            requiredErrorMessage={ t("devPortal:components.idp.forms.generalDetails." +
                                "name.validations.empty") }
                            placeholder={ t("devPortal:components.idp.forms." +
                                "generalDetails.name.placeholder") }
                            type="text"
                            validation={ async (value: string, validation: Validation) => {
                                if (!isNameValid) {
                                    validation.isValid = false;
                                    validation.errorMessages.push(t("devPortal:components.idp.forms." +
                                        "generalDetails.name.validations.duplicate"));
                                }
                            } }
                            listen={ (values: Map<string, FormValue>) => {
                                getIdentityProviderList(
                                    null, null, "name eq " + values.get("name").toString()).then((response) => {
                                        if (response?.totalResults === 0) {
                                            setIsNameValid(true);
                                        } else {
                                            setIsNameValid(false);
                                        }
                                    }).catch((error) => {
                                        handleGetIDPListCallError(error);
                                    });
                            }
                            }
                            value={ initialValues?.name }
                            data-testid={ `${ testId }-idp-name` }
                        />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={ 1 }>
                    <Grid.Column mobile={ 16 } tablet={ 16 } computer={ 8 }>
                        <Field
                            name="description"
                            label={ t("devPortal:components.idp.forms.generalDetails.description.label") }
                            required={ false }
                            requiredErrorMessage=""
                            placeholder={ t("devPortal:components.idp.forms." +
                                "generalDetails.description.placeholder") }
                            type="textarea"
                            value={ initialValues?.description }
                            data-testid={ `${ testId }-idp-description` }
                        />
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row columns={ 1 }>
                    <Grid.Column mobile={ 16 } tablet={ 16 } computer={ 8 }>
                        <Field
                            name="image"
                            label={ t("devPortal:components.idp.forms.generalDetails.image.label") }
                            required={ false }
                            requiredErrorMessage=""
                            placeholder={ t("devPortal:components.idp.forms.generalDetails.image.placeholder") }
                            type="text"
                            validation={ (value: string, validation: Validation) => {
                                if (!FormValidation.url(value)) {
                                    validation.isValid = false;
                                    validation.errorMessages.push(t("devPortal:components.idp.forms." +
                                        "common.invalidURLErrorMessage"));
                                }
                            } }
                            value={ initialValues?.image }
                            data-testid={ `${ testId }-idp-image` }
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Forms>
    );
};
