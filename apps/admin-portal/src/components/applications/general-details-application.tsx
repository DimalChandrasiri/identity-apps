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

import { Field, Forms } from "@wso2is/forms";
import React, { FunctionComponent } from "react";
import { Button, Grid } from "semantic-ui-react";
import { updateApplicationDetails } from "../../api";
import { ApplicationInterface } from "../../models";

interface GeneralSettingsProps {
    appId?: string;
    name: string;
    description?: string;
    imageUrl?: string;
    accessUrl?: string;
}

/**
 * Component to edit general details of the application.
 *
 * @param props GeneralSettingsProps.
 */
export const GeneralDetailsApplication: FunctionComponent<GeneralSettingsProps> = (props): JSX.Element => {
    const {
        appId,
        name,
        description,
        imageUrl,
        accessUrl
    } = props;

    const handleSubmit = (values) => {
        const submit: ApplicationInterface = {
            accessUrl: values.get("accessUrl").toString(),
            description: values.get("description").toString(),
            id: appId,
            imageUrl: values.get("imageUrl").toString(),
            name: values.get("name").toString(),
        };
        updateApplicationDetails(submit)
            .then((response) => {
                //  TODO Add to Notification.
            })
            .catch((error) => {
                //  TODO Add to Notification.
            });
    };

    return (
        <>
            { appId &&
            (
                <Forms
                    onSubmit={ (values) => {
                        handleSubmit(values);
                    } }
                >
                    <Grid className={ "protocolForm" }>
                        <Grid.Row columns={ 1 } className={ "protocolRow" }>
                            <Grid.Column mobile={ 16 } tablet={ 16 } computer={ 14 } className="protocolColumn">
                                <Field
                                    name="name"
                                    label="Name"
                                    required={ true }
                                    requiredErrorMessage="Application name is required"
                                    placeholder={ name }
                                    type="text"
                                    value={ name }
                                />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row columns={ 1 } className={ "protocolRow" }>
                            <Grid.Column mobile={ 16 } tablet={ 16 } computer={ 14 } className="protocolColumn">
                                <Field
                                    name="description"
                                    label="Description"
                                    required={ false }
                                    requiredErrorMessage=""
                                    placeholder="Provide the description of the application"
                                    type="text"
                                    value={ description }
                                />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row columns={ 1 } className={ "protocolRow" }>
                            <Grid.Column mobile={ 16 } tablet={ 16 } computer={ 14 } className="protocolColumn">
                                <Field
                                    name="imageUrl"
                                    label="ImageUrl"
                                    required={ false }
                                    requiredErrorMessage=""
                                    placeholder="Provide the image url for the application"
                                    type="text"
                                    value={ imageUrl }
                                />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row columns={ 1 } className={ "protocolRow" }>
                            <Grid.Column mobile={ 16 } tablet={ 16 } computer={ 14 } className="protocolColumn">
                                <Field
                                    name="accessUrl"
                                    label="AccessUrl"
                                    required={ false }
                                    requiredErrorMessage=""
                                    placeholder="Provide the access url for the application login page"
                                    type="text"
                                    value={ accessUrl }
                                />
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row columns={ 1 } className={ "protocolRow" }>
                            <Grid.Column mobile={ 16 } tablet={ 16 } computer={ 14 } className="protocolColumn">
                                <Button primary type="submit" size="small" className="form-button">
                                    Update
                                </Button>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Forms
                >
            )
            }
        </>
    );
};
