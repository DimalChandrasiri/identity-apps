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

/**
 * Model for the common namespace
 */
export interface Common {
    access: string;
    active: string;
    add: string;
    all: string;
    applicationName: string;
    applications: string;
    approvalStatus: string;
    approve: string;
    assignees: string;
    browser: string;
    cancel: string;
    challengeQuestionNumber: string;
    change: string;
    claim: string;
    completed: string;
    configure: string;
    contains: string;
    continue: string;
    createdOn: string;
    dangerZone: string;
    delete: string;
    description: string;
    deviceModel: string;
    edit: string;
    endsWith: string;
    equals: string;
    filter: string;
    goBackHome: string;
    help: string;
    hidePassword: string;
    initiator: string;
    ipAddress: string;
    lastAccessed: string;
    lastSeen: string;
    loginTime: string;
    logout: string;
    more: string;
    name: string;
    operatingSystem: string;
    operations: string;
    overview: string;
    personalInfo: string;
    priority: string;
    privacy: string;
    properties: string;
    ready: string;
    removeAll: string;
    reject: string;
    release: string;
    remove: string;
    reserved: string;
    resetFilters: string;
    revoke: string;
    revokeAll: string;
    save: string;
    search: string;
    security: string;
    showLess: string;
    showMore: string;
    showPassword: string;
    startsWith: string;
    submit: string;
    switch: string;
    terminate: string;
    terminateAll: string;
    terminateSession: string;
    type: string;
    update: string;
    user: string;
    userRole: string;
}

/**
 * Model for the views namespace
 */
export interface Views {
    components: {
        users: {
            all: {
                heading: string;
                subHeading: string;
            },
            notifications: {
                fetchUsers: Notification;
            },
            search: {
                forms: {
                    searchForm: {
                        inputs: {
                            filerAttribute: {
                                label: string;
                                placeholder: string;
                                validations: {
                                    empty: string;
                                }
                            },
                            filterCondition: {
                                label: string;
                                placeholder: string;
                                validations: {
                                    empty: string;
                                }
                            },
                            filterValue: {
                                label: string;
                                placeholder: string;
                                validations: {
                                    empty: string;
                                }
                            },
                        }
                    }
                },
                hints: {
                    querySearch: {
                        actionKeys: string;
                        label: string;
                    }
                },
                options: {
                    header: string;
                }
                placeholder: string;
                popups: {
                    clear: string;
                    dropdown: string;
                },
                resultsIndicator: string;
            },
        },
        userRole: {
            all: {
                heading: string;
                subHeading: string;
            },
        },
        changePassword: {
            forms: {
                passwordResetForm: {
                    inputs: {
                        confirmPassword: {
                            label: string;
                            placeholder: string;
                            validations: {
                                empty: string;
                                mismatch: string;
                            }
                        },
                        currentPassword: {
                            label: string;
                            placeholder: string;
                            validations: {
                                empty: string;
                                invalid: string;
                            }
                        },
                        newPassword: {
                            label: string;
                            placeholder: string;
                            validations: {
                                empty: string;
                            }
                        }
                    },
                    validations: {
                        genericError: {
                            description: string;
                            message: string;
                        },
                        invalidCurrentPassword: {
                            description: string;
                            message: string;
                        },
                        submitError: {
                            description: string;
                            message: string;
                        },
                        submitSuccess: {
                            description: string;
                            message: string;
                        }
                    }
                }
            },
            modals: {
                confirmationModal: {
                    heading: string;
                    message: string;
                }
            }
        },
        footer: {
            copyright: string;
        },
        privacy: {
            about: {
                description: string;
                heading: string;
            },
            privacyPolicy: {
                collectionOfPersonalInfo: {
                    description: {
                        list1: {
                            0: string;
                            1: string;
                            2: string;
                        },
                        para1: string;
                    },
                    heading: string;
                    trackingTechnologies: {
                        description: {
                            list1: {
                                0: string;
                                1: string;
                                2: string;
                                3: string;
                            },
                            para1: string;
                        },
                        heading: string;
                    }
                },
                description: {
                    para1: string;
                    para2: string;
                    para3: string;
                },
                disclaimer: {
                    description: {
                        list1: {
                            0: string;
                            1: string;
                        }
                    },
                    heading: string;
                },
                disclosureOfPersonalInfo: {
                    description: string;
                    heading: string;
                    legalProcess: {
                        description: string;
                        heading: string;
                    }
                },
                heading: string;
                moreInfo: {
                    changesToPolicy: {
                        description: {
                            para1: string;
                            para2: string;
                        },
                        heading: string;
                    },
                    contactUs: {
                        description: {
                            para1: string;
                        },
                        heading: string;
                    },
                    heading: string;
                    yourChoices: {
                        description: {
                            para1: string;
                            para2: string;
                        },
                        heading: string;
                    }
                },
                storageOfPersonalInfo: {
                    heading: string;
                    howLong: {
                        description: {
                            list1: {
                                0: string;
                                1: string;
                            },
                            para1: string;
                            para2: string;
                        },
                        heading: string;
                    },
                    requestRemoval: {
                        description: {
                            para1: string;
                            para2: string;
                        },
                        heading: string;
                    },
                    where: {
                        description: {
                            para1: string;
                            para2: string;
                        },
                        heading: string;
                    }
                },
                useOfPersonalInfo: {
                    description: {
                        list1: {
                            0: string;
                            1: string;
                            2: string;
                        },
                        para1: string;
                        para2: string;
                        subList1: {
                            heading: string;
                            list: {
                                0: string;
                                1: string;
                                2: string;
                            }
                        },
                        subList2: {
                            heading: string;
                            list: {
                                0: string;
                                1: string;
                            }
                        }
                    },
                    heading: string;
                },
                whatIsPersonalInfo: {
                    description: {
                        list1: {
                            0: string;
                            1: string;
                            2: string;
                            3: string;
                        },
                        list2: {
                            0: string;
                            1: string;
                            2: string;
                            3: string;
                        },
                        para1: string;
                        para2: string;
                    },
                    heading: string;
                }
            }
        }
    };
    pages: {
        overView: Page
    };
    placeholders: {
        404: Placeholder,
        emptySearchResult: Placeholder,
        genericError: Placeholder,
        loginError: Placeholder,
        underConstruction: Placeholder
    };
}

/**
 * Model for danger zones.
 */
interface DangerZone {
    actionTitle: string;
    header: string;
    subheader: string;
}

/**
 * Model for pages
 */
interface Page {
    title: string;
    subTitle: string;
}

/**
 * Model for notification set
 */
interface Notification {
    error: NotificationItem;
    genericError: NotificationItem;
    success: NotificationItem;
}

/**
 * Model for notification
 */
interface NotificationItem {
    message: string;
    description: string;
}

/**
 * Model for placeholder.
 */
interface Placeholder {
    action?: string;
    title: string;
    subtitles: string | PlaceholderSubtitle;
}

/**
 * Model for placeholder subtitle.
 */
interface PlaceholderSubtitle {
    [key: number]: string;
}
