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

import React, { ReactElement } from "react";
import { Section, Button } from "@wso2is/react-components";
import { useTranslation } from "react-i18next";
import { SettingsSectionIcons } from "../../configs";
import { Forms, Field } from "@wso2is/forms";
import { Grid } from "semantic-ui-react";

export const ResidentRealmConfig: any = (props: any): ReactElement => {

    const { t } = useTranslation();
    
    return (
		<Section
			description={ t("devPortal:components.serverConfigs.selfRegistration.description") }
			header={ t("devPortal:components.serverConfigs.selfRegistration.heading") }
			iconMini={ SettingsSectionIcons.federatedAssociationsMini }
			iconSize="auto"
			iconStyle="colored"
			iconFloated="right"
			onPrimaryActionClick={ () => { console.log() } }
			primaryAction={ t("devPortal:components.serverConfigs.selfRegistration.actionTitles.config") }
			primaryActionIcon="key"
		>
            <Forms 
                onSubmit={ (values) => { 
                    console.log(values);
                } }
            >
                <Grid>
                    <Grid.Row columns={ 1 }>
                        <Grid.Column mobile={ 12 } tablet={ 12 } computer={ 6 }>
                            <Field
                                name={ "homerealm" }
                                label={ t("devPortal:components.roles.edit.basics.fields.roleName") }
                                required={ false }
                                requiredErrorMessage={ "Role name is required" }
                                placeholder={ "Enter home realm identifier" }
                                type="text"
                            />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={ 1 }>
                        <Grid.Column mobile={ 12 } tablet={ 12 } computer={ 6 }>
                            <Field
                                name={ "idlesession" }
                                label={ t("devPortal:components.roles.edit.basics.fields.roleName") }
                                required={ true }
                                requiredErrorMessage={ "Role name is required" }
                                placeholder={ "Enter your role name" }
                                type="text"
                            />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={ 1 }>
                        <Grid.Column mobile={ 12 } tablet={ 12 } computer={ 6 }>
                            <Field
                                name={ "rememberme`" }
                                label={ t("devPortal:components.roles.edit.basics.fields.roleName") }
                                required={ true }
                                requiredErrorMessage={ "Role name is required" }
                                placeholder={ "Enter your role name" }
                                type="text"
                            />
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row columns={ 1 }>
                        <Grid.Column mobile={ 16 } tablet={ 16 } computer={ 8 }>
                            <Button primary type="submit" size="small" className="form-button">
                                Update
                            </Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Forms>
		</Section>
	);
}
