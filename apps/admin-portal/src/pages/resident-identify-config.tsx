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
import { PageLayout } from "../layouts";
import { Grid } from "semantic-ui-react";
import { ResidentRealmConfig } from "../components";

interface ResidentRealmConfigProps {
    prop: string;
}

export const ResidentIdentityConfig: any = (props: any): ReactElement => {
    return (
        <PageLayout
			title="Resident Realm Configuration"
			description="Manage configurations related to resident identity provider"
			showBottomDivider={ true }
		>
			<Grid>
				<Grid.Row>
					<Grid.Column width={ 10 }>
						<ResidentRealmConfig />
					</Grid.Column>
				</Grid.Row>
			</Grid>
		</PageLayout>
    )
}
