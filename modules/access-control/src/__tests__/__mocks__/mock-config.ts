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

/* eslint-disable sort-keys */
export const configMock = {
    features: {
        applications: {
            disabledFeatures: [],
            enabled: true,
            scopes: {
                feature: [
                    "console:applications"
                ],
                create: [
                    "internal_application_mgt_create"
                ],
                read: [
                    "internal_application_mgt_view"
                ],
                update: [
                    "internal_application_mgt_update"
                ],
                delete: [
                    "internal_application_mgt_delete"
                ]
            }
        },
        approvals: {
            disabledFeatures: [],
            enabled: true,
            scopes: {
                create: [
                    "internal_humantask_view"
                ],
                read: [
                    "internal_humantask_view"
                ],
                update: [
                    "internal_humantask_view"
                ],
                delete: [
                    "internal_humantask_view"
                ]
            }
        },
        attributeDialects: {
            enabled: true,
            disabledFeatures: [],
            scopes: {
                feature: [
                    "console:attributes"
                ],
                create: [
                    "internal_claim_meta_create"
                ],
                read: [
                    "internal_claim_meta_view"
                ],
                update: [
                    "internal_claim_meta_update"
                ],
                delete: [
                    "internal_claim_meta_delete"
                ]
            }
        },
        certificates: {
            enabled: true,
            disabledFeatures: [],
            scopes: {
                create: [
                    "internal_keystore_update"
                ],
                read: [
                    "internal_keystore_view"
                ],
                update: [
                    "internal_keystore_update"
                ],
                delete: [
                    "internal_keystore_update"
                ]
            }
        },
        emailTemplates: {
            enabled: true,
            disabledFeatures: [],
            scopes: {
                create: [
                    "internal_email_mgt_create"
                ],
                read: [
                    "internal_email_mgt_view"
                ],
                update: [
                    "internal_email_mgt_update"
                ],
                delete: [
                    "internal_email_mgt_delete"
                ]
            }
        },
        generalConfigurations: {
            enabled: true,
            disabledFeatures: [],
            scopes: {
                create: [],
                read: [
                    "internal_idp_view"
                ],
                update: [
                    "internal_idp_update"
                ],
                delete: []
            }
        },
        guestUser: {
            enabled: true,
            disabledFeatures: [],
            scopes: {
                create: [
                    "internal_guest_mgt_invite_validate",
                    "internal_guest_mgt_invite_add"
                ],
                read: [
                    "internal_guest_mgt_invite_list"
                ],
                update: [
                    "internal_guest_mgt_invite_update"
                ],
                delete: [
                    "internal_guest_mgt_invite_delete",
                    "internal_guest_mgt_user_delete"
                ]
            }
        },
        groups: {
            enabled: true,
            disabledFeatures: [],
            scopes: {
                feature: [
                    "console:groups"
                ],
                create: [
                    "internal_role_mgt_create"
                ],
                read: [
                    "internal_role_mgt_view"
                ],
                update: [
                    "internal_role_mgt_update"
                ],
                delete: [
                    "internal_role_mgt_delete"
                ]
            }
        },
        identityProviders: {
            disabledFeatures: [],
            enabled: true,
            scopes: {
                feature: [
                    "console:idps"
                ],
                create: [
                    "internal_idp_create"
                ],
                read: [
                    "internal_idp_view"
                ],
                update: [
                    "internal_idp_update"
                ],
                delete: [
                    "internal_idp_delete"
                ]
            }
        },
        oidcScopes: {
            enabled: true,
            disabledFeatures: [],
            scopes: {
                feature: [
                    "console:scopes"
                ],
                create: [
                    "internal_application_mgt_create"
                ],
                read: [
                    "internal_application_mgt_view"
                ],
                update: [
                    "internal_application_mgt_update"
                ],
                delete: [
                    "internal_application_mgt_delete"
                ]
            }
        },
        remoteFetchConfig: {
            enabled: true,
            disabledFeatures: [],
            scopes: {
                create: [
                    "internal_identity_mgt_view",
                    "internal_identity_mgt_update",
                    "internal_identity_mgt_create",
                    "internal_identity_mgt_delete"
                ],
                read: [
                    "internal_identity_mgt_view",
                    "internal_identity_mgt_update",
                    "internal_identity_mgt_create",
                    "internal_identity_mgt_delete"
                ],
                update: [
                    "internal_identity_mgt_view",
                    "internal_identity_mgt_update",
                    "internal_identity_mgt_create",
                    "internal_identity_mgt_delete"
                ],
                delete: [
                    "internal_identity_mgt_view",
                    "internal_identity_mgt_update",
                    "internal_identity_mgt_create",
                    "internal_identity_mgt_delete"
                ]
            }
        },
        roles: {
            enabled: true,
            disabledFeatures: [],
            scopes: {
                feature: [
                    "console:roles"
                ],
                create: [
                    "internal_role_mgt_create"
                ],
                read: [
                    "internal_role_mgt_view"
                ],
                update: [
                    "internal_role_mgt_update"
                ],
                delete: [
                    "internal_role_mgt_delete"
                ]
            }
        },
        userStores: {
            enabled: true,
            disabledFeatures: [],
            scopes: {
                create: [
                    "internal_userstore_create"
                ],
                read: [
                    "internal_userstore_view"
                ],
                update: [
                    "internal_userstore_update"
                ],
                delete: [
                    "internal_userstore_delete"
                ]
            }
        },
        users: {
            enabled: true,
            disabledFeatures: [],
            scopes: {
                feature: [
                    "console:users"
                ],
                create: [
                    "internal_user_mgt_create"
                ],
                read: [
                    "internal_user_mgt_list",
                    "internal_userstore_view"
                ],
                update: [
                    "internal_user_mgt_update"
                ],
                delete: [
                    "internal_user_mgt_delete"
                ]
            }
        }
    }
};
/* eslint-enable sort-keys */
