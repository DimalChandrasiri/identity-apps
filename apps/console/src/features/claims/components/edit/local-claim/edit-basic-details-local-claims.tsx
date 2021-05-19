/**
* Copyright (c) 2020, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
*
* WSO2 Inc. licenses this file to you under the Apache License,
* Version 2.0 (the 'License'); you may not use this file except
* in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* 'AS IS' BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied. See the License for the
* specific language governing permissions and limitations
* under the License.
*/

import { getProfileSchemas } from "@wso2is/core/api";
import { IdentityAppsApiException } from "@wso2is/core/exceptions";
import {
    AlertInterface,
    AlertLevels,
    Claim,
    ProfileSchemaInterface,
    TestableComponentInterface
} from "@wso2is/core/models";
import { addAlert, setProfileSchemaRequestLoadingStatus, setSCIMSchemas } from "@wso2is/core/store";
import { Field, Form } from "@wso2is/form";
import {
    ConfirmationModal,
    CopyInputField,
    DangerZone,
    DangerZoneGroup,
    EmphasizedSegment,
    Hint,
    PrimaryButton
} from "@wso2is/react-components";
import React, { FunctionComponent, ReactElement, useEffect, useRef, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { Divider, Grid , Form as SemanticForm } from "semantic-ui-react";
import { attributeConfig } from "../../../../../extensions";
import { AppConstants, history } from "../../../../core";
import { deleteAClaim, updateAClaim } from "../../../api";

/**
 * Prop types for `EditBasicDetailsLocalClaims` component
 */
interface EditBasicDetailsLocalClaimsPropsInterface extends TestableComponentInterface {
    /**
     * The claim to be edited
     */
    claim: Claim;
    /**
     * The function to be called to initiate an update
     */
    update: () => void;
}

/**
 * This component renders the Basic Details pane of the edit local claim screen
 *
 * @param {EditBasicDetailsLocalClaimsPropsInterface} props - Props injected to the component.
 *
 * @return {React.ReactElement}
 */
export const EditBasicDetailsLocalClaims: FunctionComponent<EditBasicDetailsLocalClaimsPropsInterface> = (
    props: EditBasicDetailsLocalClaimsPropsInterface
): ReactElement => {

    const {
        claim,
        update,
        [ "data-testid" ]: testId
    } = props;

    const dispatch = useDispatch();

    const [ isShowDisplayOrder, setIsShowDisplayOrder ] = useState(false);
    const [ confirmDelete, setConfirmDelete ] = useState(false);

    const nameField = useRef<HTMLElement>(null);
    const regExField = useRef<HTMLElement>(null);
    const displayOrderField = useRef<HTMLElement>(null);
    const descriptionField = useRef<HTMLElement>(null);

    const { t } = useTranslation();

    useEffect(() => {
        if (claim?.supportedByDefault) {
            setIsShowDisplayOrder(true);
        }
    }, [ claim ]);

    const deleteConfirmation = (): ReactElement => (
        <ConfirmationModal
            onClose={ (): void => setConfirmDelete(false) }
            type="warning"
            open={ confirmDelete }
            assertion={ claim.displayName }
            assertionHint={
                <p>
                    <Trans i18nKey="console:manage.features.claims.local.confirmation.hint">
                        Please type <strong>{ { name: claim.displayName } }</strong> to confirm.
                    </Trans>
                </p>
            }
            assertionType="input"
            primaryAction={ t("console:manage.features.claims.local.confirmation.primaryAction") }
            secondaryAction={ t("common:cancel") }
            onSecondaryActionClick={ (): void => setConfirmDelete(false) }
            onPrimaryActionClick={ (): void => deleteLocalClaim(claim.id) }
            data-testid={ `${ testId }-delete-confirmation-modal` }
            closeOnDimmerClick={ false }
        >
            <ConfirmationModal.Header>
                { t("console:manage.features.claims.local.confirmation.header") }
            </ConfirmationModal.Header>
            <ConfirmationModal.Message attached warning>
                { t("console:manage.features.claims.local.confirmation.message") }
            </ConfirmationModal.Message>
            <ConfirmationModal.Content>
                { t("console:manage.features.claims.local.confirmation.content") }
            </ConfirmationModal.Content>
        </ConfirmationModal>
    );

    /**
     * This deletes a local claim
     * @param {string} id
     */
    const deleteLocalClaim = (id: string) => {
        deleteAClaim(id).then(() => {
            history.push(AppConstants.getPaths().get("LOCAL_CLAIMS"));
            dispatch(addAlert(
                {
                    description: t("console:manage.features.claims.local.notifications.deleteClaim.success." +
                        "description"),
                    level: AlertLevels.SUCCESS,
                    message: t("console:manage.features.claims.local.notifications.deleteClaim.success.message")
                }
            ));
        }).catch(error => {
            dispatch(addAlert(
                {
                    description: error?.description
                        || t("console:manage.features.claims.local.notifications.deleteClaim.genericError.description"),
                    level: AlertLevels.ERROR,
                    message: error?.message
                        || t("console:manage.features.claims.local.notifications.deleteClaim.genericError.message")
                }
            ));
        });
    };

    /**
     * Fetch the updated SCIM2 schema list.
     */
    const fetchUpdatedSchemaList = (): void => {
        dispatch(setProfileSchemaRequestLoadingStatus(true));

        getProfileSchemas()
            .then((response: ProfileSchemaInterface[]) => {
                dispatch(setSCIMSchemas<ProfileSchemaInterface[]>(response));
            })
            .catch((error: IdentityAppsApiException) => {
                if (error?.response?.data?.description) {
                    dispatch(addAlert({
                            description: error.response.data.description,
                            level: AlertLevels.ERROR,
                            message: t("console:manage.notifications.getProfileSchema.error.message")
                        })
                    );
                }

                dispatch(
                    addAlert<AlertInterface>({
                        description: t(
                            "console:manage.notifications.getProfileSchema.genericError.description"
                        ),
                        level: AlertLevels.ERROR,
                        message: t(
                            "console:manage.notifications.getProfileSchema.genericError.message"
                        )
                    })
                );
            })
            .finally(() => {
                dispatch(setProfileSchemaRequestLoadingStatus(false));
            });
    };

    const onSubmit = (values) => {
        const data: Claim = {
            attributeMapping: claim.attributeMapping,
            claimURI: claim.claimURI,
            description: values?.description !== undefined ? values.description?.toString() : claim?.description,
            displayName: values?.name !== undefined ? values.name?.toString() : claim?.displayName,
            displayOrder: attributeConfig.editAttributes.getDisplayOrder(
                claim.displayOrder, values.displayOrder?.toString()),
            properties: claim.properties,
            readOnly: values?.readOnly !== undefined ? !!values.readOnly : claim?.readOnly,
            regEx:  values?.regularExpression !== undefined ? values.regularExpression?.toString() : claim?.regEx,
            required: values?.required !== undefined ? !!values.required : claim?.required,
            supportedByDefault: values?.supportedByDefault !== undefined ? !!values.supportedByDefault : claim?.supportedByDefault
        };
        updateAClaim(claim.id, data).then(() => {
            dispatch(addAlert(
                {
                    description: t("console:manage.features.claims.local.notifications." +
                        "updateClaim.success.description"),
                    level: AlertLevels.SUCCESS,
                    message: t("console:manage.features.claims.local.notifications." +
                        "updateClaim.success.message")
                }
            ));
            update();
            fetchUpdatedSchemaList();
        }).catch(error => {
            dispatch(addAlert(
                {
                    description: error?.description
                        || t("console:manage.features.claims.local.notifications.updateClaim." +
                            "genericError.description"),
                    level: AlertLevels.ERROR,
                    message: error?.message
                        || t("console:manage.features.claims.local.notifications." +
                            "updateClaim.genericError.description")
                }
            ));
        });
    };

    return (
        <>
            { confirmDelete && deleteConfirmation() }
            <EmphasizedSegment padded="very">
                <Grid>
                    <Grid.Row columns={ 1 }>
                        <Grid.Column tablet={ 16 } computer={ 12 } largeScreen={ 9 } widescreen={ 6 } mobile={ 16 }>
                            <SemanticForm>
                                <SemanticForm.Field
                                    data-testid={ `${ testId }-form-attribute-uri-readonly-input` }
                                >
                                    <label>{ t("console:manage.features.claims.local.attributes.attributeURI") }</label>
                                    <CopyInputField value={ claim ? claim.claimURI : "" } />
                                    <Hint>Unique identifier of the attribute.</Hint>
                                </SemanticForm.Field>
                            </SemanticForm>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <Form
                    onSubmit={ (values): void => {
                        onSubmit(values);
                    } }
                    data-testid={ testId }
                >
                    <Field.Input
                        ariaLabel="name"
                        inputType="name"
                        name="name"
                        label={ t("console:manage.features.claims.local.forms.name.label") }
                        required={ true }
                        message={ t("console:manage.features.claims.local.forms." +
                            "name.requiredErrorMessage") }
                        placeholder={ t("console:manage.features.claims.local.forms.name.placeholder") }
                        value={ claim?.displayName }
                        ref={ nameField }
                        validation={ (value: string) => {
                            if (!value.toString().match(/^[A-za-z0-9#+._\-\s]{1,30}$/)) {
                                return t("console:manage.features.claims.local" +
                                    ".forms.name.validationErrorMessages.invalidName");
                            }
                        } }
                        data-testid={ `${ testId }-form-name-input` }
                        maxLength={ 30 }
                        minLength={ 1 }
                        hint={ t("console:manage.features.claims.local.forms.nameHint") }
                    />
                    <Field.Textarea
                        ariaLabel="description"
                        inputType="resourceName"
                        name="description"
                        label={ t("console:manage.features.claims.local.forms.description.label") }
                        required={ true }
                        message={ t("console:manage.features.claims.local.forms.description." +
                            "requiredErrorMessage") }
                        placeholder={
                            t("console:manage.features.claims.local.forms.description.placeholder")
                        }
                        ref={ descriptionField }
                        value={ claim?.description }
                        maxLength={ 300 }
                        minLength={ 3 }
                        data-testid={ `${ testId }-form-description-input` }
                        hint={ t("console:manage.features.claims.local.forms.descriptionHint") }
                    />
                    <Field.Input
                        ariaLabel="regularExpression"
                        inputType="resourceName"
                        name="regularExpression"
                        label={ t("console:manage.features.claims.local.forms.regEx.label") }
                        required={ false }
                        requiredErrorMessage=""
                        placeholder={ t("console:manage.features.claims.local.forms.regEx.placeholder") }
                        value={ claim?.regEx }
                        ref={ regExField }
                        data-testid={ `${ testId }-form-regex-input` }
                        maxLength={ 50 }
                        minLength={ 3 }
                        hint={ t("console:manage.features.claims.local.forms.regExHint") }
                    />
                    {
                        claim &&
                        <Field.Checkbox
                            ariaLabel="supportedByDefault"
                            name="supportedByDefault"
                            label={ t("console:manage.features.claims.local.forms.supportedByDefault.label") } 
                            required={ false }
                            value={ claim?.supportedByDefault ? ["supportedByDefault"] : [] }
                            listen={ (values) => {
                                setIsShowDisplayOrder(!!values?.supportedByDefault);
                            } }
                            data-testid={ `${testId}-form-supported-by-default-input` }
                        />
                    }
                    {
                        attributeConfig.editAttributes.showDisplayOrderInput && isShowDisplayOrder
                        && (
                            <Field.Input
                                ariaLabel="displayOrder"
                                inputType="default"
                                name="displayOrder"
                                type="number"
                                min="0"
                                label={ t("console:manage.features.claims.local.forms.displayOrder" +
                                    ".label") }
                                required={ false }
                                placeholder={ t("console:manage.features.claims.local.forms." +
                                    "displayOrder.placeholder") }
                                value={ claim?.displayOrder.toString() || 0 }
                                maxLength={ 50 }
                                minLength={ 1 }
                                ref={ displayOrderField }
                                data-testid={ `${ testId }-form-display-order-input` }
                                hint={ t("console:manage.features.claims.local.forms.displayOrderHint") }
                            />
                        )
                    }
                    {
                        claim && attributeConfig.editAttributes.showRequiredCheckBox &&
                            <Field.Checkbox
                                ariaLabel="required"
                                name="required"
                                required={ false }
                                requiredErrorMessage=""
                                label={ t("console:manage.features.claims.local.forms.required.label") }
                                value={ claim?.required ? [ "required" ] : [] }
                                data-testid={ `${ testId }-form-required-checkbox` }
                            />
                    }
                    {
                        claim &&
                        <Field.Checkbox
                            ariaLabel="readOnly"
                            name="readOnly"
                            required={ false }
                            label={ t("console:manage.features.claims.local.forms.readOnly.label") }
                            requiredErrorMessage=""
                            value={ claim?.readOnly ? [ "readOnly" ] : [] }
                            data-testid={ `${ testId }-form-readonly-checkbox` }
                        />
                    }
                    <Field.Button
                        ariaLabel="submit"
                        size="small"
                        buttonType="primary_btn"
                        label={ t("common:update") }
                        name="submit"
                    />
                </Form>
            </EmphasizedSegment>
            <Divider hidden />
            {
                attributeConfig.editAttributes.showDangerZone &&
                <DangerZoneGroup
                    sectionHeader={ t("common:dangerZone") }
                    data-testid={ `${ testId }-danger-zone-group` }
                >
                    <DangerZone
                        actionTitle={ t("console:manage.features.claims.local.dangerZone.actionTitle") }
                        header={ t("console:manage.features.claims.local.dangerZone.header") }
                        subheader={ t("console:manage.features.claims.local.dangerZone.subheader") }
                        onActionClick={ () => setConfirmDelete(true) }
                        data-testid={ `${ testId }-local-claim-delete-danger-zone` }
                    />
                </DangerZoneGroup>
            }
        </>
    );
};

/**
 * Default props for the component.
 */
EditBasicDetailsLocalClaims.defaultProps = {
    "data-testid": "local-claims-basic-details-edit"
};
