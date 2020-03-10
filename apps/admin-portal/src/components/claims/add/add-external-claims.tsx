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

import React, { useEffect, useState } from "react";
import { Header, Modal } from "semantic-ui-react";
import { AlertLevels, Claim, ClaimDialect } from "../../../models";
import { LinkButton, PrimaryButton } from "@wso2is/react-components";
import { addExternalClaim, getLocalClaims } from "../../../api";
import { Field, FormValue, Forms, useTrigger } from "@wso2is/forms";
import { useDispatch } from "react-redux";
import { addAlert } from "../../../store/actions";

interface AddExternalClaimsPropsInterface {
    open: boolean;
    onClose: () => void;
    dialect: ClaimDialect;
    update: () => void;
}
export const AddExternalClaims = (props: AddExternalClaimsPropsInterface): React.ReactElement => {

    const { open, onClose, dialect, update } = props;

    const [localClaims, setLocalClaims] = useState<Claim[]>();

    const [submit, setSubmit] = useTrigger();

    const dispatch = useDispatch();

    useEffect(() => {
        getLocalClaims().then(response => {
            setLocalClaims(response);
        }).catch(error => {
            dispatch(addAlert(
                {
                    description: error?.description,
                    level: AlertLevels.ERROR,
                    message: error?.message
                }
            ));
        })
    }, []);

    return (
        <Modal
            dimmer="blurring"
            size="tiny"
            open={ open }
            onClose={ onClose }
        >
            <Modal.Header>
                <Header as="h3" content="Add an External Claim" subheader={ "to " + dialect?.dialectURI } />
            </Modal.Header>
            <Modal.Content>
                <Forms
                    onSubmit={ (values: Map<string,FormValue>): void => {
                        addExternalClaim(dialect.id, {
                            claimURI: values.get("claimURI").toString(),
                            mappedLocalClaimURI: values.get("localClaim").toString()
                        }).then(() => {
                            dispatch(addAlert(
                                {
                                    description: "The external claim has been added to the dialect successfully!",
                                    level: AlertLevels.SUCCESS,
                                    message: "External claim added successfully"
                                }
                            ));
                            onClose();
                            update();
                        }).catch(error => {
                            dispatch(addAlert(
                                {
                                    description: error?.description,
                                    level: AlertLevels.ERROR,
                                    message: error?.message
                                }
                            ));
                        })
                    } }
                    submitState={ submit }
                >
                    <Field
                        name="claimURI"
                        label="Claim URI"
                        required={ true }
                        requiredErrorMessage="Claim URI is required"
                        placeholder="Enter a claim URI"
                        type="text"
                    />
                    <Field
                        type="dropdown"
                        name="localClaim"
                        label="Local Claim URI to map to"
                        required={ true }
                        requiredErrorMessage="Select a local claim to map to"
                        placeholder="Select a Local Claim"
                        search
                        children={
                            localClaims?.map((claim: Claim, index) => {
                                return {
                                    key: index,
                                    value: claim.claimURI,
                                    text: claim.displayName
                                }
                            })
                        }
                    />
                </Forms>
            </Modal.Content>
            <Modal.Actions>
                <LinkButton
                    onClick={ onClose }
                >
                    Cancel
                </LinkButton>
                <PrimaryButton
                    onClick={ (): void => {
                        setSubmit();
                    } }
                >
                    Add
                </PrimaryButton>
            </Modal.Actions>
        </Modal>
    )
}
