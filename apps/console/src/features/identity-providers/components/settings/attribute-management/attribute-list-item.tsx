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
import _ from "lodash";
import React, { FunctionComponent, ReactElement, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useStore } from "react-redux";
import { Button, Dropdown, DropdownItemProps, Icon, Input, Label, Table } from "semantic-ui-react";
import { IdentityProviderClaimInterface, IdentityProviderClaimItemInterface, IdentityProviderCommonClaimMappingInterface } from "../../../models";

interface AttributeListItemPropInterface extends TestableComponentInterface {
    selectedAttribute?: IdentityProviderClaimItemInterface;
    attributeList?: IdentityProviderClaimInterface[];
    placeholder?: string;
    updateMapping?: (mapping: IdentityProviderCommonClaimMappingInterface) => void;
    mapping?: string;
}

/**
 * Selected Attribute list item.
 *
 * @param props AttributeListItemPropInterface
 */
export const AttributeListItem: FunctionComponent<AttributeListItemPropInterface> = (
    props
): ReactElement => {

    const {
        selectedAttribute,
        attributeList,
        updateMapping,
        mapping,
        placeholder,
        [ "data-testid" ]: testId
    } = props;

    const { t } = useTranslation();

    const [ attributeDropDown, setAttributeDropDown ] = useState<DropdownItemProps[]>([]);

    /**
     * Create dropdown list from attribute list.
     */
    useEffect(() => {
        const dropdownList: DropdownItemProps[] = [];
        attributeList.map(attribute => {
            dropdownList.push({
                content: (
                    <>
                        <span>{ attribute.displayName }</span>
                        <span>{ attribute.uri }</span>
                    </>
                ),
                text: attribute.displayName,
                value: attribute.uri
            });
        });
        setAttributeDropDown(dropdownList);
    },[ attributeList ]);


    /* handleClaimMapping = (e) => {
        const mappingValue = e.target.value;
        updateMapping({
            claim: selectedAttribute,
            mappedValue: mappingValue
        } as IdentityProviderCommonClaimMappingInterface);
    };*/

    return (
        <Table.Row data-testid={ testId }>
            {
                <>
                    <Table.Cell error={ _.isEmpty(mapping) }>
                        <Input
                            placeholder={ placeholder }
                            value={ _.isEmpty(mapping) ? "" : mapping }
                            onChange={ () => { console.log() } }
                            required
                            data-testid={ `${ testId }-input` }
                        />
                    </Table.Cell>
                </>
            }
            <Table.Cell>
                <Dropdown
                    placeholder="Select mapping"
                    fluid
                    search
                    floating
                    selection
                    basic
                    className="idp-attribute-select"
                    options={ attributeDropDown }
                />
            </Table.Cell>
            <Table.Cell width="1">
                <Button basic icon>
                    <Icon name="trash" />
                </Button>
            </Table.Cell>
        </Table.Row>
    );
};
/**
 * Default proptypes for the attribute list item component.
 */
AttributeListItem.defaultProps = {
    "data-testid": "attribute-list-item"
};
